import axios from "axios";
import cookies from "react-cookies";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080/api";

const apis = axios.create({ baseURL: BASE_URL });

export const authApis = () =>
  axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${cookies.load("token") || ""}` },
  });

export const endpoints = {
  // Auth & Người dùng
  login: "/auth/login",
  register: "/users",
  users: "/users",
  chi_tiet_nguoi_dung: (id) => `/users/${id}`,
  cap_nhat_nguoi_dung: (id) => `/users/${id}`,
  doi_trang_thai_nguoi_dung: (id) => `/users/${id}/status`,
  xoa_nguoi_dung: (id) => `/users/${id}`,

  // Chi nhánh
  chi_nhanh: "/chi-nhanh",
  chi_nhanh_all: "/chi-nhanh/all",
  chi_tiet_chi_nhanh: (id) => `/chi-nhanh/${id}`,
  cap_nhat_chi_nhanh: (id) => `/chi-nhanh/${id}`,
  doi_trang_thai_chi_nhanh: (id) => `/chi-nhanh/${id}/trang-thai`,
  xoa_chi_nhanh: (id) => `/chi-nhanh/${id}`,

  // Bàn ăn
  tables: "/tables",
  chi_tiet_ban: (id) => `/tables/${id}`,
  cap_nhat_ban: (id) => `/tables/${id}`,
  doi_trang_thai_ban: (id) => `/tables/${id}/status`,
  xoa_ban: (id) => `/tables/${id}`,
  tables_chi_nhanh: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/ban`,

  // Thực đơn & Món ăn
  foods: "/foods",
  chi_tiet_mon: (id) => `/foods/${id}`,
  cap_nhat_mon: (id) => `/foods/${id}`,
  xoa_mon: (id) => `/foods/${id}`,
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
    `/dat-lich/khung-gio?maChiNhanh=${maChiNhanh}&ngay=${ngay}&soKhach=${soKhach}`,

  // Hóa đơn & POS
  invoices: "/invoices",
  chi_tiet_hoa_don: (id) => `/invoices/${id}`,
  thanh_toan_hoa_don: (id) => `/invoices/${id}/payment`,
  huy_hoa_don: (id) => `/invoices/${id}/cancel`,
  xoa_hoa_don: (id) => `/invoices/${id}`,

  // Khách hàng
  customers: "/customers",
  chi_tiet_khach_hang: (id) => `/customers/${id}`,

  // Thu chi
  transactions: "/transactions",
  xoa_giao_dich: (id) => `/transactions/${id}`,

  // Khuyến mãi
  promotions: "/promotions",
  chi_tiet_khuyen_mai: (id) => `/promotions/${id}`,
  cap_nhat_khuyen_mai: (id) => `/promotions/${id}`,
  doi_trang_thai_khuyen_mai: (id) => `/promotions/${id}/status`,
  xoa_khuyen_mai: (id) => `/promotions/${id}`,

  // Dashboard & Báo cáo
  dashboard_overview: "/dashboard/overview",
  dashboard_revenue_by_day: "/dashboard/revenue-by-day",
  dashboard_revenue_by_branch: "/dashboard/revenue-by-branch",
  dashboard_revenue_by_source: "/dashboard/revenue-by-source",
};

export default apis;
