import apis, { endpoints } from "./apis";

export const layDanhSachHoaDon = async (params = {}) => {
  try {
    const res = await apis.get(endpoints.invoices, { params });
    return (res.data || []).map((h) => ({
      id: h.maHoaDonCode || `HD-${h.maHoaDon}`,
      maHoaDonId: h.maHoaDon,
      createdAt: h.thoiGianDinhDang || "2025-01-15 12:00",
      source: h.nguon || "WALK_IN",
      status: h.trangThai || "Hoàn thành",
      branch: h.tenChiNhanh || "Quận 1",
      table: h.soBan || "—",
      customer: h.tenKhachHang || "Khách vãng lai",
      phone: h.soDienThoai || "",
      total: Number(h.tongTien || 0),
      items: (h.items || []).map((item) => ({
        foodId: item.maMatHang,
        name: item.tenMatHang,
        unitPrice: Number(item.donGia || 0),
        quantity: item.soLuong || 1,
      })),
    }));
  } catch (error) {
    console.warn("Could not fetch invoices from API:", error);
    return [];
  }
};

export const layChiTietHoaDon = async (idOrCode) => {
  try {
    const res = await apis.get(endpoints.chi_tiet_hoa_don(idOrCode));
    const h = res.data;
    if (!h) return null;
    return {
      id: h.maHoaDonCode || `HD-${h.maHoaDon}`,
      maHoaDonId: h.maHoaDon,
      createdAt: h.thoiGianDinhDang || "2025-01-15 12:00",
      source: h.nguon || "WALK_IN",
      status: h.trangThai || "Hoàn thành",
      branch: h.tenChiNhanh || "Quận 1",
      table: h.soBan || "—",
      customer: h.tenKhachHang || "Khách vãng lai",
      phone: h.soDienThoai || "",
      total: Number(h.tongTien || 0),
      items: (h.items || []).map((item) => ({
        foodId: item.maMatHang,
        name: item.tenMatHang,
        unitPrice: Number(item.donGia || 0),
        quantity: item.soLuong || 1,
      })),
    };
  } catch (error) {
    console.warn("Could not fetch invoice detail from API:", error);
    return null;
  }
};

export const taoHoaDon = async (data) => {
  const res = await apis.post(endpoints.invoices, data);
  return res.data;
};

export const thanhToanHoaDon = async (maHoaDon) => {
  const res = await apis.post(endpoints.thanh_toan_hoa_don(maHoaDon));
  return res.data;
};

export const huyHoaDon = async (maHoaDon) => {
  const res = await apis.post(endpoints.huy_hoa_don(maHoaDon));
  return res.data;
};

export const xoaHoaDon = async (maHoaDon) => {
  const res = await apis.delete(endpoints.xoa_hoa_don(maHoaDon));
  return res.data;
};
