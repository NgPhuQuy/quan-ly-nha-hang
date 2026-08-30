import { useState } from "react";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Phone,
  Mail,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function TrangXacThuc({
  defaultTab = "login",
  onDangNhapThanhCong,
  onQuayVeTrangChu,
}) {
  const { dangNhap, dangKy } = useAuth();
  const [tab, setTab] = useState(defaultTab); // "login" | "register"

  // Login form state
  const [taiKhoan, setTaiKhoan] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [hienMatKhau, setHienMatKhau] = useState(false);

  // Register form state
  const [regHo, setRegHo] = useState("");
  const [regTen, setRegTen] = useState("");
  const [regTaiKhoan, setRegTaiKhoan] = useState("");
  const [regSdt, setRegSdt] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regMatKhau, setRegMatKhau] = useState("");
  const [regXacNhanMK, setRegXacNhanMK] = useState("");
  const [hienRegMK, setHienRegMK] = useState(false);

  const [loading, setLoading] = useState(false);
  const [thongBaoLoi, setThongBaoLoi] = useState("");
  const [thongBaoThanhCong, setThongBaoThanhCong] = useState("");

  const handleDangNhap = async (e) => {
    e?.preventDefault();
    if (!taiKhoan.trim() || !matKhau.trim()) {
      setThongBaoLoi("Vui lòng nhập đầy đủ tên tài khoản và mật khẩu!");
      return;
    }

    setLoading(true);
    setThongBaoLoi("");
    setThongBaoThanhCong("");

    try {
      const ketQua = await dangNhap(taiKhoan, matKhau);
      if (ketQua.thanhCong) {
        onDangNhapThanhCong?.(ketQua.user);
      } else {
        setThongBaoLoi(
          ketQua.thongBao || "Tài khoản hoặc mật khẩu không chính xác!",
        );
      }
    } catch {
      setThongBaoLoi("Lỗi kết nối máy chủ. Vui lòng kiểm tra lại backend!");
    } finally {
      setLoading(false);
    }
  };

  const handleDangKy = async (e) => {
    e?.preventDefault();
    setThongBaoLoi("");
    setThongBaoThanhCong("");

    if (!regTaiKhoan.trim()) {
      setThongBaoLoi("Vui lòng nhập tên tài khoản!");
      return;
    }
    if (!regSdt.trim() || !/^0\d{9}$/.test(regSdt.trim())) {
      setThongBaoLoi(
        "Số điện thoại không hợp lệ (phải bắt đầu bằng số 0 và có đúng 10 số)!",
      );
      return;
    }
    if (regMatKhau.length < 8) {
      setThongBaoLoi("Mật khẩu phải có tối thiểu 8 ký tự!");
      return;
    }
    if (regMatKhau !== regXacNhanMK) {
      setThongBaoLoi("Xác nhận mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    try {
      const ketQua = await dangKy({
        ho: regHo,
        ten: regTen,
        taiKhoan: regTaiKhoan,
        matKhau: regMatKhau,
        email: regEmail,
        soDienThoai: regSdt,
      });

      if (ketQua.thanhCong) {
        setThongBaoThanhCong("Đăng ký thành công! Đang tự động đăng nhập...");
        // Auto login after register
        const loginRes = await dangNhap(regTaiKhoan, regMatKhau);
        if (loginRes.thanhCong) {
          setTimeout(() => {
            onDangNhapThanhCong?.(loginRes.user);
          }, 1000);
        } else {
          setTab("login");
          setTaiKhoan(regTaiKhoan);
        }
      } else {
        setThongBaoLoi(
          ketQua.thongBao || "Đăng ký thất bại, vui lòng thử lại!",
        );
      }
    } catch {
      setThongBaoLoi("Lỗi kết nối máy chủ khi đăng ký!");
    } finally {
      setLoading(false);
    }
  };

  const handleDienNhanh = (u, p) => {
    setTaiKhoan(u);
    setMatKhau(p);
    setThongBaoLoi("");
    setThongBaoThanhCong("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0c0905] relative overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,136,42,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-md card-warm rounded-2xl p-6 sm:p-8 relative z-10 border border-[rgba(200,136,42,0.25)] shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[rgba(200,136,42,0.15)] border border-[rgba(200,136,42,0.3)] mb-3">
            {tab === "login" ? (
              <LogIn size={24} className="text-amber-400" />
            ) : (
              <UserPlus size={24} className="text-amber-400" />
            )}
          </div>
          <h1 className="font-serif text-2xl text-amber-100 font-bold">
            5S Dining Experience
          </h1>
          <p className="text-xs text-[rgba(240,216,144,0.5)] mt-1">
            {tab === "login"
              ? "Đăng nhập hệ thống khách hàng & quản trị nhà hàng"
              : "Tạo tài khoản thành viên để nhận ưu đãi và quản lý đặt bàn"}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-[rgba(200,136,42,0.1)] p-1 border border-[rgba(200,136,42,0.2)] mb-5">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setThongBaoLoi("");
              setThongBaoThanhCong("");
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === "login"
                ? "bg-amber-600 text-amber-50 shadow-md font-bold"
                : "text-[rgba(240,216,144,0.6)] hover:text-amber-200"
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setThongBaoLoi("");
              setThongBaoThanhCong("");
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === "register"
                ? "bg-amber-600 text-amber-50 shadow-md font-bold"
                : "text-[rgba(240,216,144,0.6)] hover:text-amber-200"
            }`}
          >
            Đăng ký mới
          </button>
        </div>

        {/* Error / Success Alerts */}
        {thongBaoLoi && (
          <div className="mb-4 p-3 rounded-lg text-xs bg-red-950/60 border border-red-500/40 text-red-300 text-center">
            {thongBaoLoi}
          </div>
        )}
        {thongBaoThanhCong && (
          <div className="mb-4 p-3 rounded-lg text-xs bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-center">
            {thongBaoThanhCong}
          </div>
        )}

        {/* Form Đăng nhập */}
        {tab === "login" && (
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
              {loading ? "Đang xác thực..." : "Đăng nhập ngay"}
            </button>
          </form>
        )}

        {/* Form Đăng ký */}
        {tab === "register" && (
          <form onSubmit={handleDangKy} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-[rgba(240,216,144,0.8)] mb-1">
                  Họ
                </label>
                <input
                  type="text"
                  value={regHo}
                  onChange={(e) => setRegHo(e.target.value)}
                  placeholder="Nguyễn"
                  className="input-warm w-full px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[rgba(240,216,144,0.8)] mb-1">
                  Tên
                </label>
                <input
                  type="text"
                  value={regTen}
                  onChange={(e) => setRegTen(e.target.value)}
                  placeholder="Văn A"
                  className="input-warm w-full px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[rgba(240,216,144,0.8)] mb-1">
                Tên tài khoản <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <User
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(200,136,42,0.6)]"
                />
                <input
                  type="text"
                  value={regTaiKhoan}
                  onChange={(e) => setRegTaiKhoan(e.target.value)}
                  placeholder="nguyenvana"
                  className="input-warm w-full pl-8 pr-3 py-2 text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[rgba(240,216,144,0.8)] mb-1">
                Số điện thoại <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Phone
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(200,136,42,0.6)]"
                />
                <input
                  type="tel"
                  value={regSdt}
                  onChange={(e) => setRegSdt(e.target.value)}
                  placeholder="0912345678"
                  className="input-warm w-full pl-8 pr-3 py-2 text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[rgba(240,216,144,0.8)] mb-1">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(200,136,42,0.6)]"
                />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="input-warm w-full pl-8 pr-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[rgba(240,216,144,0.8)] mb-1">
                Mật khẩu (tối thiểu 8 ký tự){" "}
                <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(200,136,42,0.6)]"
                />
                <input
                  type={hienRegMK ? "text" : "password"}
                  value={regMatKhau}
                  onChange={(e) => setRegMatKhau(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="input-warm w-full pl-8 pr-8 py-2 text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setHienRegMK(!hienRegMK)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[rgba(200,136,42,0.6)] hover:text-amber-300"
                >
                  {hienRegMK ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[rgba(240,216,144,0.8)] mb-1">
                Xác nhận mật khẩu <span className="text-amber-400">*</span>
              </label>
              <input
                type={hienRegMK ? "text" : "password"}
                value={regXacNhanMK}
                onChange={(e) => setRegXacNhanMK(e.target.value)}
                placeholder="Nhập lại mật khẩu..."
                className="input-warm w-full px-3 py-2 text-xs"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 rounded-xl text-xs font-semibold mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Đang tạo tài khoản..." : "Đăng ký thành viên"}
            </button>
          </form>
        )}

        {/* Tài khoản mẫu đăng nhập nhanh */}
        {tab === "login" && (
          <div className="mt-5 pt-3 border-t border-[rgba(200,136,42,0.12)]">
            <p className="text-[11px] text-[rgba(240,216,144,0.4)] text-center mb-2 font-medium">
              Tài khoản thử nghiệm nhanh:
            </p>
            <div className="flex justify-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => handleDienNhanh("admin", "12345678")}
                className="text-[11px] px-2.5 py-1 rounded bg-[rgba(200,136,42,0.1)] border border-[rgba(200,136,42,0.25)] text-amber-200/80 hover:bg-amber-500/20 transition-colors"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleDienNhanh("quanly", "12345678")}
                className="text-[11px] px-2.5 py-1 rounded bg-[rgba(200,136,42,0.1)] border border-[rgba(200,136,42,0.25)] text-amber-200/80 hover:bg-amber-500/20 transition-colors"
              >
                Quản lý
              </button>
              <button
                type="button"
                onClick={() => handleDienNhanh("nhanvien", "12345678")}
                className="text-[11px] px-2.5 py-1 rounded bg-[rgba(200,136,42,0.1)] border border-[rgba(200,136,42,0.25)] text-amber-200/80 hover:bg-amber-500/20 transition-colors"
              >
                Nhân viên
              </button>
            </div>
          </div>
        )}

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

export default TrangXacThuc;
