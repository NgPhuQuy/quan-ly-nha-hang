import { useState } from "react";
import { DIP_DAT_BAN } from "../../../data/datBan";

function GuestDetails({
  additionalServices,
  guestDetails,
  setGuestDetails,
  selectedServices,
  setSelectedServices,
  onXacNhan,
  onQuayLai,
}) {
  const [errors, setErrors] = useState({});

  const handleCapNhatTruong = (tenTruong, giaTri) => {
    setGuestDetails((duLieu) => ({ ...duLieu, [tenTruong]: giaTri }));
    setErrors((loiHienTai) => ({ ...loiHienTai, [tenTruong]: "" }));
  };

  const handleChonDichVu = (maDichVu) => {
    setSelectedServices((danhSach) =>
      danhSach.includes(maDichVu)
        ? danhSach.filter((id) => id !== maDichVu)
        : [...danhSach, maDichVu],
    );
  };

  const handleKiemTraVaXacNhan = () => {
    const loiForm = {};
    if (!guestDetails.hoTen.trim()) loiForm.hoTen = "Vui lòng nhập họ và tên";
    if (!/^((0|\+84)[0-9]{8,10})$/.test(guestDetails.soDienThoai.trim()))
      loiForm.soDienThoai = "Vui lòng nhập số điện thoại hợp lệ";
    setErrors(loiForm);
    if (!Object.keys(loiForm).length) onXacNhan();
  };

  return (
    <div className="card-warm rounded-2xl p-5 sm:p-7">
      <p
        className="text-xs uppercase tracking-[.2em]"
        style={{ color: "rgba(200,136,42,.6)" }}
      >
        Bước 4
      </p>
      <h1
        className="mb-8 mt-2 font-serif text-2xl"
        style={{ color: "rgba(240,216,144,.9)" }}
      >
        Thông tin người đặt bàn
      </h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm">Họ và tên *</label>
          <input
            className="input-warm px-4 py-3"
            value={guestDetails.hoTen}
            onChange={(event) =>
              handleCapNhatTruong("hoTen", event.target.value)
            }
            placeholder="Nguyễn Văn A"
          />
          {errors.hoTen && (
            <p className="mt-1 text-xs text-red-400">{errors.hoTen}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm">Số điện thoại *</label>
          <input
            className="input-warm px-4 py-3"
            value={guestDetails.soDienThoai}
            onChange={(event) =>
              handleCapNhatTruong("soDienThoai", event.target.value)
            }
            placeholder="0912345678"
          />
          {errors.soDienThoai && (
            <p className="mt-1 text-xs text-red-400">{errors.soDienThoai}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-sm">Email</label>
          <input
            type="email"
            className="input-warm px-4 py-3"
            value={guestDetails.email}
            onChange={(event) =>
              handleCapNhatTruong("email", event.target.value)
            }
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm">Dịp đặc biệt</label>
          <select
            className="select-warm px-4 py-3"
            value={guestDetails.dip}
            onChange={(event) => handleCapNhatTruong("dip", event.target.value)}
          >
            {DIP_DAT_BAN.map((occasion) => (
              <option key={occasion.id} value={occasion.id}>
                {occasion.ten}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm">Ghi chú thêm</label>
          <input
            className="input-warm px-4 py-3"
            value={guestDetails.ghiChu}
            onChange={(event) =>
              handleCapNhatTruong("ghiChu", event.target.value)
            }
            placeholder="Bàn gần cửa sổ, ghế trẻ em..."
          />
        </div>
      </div>
      <div className="mt-8">
        <p className="mb-3 text-sm font-medium">Dịch vụ chuẩn bị bổ sung</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {additionalServices.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            return (
              <button
                key={service.id}
                onClick={() => handleChonDichVu(service.id)}
                className="rounded-xl p-3 text-left"
                style={{
                  background: isSelected
                    ? "rgba(200,136,42,.11)"
                    : "rgba(200,136,42,.035)",
                  border: `1px solid ${isSelected ? "rgba(200,136,42,.5)" : "rgba(200,136,42,.1)"}`,
                }}
              >
                <span className="text-sm">
                  {service.bieuTuong} {service.ten}
                </span>
                <span
                  className="float-right text-xs font-semibold"
                  style={{ color: "rgba(232,184,75,.8)" }}
                >
                  {Number(service.gia || 0).toLocaleString("vi-VN")}₫
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8 flex gap-3">
        <button
          onClick={onQuayLai}
          className="btn-ghost flex-1 rounded-xl py-3"
        >
          Quay lại
        </button>
        <button
          onClick={handleKiemTraVaXacNhan}
          className="btn-primary flex-1 rounded-xl py-3"
        >
          Xác nhận đặt bàn
        </button>
      </div>
    </div>
  );
}
export default GuestDetails;
