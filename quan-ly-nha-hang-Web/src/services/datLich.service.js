import apis, { endpoints } from "./apis";

const STATUS_LABELS = {
  CHO_XAC_NHAN: "Chờ xác nhận",
  DA_XAC_NHAN: "Xác nhận",
  DANG_PHUC_VU: "Đang phục vụ",
  HOAN_TAT: "Hoàn thành",
  DA_HUY: "Đã huỷ",
  VANG_MAT: "Vắng mặt",
};

const normalizeBooking = (data) => {
  if (!data) return null;
  const rawStatus = data.trangThai ?? "CHO_XAC_NHAN";
  const displayStatus = STATUS_LABELS[rawStatus] || rawStatus;

  return {
    id: data.maDatLichCode ?? `BK-${data.maDatLich}`,
    maDatLichId: data.maDatLich,
    branch: data.tenChiNhanh ?? data.chiNhanh?.tenChiNhanh ?? "Quận 1",
    date: data.ngay ?? data.ngayDat ?? "",
    time: data.gio ? String(data.gio).slice(0, 5) : "",
    guests: data.soKhach ?? data.soLuongKhach ?? 2,
    customer: data.hoTen ?? data.tenKhachHang ?? "Khách hàng",
    phone: data.soDienThoai ?? "",
    email: data.email ?? "",
    dip: data.dip ?? "khong",
    dichVuBoSung: data.dichVuBoSung ?? [],
    status:
      displayStatus === "DA_XAC_NHAN" || displayStatus === "Xác nhận"
        ? "Xác nhận"
        : displayStatus === "DA_HUY" || displayStatus === "Đã huỷ"
          ? "Đã huỷ"
          : "Chờ xác nhận",
    rawTrangThai: rawStatus,
    note: data.ghiChu ?? "",
    table: data.soBan ?? "—",
    listDatTruoc: data.listDatTruoc ?? [],
  };
};

export const layDanhSachDatLich = async () => {
  try {
    const res = await apis.get(endpoints.dat_lich);
    return (res.data || []).map(normalizeBooking);
  } catch (error) {
    console.warn("Could not fetch bookings from API:", error);
    return [];
  }
};

export const taoDatLich = async (data) => {
  const res = await apis.post(endpoints.dat_lich, data);
  return res.data;
};

export const layDatLichTheoMa = async (bookingCode) => {
  const res = await apis.get(endpoints.tra_cuu_dat_lich(bookingCode));
  return normalizeBooking(res.data);
};

export const capNhatDatLich = async (id, data) => {
  const res = await apis.put(endpoints.cap_nhat_dat_lich(id), data);
  return normalizeBooking(res.data);
};

export const capNhatTrangThaiDatLich = async (maDatLich, trangThai, maBan) => {
  const res = await apis.patch(
    endpoints.cap_nhat_trang_thai_dat_lich(maDatLich),
    {
      trangThai,
      maBan,
    },
  );
  return normalizeBooking(res.data);
};

export const xoaDatLich = async (id) => {
  const res = await apis.delete(endpoints.xoa_dat_lich(id));
  return res.data;
};
