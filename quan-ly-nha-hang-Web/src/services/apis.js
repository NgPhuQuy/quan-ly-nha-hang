import axios from "axios";
import cookies from "react-cookies";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api";

const apis = axios.create({
  baseURL: BASE_URL,
});

// Tự động đính kèm JWT Token từ cookie vào tất cả request
apis.interceptors.request.use(
  (config) => {
    const token = cookies.load("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Bắt lỗi 401 khi Token hết hạn
apis.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      cookies.remove("token", { path: "/" });
    }
    return Promise.reject(error);
  },
);

export const authApis = () => apis;

export const endpoints = {
  // Auth & Người dùng
  login: "/auth/login",
  logout: "/auth/logout",
  auth_me: "/auth/me",
  register: "/users",
  users: "/users",
  chi_tiet_nguoi_dung: (id) => `/users/${id}`,
  cap_nhat_nguoi_dung: (id) => `/users/${id}`,
  doi_trang_thai_nguoi_dung: (id) => `/users/${id}/trang-thai`,
  xoa_nguoi_dung: (id) => `/users/${id}`,

  // Chi nhánh
  chi_nhanh: "/chi-nhanh",
  chi_tiet_chi_nhanh: (id) => `/chi-nhanh/${id}`,
  cap_nhat_chi_nhanh: (id) => `/chi-nhanh/${id}`,
  doi_trang_thai_chi_nhanh: (id) => `/chi-nhanh/${id}/trang-thai`,
  xoa_chi_nhanh: (id) => `/chi-nhanh/${id}`,

  // Bàn ăn
  tables: "/ban",
  chi_tiet_ban: (id) => `/ban/${id}`,
  cap_nhat_ban: (id) => `/ban/${id}`,
  doi_trang_thai_ban: (id) => `/ban/${id}/trang-thai`,
  xoa_ban: (id) => `/ban/${id}`,
  tables_chi_nhanh: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/ban`,

  // Thực đơn & Món ăn
  foods: "/mat-hang",
  chi_tiet_mon: (id) => `/mat-hang/${id}`,
  cap_nhat_mon: (id) => `/mat-hang/${id}`,
  xoa_mon: (id) => `/mat-hang/${id}`,
  mon_an: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/mon-an`,
  thuc_uong: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/thuc-uong`,
  dich_vu: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/dich-vu`,

  // Đặt lịch
  dat_lich: "/dat-lich",
  chi_tiet_dat_lich: (id) => `/dat-lich/${id}`,
  cap_nhat_dat_lich: (id) => `/dat-lich/${id}`,
  tra_cuu_dat_lich: (code) => `/dat-lich/tra-cuu/${code}`,
  cap_nhat_trang_thai_dat_lich: (id) => `/dat-lich/${id}/trang-thai`,
  xoa_dat_lich: (id) => `/dat-lich/${id}`,
  khung_gio: (maChiNhanh, ngay, soKhach) =>
    `/dat-lich/khung-gio?maChiNhanh=${maChiNhanh}&ngay=${ngay}${soKhach ? `&soKhach=${soKhach}` : ""}`,

  // Hóa đơn & POS
  invoices: "/hoa-don",
  chi_tiet_hoa_don: (id) => `/hoa-don/${id}`,
  thanh_toan_hoa_don: (id) => `/hoa-don/${id}/thanh-toan`,
  huy_hoa_don: (id) => `/hoa-don/${id}/huy`,
  xoa_hoa_don: (id) => `/hoa-don/${id}`,

  // Khách hàng
  customers: "/khach-hang",
  chi_tiet_khach_hang: (id) => `/khach-hang/${id}`,

  // Thu chi
  transactions: "/thu-chi",
  xoa_giao_dich: (id) => `/thu-chi/${id}`,

  // Khuyến mãi
  promotions: "/khuyen-mai",
  chi_tiet_khuyen_mai: (id) => `/khuyen-mai/${id}`,
  cap_nhat_khuyen_mai: (id) => `/khuyen-mai/${id}`,
  doi_trang_thai_khuyen_mai: (id) => `/khuyen-mai/${id}/trang-thai`,
  xoa_khuyen_mai: (id) => `/khuyen-mai/${id}`,

  // Dashboard & Báo cáo
  dashboard_overview: "/dashboard/overview",
  dashboard_revenue_by_day: "/dashboard/revenue-by-day",
  dashboard_revenue_by_branch: "/dashboard/revenue-by-branch",
  dashboard_revenue_by_source: "/dashboard/revenue-by-source",
};

export default apis;
