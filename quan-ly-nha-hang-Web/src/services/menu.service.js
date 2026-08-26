import apis, { endpoints } from "./apis";
import { ANH } from "../assets/anh";

const DEFAULT_MENU_IMAGES = [ANH.monMenu1, ANH.monMenu2, ANH.monMenu3, ANH.monMenu4, ANH.monMenu5, ANH.monMenu6];

const normalizeMenuItem = (data, index, defaultCategory) => ({
  id: data.maMonAn ?? data.maMatHang ?? data.id ?? `item-${index}`,
  ten: data.tenMonAn ?? data.ten ?? data.tenMatHang ?? "Updating",
  moTa: data.moTa ?? "",
  gia: data.gia ?? data.donGia ?? data.giaMatHang ?? 0,
  anh: data.anh ?? data.hinhAnh ?? data.anhMinhHoa ?? DEFAULT_MENU_IMAGES[index % DEFAULT_MENU_IMAGES.length],
  nhom: data.nhom ?? data.loaiMon ?? data.loaiMatHang ?? data.danhMuc ?? defaultCategory,
});

const guessServiceIcon = (name) => {
  const normalizedName = name.toLowerCase();
  if (normalizedName.includes("hoa")) return "🌷";
  if (normalizedName.includes("bánh")) return "🎂";
  if (normalizedName.includes("rượu") || normalizedName.includes("vang")) return "🍷";
  if (normalizedName.includes("ảnh") || normalizedName.includes("chụp")) return "📸";
  return "✨";
};

const normalizeService = (data, index) => {
  const name = data.tenDichVu ?? data.ten ?? "Updating";
  return {
    id: data.maDichVu ?? data.id ?? `service-${index}`,
    ten: name,
    gia: data.gia ?? data.donGia ?? 0,
    bieuTuong: data.bieuTuong ?? guessServiceIcon(name),
  };
};

export const fetchMenuItems = async (branchId) => {
  try {
    const [menuResponse, drinkResponse] = await Promise.all([
      apis.get(endpoints.mon_an(branchId)),
      apis.get(endpoints.thuc_uong(branchId)),
    ]);
    const menuItems = (menuResponse.data || []).map((item, index) => normalizeMenuItem(item, index, "Main courses"));
    const drinks = (drinkResponse.data || []).map((item, index) => normalizeMenuItem(item, index, "Drinks"));
    const items = [...menuItems, ...drinks];
    return items;
  } catch (error) {
    console.error("Could not load menu items and drinks:", error);
    return [];
  }
};

export const fetchAdditionalServices = async (branchId) => {
  try {
    const response = await apis.get(endpoints.dich_vu(branchId));
    const services = (response.data || []).map((service, index) => normalizeService(service, index));
    return services;
  } catch (error) {
    console.error("Could not load additional services:", error);
    return [];
  }
};

export const fetchTimeSlots = async (branchId, date, guestCount) => {
  const response = await apis.get(endpoints.khung_gio(branchId, date, guestCount));
  return (response.data || []).map((slot) => ({
    gio: String(slot.gio).slice(0, 5),
    conCho: slot.conCho,
    trangThai: slot.coTheDat === false ? "het" : slot.conCho <= 2 ? "it" : "con",
  }));
};
