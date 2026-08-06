package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.dto.response.NguoiDungResponse;
import com.npq.quanlynhahangapis.entity.NguoiDung;
import com.npq.quanlynhahangapis.repository.NguoiDungRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NguoiDungService {
    private final NguoiDungRepository nguoiDungRepository;

    public NguoiDungService(NguoiDungRepository nguoiDungRepository) {
        this.nguoiDungRepository = nguoiDungRepository;
    }

    public List<NguoiDungResponse> layDanhSachNguoiDung() {
        return nguoiDungRepository.findAll().stream().map(this::chuyenSangDto).toList();
    }

    public NguoiDungResponse layNguoiDungTheoId(int maNguoiDung) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(maNguoiDung)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy người dùng"));
        return chuyenSangDto(nguoiDung);
    }

    public NguoiDungResponse dangKy(@Valid NguoiDungRequest dto) {
        // validate tai khoan
        if (nguoiDungRepository.existsByTaiKhoan(dto.taiKhoan())) {
            throw new IllegalArgumentException("Tài khoản này đã được đăng ký!");
        }

        // tai avatar len cloudinary TODO
//        if (dto.avatar())

        //impl JWT va encode mat khau TODO
        //        String mk = dto.matKhau();

        if (nguoiDungRepository.existsByEmail(dto.email())) {
            throw new IllegalArgumentException("Email này đã được đăng ký!");
        }

        if (nguoiDungRepository.existsBySoDienThoai(dto.soDienThoai())) {
            throw new IllegalArgumentException("Số điện thoại này đã được đăng ký!");
        }

        NguoiDung nguoiDung = NguoiDung.builder()
                .taiKhoan(dto.taiKhoan())
                .matKhau(dto.matKhau())
                .avatar(dto.avatar())
                .ho(dto.ho())
                .ten(dto.ten())
                .email(dto.email())
                .soDienThoai(dto.soDienThoai())
                .build();

        return chuyenSangDto(nguoiDungRepository.save(nguoiDung));
    }

    public boolean authenticate(@Valid String taiKhoan, @Valid String matKhau) {
        NguoiDung nguoiDung = nguoiDungRepository.findByTaiKhoan(taiKhoan)
                .orElseThrow(() -> new IllegalArgumentException("Tài khoản hoặc mật khẩu không chính xác!"));
        return nguoiDung.getMatKhau().equals(matKhau);
    }

    private NguoiDungResponse chuyenSangDto(NguoiDung nguoiDung) {
        return new NguoiDungResponse(
                nguoiDung.getMaNguoiDung(),
                nguoiDung.getTaiKhoan(),
                nguoiDung.getAvatar(),
                nguoiDung.getHo(),
                nguoiDung.getTen(),
                nguoiDung.getEmail(),
                nguoiDung.getSoDienThoai(),
                nguoiDung.getNgayTao(),
                nguoiDung.getNgayCapNhat(),
                nguoiDung.getTrangThai()
        );
    }


}
