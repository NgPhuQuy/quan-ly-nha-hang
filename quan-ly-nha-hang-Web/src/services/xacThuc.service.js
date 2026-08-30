import cookies from "react-cookies";
import apis, { endpoints } from "./apis";

/**
 * Lấy token hiện tại từ cookie
 */
export const layToken = () => {
  return cookies.load("token") || null;
};

/**
 * Lấy thông tin người dùng đầy đủ từ server qua API /auth/me
 */
export const layThongTinMe = async () => {
  const token = layToken();
  if (!token) return null;

  try {
    const res = await apis.get(endpoints.auth_me);
    return res.data;
  } catch (error) {
    console.warn("Không thể tải thông tin từ /auth/me:", error);
    return null;
  }
};

/**
 * Đăng nhập hệ thống qua API /auth/login và lấy thông tin người dùng từ /auth/me
 */
export const dangNhap = async (taiKhoan, matKhau) => {
  try {
    const res = await apis.post(endpoints.login, {
      taiKhoan: taiKhoan.trim(),
      matKhau: matKhau.trim(),
    });

    const token = res.data?.token;
    if (token) {
      cookies.save("token", token, { path: "/", maxAge: 7 * 24 * 3600 });
      const user = await layThongTinMe();

      return {
        thanhCong: true,
        token,
        user,
      };
    }
    return { thanhCong: false, thongBao: "Phản hồi máy chủ không hợp lệ" };
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data?.thongBao ||
      "Tài khoản hoặc mật khẩu không chính xác!";
    return {
      thanhCong: false,
      thongBao: msg,
    };
  }
};

/**
 * Đăng ký tài khoản khách hàng mới
 */
export const dangKy = async (duLieu) => {
  try {
    const res = await apis.post(endpoints.register, {
      ho: duLieu.ho?.trim(),
      ten: duLieu.ten?.trim(),
      taiKhoan: duLieu.taiKhoan?.trim(),
      matKhau: duLieu.matKhau?.trim(),
      email: duLieu.email?.trim(),
      soDienThoai: duLieu.soDienThoai?.trim(),
    });

    return {
      thanhCong: true,
      duLieu: res.data,
    };
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0] ||
      "Đăng ký không thành công. Vui lòng kiểm tra lại thông tin!";
    return {
      thanhCong: false,
      thongBao: msg,
    };
  }
};

/**
 * Đăng xuất: Xóa cookie token, gọi API /auth/logout
 */
export const dangXuat = async () => {
  try {
    await apis.post(endpoints.logout);
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
  }
  cookies.remove("token", { path: "/" });
};

/**
 * Kiểm tra trạng thái đã đăng nhập
 */
export const isDaDangNhap = () => {
  return !!layToken();
};

/**
 * Kiểm tra người dùng có một trong các quyền truyền vào hay không
 */
export const coQuyen = (user, ...roles) => {
  return user && roles.includes(user.vaiTro);
};

export const laAdmin = (user) => user?.vaiTro === "ADMIN";
export const laQuanLy = (user) => user?.vaiTro === "QUANLY";
export const laNhanVien = (user) =>
  ["ADMIN", "QUANLY", "NHANVIEN"].includes(user?.vaiTro);
export const laKhachHang = (user) => user?.vaiTro === "KHACHHANG";
