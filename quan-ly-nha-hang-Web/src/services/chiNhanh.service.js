import apis, { endpoints } from "./apis";
import { CHI_NHANH_MAU } from "../data/chiNhanh";

export const chuanHoaChiNhanh = (duLieu) => {
  if (!Array.isArray(duLieu)) return [];
  return duLieu.map((chiNhanh, viTri) => ({
    id: chiNhanh.maChiNhanh ?? chiNhanh.id ?? viTri + 1,
    ten: chiNhanh.tenChiNhanh ?? chiNhanh.ten ?? `Chi nhánh ${viTri + 1}`,
    diaChi: chiNhanh.diaChi ?? "Đang cập nhật địa chỉ",
    soDienThoai: chiNhanh.soDienThoai ?? "Đang cập nhật số điện thoại",
    soCho: chiNhanh.soCho ?? 0,
    anh: chiNhanh.anh ?? CHI_NHANH_MAU[viTri % CHI_NHANH_MAU.length].anh,
  }));
};

export const layDanhSachChiNhanh = async () => {
  const phanHoi = await apis.get(endpoints.chi_nhanh);
  return chuanHoaChiNhanh(phanHoi.data);
};
