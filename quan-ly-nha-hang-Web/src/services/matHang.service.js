import apis, { endpoints } from "./apis";
import { KHUNG_GIO } from "../data/datBan";

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
  try {
    const response = await apis.get(
      endpoints.khung_gio(branchId, date, guestCount),
    );
    const slotsFromApi = response.data || [];
    const apiMap = new Map();
    slotsFromApi.forEach((s) => {
      const g = String(s.gio).slice(0, 5);
      apiMap.set(g, Number(s.soLuongConLai));
    });

    // Gom danh sách khung giờ từ KHUNG_GIO chuẩn và các giờ từ API (nếu có)
    const allGios = Array.from(
      new Set([...KHUNG_GIO.map((k) => k.gio), ...apiMap.keys()]),
    ).sort();

    return allGios.map((gio) => {
      // Mặc định mỗi chi nhánh có 50 đơn có thể đặt
      const soLuongConLai = apiMap.has(gio) ? apiMap.get(gio) : 50;
      let trangThai = "con";
      if (soLuongConLai <= 0) {
        trangThai = "het";
      } else if (soLuongConLai <= 15) {
        trangThai = "it";
      }

      return {
        gio,
        soLuongConLai,
        conCho: soLuongConLai,
        trangThai,
      };
    });
  } catch (error) {
    console.error("Could not load time slots:", error);
    return KHUNG_GIO.map((k) => ({
      gio: k.gio,
      soLuongConLai: 50,
      conCho: 50,
      trangThai: "con",
    }));
  }
};
