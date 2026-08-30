import { createContext, useContext, useState, useEffect } from "react";
import {
  layToken,
  layThongTinMe,
  dangNhap as authDangNhap,
  dangKy as authDangKy,
  dangXuat as authDangXuat,
} from "../services/xacThuc.service";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const taiThongTinNguoiDung = async () => {
    if (layToken()) {
      const u = await layThongTinMe();
      setUser(u);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    taiThongTinNguoiDung();
  }, []);

  const isAuth = !!user;
  const role = user?.vaiTro || "";
  const isAdmin = role === "ADMIN";
  const isQuanLy = role === "QUANLY";
  const isNhanVien = ["ADMIN", "QUANLY", "NHANVIEN"].includes(role);
  const isKhachHang = role === "KHACHHANG";

  const hasRole = (...roles) => roles.includes(role);

  const dangNhap = async (taiKhoan, matKhau) => {
    const res = await authDangNhap(taiKhoan, matKhau);
    if (res.thanhCong) {
      setUser(res.user);
    }
    return res;
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
