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

const normalizeMenuItem = (data, index, defaultCategory = "Món chính") => {
  const rawId = data.maMatHang ?? data.maMonAn ?? data.id ?? `item-${index}`;
  const rawTen =
    data.tenMatHang ?? data.tenMonAn ?? data.ten ?? data.name ?? "Món ăn";
  const rawGia = Number(
    data.giaMatHang ?? data.gia ?? data.donGia ?? data.price ?? 0,
  );
  const rawNhom =
    data.danhMuc ||
    data.nhom ||
    data.category ||
    (data.loaiMatHang === "THUC_UONG"
      ? "Đồ uống"
      : data.loaiMatHang === "DICH_VU"
        ? "Dịch vụ"
        : defaultCategory);

  const rawAnh =
    data.anhMinhHoa ||
    data.anh ||
    data.hinhAnh ||
    data.image ||
    DEFAULT_MENU_IMAGES[index % DEFAULT_MENU_IMAGES.length];

  const rawLoai =
    data.loaiMatHang ||
    (data.danhMuc === "Đồ uống" || data.category === "Đồ uống" || data.nhom === "Đồ uống"
      ? "THUC_UONG"
      : data.danhMuc === "Dịch vụ" || data.category === "Dịch vụ" || data.nhom === "Dịch vụ"
        ? "DICH_VU"
        : "MON_AN");

  return {
    id: rawId,
    maMatHang: rawId,
    ten: rawTen,
    name: rawTen,
    tenMatHang: rawTen,
    moTa: data.moTa ?? data.description ?? "",
    gia: rawGia,
    price: rawGia,
    giaMatHang: rawGia,
    loaiMatHang: rawLoai,
    anh: rawAnh,
    image: rawAnh,
    anhMinhHoa: rawAnh,
    nhom: rawNhom,
    category: rawNhom,
    danhMuc: rawNhom,
    trangThai: data.trangThai ?? data.status ?? "Đang bán",
    status: data.trangThai ?? data.status ?? "Đang bán",
    branch: "Quận 1",
  };
};

const guessServiceIcon = (name) => {
  const normalizedName = (name || "").toLowerCase();
  if (normalizedName.includes("hoa")) return "🌷";
  if (normalizedName.includes("bánh")) return "🎂";
  if (normalizedName.includes("rượu") || normalizedName.includes("vang"))
    return "🍷";
  if (normalizedName.includes("ảnh") || normalizedName.includes("chụp"))
    return "📸";
  return "✨";
};

const normalizeService = (data, index) => {
  const name = data.tenDichVu ?? data.tenMatHang ?? data.ten ?? "Dịch vụ";
  const rawGia = Number(
    data.gia ?? data.donGia ?? data.giaMatHang ?? data.price ?? 0,
  );
  return {
    id: data.maDichVu ?? data.maMatHang ?? data.id ?? `service-${index}`,
    ten: name,
    gia: rawGia,
    bieuTuong: data.bieuTuong ?? guessServiceIcon(name),
  };
};

export const layTatCaMonAn = async () => {
  try {
    const res = await apis.get(endpoints.foods);
    return (res.data || []).map((item, index) =>
      normalizeMenuItem(item, index, "Món chính"),
    );
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
