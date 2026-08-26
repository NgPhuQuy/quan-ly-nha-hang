import { useBookingLookup } from "../hooks/useBookingLookup";

function BookingLookupPage({ onBack }) {
  const {
    bookingCode: maDatBan,
    setBookingCode: setMaDatBan,
    loading: dangTai,
    booking: ketQua,
    notFound: khongTimThay,
    searchBooking: traCuu,
  } = useBookingLookup();

  return (
    <div className="min-h-screen bg-[var(--color-warm-black)]">
      <header className="border-b border-[rgba(200,136,42,.18)] bg-[rgba(10,7,4,.96)] px-4 py-4">
        <div className="mx-auto flex max-w-4xl justify-between">
          <button
            onClick={onBack}
            style={{ color: "rgba(200,136,42,.65)" }}
          >
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
            value={maDatBan}
            onChange={(event) => setMaDatBan(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && traCuu()}
            placeholder="Example: 5S-2026-1234"
          />
          <button
            onClick={traCuu}
            disabled={dangTai || !maDatBan.trim()}
            className="btn-primary rounded-xl px-5 disabled:opacity-50"
          >
            {dangTai ? "..." : "Search"}
          </button>
        </div>

        {khongTimThay && (
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

        {ketQua && (
          <div className="card-warm mt-6 rounded-2xl p-5">
            <div className="flex justify-between">
              <span className="opacity-50">Booking reference</span>
              <span>{ketQua.maDatLich || maDatBan}</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="opacity-50">Status</span>
              <span style={{ color: "#7ecb96" }}>{ketQua.trangThai}</span>
            </div>
            {ketQua.tenChiNhanh && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Branch</span>
                <span>{ketQua.tenChiNhanh}</span>
              </div>
            )}
            {ketQua.ngay && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Date</span>
                <span>{ketQua.ngay}</span>
              </div>
            )}
            {ketQua.gio && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Time</span>
                <span>{ketQua.gio}</span>
              </div>
            )}
            {ketQua.soKhach !== "" && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Guests</span>
                <span>{ketQua.soKhach}</span>
              </div>
            )}
            {ketQua.hoTen && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Booked by</span>
                <span>{ketQua.hoTen}</span>
              </div>
            )}
            {ketQua.ghiChu && (
              <div
                className="mt-4 border-t pt-4 text-xs opacity-60"
                style={{ borderColor: "rgba(200,136,42,.1)" }}
              >
                Notes: {ketQua.ghiChu}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
export default BookingLookupPage;
