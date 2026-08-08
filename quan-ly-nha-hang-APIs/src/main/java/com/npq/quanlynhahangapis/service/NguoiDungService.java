package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DangNhapRequest;
import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.dto.response.DangNhapResponse;
import com.npq.quanlynhahangapis.dto.response.NguoiDungResponse;
import com.npq.quanlynhahangapis.entity.KhachHang;
import com.npq.quanlynhahangapis.entity.NguoiDung;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.*;
import com.npq.quanlynhahangapis.utils.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NguoiDungService {
    private final PasswordEncoder passwordEncoder;
    private final NguoiDungRepository nguoiDungRepository;
    private final AdminRepository adminRepository;
    private final QuanLyRepository quanLyRepository;
    private final KhachHangRepository khachHangRepository;
    private final NhanVienRepository nhanVienRepository;
    private final JwtUtil jwtUtil;

    public NguoiDungResponse layNguoiDungTheoId(int maNguoiDung) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(maNguoiDung)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return chuyenSangDto(nguoiDung);
    }
// tai sao 2 cai func nay lai tra ve 2 kieu du lieu khac nhau, muc dich la gi???
// func 1 la tra ve dto gui ra response
// func 2 la tra ve obj de service su dung de validate

    public NguoiDung layNguoiDungTheoTaiKhoan(String taiKhoan) {
        return nguoiDungRepository.findByTaiKhoan(taiKhoan)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    public NguoiDungResponse dangKy(@Valid NguoiDungRequest dto) {
        if (nguoiDungRepository.existsByTaiKhoan(dto.taiKhoan())) throw new AppException(ErrorCode.USER_EXISTED);
        if (nguoiDungRepository.existsByEmail(dto.email())) throw new AppException(ErrorCode.EMAIL_EXISTED);
        if (nguoiDungRepository.existsBySoDienThoai(dto.soDienThoai())) throw new AppException(ErrorCode.PHONE_EXISTED);

//         tai avatar len cloudinary TODO
//        if (dto.avatar())

        NguoiDung nguoiDung = NguoiDung.builder()
                .taiKhoan(dto.taiKhoan())
                .matKhau(passwordEncoder.encode(dto.matKhau()))
                .avatar(dto.avatar())
                .ho(dto.ho())
                .ten(dto.ten())
                .email(dto.email())
                .soDienThoai(dto.soDienThoai())
                .build();

        KhachHang khachHang = KhachHang.builder()
                .nguoiDung(nguoiDung)
                .build();

        khachHangRepository.save(khachHang);
        return chuyenSangDto(nguoiDungRepository.save(nguoiDung));
    }

    public DangNhapResponse dangNhap(@Valid DangNhapRequest dto) {
        if (this.authenticate(dto.taiKhoan(), dto.matKhau())) {
            NguoiDung nguoiDung = layNguoiDungTheoTaiKhoan(dto.taiKhoan());
            String token = jwtUtil.taoToken(
                    nguoiDung.getMaNguoiDung(),
                    nguoiDung.getTaiKhoan(),
                    this.layVaiTro(nguoiDung.getMaNguoiDung())
            );
            return DangNhapResponse.builder()
                    .token(token)
                    .build();
        }
        throw new AppException(ErrorCode.INVALID_CREDENTIALS);
    }

    public boolean authenticate(@Valid String taiKhoan, @Valid String matKhau) {
        NguoiDung nguoiDung = layNguoiDungTheoTaiKhoan(taiKhoan);
        return passwordEncoder.matches(nguoiDung.getMatKhau(), matKhau);
    }

    public String layVaiTro(Integer maNguoiDung) {
        if (adminRepository.existsById(maNguoiDung)) {
            return "ADMIN";
        } else if (quanLyRepository.existsById(maNguoiDung)) {
            return "QUANLY";
        } else if (nhanVienRepository.existsById(maNguoiDung)) {
            return "NHANVIEN";
        } else if (khachHangRepository.existsById(maNguoiDung)) {
            return "KHACHHANG";
        } else {
            throw new AppException(ErrorCode.ROLE_NOT_FOUND);
        }
    }

    private NguoiDungResponse chuyenSangDto(NguoiDung nguoiDung) {
        return NguoiDungResponse.builder()
                .maNguoiDung(nguoiDung.getMaNguoiDung())
                .taiKhoan(nguoiDung.getTaiKhoan())
                .avatar(nguoiDung.getAvatar())
                .ho(nguoiDung.getHo())
                .ten(nguoiDung.getTen())
                .email(nguoiDung.getEmail())
                .soDienThoai(nguoiDung.getSoDienThoai())
                .trangThai(nguoiDung.getTrangThai())
                .build();

    }

}
