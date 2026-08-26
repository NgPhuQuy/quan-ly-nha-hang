import axios from "axios";
import cookies from "react-cookies";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const apis = axios.create({ baseURL: BASE_URL });

export const authApis = () =>
  axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${cookies.load("token") || ""}` },
  });

export const endpoints = {
  dat_lich: "/dat-lich",
  chi_nhanh: "/chi-nhanh",
  login: "/auth/login",
  register: "/users",
  mon_an: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/mon-an`,
  thuc_uong: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/thuc-uong`,
  dich_vu: (maChiNhanh) => `/chi-nhanh/${maChiNhanh}/dich-vu`,
  khung_gio: (maChiNhanh, ngay, soKhach) => `/dat-lich/khung-gio?maChiNhanh=${maChiNhanh}&ngay=${ngay}&soKhach=${soKhach}`,
  chi_tiet_dat_lich: (maDatLich) => `/dat-lich/${maDatLich}`,
};

export default apis;
