import { useEffect, useState } from "react";
import { CHI_NHANH_MAU } from "../../data/chiNhanh";
import { layDanhSachChiNhanh } from "../../services/chiNhanh.service";
import LichChonNgay from "../chung/LichChonNgay";

function BuocChon({
  chiNhanh,
  setChiNhanh,
  ngay,
  setNgay,
  soKhach,
  setSoKhach,
  khiTiepTuc,
}) {
  const [chiNhanhs, setChiNhanhs] = useState(CHI_NHANH_MAU);
  const [hienLich, setHienLich] = useState(false);
  useEffect(() => {
    layDanhSachChiNhanh()
      .then((duLieu) => {
        if (duLieu.length) setChiNhanhs(duLieu);
      })
      .catch(() => {});
  }, []);

  const ngayHienThi = ngay
    ? new Date(ngay + "T00:00").toLocaleDateString("vi-VN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Chọn ngày";

  return (
    <div className="card-warm rounded-2xl p-5 sm:p-7">
      <p
        className="text-xs uppercase tracking-[.2em]"
        style={{ color: "rgba(200,136,42,.6)" }}
      >
        Bước 1
      </p>
      <h1
        className="mb-8 mt-2 font-serif text-2xl"
        style={{ color: "rgba(240,216,144,.9)" }}
      >
        Chọn chi nhánh và thời gian
      </h1>
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm">Chi nhánh</label>
          <select
            value={chiNhanh}
            onChange={(event) => setChiNhanh(event.target.value)}
            className="select-warm px-4 py-3"
          >
            <option value="">Chọn chi nhánh</option>
            {chiNhanhs.map((mau) => (
              <option key={mau.id} value={mau.id}>
                {mau.ten}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative">
            <label className="mb-2 block text-sm">Ngày</label>
            <button
              type="button"
              onClick={() => setHienLich((v) => !v)}
              className="select-warm px-4 py-3 text-left"
            >
              {ngayHienThi}
            </button>
            {hienLich && (
              <div className="absolute z-20 mt-2 w-full min-w-[280px]">
                <LichChonNgay
                  value={ngay}
                  onChange={(giaTri) => {
                    setNgay(giaTri);
                    setHienLich(false);
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm">Số khách</label>
            <input
              type="number"
              min="1"
              max="20"
              value={soKhach}
              onChange={(event) => setSoKhach(Number(event.target.value))}
              className="input-warm px-4 py-3"
            />
          </div>
        </div>
        <button
          onClick={khiTiepTuc}
          disabled={!chiNhanh || !ngay}
          className="btn-primary w-full rounded-xl py-3"
        >
          Tiếp tục chọn giờ
        </button>
      </div>
    </div>
  );
}
export default BuocChon;
