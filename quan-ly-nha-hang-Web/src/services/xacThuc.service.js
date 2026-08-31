import cookies from "react-cookies";
import apis, { endpoints } from "./apis";

/**
 * Giải mã JWT payload an toàn ở Client
 */
export const giaiMaToken = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  }
};

/**
 * Chuẩn hóa chuỗi vai trò (Hỗ trợ ROLE_ADMIN, ADMIN, ROLE_QUAN_LY, QUANLY, Quản lý,...)
 */
export const chuanHoaVaiTro = (vaiTro) => {
  if (!vaiTro) return "";
  const v = String(vaiTro).toUpperCase().replace(/[\s\-_]/g, "");
  if (v.includes("ADMIN")) return "ADMIN";
  if (v.includes("QUANLY") || v.includes("MANAGER")) return "QUANLY";
  if (
    v.includes("NHANVIEN") ||
    v.includes("STAFF") ||
    v.includes("EMPLOYEE")
  )
    return "NHANVIEN";
  if (v.includes("KHACH") || v.includes("CUSTOMER") || v.includes("USER"))
    return "KHACHHANG";
  return v;
};

/**
 * Lấy token hiện tại từ cookie
 */
export const layToken = () => {
  return cookies.load("token") || null;
};

/**
 * Lấy thông tin người dùng đầy đủ từ server qua API /auth/me kết hợp token payload
 */
export const layThongTinMe = async () => {
  const token = layToken();
  if (!token) return null;

  const payload = giaiMaToken(token);

  try {
    const res = await apis.get(endpoints.auth_me);
    if (res.data) {
      const vaiTroRaw = res.data.vaiTro || payload?.vaiTro;
      return {
        ...res.data,
        vaiTro: chuanHoaVaiTro(vaiTroRaw),
        vaiTroGoc: vaiTroRaw,
        taiKhoan: res.data.taiKhoan || payload?.sub,
        maNguoiDung: res.data.maNguoiDung || payload?.maNguoiDung,
      };
    }
  } catch (error) {
    console.warn("Không thể tải thông tin từ /auth/me:", error);
  }

  // Fallback lấy từ JWT Payload nếu /auth/me chưa phản hồi kịp
  if (payload) {
    return {
      taiKhoan: payload.sub,
      maNguoiDung: payload.maNguoiDung,
      vaiTro: chuanHoaVaiTro(payload.vaiTro),
      vaiTroGoc: payload.vaiTro,
    };
  }

  return null;
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
      let user = await layThongTinMe();
      if (!user) {
        const payload = giaiMaToken(token);
        if (payload) {
          user = {
            taiKhoan: payload.sub || taiKhoan,
            maNguoiDung: payload.maNguoiDung,
            vaiTro: chuanHoaVaiTro(payload.vaiTro),
            vaiTroGoc: payload.vaiTro,
          };
        }
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
  if (!user) return false;
  const userRole = chuanHoaVaiTro(user.vaiTro || user.role);
  const normalizedRoles = roles.map(chuanHoaVaiTro);
  return normalizedRoles.includes(userRole);
};

export const laAdmin = (user) =>
  chuanHoaVaiTro(user?.vaiTro || user?.role) === "ADMIN";
export const laQuanLy = (user) =>
  chuanHoaVaiTro(user?.vaiTro || user?.role) === "QUANLY";
export const laNhanVien = (user) =>
  ["ADMIN", "QUANLY", "NHANVIEN"].includes(
    chuanHoaVaiTro(user?.vaiTro || user?.role),
  );
export const laKhachHang = (user) =>
  chuanHoaVaiTro(user?.vaiTro || user?.role) === "KHACHHANG";

