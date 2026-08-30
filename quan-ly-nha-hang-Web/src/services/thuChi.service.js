import apis, { endpoints } from "./apis";

export const layDanhSachThuChi = async (params = {}) => {
  try {
    const res = await apis.get(endpoints.transactions, { params });
    return (res.data || []).map((t) => ({
      // Thuần Việt chuẩn BE DTO
      maGiaoDich: t.maGiaoDich,
      maGiaoDichCode: t.maGiaoDichCode || `TC-${t.maGiaoDich}`,
      ngayGiaoDich: t.ngayGiaoDich
        ? String(t.ngayGiaoDich).slice(0, 10)
        : "2025-01-15",
      loai: t.loai || "Thu",
      danhMuc: t.danhMuc || "Doanh thu bán hàng",
      moTa: t.moTa || "",
      soTien: Number(t.soTien || 0),
      maChiNhanh: t.maChiNhanh,
      tenChiNhanh: t.tenChiNhanh || "Quận 1",
      ghiChu: t.ghiChu || "",

      // Aliases tương thích UI
      id: t.maGiaoDichCode || `TC-${t.maGiaoDich}`,
      maGiaoDichId: t.maGiaoDich,
      date: t.ngayGiaoDich ? String(t.ngayGiaoDich).slice(0, 10) : "2025-01-15",
      type: t.loai || "Thu",
      category: t.danhMuc || "Doanh thu bán hàng",
      description: t.moTa || "",
      amount: Number(t.soTien || 0),
      branch: t.tenChiNhanh || "Quận 1",
      note: t.ghiChu || "",
    }));
  } catch (error) {
    console.warn("Could not fetch transactions from API:", error);
    return [];
  }
};

export const taoThuChi = async (data) => {
  const res = await apis.post(endpoints.transactions, data);
  return res.data;
};

export const xoaThuChi = async (id) => {
  const res = await apis.delete(endpoints.xoa_giao_dich(id));
  return res.data;
};
