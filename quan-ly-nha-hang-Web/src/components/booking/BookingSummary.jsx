// Use the fetched menu and service data from the parent so API ids and prices
// stay consistent instead of relying on static mock data.
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
        total + (menuItems.find((menuItem) => menuItem.id === item.monAnId)?.gia || 0) * item.soLuong,
      0,
    ) +
    selectedServices.reduce(
      (total, id) => total + (additionalServices.find((service) => service.id === id)?.gia || 0),
      0,
    );
  return (
    <aside className="card-warm rounded-2xl p-4 lg:sticky lg:top-24">
      <p
        className="mb-4 text-xs uppercase tracking-[.15em]"
        style={{ color: "rgba(200,136,42,.55)" }}
      >
        Booking summary
      </p>
      <div className="space-y-3 text-sm">
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Branch
          </span>
          {branch?.ten || "Not selected"}
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Date
          </span>
          {date || "Not selected"}
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Time
          </span>
          {time || "Not selected"}
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Guests
          </span>
          {guestCount}
        </div>
      </div>
      {totalAmount > 0 && (
        <div
          className="mt-5 border-t pt-4"
          style={{ borderColor: "rgba(200,136,42,.1)" }}
        >
          <span className="text-xs" style={{ color: "rgba(240,216,144,.45)" }}>
            Pre-orders and extras:{" "}
          </span>
          <span className="text-sm">{totalAmount.toLocaleString("vi-VN")}₫</span>
        </div>
      )}
    </aside>
  );
}
export default BookingSummary;
