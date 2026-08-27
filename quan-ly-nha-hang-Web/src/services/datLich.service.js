import apis, { endpoints } from "./apis";

// Chuẩn hoá field trả về từ backend — tên field thật có thể khác tuỳ module,
// nên fallback qua nhiều khả năng thay vì assume cứng 1 tên duy nhất.
const normalizeBooking = (data) => ({
  maDatLich: data.maDatLich ?? data.maDatBan ?? "",
  tenChiNhanh: data.tenChiNhanh ?? data.chiNhanh?.tenChiNhanh ?? "Updating",
  ngay: data.ngay ?? data.ngayDat ?? "",
  gio: data.gio ?? data.gioDat ?? "",
  soKhach: data.soKhach ?? data.soLuongKhach ?? "",
  hoTen: data.hoTen ?? data.tenKhachHang ?? "",
  soDienThoai: data.soDienThoai ?? "",
  trangThai: data.trangThai ?? "Confirmed",
  ghiChu: data.ghiChu ?? "",
});

export const taoDatLich = async (data) => {
  const res = await apis.post(endpoints.dat_lich, data);
  return res.data;
};

export const layDatLichTheoMa = async (bookingCode) => {
  const res = await apis.get(endpoints.chi_tiet_dat_lich(bookingCode));
  return normalizeBooking(res.data);
};
