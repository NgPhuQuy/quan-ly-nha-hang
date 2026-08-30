package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DangNhapRequest;
import com.npq.quanlynhahangapis.dto.request.NguoiDungCapNhatRequest;
import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.dto.response.DangNhapResponse;
import com.npq.quanlynhahangapis.dto.response.NguoiDungResponse;
import com.npq.quanlynhahangapis.entity.KhachHang;
import com.npq.quanlynhahangapis.entity.NguoiDung;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.*;
import com.npq.quanlynhahangapis.utils.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NguoiDungService {
    private final PasswordEncoder passwordEncoder;
    private final NguoiDungRepository nguoiDungRepository;
    private final AdminRepository adminRepository;
    private final QuanLyRepository quanLyRepository;
    private final KhachHangRepository khachHangRepository;
    private final NhanVienRepository nhanVienRepository;
    private final CloudinaryService cloudinaryService;
    private final JwtUtil jwtUtil;

    public List<NguoiDungResponse> layDSNguoiDung() {
        return nguoiDungRepository.findAll().stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public NguoiDungResponse layThongTinHienTai() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof Integer maNguoiDung) {
            return layNguoiDungTheoId(maNguoiDung);
        }
        throw new AppException(ErrorCode.UNAUTHORIZED);
    }

    public NguoiDungResponse layNguoiDungTheoId(int maNguoiDung) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(maNguoiDung)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return chuyenSangDto(nguoiDung);
    }
