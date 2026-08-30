import apis, { endpoints } from "./apis";
import { ANH } from "../assets/anh";

const DEFAULT_BRANCH_IMAGES = [ANH.chiNhanh1, ANH.chiNhanh2, ANH.chiNhanh3];

export const layDanhSachChiNhanh = async (tatCa = false) => {
  try {
    const res = await apis.get(
      tatCa ? endpoints.chi_nhanh_all : endpoints.chi_nhanh,
    );
    const list = res.data || [];
    return list.map((b, idx) => ({
      ...b,
      maChiNhanh: b.maChiNhanh ?? b.id ?? idx + 1,
      id: b.maChiNhanh ?? b.id ?? idx + 1,
      tenChiNhanh: b.tenChiNhanh ?? b.ten ?? "5S Dining",
      ten: b.tenChiNhanh ?? b.ten ?? "5S Dining",
      name: b.tenChiNhanh ?? b.ten ?? "5S Dining",
      diaChi: b.diaChi ?? "TP. Hồ Chí Minh",
      address: b.diaChi ?? "TP. Hồ Chí Minh",
      soDienThoai: b.soDienThoai ?? "028 3822 9999",
      phone: b.soDienThoai ?? "028 3822 9999",
      sucChua: b.sucChua ?? 50,
      anhChiNhanh:
        b.anhChiNhanh ||
        b.hinhAnh ||
        b.anh ||
        DEFAULT_BRANCH_IMAGES[idx % DEFAULT_BRANCH_IMAGES.length],
      anh:
        b.anhChiNhanh ||
        b.hinhAnh ||
        b.anh ||
        DEFAULT_BRANCH_IMAGES[idx % DEFAULT_BRANCH_IMAGES.length],
      image:
        b.anhChiNhanh ||
        b.hinhAnh ||
        b.anh ||
        DEFAULT_BRANCH_IMAGES[idx % DEFAULT_BRANCH_IMAGES.length],
    }));
  } catch (error) {
    console.warn("Could not fetch branches from API, using fallback:", error);
    return [];
  }
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

export const xoaChiNhanh = async (id) => {
  const res = await apis.delete(endpoints.xoa_chi_nhanh(id));
  return res.data;
};
