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
 * Lấy token hiện tại từ cookie (xác thực thời hạn)
 */
export const layToken = () => {
  const token = cookies.load("token");
  if (!token) return null;

  const payload = giaiMaToken(token);
  if (payload?.exp) {
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      dangXuat();
      return null;
    }
  }
  return token;
};

/**
 * Lấy thông tin người dùng từ server qua API /auth/me
 */
export const layThongTinMe = async () => {
  const token = layToken();
  if (!token) return null;

  try {
    const res = await apis.get(endpoints.auth_me);
    if (res.data) {
      const user = {
        ...res.data,
        vaiTro: (res.data.vaiTro || "KHACHHANG").toUpperCase(),
      };
      localStorage.setItem("user_profile", JSON.stringify(user));
      return user;
    }
  } catch (error) {
    console.warn("Không thể tải thông tin từ /auth/me:", error);
  }
  return layNguoiDungHienTai();
};

/**
 * Lấy thông tin người dùng hiện tại (từ cache/localStorage hoặc giải mã token)
 */
export const layNguoiDungHienTai = () => {
  const token = layToken();
  if (!token) return null;

  try {
    const cached = localStorage.getItem("user_profile");
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn("Lỗi đọc user_profile từ localStorage:", e);
  }

  const payload = giaiMaToken(token);
  if (!payload) return null;

  const vaiTro = (payload.vaiTro || "KHACHHANG").toUpperCase();
  return {
    taiKhoan: payload.sub || "Người dùng",
    maNguoiDung: payload.maNguoiDung,
    vaiTro: vaiTro,
    hoTen: payload.sub || "Người dùng",
  };
};

/**
 * Đăng nhập hệ thống qua API /auth/login và lấy thông tin từ /auth/me
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

      // Gọi API /auth/me để lấy profile đầy đủ từ backend
      let user = null;
      try {
        const meRes = await apis.get(endpoints.auth_me, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (meRes.data) {
          user = {
            ...meRes.data,
            vaiTro: (meRes.data.vaiTro || "KHACHHANG").toUpperCase(),
          };
          localStorage.setItem("user_profile", JSON.stringify(user));
        }
      } catch (meErr) {
        console.warn(
          "Could not fetch meRes, fallback to token payload:",
          meErr,
        );
        const payload = giaiMaToken(token);
        user = {
          taiKhoan: payload?.sub || taiKhoan,
          maNguoiDung: payload?.maNguoiDung,
          vaiTro: (payload?.vaiTro || "KHACHHANG").toUpperCase(),
          hoTen: payload?.sub || taiKhoan,
        };
        localStorage.setItem("user_profile", JSON.stringify(user));
      }

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
      ho: duLieu.ho?.trim() || "",
      ten: duLieu.ten?.trim() || "",
      taiKhoan: duLieu.taiKhoan?.trim(),
      matKhau: duLieu.matKhau?.trim(),
      email: duLieu.email?.trim() || null,
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
 * Đăng xuất: Xóa cookie token & profile cache, gọi API /auth/logout
 */
export const dangXuat = async () => {
  try {
    await apis.post(endpoints.logout);
  } catch (ignored) {}
  cookies.remove("token", { path: "/" });
  localStorage.removeItem("user_profile");
};

/**
 * Kiểm tra trạng thái đã đăng nhập
 */
export const isDaDangNhap = () => {
  return !!layToken();
};
