package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DangNhapRequest;
import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.dto.response.DangNhapResponse;
import com.npq.quanlynhahangapis.dto.response.NguoiDungResponse;
import com.npq.quanlynhahangapis.entity.NguoiDung;
import com.npq.quanlynhahangapis.entity.enums.VaiTro;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.NguoiDungRepository;
import com.npq.quanlynhahangapis.utils.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NguoiDungService {
    private final PasswordEncoder passwordEncoder;
    private final NguoiDungRepository nguoiDungRepository;
    private final JwtUtil jwtUtil;

    public NguoiDung layNguoiDungTheoId(int maNguoiDung) {
        return nguoiDungRepository.findById(maNguoiDung)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    private NguoiDung layNguoiDungTheoTaiKhoan(String taiKhoan) {
        return nguoiDungRepository.findByTaiKhoan(taiKhoan)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    public List<NguoiDungResponse> layDSNguoiDung() {
        return nguoiDungRepository.findAll().stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public NguoiDungResponse chiTietNguoiDung(int maNguoiDung) {
        NguoiDung nguoiDung = layNguoiDungTheoId(maNguoiDung);
        return chuyenSangDto(nguoiDung);
    }

    @Transactional
    public NguoiDungResponse dangKy(NguoiDungRequest request) {
        NguoiDung nguoiDung = taoNguoiDung(request);
        return chuyenSangDto(nguoiDung);
    }

    @Transactional
    public NguoiDungResponse taoQuanLy(NguoiDungRequest request) {
        NguoiDung ql = taoNguoiDung(request);
        ql.setVaiTro(VaiTro.QUAN_LY);
        return chuyenSangDto(nguoiDungRepository.save(ql));
    }

    public NguoiDung taoNguoiDung(NguoiDungRequest request) {
        if (nguoiDungRepository.existsByTaiKhoan(request.taiKhoan()))
            throw new AppException(ErrorCode.USER_EXISTED);

        if (nguoiDungRepository.existsByEmail(request.email()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);

        if (nguoiDungRepository.existsBySoDienThoai(request.soDienThoai()))
            throw new AppException(ErrorCode.PHONE_EXISTED);

        NguoiDung nguoiDung = NguoiDung.builder()
                .taiKhoan(request.taiKhoan())
                .matKhau(passwordEncoder.encode(request.matKhau()))
                .ho(request.ho())
                .ten(request.ten())
                .email(request.email())
                .soDienThoai(request.soDienThoai())
                .build();
        nguoiDungRepository.save(nguoiDung);
        return nguoiDungRepository.save(nguoiDung);
    }

    public DangNhapResponse dangNhap(@Valid DangNhapRequest dto) {
        if (this.authenticate(dto.taiKhoan(), dto.matKhau())) {
            NguoiDung nguoiDung = layNguoiDungTheoTaiKhoan(dto.taiKhoan());
            String token = jwtUtil.taoToken(
                    nguoiDung.getMaNguoiDung(),
                    nguoiDung.getTaiKhoan(),
                    nguoiDung.getVaiTro()
            );
            return DangNhapResponse.builder()
                    .token(token)
                    .build();
        }
        throw new AppException(ErrorCode.INVALID_CREDENTIALS);
    }

    private boolean authenticate(String taiKhoan, String matKhau) {
        NguoiDung nguoiDung = layNguoiDungTheoTaiKhoan(taiKhoan);
        return passwordEncoder.matches(matKhau, nguoiDung.getMatKhau());
    }

    private NguoiDungResponse chuyenSangDto(NguoiDung nguoiDung) {
        return NguoiDungResponse.builder()
                .maNguoiDung(nguoiDung.getMaNguoiDung())
                .taiKhoan(nguoiDung.getTaiKhoan())
                .ho(nguoiDung.getHo())
                .ten(nguoiDung.getTen())
                .email(nguoiDung.getEmail())
                .soDienThoai(nguoiDung.getSoDienThoai())
                .vaiTro(nguoiDung.getVaiTro())
                .ngayTao(nguoiDung.getNgayTao())
                .ngayCapNhat(nguoiDung.getNgayCapNhat())
                .trangThai(nguoiDung.getTrangThai())
                .build();
    }

    @Transactional
    public NguoiDungResponse doiTrangThaiNguoiDung(Integer maNguoiDung) {
        NguoiDung nguoiDung = layNguoiDungTheoId(maNguoiDung);
        nguoiDung.setTrangThai(!nguoiDung.getTrangThai());
        return chuyenSangDto(nguoiDungRepository.save(nguoiDung));
    }

    public NguoiDung layNguoiDungTheoSDT(String soDienThoai) {
        return nguoiDungRepository.findBySoDienThoai(soDienThoai)
                .orElse(null);
    }
}
