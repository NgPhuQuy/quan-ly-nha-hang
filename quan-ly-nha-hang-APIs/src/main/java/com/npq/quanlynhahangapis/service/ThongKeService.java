//package com.npq.quanlynhahangapis.service;
//
//import com.npq.quanlynhahangapis.dto.response.*;
//import com.npq.quanlynhahangapis.entity.ChiNhanh;
//import com.npq.quanlynhahangapis.entity.HoaDon;
//import com.npq.quanlynhahangapis.repository.ChiNhanhRepository;
//import com.npq.quanlynhahangapis.repository.HoaDonRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
//import java.util.ArrayList;
//import java.util.LinkedHashMap;
//import java.util.List;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class ThongKeService {
//    private static final DateTimeFormatter DAY_FORMAT = DateTimeFormatter.ofPattern("dd/MM");
//    private final HoaDonRepository hoaDonRepository;
//    private final ChiNhanhRepository chiNhanhRepository;
//    private final HoaDonService hoaDonService;
//
//    public DashboardOverviewResponse layTongQuan(Integer maChiNhanh) {
//        List<HoaDonResponse> listHoaDon = new ArrayList<>();
//        if (maChiNhanh != null) listHoaDon = hoaDonRepository
//                .findByChiNhanh_MaChiNhanh(maChiNhanh).stream()
//                .map(hoaDonService::chuyenSangDto)
//                .toList();
//        else listHoaDon =
//                List < HoaDon > hoaDons = hoaDonRepository.findAll();
//        if (maChiNhanh != null) {
//            hoaDons = hoaDons.stream()
//                    .filter(h -> h.getChiNhanh() != null && h.getChiNhanh().getMaChiNhanh().equals(maChiNhanh))
//                    .toList();
//        }
//
//        BigDecimal tongDoanhThu = hoaDons.stream()
//                .filter(h -> "Hoàn thành".equalsIgnoreCase(h.getTrangThai()))
//                .map(h -> h.getTongTien() != null ? h.getTongTien() : BigDecimal.ZERO)
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//
//        long tongHoaDon = hoaDons.stream()
//                .filter(h -> "Hoàn thành".equalsIgnoreCase(h.getTrangThai()))
//                .count();
//
//
//        List<GiaoDichThuChi> giaoDichs = giaoDichThuChiRepository.findAll();
//        if (maChiNhanh != null) {
//            giaoDichs = giaoDichs.stream()
//                    .filter(g -> g.getChiNhanh() != null && g.getChiNhanh().getMaChiNhanh().equals(maChiNhanh))
//                    .toList();
//        }
//
//        BigDecimal tongThu = giaoDichs.stream()
//                .filter(g -> "Thu".equalsIgnoreCase(g.getLoai()))
//                .map(g -> g.getSoTien() != null ? g.getSoTien() : BigDecimal.ZERO)
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//
//        if (tongThu.compareTo(BigDecimal.ZERO) == 0 && tongDoanhThu.compareTo(BigDecimal.ZERO) > 0) {
//            tongThu = tongDoanhThu;
//        }
//
//        BigDecimal tongChi = giaoDichs.stream()
//                .filter(g -> "Chi".equalsIgnoreCase(g.getLoai()))
//                .map(g -> g.getSoTien() != null ? g.getSoTien() : BigDecimal.ZERO)
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//
//        BigDecimal loiNhuan = tongThu.subtract(tongChi);
//
//        List<ChiNhanh> chiNhanhs = chiNhanhRepository.findAll();
//        long tongChiNhanh = chiNhanhs.size();
//        long chiNhanhHoatDong = chiNhanhs.stream().filter(ChiNhanh::isTrangThai).count();
//
//        return DashboardOverviewResponse.builder()
//                .tongDoanhThu(tongDoanhThu)
//                .tongHoaDon(tongHoaDon)
//                .tongThu(tongThu)
//                .tongChi(tongChi)
//                .loiNhuan(loiNhuan)
//                .chiNhanhHoatDong(chiNhanhHoatDong)
//                .tongChiNhanh(tongChiNhanh)
//                .build();
//    }
//
//    public List<DoanhThuTheoNgayResponse> layDoanhThuTheoNgay(Integer maChiNhanh) {
//        List<HoaDon> hoaDons = hoaDonRepository.findAll();
//        if (maChiNhanh != null) {
//            hoaDons = hoaDons.stream()
//                    .filter(h -> h.getChiNhanh() != null && h.getChiNhanh().getMaChiNhanh().equals(maChiNhanh))
//                    .toList();
//        }
//
//        Map<String, BigDecimal> revMap = new LinkedHashMap<>();
//        Map<String, Integer> countMap = new LinkedHashMap<>();
//
//        LocalDate today = LocalDate.now();
//        for (int i = 7; i >= 0; i--) {
//            LocalDate d = today.minusDays(i);
//            String formatted = d.format(DAY_FORMAT);
//            revMap.put(formatted, BigDecimal.ZERO);
//            countMap.put(formatted, 0);
//        }
//
//        for (HoaDon h : hoaDons) {
//            if ("Hoàn thành".equalsIgnoreCase(h.getTrangThai()) && h.getNgayLapHoaDon() != null) {
//                String dayKey = h.getNgayLapHoaDon().toLocalDate().format(DAY_FORMAT);
//                if (revMap.containsKey(dayKey)) {
//                    BigDecimal cur = revMap.get(dayKey);
//                    BigDecimal plus = h.getTongTien() != null ? h.getTongTien() : BigDecimal.ZERO;
//                    revMap.put(dayKey, cur.add(plus));
//                    countMap.put(dayKey, countMap.get(dayKey) + 1);
//                }
//            }
//        }
//
//        List<DoanhThuTheoNgayResponse> result = new ArrayList<>();
//        for (String k : revMap.keySet()) {
//            result.add(DoanhThuTheoNgayResponse.builder()
//                    .date(k)
//                    .revenue(revMap.get(k))
//                    .invoices(countMap.get(k))
//                    .build());
//        }
//
//        return result;
//    }
//
//    public List<DoanhThuTheoChiNhanhResponse> layDoanhThuTheoChiNhanh() {
//        List<ChiNhanh> chiNhanhs = chiNhanhRepository.findAll();
//        List<HoaDon> hoaDons = hoaDonRepository.findAll();
//
//        Map<String, BigDecimal> branchRev = new LinkedHashMap<>();
//        for (ChiNhanh cn : chiNhanhs) {
//            branchRev.put(cn.getTenChiNhanh(), BigDecimal.ZERO);
//        }
//
//        for (HoaDon h : hoaDons) {
//            if ("Hoàn thành".equalsIgnoreCase(h.getTrangThai()) && h.getChiNhanh() != null) {
//                String name = h.getChiNhanh().getTenChiNhanh();
//                BigDecimal cur = branchRev.getOrDefault(name, BigDecimal.ZERO);
//                BigDecimal plus = h.getTongTien() != null ? h.getTongTien() : BigDecimal.ZERO;
//                branchRev.put(name, cur.add(plus));
//            }
//        }
//
//        List<DoanhThuTheoChiNhanhResponse> result = new ArrayList<>();
//        for (Map.Entry<String, BigDecimal> entry : branchRev.entrySet()) {
//            result.add(DoanhThuTheoChiNhanhResponse.builder()
//                    .branch(entry.getKey())
//                    .revenue(entry.getValue())
//                    .build());
//        }
//
//        return result;
//    }
//
//    public List<DoanhThuTheoNguonResponse> layDoanhThuTheoNguon(Integer maChiNhanh) {
//        List<HoaDon> hoaDons = hoaDonRepository.findAll();
//        if (maChiNhanh != null) {
//            hoaDons = hoaDons.stream()
//                    .filter(h -> h.getChiNhanh() != null && h.getChiNhanh().getMaChiNhanh().equals(maChiNhanh))
//                    .toList();
//        }
//
//        BigDecimal walkIn = BigDecimal.ZERO;
//        BigDecimal online = BigDecimal.ZERO;
//
//        for (HoaDon h : hoaDons) {
//            if ("Hoàn thành".equalsIgnoreCase(h.getTrangThai())) {
//                BigDecimal tong = h.getTongTien() != null ? h.getTongTien() : BigDecimal.ZERO;
//                if ("ONLINE".equalsIgnoreCase(h.getNguon())) {
//                    online = online.add(tong);
//                } else {
//                    walkIn = walkIn.add(tong);
//                }
//            }
//        }
//
//        return List.of(
//                DoanhThuTheoNguonResponse.builder().name("WALK_IN").value(walkIn).label("Tại quầy").build(),
//                DoanhThuTheoNguonResponse.builder().name("ONLINE").value(online).label("Đặt online").build()
//        );
//    }
//}
//
