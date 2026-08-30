import { DIP_DAT_BAN } from "../../../data/datBan";

function BookingConfirmation({
  bookingCode,
  branch,
  time,
  date,
  guestCount,
  guestDetails,
  totalAmount,
  onDatLai,
  onVeTrangChu,
}) {
  const branchName = branch?.tenChiNhanh || branch?.ten || "5S Dining";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 text-center">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold"
          style={{
            background: "rgba(74,140,92,.12)",
            border: "2px solid rgba(74,140,92,.4)",
            color: "#4a8c5c",
          }}
        >
          ✓
        </div>
        <h1
          className="mt-5 font-serif text-3xl"
          style={{ color: "rgba(240,216,144,.9)" }}
        >
          Đặt bàn thành công!
        </h1>
        <p className="mt-2 text-sm" style={{ color: "rgba(240,216,144,.42)" }}>
          Mã đặt chỗ của quý khách:{" "}
          <b
            className="text-base tracking-wider"
            style={{ color: "rgba(232,184,75,.95)" }}
          >
            {bookingCode}
          </b>
        </p>
      </div>
      <div className="card-warm rounded-2xl p-5 sm:p-7">
        <div className="grid grid-cols-2 gap-5 text-sm">
          <div>
            <span className="block text-xs opacity-40">Chi nhánh</span>
            <span className="font-medium">{branchName}</span>
          </div>
          <div>
            <span className="block text-xs opacity-40">Khung giờ</span>
            <span className="font-medium">{time}</span>
          </div>
          <div>
            <span className="block text-xs opacity-40">Ngày đặt</span>
            <span className="font-medium">{date}</span>
          </div>
          <div>
            <span className="block text-xs opacity-40">Số lượng khách</span>
            <span className="font-medium">{guestCount} khách</span>
          </div>
          <div>
            <span className="block text-xs opacity-40">Tên người đặt</span>
            <span className="font-medium">{guestDetails.hoTen}</span>
          </div>
          <div>
            <span className="block text-xs opacity-40">Số điện thoại</span>
            <span className="font-medium">{guestDetails.soDienThoai}</span>
          </div>
        </div>
        {totalAmount > 0 && (
          <div
            className="mt-6 border-t pt-5"
            style={{ borderColor: "rgba(200,136,42,.1)" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-60">
                Món ăn & dịch vụ đặt trước
              </span>
              <span className="font-serif font-semibold text-amber-300">
                {Number(totalAmount).toLocaleString("vi-VN")}₫
              </span>
            </div>
            {guestDetails.dip !== "khong" && (
              <p className="mt-2 text-xs opacity-50">
                Dịp kỷ niệm:{" "}
                {
                  DIP_DAT_BAN.find(
                    (occasion) => occasion.id === guestDetails.dip,
                  )?.ten
                }
              </p>
            )}
          </div>
        )}
      </div>
      <div className="mt-5 flex gap-3">
        <button onClick={onDatLai} className="btn-ghost flex-1 rounded-xl py-3">
          Đặt thêm bàn khác
        </button>
        <button
          onClick={onVeTrangChu}
          className="btn-primary flex-1 rounded-xl py-3"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmation;
