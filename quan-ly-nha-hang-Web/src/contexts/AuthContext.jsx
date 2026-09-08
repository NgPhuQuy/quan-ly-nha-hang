import { createContext, useContext, useState, useEffect } from "react";
import {
  layToken,
  dangXuat as authDangXuat,
} from "../services/xacThuc.service";
import { thongTinCuaToi } from "../services/nguoiDung.service";
import { chuanHoaVaiTro } from "../utils/vaiTro";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [nguoiDung, setNguoiDung] = useState(null);
  const [loading, setLoading] = useState(true);

  const taiThongTinNguoiDung = async () => {
    if (layToken()) {
      try {
        const duLieu = await thongTinCuaToi();
        setNguoiDung(duLieu);
      } catch {
        setNguoiDung(null);
      }
    } else {
      setNguoiDung(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    taiThongTinNguoiDung();
  }, []);

  const dangXuat = async () => {
    try {
      await authDangXuat();
    } catch {
      // Bo qua loi dang xuat tu mang
    }
    setNguoiDung(null);
  };

  const vaiTro = chuanHoaVaiTro(nguoiDung?.vaiTro || nguoiDung?.role);
  const isAdmin = vaiTro === "ADMIN";
  const isNhanVien = ["ADMIN", "QUAN_LY", "NHAN_VIEN"].includes(vaiTro);

  return (
    <AuthContext.Provider
      value={{
        nguoiDung,
        user: nguoiDung,
        setUser: setNguoiDung,
        loading,
        isAuth: !!nguoiDung,
        isAdmin,
        isNhanVien,
        dangXuat,
        taiLaiThongTin: taiThongTinNguoiDung,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// This context file intentionally exports its consumer hook alongside the provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
