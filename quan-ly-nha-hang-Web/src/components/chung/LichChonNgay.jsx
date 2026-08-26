import { useState } from "react";
import { kem, vienVangNhat } from "../../themes";

// Lịch chọn ngày theo đúng tông màu 5S — thay cho <input type="date"> mặc định
// trình duyệt (mỗi trình duyệt hiện 1 kiểu khác nhau, phá tông màu tối).
// Không hiển thị chấm "ngày đông khách" như bản Figma vì backend hiện chưa có
// API trạng thái từng ngày — chỉ khóa ngày trong quá khứ.
function LichChonNgay({ value, onChange }) {
  const homNay = new Date();
  homNay.setHours(0, 0, 0, 0);
  const [thangXem, setThangXem] = useState(
    new Date(homNay.getFullYear(), homNay.getMonth(), 1),
  );
  const nam = thangXem.getFullYear();
  const thang = thangXem.getMonth();
  const ngayDauTuan = (new Date(nam, thang, 1).getDay() + 6) % 7;
  const soNgayTrongThang = new Date(nam, thang + 1, 0).getDate();
  const cacO = [
    ...Array(ngayDauTuan).fill(null),
    ...Array.from({ length: soNgayTrongThang }, (_, i) => i + 1),
  ];
  while (cacO.length % 7 !== 0) cacO.push(null);

  const ngayDaChon = value ? new Date(value + "T00:00").getDate() : null;
  const thangDaChon = value ? new Date(value + "T00:00").getMonth() : null;
  const namDaChon = value ? new Date(value + "T00:00").getFullYear() : null;

  const TEN_THANG = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
  ];

  const chonNgay = (ngay) => {
    const ngayThuc = new Date(nam, thang, ngay);
    if (ngayThuc < homNay) return;
    onChange(
      `${nam}-${String(thang + 1).padStart(2, "0")}-${String(ngay).padStart(2, "0")}`,
    );
  };

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ border: `1px solid ${vienVangNhat}`, background: "rgba(20,12,6,0.95)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(200,136,42,.08)" }}
      >
        <button
          type="button"
          onClick={() => setThangXem(new Date(nam, thang - 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
          style={{ color: "rgba(200,136,42,.65)" }}
        >
          ‹
        </button>
        <span style={{ fontFamily: "var(--font-serif)", color: kem, fontSize: ".88rem" }}>
          {TEN_THANG[thang]} {nam}
        </span>
        <button
          type="button"
          onClick={() => setThangXem(new Date(nam, thang + 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
          style={{ color: "rgba(200,136,42,.65)" }}
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 px-1 pb-1 pt-2">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((thu) => (
          <div
            key={thu}
            className="text-center"
            style={{ color: "rgba(200,136,42,.45)", fontSize: "10px", paddingBottom: 4 }}
          >
            {thu}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 px-1 pb-2">
        {cacO.map((ngay, i) => {
          if (!ngay) return <div key={`trong${i}`} />;
          const ngayThuc = new Date(nam, thang, ngay);
          const quaKhu = ngayThuc < homNay;
          const dangChon = ngay === ngayDaChon && thang === thangDaChon && nam === namDaChon;
          const laHomNay = ngayThuc.toDateString() === homNay.toDateString();
          return (
            <button
              key={ngay}
              type="button"
              onClick={() => chonNgay(ngay)}
              disabled={quaKhu}
              className="relative flex flex-col items-center justify-center rounded-lg transition-all duration-150"
              style={{
                height: 34,
                background: dangChon ? "linear-gradient(135deg,#c8882a,#e8b84b)" : "transparent",
                color: dangChon
                  ? "#1a120a"
                  : quaKhu
                    ? "rgba(240,216,144,.18)"
                    : laHomNay
                      ? "rgba(232,184,75,.95)"
                      : "rgba(240,216,144,.78)",
                cursor: quaKhu ? "not-allowed" : "pointer",
                fontWeight: dangChon || laHomNay ? 600 : 400,
                fontSize: "13px",
              }}
            >
              {ngay}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default LichChonNgay;
