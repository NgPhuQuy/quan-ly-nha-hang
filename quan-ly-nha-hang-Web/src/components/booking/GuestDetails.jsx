import { useState } from "react";
import { DIP_DAT_BAN } from "../../data/datBan";

function GuestDetails({
  danhSachDichVu,
  thongTin,
  setThongTin,
  dichVuBoSung,
  setDichVuBoSung,
  khiXacNhan,
  khiQuayLai,
}) {
  const [loi, setLoi] = useState({});
  const capNhat = (tenTruong, giaTri) => {
    setThongTin((duLieu) => ({ ...duLieu, [tenTruong]: giaTri }));
    setLoi((duLieu) => ({ ...duLieu, [tenTruong]: "" }));
  };
  const doiDichVu = (id) =>
    setDichVuBoSung((danhSach) =>
      danhSach.includes(id)
        ? danhSach.filter((giaTri) => giaTri !== id)
        : [...danhSach, id],
    );
  const xacThuc = () => {
    const loiMoi = {};
    if (!thongTin.hoTen.trim()) loiMoi.hoTen = "Please enter your full name";
    if (!/^((0|\+84)[0-9]{8,10})$/.test(thongTin.soDienThoai.trim()))
      loiMoi.soDienThoai = "Please enter a valid phone number";
    setLoi(loiMoi);
    if (!Object.keys(loiMoi).length) khiXacNhan();
  };
  return (
    <div className="card-warm rounded-2xl p-5 sm:p-7">
      <p
        className="text-xs uppercase tracking-[.2em]"
        style={{ color: "rgba(200,136,42,.6)" }}
      >
        Step 4
      </p>
      <h1
        className="mb-8 mt-2 font-serif text-2xl"
        style={{ color: "rgba(240,216,144,.9)" }}
      >
        Your details
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm">Full name</label>
          <input
            className="input-warm px-4 py-3"
            value={thongTin.hoTen}
            onChange={(event) => capNhat("hoTen", event.target.value)}
          />
          {loi.hoTen && (
            <p className="mt-1 text-xs text-red-400">{loi.hoTen}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm">Phone number</label>
          <input
            className="input-warm px-4 py-3"
            value={thongTin.soDienThoai}
            onChange={(event) => capNhat("soDienThoai", event.target.value)}
            placeholder="0912345678"
          />
          {loi.soDienThoai && (
            <p className="mt-1 text-xs text-red-400">{loi.soDienThoai}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm">Email</label>
          <input
            type="email"
            className="input-warm px-4 py-3"
            value={thongTin.email}
            onChange={(event) => capNhat("email", event.target.value)}
            placeholder="ban@example.com"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm">Occasion</label>
          <select
            className="select-warm px-4 py-3"
            value={thongTin.dip}
            onChange={(event) => capNhat("dip", event.target.value)}
          >
            {DIP_DAT_BAN.map((dip) => (
              <option key={dip.id} value={dip.id}>
                {dip.ten}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm">Notes</label>
          <input
            className="input-warm px-4 py-3"
            value={thongTin.ghiChu}
            onChange={(event) => capNhat("ghiChu", event.target.value)}
            placeholder="A table by the window..."
          />
        </div>
      </div>
      <div className="mt-8">
        <p className="mb-3 text-sm">Enhance your experience</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {danhSachDichVu.map((dichVu) => {
            const dangChon = dichVuBoSung.includes(dichVu.id);
            return (
              <button
                key={dichVu.id}
                onClick={() => doiDichVu(dichVu.id)}
                className="rounded-xl p-3 text-left"
                style={{
                  background: dangChon
                    ? "rgba(200,136,42,.11)"
                    : "rgba(200,136,42,.035)",
                  border: `1px solid ${dangChon ? "rgba(200,136,42,.5)" : "rgba(200,136,42,.1)"}`,
                }}
              >
                <span className="text-sm">
                  {dichVu.bieuTuong} {dichVu.ten}
                </span>
                <span
                  className="float-right text-xs"
                  style={{ color: "rgba(232,184,75,.8)" }}
                >
                  {dichVu.gia.toLocaleString("vi-VN")}₫
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <button
          onClick={khiQuayLai}
          className="btn-ghost flex-1 rounded-xl py-3"
        >
          Back
        </button>
        <button
          onClick={xacThuc}
          className="btn-primary flex-1 rounded-xl py-3"
        >
          Confirm booking
        </button>
      </div>
    </div>
  );
}
export default GuestDetails;
