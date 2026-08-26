import { useState } from "react";

function BuocMonAn({ danhSachMonAn, monAn, setMonAn, khiTiepTuc, khiQuayLai }) {
  const [nhom, setNhom] = useState("Tất cả");
  const cacNhom = ["Tất cả", "Khai vị", "Món chính", "Tráng miệng", "Đồ uống"];
  const danhSach =
    nhom === "Tất cả"
      ? danhSachMonAn
      : danhSachMonAn.filter((mon) => mon.nhom === nhom);
  const laySoLuong = (id) =>
    monAn.find((mon) => mon.monAnId === id)?.soLuong || 0;
  const tang = (mon) =>
    setMonAn((danhSachMon) => {
      const daCo = danhSachMon.find((m) => m.monAnId === mon.id);
      return daCo
        ? danhSachMon.map((m) =>
            m.monAnId === mon.id ? { ...m, soLuong: m.soLuong + 1 } : m,
          )
        : [...danhSachMon, { monAnId: mon.id, soLuong: 1 }];
    });
  const giam = (mon) =>
    setMonAn((danhSachMon) =>
      danhSachMon.flatMap((m) =>
        m.monAnId !== mon.id
          ? [m]
          : m.soLuong > 1
            ? [{ ...m, soLuong: m.soLuong - 1 }]
            : [],
      ),
    );

  return (
    <div className="card-warm rounded-2xl p-5 sm:p-7">
      <p
        className="text-xs uppercase tracking-[.2em]"
        style={{ color: "rgba(200,136,42,.6)" }}
      >
        Bước 3
      </p>
      <h1
        className="mt-2 font-serif text-2xl"
        style={{ color: "rgba(240,216,144,.9)" }}
      >
        Chọn món ăn trước
      </h1>
      <p
        className="mb-7 mt-2 text-sm"
        style={{ color: "rgba(240,216,144,.42)" }}
      >
        Có thể bỏ qua và gọi món tại nhà hàng.
      </p>
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {cacNhom.map((tenNhom) => (
          <button
            key={tenNhom}
            onClick={() => setNhom(tenNhom)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs ${nhom === tenNhom ? "btn-primary" : "btn-ghost"}`}
          >
            {tenNhom}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {danhSach.length === 0 && (
          <p className="py-8 text-center text-sm opacity-40">
            Đang tải thực đơn...
          </p>
        )}
        {danhSach.map((mon) => (
          <div
            key={mon.id}
            className="flex gap-3 rounded-xl p-3"
            style={{
              background: "rgba(200,136,42,.035)",
              border: "1px solid rgba(200,136,42,.08)",
            }}
          >
            <img
              src={mon.anh}
              alt={mon.ten}
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{mon.ten}</p>
              <p
                className="mt-1 text-xs"
                style={{ color: "rgba(240,216,144,.38)" }}
              >
                {mon.moTa}
              </p>
              <p
                className="mt-2 text-xs"
                style={{ color: "rgba(232,184,75,.8)" }}
              >
                {mon.gia.toLocaleString("vi-VN")}₫
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => giam(mon)}
                disabled={!laySoLuong(mon.id)}
                className="h-8 w-8 rounded-full border border-[rgba(200,136,42,.25)] disabled:opacity-30"
              >
                −
              </button>
              <span className="w-5 text-center text-sm">
                {laySoLuong(mon.id)}
              </span>
              <button
                onClick={() => tang(mon)}
                className="h-8 w-8 rounded-full border border-[rgba(200,136,42,.25)]"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <button
          onClick={khiQuayLai}
          className="btn-ghost flex-1 rounded-xl py-3"
        >
          Quay lại
        </button>
        <button
          onClick={khiTiepTuc}
          className="btn-primary flex-1 rounded-xl py-3"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
export default BuocMonAn;
