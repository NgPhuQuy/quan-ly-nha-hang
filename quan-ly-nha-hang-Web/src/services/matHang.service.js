import apis, { endpoints } from "./apis";

export const layDanhSachMatHangTaiChiNhanh = async (maChiNhanh) => {
  const res = await apis.get(endpoints.mat_hang_theo_chi_nhanh(maChiNhanh));
  return res.data;
};

export const layChiTietMonAn = async (id) => {
  const res = await apis.get(endpoints.chi_tiet_mon(id));
  return res.data;
};

export const taoMonAn = async (formData) => {
  const res = await apis.post(endpoints.foods, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const capNhatMonAn = async (id, formData) => {
  const res = await apis.put(endpoints.cap_nhat_mon(id), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const layDanhSachMonAn = async (maChiNhanh) => {
  const res = await apis.get(endpoints.mon_an(maChiNhanh));
  return res.data;
};

export const layDanhSachDichVu = async (maChiNhanh) => {
  const res = await apis.get(endpoints.dich_vu(maChiNhanh));
  return res.data;
};