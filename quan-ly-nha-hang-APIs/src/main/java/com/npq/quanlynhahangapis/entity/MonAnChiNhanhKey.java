package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@Setter
@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class MonAnChiNhanhKey {
    @Column(name = "ma_chi_nhanh")
    private Integer maChiNanh;

    @Column(name = "ma_mon_an")
    private Integer maMonAn;
}
