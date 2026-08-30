import { useTraCuuDatLich } from "../../hooks/useTraCuuDatLich";

function TrangTraCuu({ onQuayLai }) {
  const {
    bookingCode,
    setBookingCode,
    loading,
    booking,
    notFound,
    handleTraCuu,
  } = useTraCuuDatLich();

  return (
    <div className="min-h-screen bg-[var(--color-warm-black)]">
      <header className="border-b border-[rgba(200,136,42,.18)] bg-[rgba(10,7,4,.96)] px-4 py-4">
        <div className="mx-auto flex max-w-4xl justify-between">
          <button onClick={onQuayLai} style={{ color: "rgba(200,136,42,.65)" }} className="hover:text-amber-300 transition-colors">
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
      <main className="mx-auto max-w-md px-4 py-16">
        <h1
          className="text-center font-serif text-3xl"
          style={{ color: "rgba(240,216,144,.88)" }}
        >
          Tra cứu thông tin đặt chỗ
        </h1>
        <p
          className="mt-2 text-center text-sm"
          style={{ color: "rgba(240,216,144,.42)" }}
        >
          Nhập mã đặt bàn của quý khách để kiểm tra trạng thái và thông tin bàn phục vụ.
        </p>
        <div className="mt-8 flex gap-2">
          <input
            className="input-warm px-4 py-3"
            value={bookingCode}
            onChange={(event) => setBookingCode(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && handleTraCuu()}
            placeholder="Ví dụ: 5S-2026-1234 hoặc HD-1234"
          />
          <button
            onClick={handleTraCuu}
            disabled={loading || !bookingCode.trim()}
            className="btn-primary rounded-xl px-5 disabled:opacity-50"
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
            Không tìm thấy thông tin đặt chỗ với mã này. Quý khách vui lòng kiểm tra lại mã hoặc liên hệ hotline nhà hàng.
          </div>
        )}

        {booking && (
          <div className="card-warm mt-6 rounded-2xl p-5">
            <div className="flex justify-between">
              <span className="opacity-50">Mã đặt chỗ</span>
              <span className="font-semibold text-amber-300">{booking.maDatLich || bookingCode}</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="opacity-50">Trạng thái</span>
              <span style={{ color: "#7ecb96" }} className="font-medium">{booking.trangThai}</span>
            </div>
            {booking.tenChiNhanh && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Chi nhánh</span>
                <span>{booking.tenChiNhanh}</span>
              </div>
            )}
            {booking.ngay && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Ngày đặt</span>
                <span>{booking.ngay}</span>
              </div>
            )}
            {booking.gio && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Khung giờ</span>
                <span>{booking.gio}</span>
              </div>
            )}
            {booking.soKhach !== "" && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Số lượng khách</span>
                <span>{booking.soKhach} khách</span>
              </div>
            )}
            {booking.hoTen && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Tên khách hàng</span>
                <span>{booking.hoTen}</span>
              </div>
            )}
            {booking.soDienThoai && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Số điện thoại</span>
                <span>{booking.soDienThoai}</span>
              </div>
            )}
            {booking.soBan && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Bàn phục vụ</span>
                <span style={{ color: "var(--color-primary-gold, #c8882a)" }} className="font-bold">
                  {booking.soBan}
                </span>
              </div>
            )}
            {booking.ghiChu && (
              <div
                className="mt-4 border-t pt-4 text-xs opacity-60"
                style={{ borderColor: "rgba(200,136,42,.1)" }}
              >
                Ghi chú: {booking.ghiChu}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
export default TrangTraCuu;
