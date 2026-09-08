import { ShieldAlert, LogOut, Home, PhoneCall } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function TrangKhongCoQuyen({ onQuayVeTrangChu, onDangNhapKhac }) {
  const { nguoiDung, dangXuat } = useAuth();

  const handleDangXuatVaDangNhap = async () => {
    await dangXuat();
    onDangNhapKhac?.();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0c0905] relative overflow-hidden px-4 py-12">
      {/* Background Texture & Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-luminosity overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
          alt="Không gian nhà hàng"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0905] via-[#140e08]/90 to-[#0a0704]" />
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,150,43,0.08),_transparent_70%)] pointer-events-none" />

      {/* Main 403 Card */}
      <div className="relative z-10 max-w-lg w-full rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#1c130b]/95 to-[#120b06]/98 border border-amber-500/35 text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        {/* Shield Alert Icon with Glow */}
        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6 shadow-xl shadow-amber-950/60 text-amber-400">
          <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 stroke-[1.5]" />
        </div>

        {/* Status Code & Title */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-md">
          <span>Lỗi 403 • Quyền Truy Cập Bị Từ Chối</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mb-3">
          Khu Vực Dành Riêng Cho Ban Quản Lý
        </h1>

        <p className="text-xs sm:text-sm text-amber-200/70 font-light leading-relaxed mb-6">
          Tài khoản hiện tại{" "}
          {nguoiDung?.taiKhoan ? (
            <span className="font-semibold text-amber-300">
              ({nguoiDung.taiKhoan})
            </span>
          ) : (
            ""
          )}{" "}
          không có thẩm quyền truy cập vào phân hệ Quản lý / Điểm bán (POS) của
          hệ thống L'Délice.
        </p>

        {/* User Role Tag */}
        {nguoiDung && (
          <div className="mb-8 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-amber-200/80 flex items-center justify-between">
            <span className="text-amber-200/60">Vai trò hiện tại:</span>
            <span className="font-bold text-amber-400 uppercase tracking-wider">
              {nguoiDung.vaiTro}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={onQuayVeTrangChu}
            className="w-full sm:w-auto flex-1 btn-primary rounded-xl py-3 px-5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </button>

          <button
            type="button"
            onClick={handleDangXuatVaDangNhap}
            className="w-full sm:w-auto flex-1 rounded-xl py-3 px-5 text-xs sm:text-sm font-semibold text-amber-200 border border-amber-500/35 bg-white/5 hover:bg-amber-500/15 hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <LogOut className="w-4 h-4 text-amber-400" />
            <span>Đổi Tài Khoản</span>
          </button>
        </div>

        {/* Hotline Footer */}
        <div className="mt-8 pt-6 border-t border-amber-500/15 flex items-center justify-center gap-2 text-xs text-amber-200/50">
          <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
          <span>Cần hỗ trợ phân quyền? Hotline: </span>
          <span className="text-amber-300 font-mono font-bold">1800 5678</span>
        </div>
      </div>
    </div>
  );
}

export default TrangKhongCoQuyen;
