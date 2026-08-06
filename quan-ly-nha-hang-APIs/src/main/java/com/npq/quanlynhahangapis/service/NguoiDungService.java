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

    public NguoiDungResponse dangKy(NguoiDungRequest dto) {
        //        String mk = dto.matKhau();
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
