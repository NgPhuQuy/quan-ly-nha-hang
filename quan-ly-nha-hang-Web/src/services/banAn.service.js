import apis, { endpoints } from "./apis";

export const layDanhSachBan = async (maChiNhanh) => {
  const endpoint = maChiNhanh
    ? endpoints.danh_sach_ban_chi_nhanh(maChiNhanh)
    : endpoints.ban;
  const res = await apis.get(endpoint);
  return res.data;
};

export const layChiTietBan = async (id) => {
  const res = await apis.get(endpoints.chi_tiet_ban(id));
  return res.data;
};

export const taoBan = async (data) => {
  const res = await apis.post(endpoints.ban, data);
  return res.data;
};

export const doiTrangThaiBan = async (id) => {
  const res = await apis.patch(endpoints.doi_trang_thai_ban(id));
  return res.data;
};