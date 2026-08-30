import apis, { endpoints } from "./apis";

export const layDanhSachNguoiDung = async () => {
  try {
    const res = await apis.get(endpoints.users);
    return (res.data || []).map((u) => ({
      id: `u${u.maNguoiDung}`,
      maNguoiDungId: u.maNguoiDung,
      name: u.hoTen || u.taiKhoan || "Người dùng",
      email: u.email || "—",
      role: u.vaiTro || "Nhân viên",
      branch: u.chiNhanh || "Quận 1",
      status: u.trangThai ? "Hoạt động" : "Vô hiệu",
      joinDate: u.ngayTao ? String(u.ngayTao).slice(0, 10) : "2024-03-01",
    }));
  } catch (error) {
    console.warn("Could not fetch users from API:", error);
    return [];
  }
};

export const layChiTietNguoiDung = async (id) => {
  const res = await apis.get(endpoints.chi_tiet_nguoi_dung(id));
  return res.data;
};

export const taoNguoiDung = async (data) => {
  const res = await apis.post(endpoints.register, data);
  return res.data;
};

export const capNhatNguoiDung = async (id, data) => {
  const res = await apis.put(endpoints.cap_nhat_nguoi_dung(id), data);
  return res.data;
};

export const doiTrangThaiNguoiDung = async (id) => {
  const res = await apis.patch(endpoints.doi_trang_thai_nguoi_dung(id));
  return res.data;
};

export const xoaNguoiDung = async (id) => {
  const res = await apis.delete(endpoints.xoa_nguoi_dung(id));
  return res.data;
};

