function BookingSummary({
  branch,
  date,
  time,
  guestCount,
  selectedItems,
  selectedServices,
  menuItems,
  additionalServices,
}) {
  const totalAmount =
    selectedItems.reduce(
      (total, item) =>
        total +
        (menuItems.find((menuItem) => menuItem.id === item.monAnId)?.gia || 0) *
          item.soLuong,
      0,
    ) +
    selectedServices.reduce(
      (total, id) =>
        total +
        (additionalServices.find((service) => service.id === id)?.gia || 0),
      0,
    );

  const branchName = branch?.tenChiNhanh || branch?.ten || "Chưa chọn";

  return (
    <aside className="card-warm rounded-2xl p-4 lg:sticky lg:top-24">
      <p
        className="mb-4 text-xs uppercase tracking-[.15em]"
        style={{ color: "rgba(200,136,42,.55)" }}
      >
        Tóm tắt đặt bàn
      </p>
      <div className="space-y-3 text-sm">
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Chi nhánh
          </span>
          <span className="font-medium">{branchName}</span>
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Ngày đặt
          </span>
          <span>{date || "Chưa chọn"}</span>
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Khung giờ
          </span>
          <span>{time || "Chưa chọn"}</span>
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Số lượng khách
          </span>
          <span>{guestCount} khách</span>
        </div>
      </div>
      {totalAmount > 0 && (
        <div
          className="mt-5 border-t pt-4"
          style={{ borderColor: "rgba(200,136,42,.1)" }}
        >
          <span
            className="text-xs block mb-1"
            style={{ color: "rgba(240,216,144,.45)" }}
          >
            Món & dịch vụ đặt trước:
          </span>
          <span
            className="text-base font-serif font-semibold"
            style={{ color: "rgba(232,184,75,.95)" }}
          >
            {totalAmount.toLocaleString("vi-VN")}₫
          </span>
        </div>
      )}
    </aside>
  );
}
export default BookingSummary;
