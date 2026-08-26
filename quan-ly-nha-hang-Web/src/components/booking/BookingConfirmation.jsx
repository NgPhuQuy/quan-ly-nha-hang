import { DIP_DAT_BAN } from "../../data/booking/datBan";

function BookingConfirmation({
  bookingCode,
  branch,
  time,
  date,
  guestCount,
  guestDetails,
  totalAmount,
  onReset,
  onBackHome,
}) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 text-center">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
          style={{
            background: "rgba(74,140,92,.12)",
            border: "2px solid rgba(74,140,92,.4)",
          }}
        >
          ✓
        </div>
        <h1 className="mt-5 font-serif text-3xl" style={{ color: "rgba(240,216,144,.9)" }}>
          Booking confirmed!
        </h1>
        <p className="mt-2 text-sm" style={{ color: "rgba(240,216,144,.42)" }}>
          Booking reference: <b style={{ color: "rgba(232,184,75,.95)" }}>{bookingCode}</b>
        </p>
      </div>
      <div className="card-warm rounded-2xl p-5 sm:p-7">
        <div className="grid grid-cols-2 gap-5 text-sm">
          <div><span className="block text-xs opacity-40">Branch</span>{branch?.ten}</div>
          <div><span className="block text-xs opacity-40">Time</span>{time}</div>
          <div><span className="block text-xs opacity-40">Date</span>{date}</div>
          <div><span className="block text-xs opacity-40">Guests</span>{guestCount}</div>
          <div><span className="block text-xs opacity-40">Guest name</span>{guestDetails.hoTen}</div>
          <div><span className="block text-xs opacity-40">Phone</span>{guestDetails.soDienThoai}</div>
        </div>
        <div className="mt-6 border-t pt-5" style={{ borderColor: "rgba(200,136,42,.1)" }}>
          <div className="flex justify-between">
            <span className="text-sm opacity-50">Pre-orders and extras</span>
            <span>{totalAmount.toLocaleString("vi-VN")}₫</span>
          </div>
          {guestDetails.dip !== "khong" && (
            <p className="mt-2 text-xs opacity-50">
              Occasion: {DIP_DAT_BAN.find((occasion) => occasion.id === guestDetails.dip)?.ten}
            </p>
          )}
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button onClick={onReset} className="btn-ghost flex-1 rounded-xl py-3">Make another booking</button>
        <button onClick={onBackHome} className="btn-primary flex-1 rounded-xl py-3">Back to home</button>
      </div>
    </div>
  );
}

export default BookingConfirmation;