// tai sao 2 cai func nay lai tra ve 2 kieu du lieu khac nhau, muc dich la gi???
// func 1 la tra ve dto gui ra response
// func 2 la tra ve obj de service su dung de validate

    public NguoiDung layNguoiDungTheoTaiKhoan(String taiKhoan) {
        return nguoiDungRepository.findByTaiKhoan(taiKhoan)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    @Transactional
    public NguoiDungResponse dangKy(NguoiDungRequest dto) {
        if (nguoiDungRepository.existsByTaiKhoan(dto.taiKhoan()))
            throw new AppException(ErrorCode.USER_EXISTED);

        if (nguoiDungRepository.existsByEmail(dto.email()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);

        if (nguoiDungRepository.existsBySoDienThoai(dto.soDienThoai()))
            throw new AppException(ErrorCode.PHONE_EXISTED);

        String avatarUrl = cloudinaryService.taiAnhLenCloudinary(dto.avatar());

        NguoiDung nguoiDung = NguoiDung.builder()
                .taiKhoan(dto.taiKhoan())
                .matKhau(passwordEncoder.encode(dto.matKhau()))
                .avatar(avatarUrl)
                .ho(dto.ho())
                .ten(dto.ten())
                .email(dto.email())
                .soDienThoai(dto.soDienThoai())
                .build();

        nguoiDungRepository.save(nguoiDung);

        KhachHang khachHang = KhachHang.builder()
                .nguoiDung(nguoiDung)
                .build();

        khachHangRepository.save(khachHang);

        return chuyenSangDto(nguoiDung);
    }

    public DangNhapResponse dangNhap(@Valid DangNhapRequest dto) {
        if (this.authenticate(dto.taiKhoan(), dto.matKhau())) {
            NguoiDung nguoiDung = layNguoiDungTheoTaiKhoan(dto.taiKhoan());
            String token = jwtUtil.taoToken(
                    nguoiDung.getMaNguoiDung(),
                    nguoiDung.getTaiKhoan(),
                    this.layVaiTro(nguoiDung.getMaNguoiDung())
            );
            return DangNhapResponse.builder()
                    .token(token)
                    .build();
        }
        throw new AppException(ErrorCode.INVALID_CREDENTIALS);
    }

    public boolean authenticate(String taiKhoan, String matKhau) {
        NguoiDung nguoiDung = layNguoiDungTheoTaiKhoan(taiKhoan);
        return passwordEncoder.matches(matKhau, nguoiDung.getMatKhau());
    }

    public String layVaiTro(Integer maNguoiDung) {
        if (adminRepository.existsById(maNguoiDung)) return "ADMIN";
        if (quanLyRepository.existsById(maNguoiDung)) return "QUANLY";
        if (nhanVienRepository.existsById(maNguoiDung)) return "NHANVIEN";
        if (khachHangRepository.existsById(maNguoiDung)) return "KHACHHANG";
        throw new AppException(ErrorCode.ROLE_NOT_FOUND);
    }

    private NguoiDungResponse chuyenSangDto(NguoiDung nguoiDung) {

        // todo check
        String vaiTro = "KHACHHANG";
        try {
            vaiTro = layVaiTro(nguoiDung.getMaNguoiDung());
        } catch (Exception ignored) {
        }

        String vaiTroHienThi = "ADMIN".equals(vaiTro) ? "Admin"
                : "QUANLY".equals(vaiTro) ? "Quản lý"
                  : "NHANVIEN".equals(vaiTro) ? "Nhân viên" : "Khách hàng";

        String chiNhanh = "Quận 1";
        if ("QUANLY".equals(vaiTro)) {
            var ql = quanLyRepository.findById(nguoiDung.getMaNguoiDung()).orElse(null);
            if (ql != null && ql.getChiNhanh() != null) {
                chiNhanh = ql.getChiNhanh().getTenChiNhanh();
            }
        } else if ("NHANVIEN".equals(vaiTro)) {
            var nv = nhanVienRepository.findById(nguoiDung.getMaNguoiDung()).orElse(null);
            if (nv != null && nv.getChiNhanh() != null) {
                chiNhanh = nv.getChiNhanh().getTenChiNhanh();
            }
        }

        String hoTen = ((nguoiDung.getHo() != null ? nguoiDung.getHo() + " " : "")
                + (nguoiDung.getTen() != null ? nguoiDung.getTen() : "")).trim();
        if (hoTen.isEmpty()) hoTen = nguoiDung.getTaiKhoan() != null ? nguoiDung.getTaiKhoan() : "Người dùng";

        return NguoiDungResponse.builder()
                .maNguoiDung(nguoiDung.getMaNguoiDung())
                .taiKhoan(nguoiDung.getTaiKhoan())
                .avatar(nguoiDung.getAvatar())
                .ho(nguoiDung.getHo())
                .ten(nguoiDung.getTen())
                .hoTen(hoTen)
                .email(nguoiDung.getEmail())
                .soDienThoai(nguoiDung.getSoDienThoai())
                .vaiTro(vaiTroHienThi)
                .chiNhanh(chiNhanh)
                .ngayTao(nguoiDung.getNgayTao())
                .ngayCapNhat(nguoiDung.getNgayCapNhat())
                .trangThai(nguoiDung.getTrangThai() != null && nguoiDung.getTrangThai())
                .build();
    }

    @Transactional
    public NguoiDungResponse capNhatNguoiDung(Integer maNguoiDung, NguoiDungCapNhatRequest request) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(maNguoiDung)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (request.ho() != null) nguoiDung.setHo(request.ho());
        if (request.ten() != null) nguoiDung.setTen(request.ten());
        if (request.email() != null) nguoiDung.setEmail(request.email());
        if (request.soDienThoai() != null) nguoiDung.setSoDienThoai(request.soDienThoai());
        if (request.trangThai() != null) nguoiDung.setTrangThai(request.trangThai());

        return chuyenSangDto(nguoiDungRepository.save(nguoiDung));
    }

    @Transactional
    public NguoiDungResponse doiTrangThaiNguoiDung(Integer maNguoiDung) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(maNguoiDung)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        nguoiDung.setTrangThai(nguoiDung.getTrangThai() == null || !nguoiDung.getTrangThai());
        return chuyenSangDto(nguoiDungRepository.save(nguoiDung));
    }

    @Transactional
    public void xoaNguoiDung(Integer maNguoiDung) {
        if (!nguoiDungRepository.existsById(maNguoiDung)) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        nguoiDungRepository.deleteById(maNguoiDung);
    }
}
