import { createContext, useContext, useState, useEffect } from "react";
import {
  layToken,
  dangNhap as authDangNhap,
  dangKy as authDangKy,
  dangXuat as authDangXuat,
} from "../services/xacThuc.service";
import { thongTinCuaToi } from "../services/nguoiDung.service";
import { chuanHoaVaiTro } from "../utils/vaiTro";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const taiThongTinNguoiDung = async () => {
    if (layToken()) {
      try {
        const u = await thongTinCuaToi();
        setUser(u);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    taiThongTinNguoiDung();
  }, []);

  const isAuth = !!user;
  const role = chuanHoaVaiTro(user?.vaiTro || user?.role);
  const isAdmin = role === "ADMIN";
  const isQuanLy = role === "QUANLY";
  const isNhanVien = ["ADMIN", "QUANLY", "NHANVIEN"].includes(role);
  const isKhachHang = role === "KHACHHANG" || (!isNhanVien && isAuth);

  const hasRole = (...roles) => {
    const norm = roles.map(chuanHoaVaiTro);
    return norm.includes(role);
  };

  const dangNhap = async (taiKhoan, matKhau) => {
    try {
      const res = await authDangNhap(taiKhoan, matKhau);
      if (res?.token) {
        if (res.user) {
          setUser(res.user);
        } else {
          await taiThongTinNguoiDung();
        }
        return { thanhCong: true, user: res.user };
      }
      return { thanhCong: false, thongBao: "Đăng nhập thất bại" };
    } catch (err) {
      return {
        thanhCong: false,
        thongBao:
          err.response?.data?.message ||
          err.response?.data?.thongBao ||
          "Tài khoản hoặc mật khẩu không chính xác!",
      };
    }
  };

  const dangKy = async (duLieu) => {
    return await authDangKy(duLieu);
  };

  const dangXuat = async () => {
    await authDangXuat();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuth,
        role,
        isAdmin,
        isQuanLy,
        isNhanVien,
        isKhachHang,
        hasRole,
        dangNhap,
        dangKy,
        dangXuat,
        taiLaiThongTin: taiThongTinNguoiDung,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
