import apis, { endpoints } from "./apis";

export const layDanhSachNguoiDung = async () => {
  try {
    const res = await apis.get(endpoints.users);
    return res.data.map((u) => ({
      maNguoiDung: u.maNguoiDung,
      taiKhoan: u.taiKhoan,
      ho: u.ho,
      Ten: u.ten,
      email: u.email,
      soDienThoai: u.soDienThoai,
      vaiTro: u.vaiTro,
      trangThai: u.trangThai,
      ngayTao: u.ngayTao,
      ngayCapNhat: u.ngayCapNhat,
    }));
  } catch (error) {
    return error;
  }
};

export const thongTinCuaToi = async () => {
  try {
    const res = await apis.get(endpoints.auth_me);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const layChiTietNguoiDung = async (id) => {
  try {
  const res = await apis.get(endpoints.chi_tiet_nguoi_dung(id));
  return res.data;
  } catch (error) {
    return error;
  }
};

export const doiTrangThaiNguoiDung = async (id) => {
  try {
    const res = await apis.patch(endpoints.doi_trang_thai_nguoi_dung(id));
    return res.data;
  } catch (error) {
    return error;
  }
};