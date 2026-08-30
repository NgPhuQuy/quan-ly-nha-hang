import { useState, useEffect } from "react";
import { User, LogOut, Shield } from "lucide-react";
import { mutedCream, subtleGoldBorder } from "../../../themes";
import {
  isDaDangNhap,
  layNguoiDungHienTai,
  layThongTinMe,
  dangXuat,
} from "../../../services/xacThuc.service";

function ThanhDieuHuong({ onDatBan, onTraCuuDatBan, onDangNhap, onDangKy }) {
  const [isMoMenu, setIsMoMenu] = useState(false);
  const [daDangNhap, setDaDangNhap] = useState(isDaDangNhap());
  const [nguoiDung, setNguoiDung] = useState(layNguoiDungHienTai());

  useEffect(() => {
    if (isDaDangNhap()) {
      layThongTinMe().then((user) => {
        if (user) setNguoiDung(user);
      });
    }
  }, []);

  const handleDongMenu = () => setIsMoMenu(false);
  const handleDatBan = () => {
    handleDongMenu();
    onDatBan();
  };
  const handleTraCuuDatBan = () => {
    handleDongMenu();
    onTraCuuDatBan();
  };
  const handleDangNhap = () => {
    handleDongMenu();
    onDangNhap?.();
  };
  const handleDangKy = () => {
    handleDongMenu();
    onDangKy ? onDangKy() : onDangNhap?.();
  };

  const handleThoat = async () => {
    await dangXuat();
    setDaDangNhap(false);
    setNguoiDung(null);
    handleDongMenu();
  };

  const laNhanVienAdmin =
    nguoiDung?.vaiTro === "ADMIN" ||
    nguoiDung?.vaiTro === "QUANLY" ||
    nguoiDung?.vaiTro === "NHANVIEN";

  return (
    <nav
      className="fixed top-0 z-50 w-full"
      style={{
        background: "linear-gradient(180deg,rgba(12,9,5,.88),transparent)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-10">
        <a href="#" className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2L26 22H2Z"
              fill="none"
              stroke="rgba(200,136,42,.9)"
              strokeWidth="1.5"
            />
            <circle
              cx="14"
              cy="14"
              r="3.5"
              fill="rgba(200,136,42,.18)"
              stroke="rgba(200,136,42,.55)"
              strokeWidth="1"
            />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.05rem",
              color: "rgba(240,216,144,.95)",
            }}
          >
            5S Dining
          </span>
        </a>

        <div
          className="hidden items-center gap-6 text-sm md:flex"
          style={{ color: mutedCream }}
        >
          <a href="#menu" className="transition-colors hover:text-amber-300">
            Thực đơn
          </a>
          <a
            href="#branches"
            className="transition-colors hover:text-amber-300"
          >
            Chi nhánh
          </a>
          <a href="#about" className="transition-colors hover:text-amber-300">
            Về chúng tôi
          </a>
          <a href="#contact" className="transition-colors hover:text-amber-300">
            Liên hệ
          </a>
          <button
            onClick={handleTraCuuDatBan}
            className="transition-colors hover:text-amber-300"
          >
            Tra cứu đặt bàn
          </button>

          {/* User Auth Section */}
          {daDangNhap && nguoiDung ? (
            <div className="flex items-center gap-3 pl-2 border-l border-[rgba(200,136,42,0.25)]">
              {laNhanVienAdmin ? (
                <button
                  onClick={handleDangNhap}
                  className="flex items-center gap-1.5 text-xs bg-[rgba(200,136,42,0.15)] border border-[rgba(200,136,42,0.35)] text-amber-200 px-3 py-1.5 rounded-full hover:bg-amber-500/25 transition-colors"
                >
                  <Shield size={13} className="text-amber-400" />
                  <span>
                    Quản lý (
                    {nguoiDung.vaiTro === "ADMIN"
                      ? "Admin"
                      : nguoiDung.vaiTro === "QUANLY"
                        ? "Quản lý"
                        : "Nhân viên"}
                    )
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-amber-200/90 bg-[rgba(200,136,42,0.08)] px-2.5 py-1 rounded-full border border-[rgba(200,136,42,0.2)]">
                  <User size={13} className="text-amber-400" />
                  <span className="font-medium truncate max-w-[120px]">
                    {nguoiDung.hoTen || nguoiDung.taiKhoan}
                  </span>
                </div>
              )}
              <button
                onClick={handleThoat}
                title="Đăng xuất"
                className="text-[rgba(200,136,42,0.7)] hover:text-red-400 transition-colors p-1"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-[rgba(200,136,42,0.25)]">
              <button
                onClick={handleDangNhap}
                className="transition-colors hover:text-amber-300 text-xs border border-[rgba(200,136,42,0.35)] px-3 py-1 rounded-full bg-[rgba(200,136,42,0.08)]"
              >
                Đăng nhập / Đăng ký
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDatBan}
            className="btn-primary rounded-full px-4 py-2 text-sm sm:px-5"
          >
            Đặt bàn ngay
          </button>
          <button
            onClick={() => setIsMoMenu((isOpen) => !isOpen)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 md:hidden"
            style={{ color: "rgba(200,136,42,.7)" }}
          >
            <div
              className={`h-0.5 w-5 ${isMoMenu ? "translate-y-1.5 rotate-45" : ""}`}
              style={{ background: "currentColor" }}
            />
            <div
              className={`h-0.5 w-5 ${isMoMenu ? "opacity-0" : ""}`}
              style={{ background: "currentColor" }}
            />
            <div
              className={`h-0.5 w-5 ${isMoMenu ? "-translate-y-1.5 -rotate-45" : ""}`}
              style={{ background: "currentColor" }}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all md:hidden ${isMoMenu ? "max-h-80" : "max-h-0"}`}
        style={{
          background: "rgba(12,9,5,.97)",
          borderTop: isMoMenu ? `1px solid ${subtleGoldBorder}` : "none",
        }}
      >
        <div className="space-y-3 px-5 py-4">
          <a
            href="#menu"
            onClick={handleDongMenu}
            className="block text-sm"
            style={{ color: mutedCream }}
          >
            Thực đơn
          </a>
          <a
            href="#branches"
            onClick={handleDongMenu}
            className="block text-sm"
            style={{ color: mutedCream }}
          >
            Chi nhánh
          </a>
          <a
            href="#about"
            onClick={handleDongMenu}
            className="block text-sm"
            style={{ color: mutedCream }}
          >
            Về chúng tôi
          </a>
          <a
            href="#contact"
            onClick={handleDongMenu}
            className="block text-sm"
            style={{ color: mutedCream }}
          >
            Liên hệ
          </a>
          <button
            onClick={handleTraCuuDatBan}
            className="block w-full text-left text-sm"
            style={{ color: mutedCream }}
          >
            Tra cứu đặt bàn
          </button>

          {daDangNhap && nguoiDung ? (
            <div className="pt-2 border-t border-[rgba(200,136,42,0.2)] flex items-center justify-between">
              <span className="text-xs text-amber-200">
                {laNhanVienAdmin
                  ? `Quản lý (${nguoiDung.taiKhoan})`
                  : `Khách: ${nguoiDung.hoTen || nguoiDung.taiKhoan}`}
              </span>
              <button
                onClick={handleThoat}
                className="text-xs text-red-400 hover:underline flex items-center gap-1"
              >
                <LogOut size={12} /> Đăng xuất
              </button>
            </div>
          ) : (
            <button
              onClick={handleDangNhap}
              className="block w-full text-left text-sm text-amber-300 pt-2 border-t border-[rgba(200,136,42,0.2)]"
            >
              Đăng nhập / Đăng ký
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default ThanhDieuHuong;
