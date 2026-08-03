package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;

@Entity
public class NhanVien {
    @Id
    @Column
    private int maNhanVien;

    @MapsId
    @OneToOne
    private NguoiDung nguoiDung;


    @Column
    @ManyToOne
    private ChiNhanh chiNhanh;
}

//KhachHang(MaKH, #MaNguoiDung)
//NhanVien(MaNV, #MaNguoiDung, #MaChiNhanh)
//QuanLyChiNhanh(MaQL, #MaNguoiDung, #MaChiNhanh)
//QuanTriVien(MaQTV, #MaNguoiDung)
// Mấy bảng trên là bảng cha – con mới đúng 1-1, ví dụ:
//NhanVien(#MaNV, ChucVu, #MaChiNhanh)
//#MaNV vừa là khóa ngoại tham khảo tới NguoiDung.MaNguoiDung vừa là khóa chính.
// Nếu làm vậy khó thì em để như cũ. Như cũ thì là 1-n.