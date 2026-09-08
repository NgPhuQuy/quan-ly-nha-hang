import axios from "axios";
import cookies from "react-cookies";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apis = axios.create({
  baseURL: BASE_URL,
});

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
  dang_nhap: "/auth/login",
  dang_xuat: "/auth/logout",
  thong_tin_cua_toi: "/auth/me",
  dang_ky: "/users",
  users: "/users",
  chi_tiet_nguoi_dung: (maNguoiDung) => `/users/${maNguoiDung}`,
  doi_trang_thai_nguoi_dung: (maNguoiDung) => `/users/${maNguoiDung}/trang-thai`,

  chi_nhanh: "/chi-nhanh",
  chi_tiet_chi_nhanh: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}`,
  cap_nhat_chi_nhanh: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}`,
  doi_trang_thai_chi_nhanh: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/trang-thai`,

  ban: "/ban",
  chi_tiet_ban: (maBan) => `/ban/${maBan}`,
  cap_nhat_ban: (maBan) => `/ban/${maBan}`,
  doi_trang_thai_ban: (maBan) => `/ban/${maBan}/trang-thai`,
  danh_sach_ban_chi_nhanh: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/ban`,

  // Thực đơn & Món ăn
  mat_hang: "/mat-hang",
  chi_tiet_mat_hang: (maMatHang) => `/mat-hang/${maMatHang}`,
  cap_nhat_mat_hang: (maMatHang) => `/mat-hang/${maMatHang}`,
  xoa_mat_hang: (maMatHang) => `/mat-hang/${maMatHang}`,
  mat_hang_theo_chi_nhanh: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/mat-hang`,
  mon_an: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/mon-an`,
  thuc_uong: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/thuc-uong`,
  dich_vu: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/dich-vu`,

  // Đặt lịch
  dat_lich: "/dat-lich",
  chi_tiet_dat_lich: (maDatLich) => `/dat-lich/${maDatLich}`,
  cap_nhat_dat_lich: (maDatLich) => `/dat-lich/${maDatLich}`,
  danh_sach_dat_lich_cua_toi: "/dat-lich/me",
  cap_nhat_trang_thai_dat_lich: (maDatLich) => `/dat-lich/${maDatLich}/trang-thai`,
  xoa_dat_lich: (maDatLich) => `/dat-lich/${maDatLich}`,
  khung_gio: (maChiNhanh, ngay) => `/dat-lich/khung-gio?maChiNhanh=${maChiNhanh}&ngay=${ngay}`,

  // Hóa đơn & POS
  hoa_don: "/hoa-don",
  chi_tiet_hoa_don: (maHoaDon) => `/hoa-don/${maHoaDon}`,
  thanh_toan_hoa_don: (maHoaDon) => `/hoa-don/${maHoaDon}/thanh-toan`,
  huy_hoa_don: (maHoaDon) => `/hoa-don/${maHoaDon}/huy`,
  xoa_hoa_don: (maHoaDon) => `/hoa-don/${maHoaDon}`,

  // báo cáo POS
  thong_ke: "/thong-ke",
  thong_ke_theo_ngay: (ngay) => `/thong-ke/theo-ngay?ngay=${ngay}`,

  // báo cáo ADMIN site
  thong_ke_theo_chi_nhanh: "/thong-ke/theo-chi-nhanh",
  thong_ke_theo_nguon: "/thong-ke/theo-nguon",

};

export default apis;
