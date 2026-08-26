import apis, { endpoints } from "./apis";

export const apiDatLich = async (duLieu) => {
  const res = await apis.post(endpoints.dat_lich, duLieu);
  return res.data;
};

// Chuẩn hoá field trả về từ backend — tên field thật có thể khác tuỳ module,
// nên fallback qua nhiều khả năng thay vì assume cứng 1 tên duy nhất.
const chuanHoaKetQuaTraCuu = (duLieu) => ({
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

apiDatLich.getChiTietDatLich = async (maDatLich) => {
  const res = await apis.get(endpoints.chi_tiet_dat_lich(maDatLich));
  return chuanHoaKetQuaTraCuu(res.data);
};
