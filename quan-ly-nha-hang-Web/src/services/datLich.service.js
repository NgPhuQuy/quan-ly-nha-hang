import apis, { endpoints } from "./apis";

export const layDanhSachDatLich = async () => {
  const res = await apis.get(endpoints.dat_lich);
  return res.data;
};

export const taoDatLich = async (data) => {
  const res = await apis.post(endpoints.dat_lich, data);
  return res.data;
};

export const danhSachDatLichCuaToi = async () => {
  const res = await apis.get(endpoints.danh_sach_dat_lich_cua_toi);
  return res.data;
};

export const capNhatDatLich = async (id, data) => {
  const res = await apis.put(endpoints.cap_nhat_dat_lich(id), data);
  return res.data;
};

export const capNhatTrangThaiDatLich = async (maDatLich, trangThai, maBan) => {
  const res = await apis.patch(
    endpoints.cap_nhat_trang_thai_dat_lich(maDatLich),
    { trangThai, maBan },
  );
  return res.data;
};

export const huyDatLich = async (maDatLich) => {
  const res = await apis.patch(endpoints.huy_dat_lich(maDatLich));
  return res.data;
}