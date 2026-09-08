import apis, { endpoints } from "./apis";

export const layDanhSachHoaDon = async () => {
  const res = await apis.get(endpoints.hoa_don);
  return res.data;
};

export const layChiTietHoaDon = async (id) => {
  const res = await apis.get(endpoints.chi_tiet_hoa_don(id));
  return res.data;
};

export const taoHoaDon = async (data) => {
  const res = await apis.post(endpoints.hoa_don, data);
  return res.data;
};

export const thanhToanHoaDon = async (maHoaDon) => {
  const res = await apis.post(endpoints.thanh_toan_hoa_don(maHoaDon));
  return res.data;
};

export const xoaHoaDon = async (maHoaDon) => {
  const res = await apis.delete(endpoints.xoa_hoa_don(maHoaDon));
  return res.data;
};

export const chinhSuaHoaDon = async (maHoaDon, data) => {
  const res = await apis.patch(endpoints.chi_tiet_hoa_don(maHoaDon), data);
  return res.data;
};
