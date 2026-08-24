package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

@Builder
public record KhuVucResponse(
        Integer maKhuVuc,
        String tenKhuVuc
) {
}
