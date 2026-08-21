package com.npq.quanlynhahangapis.entity.PK;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class MaDatTruoc implements Serializable {
    private Integer datLich;
    private Integer matHang;
}