package com.npq.quanlynhahangapis.entity;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class MaMonAnChiNhanh implements Serializable {
    private Integer chiNhanh;
    private Integer monAn;
}