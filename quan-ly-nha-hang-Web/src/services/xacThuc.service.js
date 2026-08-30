import cookies from "react-cookies";
import apis, { endpoints } from "./apis";

/**
 * Giải mã JWT Payload (Base64 URL)
 */
export const giaiMaToken = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.warn("Không thể giải mã JWT:", e);
    return null;
  }
};

/**
 * Lấy token hiện tại từ cookie hoặc localStorage (nếu còn hạn)
 */
export const layToken = () => {
  const token = cookies.load("token") || localStorage.getItem("token");
  if (!token) return null;

  const payload = giaiMaToken(token);
  if (payload && payload.exp) {
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      dangXuat();
      return null;
    }
  }
  return token;
};

/**
 * Lấy thông tin người dùng đang đăng nhập
 */
export const layNguoiDungHienTai = () => {
  const token = layToken();
  if (!token) return null;

  const payload = giaiMaToken(token);
  const userLuuTru = localStorage.getItem("user");
  const thongTin = userLuuTru ? JSON.parse(userLuuTru) : {};

  return {
    taiKhoan: payload?.sub || thongTin.taiKhoan || "Admin",
    maNguoiDung: payload?.maNguoiDung || thongTin.maNguoiDung,
    vaiTro: (payload?.vaiTro || thongTin.vaiTro || "ADMIN").toUpperCase(),
    hoTen: thongTin.hoTen || payload?.sub || "Người dùng",
  };
};

/**
 * Đăng nhập hệ thống qua API /auth/login
 */
export const dangNhap = async (taiKhoan, matKhau) => {
  try {
    const res = await apis.post(endpoints.login, {
      taiKhoan: taiKhoan.trim(),
      matKhau: matKhau.trim(),
    });

    const token = res.data?.token;
    if (token) {
      // Lưu cookie 7 ngày
      cookies.save("token", token, { path: "/", maxAge: 7 * 24 * 3600 });
      localStorage.setItem("token", token);

      const payload = giaiMaToken(token);
      const user = {
        taiKhoan: payload?.sub || taiKhoan,
        maNguoiDung: payload?.maNguoiDung,
        vaiTro: (payload?.vaiTro || "ADMIN").toUpperCase(),
      };
      localStorage.setItem("user", JSON.stringify(user));

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
 * Đăng xuất khỏi hệ thống
 */
export const dangXuat = () => {
  cookies.remove("token", { path: "/" });
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Kiểm tra trạng thái đã đăng nhập hay chưa
 */
export const isDaDangNhap = () => {
  return !!layToken();
};
