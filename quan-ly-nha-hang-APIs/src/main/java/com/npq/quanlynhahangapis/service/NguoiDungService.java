package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.dto.response.NguoiDungResponse;
import com.npq.quanlynhahangapis.entity.NguoiDung;
import com.npq.quanlynhahangapis.repository.NguoiDungRepository;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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

    public NguoiDungResponse dangNhap(NguoiDungRequest dto) {
        NguoiDung nguoiDung = nguoiDungRepository.findByTaiKhoan(dto.taiKhoan())
                .orElseThrow(() -> new IllegalArgumentException("Tài khoản hoặc mật khẩu không chính xác!"));
        if (nguoiDung.getMatKhau().equals(dto.matKhau()))

            return chuyenSangDto();
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

    public boolean authentication(@NotBlank(message = "Tài khoản không được để trống!") String s, @NotBlank @Size(min = 8, message = "Mật khẩu tối thiểu 8 ký tự!") String s1) {
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
