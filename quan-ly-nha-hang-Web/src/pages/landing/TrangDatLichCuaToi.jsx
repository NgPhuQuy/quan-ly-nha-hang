import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  UtensilsCrossed,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  PlusCircle,
} from "lucide-react";
import { danhSachDatLichCuaToi, huyDatLich } from "../../services/datLich.service";
import { layDanhSachChiNhanhPublic } from "../../services/chiNhanh.service";

const dinhDangTien = (soTien) => {
  if (soTien == null) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(soTien);
};

const dinhDangNgay = (chuoiNgay) => {
  if (!chuoiNgay) return "—";
  try {
    const d = new Date(chuoiNgay);
    return d.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return chuoiNgay;
  }
};

function TrangDatLichCuaToi({ onQuayLai, onDatBan }) {
  const [danhSach, setDanhSach] = useState([]);
  const [chiNhanhMap, setChiNhanhMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [dangHuyId, setDangHuyId] = useState(null);
  const [thongBaoLoi, setThongBaoLoi] = useState("");
  const [boLoc, setBoLoc] = useState("ALL");

  const taiDuLieu = async () => {
    setLoading(true);
    setThongBaoLoi("");
    try {
      const [dsDatLich, dsChiNhanh] = await Promise.all([
        danhSachDatLichCuaToi().catch((err) => {
          console.error("Lỗi lấy danh sách đặt lịch:", err);
          return [];
        }),
        layDanhSachChiNhanhPublic().catch(() => []),
      ]);

      const mapCN = {};
      if (Array.isArray(dsChiNhanh)) {
        dsChiNhanh.forEach((cn) => {
          mapCN[cn.maChiNhanh] = cn;
        });
      }
      setChiNhanhMap(mapCN);
      setDanhSach(Array.isArray(dsDatLich) ? dsDatLich : []);
    } catch (err) {
      console.error(err);
      setThongBaoLoi("Không thể tải danh sách đặt lịch. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    taiDuLieu();
  }, []);

  const handleHuyDatLich = async (maDatLich) => {
    if (!window.confirm("Quý khách có chắc chắn muốn hủy đơn đặt lịch này?")) {
      return;
    }
    setDangHuyId(maDatLich);
    try {
      await huyDatLich(maDatLich);
      setDanhSach((prev) =>
        prev.map((item) =>
          item.maDatLich === maDatLich
            ? { ...item, trangThai: "DA_HUY" }
            : item
        )
      );
      alert("Đã hủy đơn đặt lịch thành công!");
    } catch (err) {
      console.error("Lỗi khi hủy đặt lịch:", err);
      const msg =
        err.response?.data?.message ||
        "Không thể hủy đặt lịch (Có thể do đã quá sát giờ hẹn).";
      alert(msg);
    } finally {
      setDangHuyId(null);
    }
  };

  const danhSachLoc = danhSach.filter((item) => {
    if (boLoc === "DA_XAC_NHAN") return item.trangThai === "DA_XAC_NHAN";
    if (boLoc === "DA_HUY") return item.trangThai === "DA_HUY";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0a0704] text-amber-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-[rgba(12,9,5,0.96)] backdrop-blur-md px-4 py-3.5 sm:px-6">
        <div className="mx-auto flex max-w-5xl justify-between items-center">
          <button
            onClick={onQuayLai}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-200/80 hover:text-amber-300 transition-colors group cursor-pointer"
          >
            <ArrowLeft
              size={16}
              className="text-amber-400 group-hover:-translate-x-1 transition-transform"
            />
            <span>Quay lại trang chủ</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-md">
              <Sparkles size={15} />
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-amber-100 block">
                L'DÉLICE
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400/80 font-serif block -mt-1">
                Haute Gastronomie
              </span>
            </div>
          </div>

          <button
            onClick={onDatBan}
            className="btn-primary rounded-xl px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform cursor-pointer"
          >
            <PlusCircle size={14} />
            <span className="hidden sm:inline">Đặt bàn mới</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl w-full px-4 py-8 sm:py-10 flex-1">
        {/* Title & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calendar size={12} />
              <span>Quản Lý Lịch Hẹn</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
              Lịch Đặt Bàn Của Tôi
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/60 mt-1">
              Xem lại danh sách lịch hẹn và thực đơn đã đăng ký trước tại L'Délice.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={taiDuLieu}
              disabled={loading}
              className="p-2 rounded-xl bg-white/5 border border-amber-500/20 hover:bg-amber-500/10 text-amber-300 transition-colors cursor-pointer"
              title="Tải lại danh sách"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-amber-500/15 pb-3 overflow-x-auto">
          {[
            { id: "ALL", label: "Tất cả", count: danhSach.length },
            {
              id: "DA_XAC_NHAN",
              label: "Đã xác nhận",
              count: danhSach.filter((i) => i.trangThai === "DA_XAC_NHAN").length,
            },
            {
              id: "DA_HUY",
              label: "Đã hủy",
              count: danhSach.filter((i) => i.trangThai === "DA_HUY").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setBoLoc(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                boLoc === tab.id
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/20 font-bold"
                  : "bg-white/5 text-amber-200/70 hover:bg-amber-500/10 hover:text-amber-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  boLoc === tab.id
                    ? "bg-black/30 text-black font-bold"
                    : "bg-white/10 text-amber-300"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Error Alert */}
        {thongBaoLoi && (
          <div className="mb-6 rounded-2xl p-4 bg-red-950/20 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-red-400" />
            <span>{thongBaoLoi}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw
              size={32}
              className="animate-spin text-amber-400 mx-auto opacity-70"
            />
            <p className="text-sm text-amber-200/60 font-medium">
              Đang tải danh sách đặt lịch của quý khách...
            </p>
          </div>
        ) : danhSachLoc.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-4 text-center rounded-3xl bg-black/40 border border-amber-500/20 max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
              <Calendar size={28} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-amber-100">
                Chưa có lịch đặt bàn nào
              </h3>
              <p className="text-xs text-amber-200/60 leading-relaxed">
                {boLoc === "ALL"
                  ? "Quý khách chưa thực hiện đặt bàn nào. Hãy trải nghiệm ẩm thực tinh hoa tại L'Délice ngay hôm nay!"
                  : "Không có lịch đặt nào phù hợp với bộ lọc hiện tại."}
              </p>
            </div>
            {boLoc === "ALL" && (
              <button
                onClick={onDatBan}
                className="btn-primary rounded-xl px-6 py-2.5 text-xs font-bold shadow-lg inline-flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
              >
                <PlusCircle size={15} />
                <span>Đặt bàn ngay</span>
              </button>
            )}
          </div>
        ) : (
          /* Booking List Cards */
          <div className="space-y-4">
            {danhSachLoc.map((item) => {
              const chiNhanh = chiNhanhMap[item.maChiNhanh];
              const daHuy = item.trangThai === "DA_HUY";
              const dangXuLyHuy = dangHuyId === item.maDatLich;

              return (
                <div
                  key={item.maDatLich}
                  className="rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#160f08] to-[#0c0905] border border-amber-500/25 shadow-xl hover:border-amber-500/40 transition-all space-y-4"
                >
                  {/* Top: Code & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-500/15">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-base font-bold text-amber-300">
                        #BK-{item.maDatLich}
                      </span>
                      <span className="text-[11px] text-amber-200/50">
                        • Mã đặt lịch
                      </span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                        daHuy
                          ? "bg-red-950/60 text-red-400 border border-red-500/40"
                          : "bg-emerald-950/60 text-emerald-400 border border-emerald-500/40"
                      }`}
                    >
                      {daHuy ? (
                        <XCircle size={13} />
                      ) : (
                        <CheckCircle2 size={13} />
                      )}
                      <span>
                        {daHuy
                          ? "Đã hủy"
                          : item.trangThai === "DA_XAC_NHAN"
                          ? "Đã xác nhận"
                          : item.trangThai || "Đã xác nhận"}
                      </span>
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {/* Branch */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                      <MapPin
                        size={16}
                        className="text-amber-400 shrink-0 mt-0.5"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] text-amber-200/50 uppercase block">
                          Chi nhánh
                        </span>
                        <p className="font-serif font-bold text-amber-100 truncate">
                          {chiNhanh?.tenChiNhanh || `Chi nhánh #${item.maChiNhanh}`}
                        </p>
                        {chiNhanh?.diaChi && (
                          <p className="text-[11px] text-amber-200/60 truncate mt-0.5">
                            {chiNhanh.diaChi}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                      <Calendar
                        size={16}
                        className="text-amber-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="text-[10px] text-amber-200/50 uppercase block">
                          Ngày hẹn
                        </span>
                        <p className="font-semibold text-amber-100 font-mono text-sm">
                          {dinhDangNgay(item.ngay)}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                      <Clock
                        size={16}
                        className="text-amber-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="text-[10px] text-amber-200/50 uppercase block">
                          Khung giờ
                        </span>
                        <p className="font-semibold text-amber-100 font-mono text-sm">
                          {item.gio ? String(item.gio).slice(0, 5) : "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pre-ordered Items */}
                  {Array.isArray(item.listDatTruoc) &&
                    item.listDatTruoc.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-black/30 border border-amber-500/15 space-y-2">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                          <UtensilsCrossed size={13} className="text-amber-400" />
                          <span>
                            Món đã đăng ký trước ({item.listDatTruoc.length} món)
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {item.listDatTruoc.map((dt, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/5"
                            >
                              <div className="truncate pr-2">
                                <span className="font-medium text-amber-100">
                                  {dt.matHang?.tenMatHang ||
                                    dt.tenMatHang ||
                                    `Món #${dt.maMatHang || idx + 1}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="font-bold text-amber-400 font-mono">
                                  ×{dt.soLuong}
                                </span>
                                {dt.donGia != null && (
                                  <span className="text-[11px] text-amber-200/60 font-mono">
                                    {dinhDangTien(dt.donGia)}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Note */}
                  {item.ghiChu && (
                    <div className="text-xs text-amber-200/70 italic px-1">
                      <span className="text-amber-400 font-semibold not-italic">
                        Ghi chú:{" "}
                      </span>
                      {item.ghiChu}
                    </div>
                  )}

                  {/* Footer Action */}
                  {!daHuy && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleHuyDatLich(item.maDatLich)}
                        disabled={dangXuLyHuy}
                        className="px-4 py-2 rounded-xl text-xs font-bold border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {dangXuLyHuy ? "Đang hủy..." : "Hủy lịch đặt bàn"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-500/10 bg-[#080503] py-4 text-center text-xs text-amber-200/40">
        <p>
          © {new Date().getFullYear()} L'Délice Restaurant Group. Hotline CSKH:{" "}
          <strong className="text-amber-300">1800 5678</strong>
        </p>
      </footer>
    </div>
  );
}

export default TrangDatLichCuaToi;

