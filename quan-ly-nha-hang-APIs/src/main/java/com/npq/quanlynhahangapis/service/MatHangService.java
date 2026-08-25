package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.MatHangRequest;
import com.npq.quanlynhahangapis.dto.response.MatHangResponse;
import com.npq.quanlynhahangapis.entity.MatHang;
import com.npq.quanlynhahangapis.entity.enums.LoaiMatHang;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiMatHang;
import com.npq.quanlynhahangapis.repository.MatHangRepository;
import com.npq.quanlynhahangapis.repository.TrangThaiMatHangChiNhanhRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class MatHangService {
    private final TrangThaiMatHangChiNhanhRepository trangThaiMatHangChiNhanhRepository;
    private final MatHangRepository matHangRepository;

    public List<MatHangResponse> layDSMonAn(Integer maChiNhanh) {
        return trangThaiMatHangChiNhanhRepository
                .findByChiNhanh_MaChiNhanhAndTrangThaiMatHang(maChiNhanh, TrangThaiMatHang.DANG_BAN)
                .stream()
                .map(item -> chuyenSangDto(item.getMatHang()))
                .filter(this::laMonAn)
                .toList();
    }

    public List<MatHangResponse> layDSThucUong(Integer maChiNhanh) {
        return trangThaiMatHangChiNhanhRepository
                .findByChiNhanh_MaChiNhanhAndTrangThaiMatHang(maChiNhanh, TrangThaiMatHang.DANG_BAN)
                .stream()
                .map(item -> chuyenSangDto(item.getMatHang()))
                .filter(this::laMonAn)
                .toList();
    }

    public List<MatHangResponse> layDSDichVu(Integer maChiNhanh) {
        return trangThaiMatHangChiNhanhRepository
                .findByChiNhanh_MaChiNhanhAndTrangThaiMatHang(maChiNhanh, TrangThaiMatHang.DANG_BAN)
                .stream()
                .map(item -> chuyenSangDto(item.getMatHang()))
                .filter(this::laMonAn)
                .toList();
    }

    private boolean laMonAn(MatHangResponse matHangResponse) {
        return matHangResponse.loaiMatHang().equals(LoaiMatHang.MON_AN);
    }

    private boolean laThucUong(MatHangResponse matHangResponse) {
        return matHangResponse.loaiMatHang().equals(LoaiMatHang.THUC_UONG);
    }

    private boolean laDichVu(MatHangResponse matHangResponse) {
        return matHangResponse.loaiMatHang().equals(LoaiMatHang.DICH_VU);
    }

    private MatHangResponse chuyenSangDto(MatHang matHang) {
        return MatHangResponse.builder()
                .tenMatHang(matHang.getTenMatHang())
                .anhMinhHoa(matHang.getAnhMinhHoa())
                .giaMatHang(matHang.getGiaMatHang())
                .loaiMatHang(matHang.getLoaiMatHang())
                .build();
    }


    public MatHangResponse taoMatHang(MatHangRequest request) {
        return matHangRepository.save(MatHang.builder()
                .tenMatHang(request.tenMatHang())
                .anhMinhHoa()
                .giaMatHang(request.giaMatHang())
                .loaiMatHang(request.loaiMatHang())
                .build());
    }
}
