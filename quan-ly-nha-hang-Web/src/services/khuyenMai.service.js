import apis, { endpoints } from "./apis";

export const layDanhSachKhuyenMai = async (trangThai) => {
  try {
    const params = trangThai ? { trangThai } : {};
    const res = await apis.get(endpoints.promotions, { params });
    return (res.data || []).map((p) => ({
      id: `p${p.maKhuyenMai}`,
      maKhuyenMaiId: p.maKhuyenMai,
      name: p.tenKhuyenMai,
      type: p.loaiKhuyenMai || "Giảm %",
      value: p.giaTri || "10%",
      startDate: p.ngayBatDau
        ? String(p.ngayBatDau).slice(0, 10)
        : "2025-01-01",
      endDate: p.ngayKetThuc
        ? String(p.ngayKetThuc).slice(0, 10)
        : "2025-01-31",
      status: p.trangThai || "Đang chạy",
      usedCount: p.soLuotDung || 0,
    }));
  } catch (error) {
    console.warn("Could not fetch promotions from API:", error);
    return [];
  }
};

export const taoKhuyenMai = async (data) => {
  const res = await apis.post(endpoints.promotions, data);
  return res.data;
};

export const capNhatKhuyenMai = async (id, data) => {
  const res = await apis.put(endpoints.cap_nhat_khuyen_mai(id), data);
  return res.data;
};

export const doiTrangThaiKhuyenMai = async (id, trangThai) => {
  const res = await apis.patch(endpoints.doi_trang_thai_khuyen_mai(id), {
    trangThai,
  });
  return res.data;
};

export const xoaKhuyenMai = async (id) => {
  const res = await apis.delete(endpoints.xoa_khuyen_mai(id));
  return res.data;
};
