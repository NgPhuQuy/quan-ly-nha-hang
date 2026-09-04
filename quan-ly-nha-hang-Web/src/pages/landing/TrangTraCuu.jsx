import { useTraCuuDatLich } from "../../hooks/useTraCuuDatLich";
import {
  ArrowLeft,
  Search,
  MapPin,
  Calendar,
  Clock,
  Users,
  User,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function TrangTraCuu({ onQuayLai }) {
  const {
    bookingCode,
    setBookingCode,
    loading,
    cancelling,
    booking,
    notFound,
    handleTraCuu,
    handleHuyDatLich,
  } = useTraCuuDatLich();

  const isCancelled =
    booking?.status === "Đã huỷ" ||
    booking?.trangThai === "Đã huỷ" ||
    booking?.rawTrangThai === "DA_HUY";

  return (
    <div className="min-h-screen bg-[#0a0704] text-amber-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-[rgba(12,9,5,0.96)] backdrop-blur-md px-4 py-3.5 sm:px-6">
        <div className="mx-auto flex max-w-4xl justify-between items-center">
          <button
            onClick={onQuayLai}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-200/80 hover:text-amber-300 transition-colors group"
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
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-lg w-full px-4 py-10 flex-1">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Search size={12} />
            <span>Tra Cứu Trực Tuyến</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
            Tra Cứu Thông Tin Đặt Chỗ
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/60 font-light max-w-sm mx-auto">
            Nhập mã đặt bàn của quý khách để kiểm tra lịch hẹn, thực đơn đặt
            trước và trạng thái phục vụ.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="flex gap-2 p-2 rounded-2xl bg-black/40 border border-amber-500/30 shadow-xl backdrop-blur-md">
          <input
            className="w-full bg-transparent px-3.5 py-2 text-sm text-amber-100 placeholder:text-amber-200/30 outline-none font-mono"
            value={bookingCode}
            onChange={(e) => setBookingCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTraCuu()}
            placeholder="Ví dụ: LDELICE-2026-1234 hoặc BK-1"
          />
          <button
            onClick={handleTraCuu}
            disabled={loading || !bookingCode.trim()}
            className="btn-primary rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold disabled:opacity-50 flex items-center gap-1.5 shrink-0 shadow-md shadow-amber-900/30 hover:scale-105 transition-transform"
          >
            <Search size={14} />
            <span>{loading ? "Đang tìm..." : "Tra cứu"}</span>
          </button>
        </div>

        {/* Not Found Alert */}
        {notFound && (
          <div className="mt-6 rounded-2xl p-4 bg-red-950/20 border border-red-500/30 text-red-300 text-xs text-center flex items-center justify-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-red-400" />
            <span>
              Không tìm thấy thông tin với mã này. Quý khách vui lòng kiểm tra
              lại mã hoặc liên hệ hotline{" "}
              <strong className="text-amber-300">1800 5678</strong>.
            </span>
          </div>
        )}

        {/* Booking Card Result */}
        {booking && (
          <div className="mt-6 rounded-3xl p-6 bg-gradient-to-b from-[#160f08] to-[#0c0905] border border-amber-500/30 shadow-2xl backdrop-blur-md space-y-4">
            {/* Top Code & Status */}
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
              <div>
                <span className="text-[10px] text-amber-200/50 uppercase tracking-wider block">
                  Mã đặt chỗ
                </span>
                <span className="font-mono text-lg font-bold text-amber-300">
                  {booking.id || booking.maDatLich || bookingCode}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  isCancelled
                    ? "bg-red-950/60 text-red-400 border border-red-500/40"
                    : "bg-emerald-950/60 text-emerald-400 border border-emerald-500/40"
                }`}
              >
                {isCancelled ? (
                  <XCircle size={13} />
                ) : (
                  <CheckCircle2 size={13} />
                )}
                <span>{booking.status || booking.trangThai}</span>
              </span>
            </div>

            {/* Info Grid */}
            <div className="space-y-3 text-xs">
              {booking.branch && (
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <MapPin
                    size={15}
                    className="text-amber-400 shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="text-[10px] text-amber-200/40 uppercase block">
                      Chi nhánh
                    </span>
                    <span className="font-serif text-sm font-bold text-amber-100">
                      {booking.branch}
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Calendar size={14} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-amber-200/40 uppercase block">
                      Ngày hẹn
                    </span>
                    <span className="font-semibold text-amber-100 font-mono">
                      {booking.date || "Hôm nay"}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Clock size={14} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-amber-200/40 uppercase block">
                      Khung giờ
                    </span>
                    <span className="font-semibold text-amber-100 font-mono">
                      {booking.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Users size={14} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-amber-200/40 uppercase block">
                      Số lượng
                    </span>
                    <span className="font-semibold text-amber-100">
                      {booking.guests} khách
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <User size={14} className="text-amber-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-amber-200/40 uppercase block">
                      Khách hàng
                    </span>
                    <span className="font-semibold text-amber-100 truncate block">
                      {booking.customer}
                    </span>
                  </div>
                </div>
              </div>

              {booking.table && booking.table !== "—" && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/15 border border-amber-500/30">
                  <span className="text-xs font-semibold text-amber-200">
                    Bàn đã chuẩn bị:
                  </span>
                  <span className="font-serif text-sm font-bold text-amber-300">
                    Bàn {booking.table}
                  </span>
                </div>
              )}

              {/* Pre-ordered items */}
              {booking.listDatTruoc && booking.listDatTruoc.length > 0 && (
                <div className="pt-3 border-t border-amber-500/15 space-y-2">
                  <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                    Món ăn đặt trước ({booking.listDatTruoc.length}):
                  </div>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {booking.listDatTruoc.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs text-amber-200/80 p-2 rounded-lg bg-white/5"
                      >
                        <span>
                          {item.tenMatHang || `Món #${item.maMatHang}`}
                        </span>
                        <span className="font-bold text-amber-400">
                          ×{item.soLuong}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {booking.note && (
                <div className="pt-2 text-[11px] text-amber-200/60 italic">
                  Ghi chú: {booking.note}
                </div>
              )}
            </div>

            {/* Cancel booking action */}
            {!isCancelled && (
              <div className="pt-4 border-t border-amber-500/20">
                <button
                  onClick={handleHuyDatLich}
                  disabled={cancelling}
                  className="w-full py-3 rounded-2xl text-xs font-bold border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  {cancelling ? "Đang xử lý..." : "Hủy lịch đặt bàn này"}
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-500/10 bg-[#080503] py-4 text-center text-xs text-amber-200/40">
        <p>
          © {new Date().getFullYear()} L'Délice Restaurant Group. Hotline CSKH:
          1800 5678
        </p>
      </footer>
    </div>
  );
}

export default TrangTraCuu;
