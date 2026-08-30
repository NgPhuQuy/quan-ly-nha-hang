import { useAuth } from "../contexts/AuthContext";

/**
 * Hook tiện ích kiểm tra quyền hạn (Role) từ AuthContext
 */
export function useRole() {
  const {
    user,
    role: vaiTro,
    isAuth,
    isAdmin,
    isQuanLy,
    isNhanVien,
    isKhachHang,
    hasRole,
    loading,
  } = useAuth();

  return {
    user,
    vaiTro,
    isAuth,
    isAdmin,
    isQuanLy,
    isNhanVien,
    isKhachHang,
    hasRole,
    loading,
  };
}

export default useRole;
