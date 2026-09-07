import cookies from "react-cookies";
import apis, { endpoints } from "./apis";

export const layToken = () => {
  return cookies.load("token") || null;
};

export const dangNhap = async (taiKhoan, matKhau) => {
  try {
    const res = await apis.post(endpoints.login, {
      taiKhoan: taiKhoan.trim(),
      matKhau: matKhau.trim(),
    });

    const token = res.data.token;
    if (token) {
      cookies.save("token", token);
      return { thanhCong: true, token };
    }
  } catch (error) {
    const msg = error.response.data.message;
    return { thanhCong: false, thongBao: msg };
  }
};

export const dangKy = async (duLieu) => {
  try {
    const res = await apis.post(endpoints.register, {
      taiKhoan: duLieu.taiKhoan,
      matKhau: duLieu.matKhau,
      ho: duLieu.ho,
      ten: duLieu.ten,
      email: duLieu.email,
      soDienThoai: duLieu.soDienThoai,
    });

    return { thanhCong: true, duLieu: res.data };
  } catch (error) {
    const msg = error.response.data.message;
    return { thanhCong: false, thongBao: msg };
  }
};

export const dangXuat = async () => {
  try {
    await apis.post(endpoints.logout);
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
  }
  cookies.remove("token", { path: "/" });
};

export const isDaDangNhap = () => {
  return !!layToken();
};