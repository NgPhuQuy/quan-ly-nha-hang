// Nhận `danhSachMonAn`/`danhSachDichVu` (data thật đã fetch ở trang cha) thay
// vì tự import mock tĩnh ở đây — cùng lý do đã sửa bug với chi nhánh trước đó:
// mock và API có thể khác id, tự tra mock sẽ tính sai giá.
function BookingSummary({
  thongTinChiNhanh,
  ngay,
  gio,
  soKhach,
  monAn,
  dichVuBoSung,
  danhSachMonAn,
  danhSachDichVu,
}) {
  const tongTien =
    monAn.reduce(
      (tong, mon) =>
        tong +
        (danhSachMonAn.find((m) => m.id === mon.monAnId)?.gia || 0) *
          mon.soLuong,
      0,
    ) +
    dichVuBoSung.reduce(
      (tong, id) => tong + (danhSachDichVu.find((m) => m.id === id)?.gia || 0),
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
          {thongTinChiNhanh?.ten || "Not selected"}
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Date
          </span>
          {ngay || "Not selected"}
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Time
          </span>
          {gio || "Not selected"}
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Guests
          </span>
          {soKhach}
        </div>
      </div>
      {tongTien > 0 && (
        <div
          className="mt-5 border-t pt-4"
          style={{ borderColor: "rgba(200,136,42,.1)" }}
        >
          <span className="text-xs" style={{ color: "rgba(240,216,144,.45)" }}>
            Food and services:{" "}
          </span>
          <span className="text-sm">{tongTien.toLocaleString("vi-VN")}₫</span>
        </div>
      )}
    </aside>
  );
}
export default BookingSummary;
