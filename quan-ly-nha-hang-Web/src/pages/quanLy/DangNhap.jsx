import { useState } from "react";
import { Lock, User, Eye, EyeOff, LogIn } from "lucide-react";
import { dangNhap } from "../../services/xacThuc.service";

function DangNhap({ onDangNhapThanhCong, onQuayVeTrangChu }) {
  const [taiKhoan, setTaiKhoan] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [hienMatKhau, setHienMatKhau] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loi, setLoi] = useState("");

  const handleDangNhap = async (e) => {
    e?.preventDefault();
    if (!taiKhoan.trim() || !matKhau.trim()) {
      setLoi("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
      return;
    }

    setLoading(true);
    setLoi("");
    try {
      const ketQua = await dangNhap(taiKhoan, matKhau);
      if (ketQua.thanhCong) {
        onDangNhapThanhCong?.(ketQua.user);
      } else {
        setLoi(ketQua.thongBao || "Tài khoản hoặc mật khẩu không chính xác!");
      }
    } catch {
      setLoi("Lỗi kết nối máy chủ. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleDienNhanh = (u, p) => {
    setTaiKhoan(u);
    setMatKhau(p);
    setLoi("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0c0905] relative overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,136,42,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md card-warm rounded-2xl p-6 sm:p-8 relative z-10 border border-[rgba(200,136,42,0.25)] shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[rgba(200,136,42,0.15)] border border-[rgba(200,136,42,0.3)] mb-3">
            <LogIn size={24} className="text-amber-400" />
          </div>
          <h1 className="font-serif text-2xl text-amber-100 font-bold">
            5S Dining Management
          </h1>
          <p className="text-xs text-[rgba(240,216,144,0.5)] mt-1">
            Đăng nhập hệ thống quản trị & POS nhà hàng
          </p>
        </div>

        {/* Thông báo lỗi */}
        {loi && (
          <div className="mb-4 p-3 rounded-lg text-xs bg-red-950/60 border border-red-500/40 text-red-300 text-center">
            {loi}
          </div>
        )}

        {/* Form đăng nhập */}
        <form onSubmit={handleDangNhap} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[rgba(240,216,144,0.8)] mb-1.5">
              Tên tài khoản
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(200,136,42,0.6)]"
              />
              <input
                type="text"
                value={taiKhoan}
                onChange={(e) => setTaiKhoan(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
                className="input-warm w-full pl-10 pr-4 py-2.5 text-sm"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[rgba(240,216,144,0.8)] mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(200,136,42,0.6)]"
              />
              <input
                type={hienMatKhau ? "text" : "password"}
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="input-warm w-full pl-10 pr-10 py-2.5 text-sm"
              />
              <button
                type="button"
                onClick={() => setHienMatKhau(!hienMatKhau)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(200,136,42,0.6)] hover:text-amber-300"
              >
                {hienMatKhau ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 rounded-xl text-sm font-semibold mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Đang xác thực JWT..." : "Đăng nhập ngay"}
          </button>
        </form>

        {/* Tài khoản mẫu */}
        <div className="mt-6 pt-4 border-t border-[rgba(200,136,42,0.12)]">
          <p className="text-[11px] text-[rgba(240,216,144,0.4)] text-center mb-2 font-medium">
            Tài khoản thử nghiệm nhanh:
          </p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => handleDienNhanh("admin", "123456")}
              className="text-[11px] px-2.5 py-1 rounded bg-[rgba(200,136,42,0.1)] border border-[rgba(200,136,42,0.25)] text-amber-200/80 hover:bg-amber-500/20 transition-colors"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleDienNhanh("quanly", "123456")}
              className="text-[11px] px-2.5 py-1 rounded bg-[rgba(200,136,42,0.1)] border border-[rgba(200,136,42,0.25)] text-amber-200/80 hover:bg-amber-500/20 transition-colors"
            >
              Quản lý
            </button>
            <button
              type="button"
              onClick={() => handleDienNhanh("nhanvien", "123456")}
              className="text-[11px] px-2.5 py-1 rounded bg-[rgba(200,136,42,0.1)] border border-[rgba(200,136,42,0.25)] text-amber-200/80 hover:bg-amber-500/20 transition-colors"
            >
              Nhân viên
            </button>
          </div>
        </div>

        {/* Nút về trang chủ */}
        {onQuayVeTrangChu && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onQuayVeTrangChu}
              className="text-xs text-[rgba(200,136,42,0.6)] hover:text-amber-300 transition-colors"
            >
              ← Về trang chủ 5S Dining
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DangNhap;

