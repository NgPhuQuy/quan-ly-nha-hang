import apis, { endpoints } from "./apis";

export const layDanhSachKhachHang = async (keyword) => {
  try {
    const params = keyword ? { keyword } : {};
    const res = await apis.get(endpoints.customers, { params });
    return (res.data || []).map((c) => ({
      // Thuần Việt chuẩn BE DTO
      maKhachHang: c.maKhachHang,
      hoTen: c.hoTen || "Khách hàng",
      soDienThoai: c.soDienThoai || "",
      email: c.email || "",
      diemTichLuy: c.diemTichLuy || 0,
      soDon: c.soDon || 0,
      tongChiTieu: Number(c.tongChiTieu || 0),
      lanCuoiGhe: c.lanCuoiGhe || "—",

      // Aliases tương thích UI
      id: `c${c.maKhachHang}`,
      maKhachHangId: c.maKhachHang,
      name: c.hoTen || "Khách hàng",
      phone: c.soDienThoai || "",
      totalOrders: c.soDon || 0,
      totalSpent: Number(c.tongChiTieu || 0),
      lastVisit: c.lanCuoiGhe || "—",
    }));
  } catch (error) {
    console.warn("Could not fetch customers from API:", error);
    return [];
  }
};

export const layChiTietKhachHang = async (id) => {
  const res = await apis.get(endpoints.chi_tiet_khach_hang(id));
  return res.data;
};
