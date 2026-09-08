import cookies from "react-cookies";
import apis, { endpoints } from "./apis";

export const layToken = () => {
  return cookies.load("token");
};

export const dangNhap = async (taiKhoan, matKhau) => {
  const res = await apis.post(endpoints.dang_nhap, { taiKhoan, matKhau });
  const token = res.data.token;
  cookies.save("token", token, { path: "/" });
  return res.data;
};

export const dangKy = async (duLieu) => {
  const res = await apis.post(endpoints.dang_ky, duLieu);
  return res.data;
};

export const dangXuat = async () => {
  const res = await apis.post(endpoints.dang_xuat);
  cookies.remove("token", { path: "/" });
  return res.data;
};

export const isDaDangNhap = () => {
  return !!layToken();
};