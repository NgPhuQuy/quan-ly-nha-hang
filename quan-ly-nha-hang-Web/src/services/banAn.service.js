import apis, { endpoints } from "./apis";

export const layDanhSachBan = async (maChiNhanh, trangThai) => {
  try {
    const params = {};
    if (maChiNhanh) params.maChiNhanh = maChiNhanh;
    if (trangThai) params.trangThai = trangThai;

    const res = await apis.get(endpoints.tables, { params });
    return res.data || [];
  } catch (error) {
    console.warn("Could not fetch tables from API:", error);
    return [];
  }
};

export const layChiTietBan = async (id) => {
  const res = await apis.get(endpoints.chi_tiet_ban(id));
  return res.data;
};

export const taoBan = async (data) => {
  const res = await apis.post(endpoints.tables, data);
  return res.data;
};

export const capNhatBan = async (id, data) => {
  const res = await apis.put(endpoints.cap_nhat_ban(id), data);
  return res.data;
};

export const doiTrangThaiBan = async (id, trangThai) => {
  const res = await apis.patch(endpoints.doi_trang_thai_ban(id), { trangThai });
  return res.data;
};

export const xoaBan = async (id) => {
  const res = await apis.delete(endpoints.xoa_ban(id));
  return res.data;
};
