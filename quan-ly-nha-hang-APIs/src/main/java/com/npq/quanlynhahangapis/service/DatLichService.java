package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DatLichRequest;
import com.npq.quanlynhahangapis.dto.response.DatLichResponse;
import com.npq.quanlynhahangapis.entity.DatLich;
import com.npq.quanlynhahangapis.repository.DatLichRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DatLichService {
    private final DatLichRepository datLichRepository;

    public List<DatLichResponse> layDSDatLich() {
        return datLichRepository.findAll()
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public DatLichResponse datLich(DatLichRequest request){
        // todo validate

        DatLich dl = DatLich.builder()
                .khachHang(request.khachHang())
                .ban(request.ban())
                .thoiGian(request.thoiGian())
                .build();

        return chuyenSangDto(datLichRepository.save(dl));
    }

    public DatLichResponse layTheoId(Integer maDatLich) {
        return chuyenSangDto(datLichRepository.getReferenceById(maDatLich));
    }

    private DatLichResponse chuyenSangDto(DatLich dto){
        return DatLichResponse.builder()
                .maDatLich(dto.getMaDatLich())
                .khachHang(dto.getKhachHang())
                .ban(dto.getBan())
                .build();
    }


}
