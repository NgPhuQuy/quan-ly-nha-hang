package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.ChiTietHoaDonRequest;
import com.npq.quanlynhahangapis.dto.request.HoaDonRequest;
import com.npq.quanlynhahangapis.dto.response.ChiTietHoaDonResponse;
import com.npq.quanlynhahangapis.dto.response.HoaDonResponse;
import com.npq.quanlynhahangapis.entity.*;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class HoaDonService {
    private final HoaDonRepository hoaDonRepository;
    private final ChiTietHoaDonRepository chiTietHoaDonRepository;
    private final MatHangRepository matHangRepository;
    private final BanRepository banRepository;
    private final ChiNhanhRepository chiNhanhRepository;
    private final KhachHangRepository khachHangRepository;
    private final NhanVienRepository nhanVienRepository;

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public List<HoaDonResponse> layDSHoaDon(Integer maChiNhanh, String nguon, String trangThai, String search) {
        List<HoaDon> list = hoaDonRepository.findAllOrderByNgayLapHoaDonDesc();

        return list.stream()
                .filter(h -> maChiNhanh == null || (h.getChiNhanh() != null && h.getChiNhanh().getMaChiNhanh().equals(maChiNhanh)))
                .filter(h -> nguon == null || nguon.isBlank() || (h.getNguon() != null && h.getNguon().equalsIgnoreCase(nguon)))
                .filter(h -> trangThai == null || trangThai.isBlank() || (h.getTrangThai() != null && h.getTrangThai().equalsIgnoreCase(trangThai)))
                .filter(h -> {
                    if (search == null || search.isBlank()) return true;
                    String s = search.toLowerCase().trim();
                    boolean matchCode = h.getMaHoaDonCode() != null && h.getMaHoaDonCode().toLowerCase().contains(s);
                    boolean matchCustomer = h.getTenKhachHang() != null && h.getTenKhachHang().toLowerCase().contains(s);
                    boolean matchPhone = h.getSoDienThoai() != null && h.getSoDienThoai().contains(s);
                    return matchCode || matchCustomer || matchPhone;
                })
                .map(this::chuyenSangDto)
                .toList();
    }

    public HoaDonResponse layChiTietHoaDon(Integer maHoaDon) {
        HoaDon hoaDon = hoaDonRepository.findById(maHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
        return chuyenSangDto(hoaDon);
    }

    public HoaDonResponse layTheoCode(String maHoaDonCode) {
        HoaDon hoaDon = hoaDonRepository.findByMaHoaDonCode(maHoaDonCode)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
        return chuyenSangDto(hoaDon);
    }

    @Transactional
    public HoaDonResponse taoHoaDon(HoaDonRequest request) {
        ChiNhanh chiNhanh = null;
        if (request.maChiNhanh() != null) {
            chiNhanh = chiNhanhRepository.findById(request.maChiNhanh()).orElse(null);
        }

        Ban ban = null;
        if (request.maBan() != null) {
            ban = banRepository.findById(request.maBan()).orElse(null);
            if (ban != null) {
                ban.setTrangThai("Đang phục vụ");
                banRepository.save(ban);
            }
        }

        KhachHang khachHang = null;
        if (request.maKhachHang() != null) {
            khachHang = khachHangRepository.findById(request.maKhachHang()).orElse(null);
        }

        NhanVien nhanVien = null;
        if (request.maNhanVien() != null) {
            nhanVien = nhanVienRepository.findById(request.maNhanVien()).orElse(null);
        }

        String maCode = sinhMaHoaDonCode();

        HoaDon hoaDon = HoaDon.builder()
                .maHoaDonCode(maCode)
                .chiNhanh(chiNhanh)
                .ban(ban)
                .khachHang(khachHang)
                .nhanVien(nhanVien)
                .tenKhachHang(request.tenKhachHang())
                .soDienThoai(request.soDienThoai())
                .nguon(request.nguon() != null ? request.nguon() : "WALK_IN")
                .trangThai(request.trangThai() != null ? request.trangThai() : "Chờ xử lý")
                .tongTien(BigDecimal.ZERO)
                .ngayLapHoaDon(LocalDateTime.now())
                .build();

        HoaDon savedHoaDon = hoaDonRepository.save(hoaDon);

        BigDecimal tongTien = BigDecimal.ZERO;
        List<ChiTietHoaDon> items = new ArrayList<>();

        if (request.items() != null && !request.items().isEmpty()) {
            for (ChiTietHoaDonRequest itemReq : request.items()) {
                MatHang matHang = matHangRepository.findById(itemReq.maMatHang()).orElse(null);
                if (matHang != null) {
                    BigDecimal donGia = itemReq.donGia() != null ? itemReq.donGia() : matHang.getGiaMatHang();
                    int soLuong = itemReq.soLuong() != null ? itemReq.soLuong() : 1;
                    BigDecimal thanhTien = donGia.multiply(BigDecimal.valueOf(soLuong));
                    tongTien = tongTien.add(thanhTien);

                    ChiTietHoaDon ct = ChiTietHoaDon.builder()
                            .hoaDon(savedHoaDon)
                            .matHang(matHang)
                            .soLuong(soLuong)
                            .donGia(donGia)
                            .build();
                    items.add(ct);
                }
            }
            chiTietHoaDonRepository.saveAll(items);
            savedHoaDon.setListChiTietHoaDon(items);
        }

        if (ban != null) {
            ban.setTrangThai("Đang phục vụ");
            banRepository.save(ban);
        }

        savedHoaDon.setTongTien(tongTien);
        return chuyenSangDto(hoaDonRepository.save(savedHoaDon));
    }

    @Transactional
    public HoaDonResponse thanhToanHoaDon(Integer maHoaDon) {
        HoaDon hoaDon = hoaDonRepository.findById(maHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));

        hoaDon.setTrangThai("Hoàn thành");

        if (hoaDon.getBan() != null) {
            Ban ban = hoaDon.getBan();
            ban.setTrangThai("Trống");
            banRepository.save(ban);
        }

        if (hoaDon.getKhachHang() != null && hoaDon.getTongTien() != null) {
            KhachHang kh = hoaDon.getKhachHang();
            int diemThem = hoaDon.getTongTien().divide(BigDecimal.valueOf(10000), java.math.RoundingMode.HALF_UP).intValue();
            int currentDiem = kh.getDiemTichLuy() != null ? kh.getDiemTichLuy() : 0;
            kh.setDiemTichLuy(currentDiem + diemThem);
            khachHangRepository.save(kh);
        }

        return chuyenSangDto(hoaDonRepository.save(hoaDon));
    }

    @Transactional
    public HoaDonResponse huyHoaDon(Integer maHoaDon) {
        HoaDon hoaDon = hoaDonRepository.findById(maHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));

        hoaDon.setTrangThai("Đã hủy");

        if (hoaDon.getBan() != null) {
            Ban ban = hoaDon.getBan();
            ban.setTrangThai("Trống");
            banRepository.save(ban);
        }

        return chuyenSangDto(hoaDonRepository.save(hoaDon));
    }

    @Transactional
    public void xoaHoaDon(Integer maHoaDon) {
        if (!hoaDonRepository.existsById(maHoaDon)) {
            throw new AppException(ErrorCode.SOURCE_NOT_FOUND);
        }
        hoaDonRepository.deleteById(maHoaDon);
    }

    private String sinhMaHoaDonCode() {
        int randomNum = 1000 + new Random().nextInt(9000);
        return "HD-" + randomNum;
    }

    public HoaDonResponse chuyenSangDto(HoaDon hoaDon) {
        List<ChiTietHoaDonResponse> itemDtos = new ArrayList<>();
        if (hoaDon.getListChiTietHoaDon() != null) {
            for (ChiTietHoaDon ct : hoaDon.getListChiTietHoaDon()) {
                BigDecimal donGia = ct.getDonGia() != null ? ct.getDonGia() : BigDecimal.ZERO;
                int qty = ct.getSoLuong() != null ? ct.getSoLuong() : 1;
                BigDecimal thanhTien = donGia.multiply(BigDecimal.valueOf(qty));

                itemDtos.add(ChiTietHoaDonResponse.builder()
                        .maChiTietHoaDon(ct.getMaChiTietHoaDon())
                        .maMatHang(ct.getMatHang() != null ? ct.getMatHang().getMaMatHang() : null)
                        .tenMatHang(ct.getMatHang() != null ? ct.getMatHang().getTenMatHang() : "Món ăn")
                        .anhMinhHoa(ct.getMatHang() != null ? ct.getMatHang().getAnhMinhHoa() : null)
                        .soLuong(qty)
                        .donGia(donGia)
                        .thanhTien(thanhTien)
                        .build());
            }
        }

        String thoiGian = hoaDon.getNgayLapHoaDon() != null
                ? hoaDon.getNgayLapHoaDon().format(FORMATTER)
                : LocalDateTime.now().format(FORMATTER);

        String tenNhanVien = null;
        if (hoaDon.getNhanVien() != null && hoaDon.getNhanVien().getNguoiDung() != null) {
            NguoiDung u = hoaDon.getNhanVien().getNguoiDung();
            tenNhanVien = (u.getHo() != null ? u.getHo() + " " : "") + (u.getTen() != null ? u.getTen() : "");
        }

        return HoaDonResponse.builder()
                .maHoaDon(hoaDon.getMaHoaDon())
                .maHoaDonCode(hoaDon.getMaHoaDonCode() != null ? hoaDon.getMaHoaDonCode() : "HD-" + hoaDon.getMaHoaDon())
                .maChiNhanh(hoaDon.getChiNhanh() != null ? hoaDon.getChiNhanh().getMaChiNhanh() : null)
                .tenChiNhanh(hoaDon.getChiNhanh() != null ? hoaDon.getChiNhanh().getTenChiNhanh() : "Quận 1")
                .maBan(hoaDon.getBan() != null ? hoaDon.getBan().getMaBan() : null)
                .soBan(hoaDon.getBan() != null ? hoaDon.getBan().getSoBan() : null)
                .maKhachHang(hoaDon.getKhachHang() != null ? hoaDon.getKhachHang().getMaKhachHang() : null)
                .tenKhachHang(hoaDon.getTenKhachHang())
                .soDienThoai(hoaDon.getSoDienThoai())
                .maNhanVien(hoaDon.getNhanVien() != null ? hoaDon.getNhanVien().getMaNhanVien() : null)
                .tenNhanVien(tenNhanVien)
                .nguon(hoaDon.getNguon() != null ? hoaDon.getNguon() : "WALK_IN")
                .trangThai(hoaDon.getTrangThai() != null ? hoaDon.getTrangThai() : "Chờ xử lý")
                .tongTien(hoaDon.getTongTien() != null ? hoaDon.getTongTien() : BigDecimal.ZERO)
                .ngayLapHoaDon(hoaDon.getNgayLapHoaDon())
                .thoiGianDinhDang(thoiGian)
                .items(itemDtos)
                .build();
    }
}

