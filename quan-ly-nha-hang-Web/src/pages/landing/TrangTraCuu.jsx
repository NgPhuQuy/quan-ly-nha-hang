import { useTraCuuDatLich } from "../../hooks/useTraCuuDatLich";

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
    <div className="min-h-screen bg-[var(--color-warm-black)]">
      <header className="border-b border-[rgba(200,136,42,.18)] bg-[rgba(10,7,4,.96)] px-4 py-4">
        <div className="mx-auto flex max-w-4xl justify-between items-center">
          <button
            onClick={onQuayLai}
            style={{ color: "rgba(200,136,42,.65)" }}
            className="hover:text-amber-300 transition-colors text-sm font-medium"
          >
            ← 5S Dining
          </button>
          <span
            className="font-serif font-medium"
            style={{ color: "rgba(240,216,144,.85)" }}
          >
            Tra cứu đặt bàn
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-12">
        <h1
          className="text-center font-serif text-2xl md:text-3xl font-bold"
          style={{ color: "rgba(240,216,144,.88)" }}
        >
          Tra cứu thông tin đặt chỗ
        </h1>
        <p
          className="mt-2 text-center text-xs md:text-sm"
          style={{ color: "rgba(240,216,144,.5)" }}
        >
          Nhập mã đặt bàn của quý khách để kiểm tra trạng thái và thông tin bàn
          phục vụ.
        </p>

        <div className="mt-6 flex gap-2">
          <input
            className="input-warm px-4 py-2.5 text-sm flex-1"
            value={bookingCode}
            onChange={(event) => setBookingCode(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleTraCuu()}
            placeholder="Ví dụ: 5S-2026-1234 hoặc BK-1"
          />
          <button
            onClick={handleTraCuu}
            disabled={loading || !bookingCode.trim()}
            className="btn-primary rounded-xl px-5 text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "..." : "Tìm kiếm"}
          </button>
        </div>

        {notFound && (
          <div
            className="mt-6 rounded-2xl p-5 text-center text-sm"
            style={{
              background: "rgba(160,55,55,.1)",
              border: "1px solid rgba(160,55,55,.35)",
              color: "rgba(240,180,180,.85)",
            }}
          >
            Không tìm thấy thông tin đặt chỗ với mã này. Quý khách vui lòng kiểm
            tra lại mã hoặc liên hệ hotline nhà hàng.
          </div>
        )}

        {booking && (
          <div className="card-warm mt-6 rounded-2xl p-5 text-sm space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-[rgba(200,136,42,.15)]">
              <span className="opacity-50">Mã đặt chỗ</span>
              <span className="font-bold text-amber-300 font-mono text-base">
                {booking.id || booking.maDatLich || bookingCode}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="opacity-50">Trạng thái</span>
              <span
                style={{
                  color: isCancelled ? "#ef4444" : "#7ecb96",
                }}
                className="font-semibold px-2 py-0.5 rounded text-xs"
              >
                {booking.status || booking.trangThai}
              </span>
            </div>

            {booking.branch && (
              <div className="flex justify-between">
                <span className="opacity-50">Chi nhánh</span>
                <span className="font-medium text-right">{booking.branch}</span>
              </div>
            )}

            {booking.date && (
              <div className="flex justify-between">
                <span className="opacity-50">Ngày & Giờ</span>
                <span className="font-medium">
                  {booking.date} lúc {booking.time}
                </span>
              </div>
            )}

            {booking.guests && (
              <div className="flex justify-between">
                <span className="opacity-50">Số lượng khách</span>
                <span className="font-medium">{booking.guests} khách</span>
              </div>
            )}

            {booking.customer && (
              <div className="flex justify-between">
                <span className="opacity-50">Khách hàng</span>
                <span className="font-medium">{booking.customer}</span>
              </div>
            )}

            {booking.phone && (
              <div className="flex justify-between">
                <span className="opacity-50">Số điện thoại</span>
                <span className="font-mono">{booking.phone}</span>
              </div>
            )}

            {booking.table && booking.table !== "—" && (
              <div className="flex justify-between items-center bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                <span className="opacity-70 text-xs">Bàn đã gán</span>
                <span className="font-bold text-amber-300">
                  Bàn {booking.table}
                </span>
              </div>
            )}

            {booking.listDatTruoc && booking.listDatTruoc.length > 0 && (
              <div className="mt-3 pt-3 border-t border-[rgba(200,136,42,.15)]">
                <div className="text-xs font-semibold text-amber-200/70 mb-2">
                  Món ăn đặt trước:
                </div>
                <div className="space-y-1.5 text-xs">
                  {booking.listDatTruoc.map((item, idx) => (
                    <div key={idx} className="flex justify-between opacity-85">
                      <span>{item.tenMatHang || `Món #${item.maMatHang}`}</span>
                      <span className="font-semibold">×{item.soLuong}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {booking.note && (
              <div
                className="mt-3 border-t pt-3 text-xs opacity-60"
                style={{ borderColor: "rgba(200,136,42,.1)" }}
              >
                Ghi chú: {booking.note}
              </div>
            )}

            {!isCancelled && (
              <div className="pt-3 border-t border-[rgba(200,136,42,.15)]">
                <button
                  onClick={handleHuyDatLich}
                  disabled={cancelling}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  {cancelling ? "Đang xử lý..." : "Hủy đặt bàn này"}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default TrangTraCuu;
