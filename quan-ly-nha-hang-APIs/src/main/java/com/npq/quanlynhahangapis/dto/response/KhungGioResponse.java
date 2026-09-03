package com.npq.quanlynhahangapis.dto.response;

import java.time.LocalTime;

public record KhungGioResponse(
        LocalTime gio,
        Long soLuongConLai
) {
}
