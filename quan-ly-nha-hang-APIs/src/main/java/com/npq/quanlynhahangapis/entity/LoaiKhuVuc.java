package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoaiKhuVuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maLoaiKhuVuc;
    private String tenLoaiKhuVuc;

    @OneToMany(mappedBy = "loaiKhuVuc")
    private List<KhuVuc> listKhuVuc;
}
