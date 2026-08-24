package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.entity.ChiNhanh;
import com.npq.quanlynhahangapis.entity.GioHoatDong;
import com.npq.quanlynhahangapis.repository.GioHoatDongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GioHoatDongService {
    private final GioHoatDongRepository gioHoatDongRepository;

    public void thoiGianMacDinh(ChiNhanh chiNhanh) {
        List<GioHoatDong> listMacDinh = new ArrayList<>();
        for (DayOfWeek thu : DayOfWeek.values()) {

            GioHoatDong gioHoatDong = GioHoatDong.builder()
                    .chiNhanh(chiNhanh)
                    .thu(thu)
                    .build();

            listMacDinh.add(gioHoatDong);
        }
        gioHoatDongRepository.saveAll(listMacDinh);
    }

}
