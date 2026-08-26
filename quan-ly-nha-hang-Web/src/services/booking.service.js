import apis, { endpoints } from "./apis";

// Chuẩn hoá field trả về từ backend — tên field thật có thể khác tuỳ module,
// nên fallback qua nhiều khả năng thay vì assume cứng 1 tên duy nhất.
const normalizeBooking = (data) => ({
  maDatLich: duLieu.maDatLich ?? duLieu.maDatBan ?? "",
  tenChiNhanh: duLieu.tenChiNhanh ?? duLieu.chiNhanh?.tenChiNhanh ?? "Đang cập nhật",
  ngay: duLieu.ngay ?? duLieu.ngayDat ?? "",
  gio: duLieu.gio ?? duLieu.gioDat ?? "",
  soKhach: duLieu.soKhach ?? duLieu.soLuongKhach ?? "",
  hoTen: duLieu.hoTen ?? duLieu.tenKhachHang ?? "",
  soDienThoai: duLieu.soDienThoai ?? "",
  trangThai: duLieu.trangThai ?? "Đã xác nhận",
  ghiChu: duLieu.ghiChu ?? "",
});

export const createBooking = async (data) => {
  const res = await apis.post(endpoints.dat_lich, data);
  return res.data;
};

export const fetchBookingByCode = async (bookingCode) => {
  const res = await apis.get(endpoints.chi_tiet_dat_lich(bookingCode));
  return normalizeBooking(res.data);
};
