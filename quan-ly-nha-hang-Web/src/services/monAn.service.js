import apis, { endpoints } from "./apis";
import { ANH } from "../assets/anh";
import { DICH_VU_BO_SUNG, MON_AN } from "../data/datBan";

const ANH_MON_MAC_DINH = [
  ANH.monMenu1,
  ANH.monMenu2,
  ANH.monMenu3,
  ANH.monMenu4,
  ANH.monMenu5,
  ANH.monMenu6,
];

// Chuẩn hoá 1 món ăn/thức uống — field thật từ backend có thể khác tên,
// nên fallback qua nhiều khả năng. `nhomMacDinh` dùng khi backend không tự
// gắn nhóm (VD API /thuc-uong luôn chắc chắn là "Đồ uống", không cần hỏi lại).
const chuanHoaMonAn = (duLieu, viTri, nhomMacDinh) => ({
  id: duLieu.maMonAn ?? duLieu.maMatHang ?? duLieu.id ?? `mon-${viTri}`,
  ten: duLieu.tenMonAn ?? duLieu.ten ?? duLieu.tenMatHang ?? "Đang cập nhật",
  moTa: duLieu.moTa ?? "",
  gia: duLieu.gia ?? duLieu.donGia ?? 0,
  anh:
    duLieu.anh ??
    duLieu.hinhAnh ??
    ANH_MON_MAC_DINH[viTri % ANH_MON_MAC_DINH.length],
  nhom: duLieu.nhom ?? duLieu.loaiMon ?? duLieu.danhMuc ?? nhomMacDinh,
});

// Chuẩn hoá 1 dịch vụ bổ sung — biểu tượng (emoji) thường không có ở backend,
// đoán theo từ khoá trong tên, không khớp thì dùng icon mặc định.
const doanBieuTuong = (ten) => {
  const t = ten.toLowerCase();
  if (t.includes("hoa")) return "🌷";
  if (t.includes("bánh")) return "🎂";
  if (t.includes("rượu") || t.includes("vang")) return "🍷";
  if (t.includes("ảnh") || t.includes("chụp")) return "📸";
  return "✨";
};
const chuanHoaDichVu = (duLieu, viTri) => {
  const ten = duLieu.tenDichVu ?? duLieu.ten ?? "Đang cập nhật";
  return {
    id: duLieu.maDichVu ?? duLieu.id ?? `dv-${viTri}`,
    ten,
    gia: duLieu.gia ?? duLieu.donGia ?? 0,
    bieuTuong: duLieu.bieuTuong ?? doanBieuTuong(ten),
  };
};

export const layDanhSachMonAn = async (maChiNhanh) => {
  try {
    const [monAnRes, thucUongRes] = await Promise.all([
      apis.get(endpoints.mon_an(maChiNhanh)),
      apis.get(endpoints.thuc_uong(maChiNhanh)),
    ]);
    const monAn = (monAnRes.data || []).map((mon, i) =>
      chuanHoaMonAn(mon, i, "Món chính"),
    );
    const thucUong = (thucUongRes.data || []).map((mon, i) =>
      chuanHoaMonAn(mon, i, "Đồ uống"),
    );
    const ketQua = [...monAn, ...thucUong];
    return ketQua.length ? ketQua : MON_AN;
  } catch (error) {
    console.error("Không tải được danh sách món ăn/thức uống:", error);
    return MON_AN;
  }
};

export const layDanhSachDichVu = async (maChiNhanh) => {
  try {
    const res = await apis.get(endpoints.dich_vu(maChiNhanh));
    const ketQua = (res.data || []).map((dv, i) => chuanHoaDichVu(dv, i));
    return ketQua.length ? ketQua : DICH_VU_BO_SUNG;
  } catch (error) {
    console.error("Không tải được danh sách dịch vụ bổ sung:", error);
    return DICH_VU_BO_SUNG;
  }
};
