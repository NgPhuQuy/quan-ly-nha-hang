//package com.npq.quanlynhahangapis.service;
//
//import com.npq.quanlynhahangapis.dto.request.DatChoRequest;
//import com.npq.quanlynhahangapis.dto.response.DatChoResponse;
//import com.npq.quanlynhahangapis.entity.ChiNhanh;
//import com.npq.quanlynhahangapis.entity.DatCho;
//import com.npq.quanlynhahangapis.entity.KhachHang;
//import com.npq.quanlynhahangapis.repository.DatLichRepository;
//import com.npq.quanlynhahangapis.utils.JwtUtil;
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//import lombok.Setter;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//@Getter
//@Setter
//public class DatChoService {
//    private final DatLichRepository datLichRepository;
//    private final NguoiDungService nguoiDungService;
//    private final ChiNhanhService chiNhanhService;
//    private final JwtUtil jwtUtil;
//
//    public List<DatChoResponse> layDSDatLich() {
//        return datLichRepository.findAll()
//                .stream()
//                .map(this::chuyenSangDto)
//                .toList();
//    }
//
//    public DatChoResponse datLich(DatChoRequest request) {
////         todo validate
//        KhachHang khachHang = khach;
//        ChiNhanh chiNhanh = chiNhanhService.layChiNhanhTheoId(request.maChiNhanh());
//
//        DatCho datCho = DatCho.builder()
//                .khachHang().chiNhanh().ngay().gio().soKhach().ghiChu().build();
//
//        return chuyenSangDto(datLichRepository.save(datCho));
//    }
//
//    public DatChoResponse layTheoId(Integer maDatLich) {
//        return chuyenSangDto(datLichRepository.getReferenceById(maDatLich));
//    }
//
//    private DatChoResponse chuyenSangDto(DatCho dto) {
//        return DatChoResponse.builder()
//                .maDatLich(dto.getMaDatLich())
////                .khachHang(dto.getKhachHang())
////                .ban(dto.getBan())
//                .build();
//    }
//
//
//}
