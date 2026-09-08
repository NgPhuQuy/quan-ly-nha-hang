import apis, { endpoints } from "./apis";

export const layDanhSachChiNhanh = async () => {
  const chiNhanhs = await apis.get(endpoints.chi_nhanh);
  return chiNhanhs.data;
};

export const layChiTietChiNhanh = async (id) => {
  const res = await apis.get(endpoints.chi_tiet_chi_nhanh(id));
  return res.data;
};

export const taoChiNhanh = async (formData) => {
  const res = await apis.post(endpoints.chi_nhanh, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const capNhatChiNhanh = async (id, formData) => {
  const res = await apis.put(endpoints.cap_nhat_chi_nhanh(id), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const doiTrangThaiChiNhanh = async (id) => {
  const res = await apis.patch(endpoints.doi_trang_thai_chi_nhanh(id));
  return res.data;
};

export const layKhungGio = async (maChiNhanh, ngay) => {
  const res = await apis.get(endpoints.khung_gio(maChiNhanh, ngay));
  return res.data;
};