import { useState, useEffect } from "react";
import {
  User,
  LogOut,
  Shield,
  Menu,
  X,
  Calendar,
  Search,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

function ThanhDieuHuong({ onDatBan, onTraCuuDatBan, onDangNhap }) {
  const {
    user: nguoiDung,
    isAuth: daDangNhap,
    isNhanVien: laNhanVienAdmin,
    dangXuat: handleDangXuat,
  } = useAuth();
  const [isMoMenu, setIsMoMenu] = useState(false);
  const [daCuon, setDaCuon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setDaCuon(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const handleThoat = async () => {
    await handleDangXuat();
    handleDongMenu();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          daCuon
            ? "bg-[rgba(12,9,5,0.95)] backdrop-blur-md border-b border-[rgba(200,136,42,0.2)] py-3 shadow-xl"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-400/20 to-amber-700/30 border border-amber-500/40 shadow-inner group-hover:scale-105 transition-transform">
                <Sparkles size={18} className="text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-amber-200 group-hover:text-amber-300 transition-colors">
                  L'DÉLICE
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-amber-500/70 font-semibold -mt-1">
                  Haute Gastronomie
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-amber-100/75">
              <a
                href="#story"
                className="hover:text-amber-300 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                Câu chuyện
              </a>
              <a
                href="#menu"
                className="hover:text-amber-300 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                Thực đơn
              </a>
              <a
                href="#branches"
                className="hover:text-amber-300 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                Chi nhánh & Không gian
              </a>
              <a
                href="#reviews"
                className="hover:text-amber-300 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                Đánh giá
              </a>
              <a
                href="#faq"
                className="hover:text-amber-300 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                Hỏi đáp
              </a>
              <button
                onClick={handleTraCuuDatBan}
                className="flex items-center gap-1.5 hover:text-amber-300 transition-colors text-amber-200/90 cursor-pointer"
              >
                <Search size={14} className="text-amber-400" />
                Tra cứu đặt bàn
              </button>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {daDangNhap && nguoiDung ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                    <User size={13} className="text-amber-400" />
                    <span>{nguoiDung.hoTen || nguoiDung.taiKhoan}</span>
                    {laNhanVienAdmin && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold flex items-center gap-1">
                        <Shield size={10} /> Quản trị
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleThoat}
                    className="p-2 rounded-full text-amber-400/60 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                    title="Đăng xuất"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleDangNhap}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-amber-200 hover:text-white border border-amber-500/30 hover:border-amber-400 transition-all hover:bg-amber-500/10"
                >
                  Đăng nhập
                </button>
              )}

              <button
                onClick={handleDatBan}
                className="btn-primary rounded-full px-5 py-2 text-xs font-bold shadow-lg shadow-amber-900/30 flex items-center gap-1.5 hover:scale-105 transition-transform"
              >
                <Calendar size={14} />
                Đặt bàn ngay
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={handleDatBan}
                className="btn-primary rounded-full px-3.5 py-1.5 text-xs font-bold"
              >
                Đặt bàn
              </button>
              <button
                onClick={() => setIsMoMenu(!isMoMenu)}
                className="p-2 rounded-xl text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMoMenu ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMoMenu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={handleDongMenu}
          />
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs bg-[#100a04] border-l border-amber-500/20 p-6 flex flex-col justify-between shadow-2xl z-50">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  <span className="font-serif font-bold text-amber-200">
                    L'Délice
                  </span>
                </div>
                <button
                  onClick={handleDongMenu}
                  className="p-1 rounded-lg text-amber-400/60 hover:text-amber-300"
                >
                  <X size={18} />
                </button>
              </div>

              {daDangNhap && nguoiDung && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <p className="text-amber-300/60 text-[10px] uppercase tracking-wider font-semibold">
                    Tài khoản
                  </p>
                  <p className="font-bold text-amber-200 mt-0.5">
                    {nguoiDung.hoTen || nguoiDung.taiKhoan}
                  </p>
                  <p className="text-amber-400/60 text-[11px]">
                    {nguoiDung.email}
                  </p>
                </div>
              )}

              <nav className="flex flex-col gap-4 text-sm font-medium text-amber-100/80">
                <a
                  href="#story"
                  onClick={handleDongMenu}
                  className="py-2 hover:text-amber-300 transition-colors border-b border-white/5"
                >
                  Câu chuyện thương hiệu
                </a>
                <a
                  href="#menu"
                  onClick={handleDongMenu}
                  className="py-2 hover:text-amber-300 transition-colors border-b border-white/5"
                >
                  Thực đơn ẩm thực
                </a>
                <a
                  href="#branches"
                  onClick={handleDongMenu}
                  className="py-2 hover:text-amber-300 transition-colors border-b border-white/5"
                >
                  Hệ thống chi nhánh
                </a>
                <a
                  href="#reviews"
                  onClick={handleDongMenu}
                  className="py-2 hover:text-amber-300 transition-colors border-b border-white/5"
                >
                  Đánh giá từ thực khách
                </a>
                <a
                  href="#faq"
                  onClick={handleDongMenu}
                  className="py-2 hover:text-amber-300 transition-colors border-b border-white/5"
                >
                  Những điều quan tâm (FAQ)
                </a>
                <button
                  onClick={handleTraCuuDatBan}
                  className="flex items-center gap-2 py-2 text-left hover:text-amber-300 transition-colors border-b border-white/5"
                >
                  <Search size={15} className="text-amber-400" />
                  Tra cứu đặt bàn
                </button>
              </nav>
            </div>

            <div className="space-y-3 pt-6 border-t border-amber-500/20">
              <button
                onClick={handleDatBan}
                className="btn-primary w-full rounded-xl py-3 text-xs font-bold text-center shadow-lg"
              >
                Đặt bàn ngay
              </button>

              {daDangNhap ? (
                <button
                  onClick={handleThoat}
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-colors"
                >
                  Đăng xuất
                </button>
              ) : (
                <button
                  onClick={handleDangNhap}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-amber-200 border border-amber-500/30 hover:bg-amber-500/10 transition-colors"
                >
                  Đăng nhập / Đăng ký
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ThanhDieuHuong;
