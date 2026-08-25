import { CHI_NHANH_MAU } from "../../data/chiNhanh";
import { DICH_VU_BO_SUNG, MON_AN } from "../../data/datBan";

function TomTatDatBan({ chiNhanh, ngay, gio, soKhach, monAn, dichVuBoSung }) {
  const thongTinChiNhanh = CHI_NHANH_MAU.find((mau) => mau.id === chiNhanh);
  const tongTien =
    monAn.reduce(
      (tong, mon) =>
        tong +
        (MON_AN.find((m) => m.id === mon.monAnId)?.gia || 0) * mon.soLuong,
      0,
    ) +
    dichVuBoSung.reduce(
      (tong, id) => tong + (DICH_VU_BO_SUNG.find((m) => m.id === id)?.gia || 0),
      0,
    );
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
          {thongTinChiNhanh?.ten || "Chưa chọn"}
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Ngày
          </span>
          {ngay || "Chưa chọn"}
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Giờ
          </span>
          {gio || "Chưa chọn"}
        </div>
        <div>
          <span
            className="block text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            Số khách
          </span>
          {soKhach} người
        </div>
      </div>
      {tongTien > 0 && (
        <div
          className="mt-5 border-t pt-4"
          style={{ borderColor: "rgba(200,136,42,.1)" }}
        >
          <span className="text-xs" style={{ color: "rgba(240,216,144,.45)" }}>
            Món và dịch vụ:{" "}
          </span>
          <span className="text-sm">{tongTien.toLocaleString("vi-VN")}₫</span>
        </div>
      )}
    </aside>
  );
}
export default TomTatDatBan;
