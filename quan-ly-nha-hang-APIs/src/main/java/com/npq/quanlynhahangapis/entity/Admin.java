package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    @Column
    private int maAdmin;

    @OneToOne
    @MapsId
    @JoinColumn(name = "ma_admin")
    private NguoiDung nguoiDung;
}
