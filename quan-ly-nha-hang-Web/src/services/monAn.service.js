import apis, { endpoints } from "./apis";
import { ANH } from "../assets/anh";

const DEFAULT_MENU_IMAGES = [
  ANH.monMenu1,
  ANH.monMenu2,
  ANH.monMenu3,
  ANH.monMenu4,
  ANH.monMenu5,
  ANH.monMenu6,
];

const normalizeMenuItem = (data, index, defaultCategory) => ({
  id: data.maMonAn ?? data.maMatHang ?? data.id ?? `item-${index}`,
  ten: data.tenMonAn ?? data.ten ?? data.tenMatHang ?? "Món ăn",
  moTa: data.moTa ?? "",
  gia: data.gia ?? data.donGia ?? data.giaMatHang ?? 0,
  anh:
    data.anh ??
    data.hinhAnh ??
    data.anhMinhHoa ??
    DEFAULT_MENU_IMAGES[index % DEFAULT_MENU_IMAGES.length],
  nhom:
    data.nhom ??
    data.loaiMon ??
    data.loaiMatHang ??
    data.danhMuc ??
    defaultCategory,
  trangThai: data.trangThai ?? "Đang bán",
});

const guessServiceIcon = (name) => {
  const normalizedName = name.toLowerCase();
  if (normalizedName.includes("hoa")) return "🌷";
  if (normalizedName.includes("bánh")) return "🎂";
  if (normalizedName.includes("rượu") || normalizedName.includes("vang"))
    return "🍷";
  if (normalizedName.includes("ảnh") || normalizedName.includes("chụp"))
    return "📸";
  return "✨";
};

const normalizeService = (data, index) => {
  const name = data.tenDichVu ?? data.ten ?? "Dịch vụ";
  return {
    id: data.maDichVu ?? data.maMatHang ?? data.id ?? `service-${index}`,
    ten: name,
    gia: data.gia ?? data.donGia ?? data.giaMatHang ?? 0,
    bieuTuong: data.bieuTuong ?? guessServiceIcon(name),
  };
};

export const layTatCaMonAn = async () => {
  try {
    const res = await apis.get(endpoints.foods);
    return (res.data || []).map((item, index) => ({
      id: item.maMatHang,
      name: item.tenMatHang,
      category: item.danhMuc || "Món chính",
      price: item.giaMatHang,
      status: item.trangThai || "Đang bán",
      image: item.anhMinhHoa || DEFAULT_MENU_IMAGES[index % DEFAULT_MENU_IMAGES.length],
      branch: "Quận 1",
    }));
  } catch (error) {
    console.warn("Could not fetch foods from API:", error);
    return [];
  }
};

export const layChiTietMonAn = async (id) => {
  const res = await apis.get(endpoints.chi_tiet_mon(id));
  return res.data;
};

export const taoMonAn = async (formData) => {
  const res = await apis.post(endpoints.foods, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const capNhatMonAn = async (id, formData) => {
  const res = await apis.put(endpoints.cap_nhat_mon(id), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const xoaMonAn = async (id) => {
  const res = await apis.delete(endpoints.xoa_mon(id));
  return res.data;
};

export const layDanhSachMonAn = async (branchId) => {
  try {
    const [menuResponse, drinkResponse] = await Promise.all([
      apis.get(endpoints.mon_an(branchId)),
      apis.get(endpoints.thuc_uong(branchId)),
    ]);
    const menuItems = (menuResponse.data || []).map((item, index) =>
      normalizeMenuItem(item, index, "Main courses"),
    );
    const drinks = (drinkResponse.data || []).map((item, index) =>
      normalizeMenuItem(item, index, "Drinks"),
    );
    return [...menuItems, ...drinks];
  } catch (error) {
    console.error("Could not load menu items and drinks:", error);
    return [];
  }
};

export const layDanhSachDichVuBoSung = async (branchId) => {
  try {
    const response = await apis.get(endpoints.dich_vu(branchId));
    const services = (response.data || []).map((service, index) =>
      normalizeService(service, index),
    );
    return services;
  } catch (error) {
    console.error("Could not load additional services:", error);
    return [];
  }
};

export const layKhungGio = async (branchId, date, guestCount) => {
  const response = await apis.get(
    endpoints.khung_gio(branchId, date, guestCount),
  );
  return (response.data || []).map((slot) => ({
    gio: String(slot.gio).slice(0, 5),
    conCho: slot.conCho,
    trangThai:
      slot.coTheDat === false ? "het" : slot.conCho <= 2 ? "it" : "con",
  }));
};
