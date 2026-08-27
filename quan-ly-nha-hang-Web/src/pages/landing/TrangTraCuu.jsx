import { useTraCuuDatLich } from "../../hooks/useTraCuuDatLich";

function TrangTraCuu({ onBack }) {
  const {
    bookingCode,
    setBookingCode,
    loading,
    booking,
    notFound,
    searchBooking,
  } = useTraCuuDatLich();

  return (
    <div className="min-h-screen bg-[var(--color-warm-black)]">
      <header className="border-b border-[rgba(200,136,42,.18)] bg-[rgba(10,7,4,.96)] px-4 py-4">
        <div className="mx-auto flex max-w-4xl justify-between">
          <button onClick={onBack} style={{ color: "rgba(200,136,42,.65)" }}>
            ← 5S Dining
          </button>
          <span
            className="font-serif"
            style={{ color: "rgba(240,216,144,.62)" }}
          >
            Find my booking
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-md px-4 py-16">
        <h1
          className="text-center font-serif text-3xl"
          style={{ color: "rgba(240,216,144,.88)" }}
        >
          Find my booking
        </h1>
        <p
          className="mt-2 text-center text-sm"
          style={{ color: "rgba(240,216,144,.42)" }}
        >
          Enter your booking reference to check its status.
        </p>
        <div className="mt-8 flex gap-2">
          <input
            className="input-warm px-4 py-3"
            value={bookingCode}
            onChange={(event) => setBookingCode(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && searchBooking()}
            placeholder="Example: 5S-2026-1234"
          />
          <button
            onClick={searchBooking}
            disabled={loading || !bookingCode.trim()}
            className="btn-primary rounded-xl px-5 disabled:opacity-50"
          >
            {loading ? "..." : "Search"}
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
            No booking was found with this reference. Check the code or contact
            the restaurant.
          </div>
        )}

        {booking && (
          <div className="card-warm mt-6 rounded-2xl p-5">
            <div className="flex justify-between">
              <span className="opacity-50">Booking reference</span>
              <span>{booking.maDatLich || bookingCode}</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="opacity-50">Status</span>
              <span style={{ color: "#7ecb96" }}>{booking.trangThai}</span>
            </div>
            {booking.tenChiNhanh && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Branch</span>
                <span>{booking.tenChiNhanh}</span>
              </div>
            )}
            {booking.ngay && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Date</span>
                <span>{booking.ngay}</span>
              </div>
            )}
            {booking.gio && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Time</span>
                <span>{booking.gio}</span>
              </div>
            )}
            {booking.soKhach !== "" && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Guests</span>
                <span>{booking.soKhach}</span>
              </div>
            )}
            {booking.hoTen && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Guest name</span>
                <span>{booking.hoTen}</span>
              </div>
            )}
            {booking.ghiChu && (
              <div
                className="mt-4 border-t pt-4 text-xs opacity-60"
                style={{ borderColor: "rgba(200,136,42,.1)" }}
              >
                Notes: {booking.ghiChu}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
export default TrangTraCuu;
