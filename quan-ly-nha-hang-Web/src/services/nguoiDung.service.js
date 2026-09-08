import apis, { endpoints } from "./apis";

export const layDanhSachNguoiDung = async () => {
  const res = await apis.get(endpoints.users);
  return res.data;
};

export const thongTinCuaToi = async () => {
  const res = await apis.get(endpoints.thong_tin_cua_toi);
  return res.data;
};

export const layChiTietNguoiDung = async (id) => {
  const res = await apis.get(endpoints.chi_tiet_nguoi_dung(id));
  return res.data;
};

export const doiTrangThaiNguoiDung = async (id) => {
  const res = await apis.patch(endpoints.doi_trang_thai_nguoi_dung(id));
  return res.data;
};