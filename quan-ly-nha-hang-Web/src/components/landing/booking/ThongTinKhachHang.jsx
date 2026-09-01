import { useState } from "react";
import { DIP_DAT_BAN } from "../../../data/datBan";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Check,
  Gift,
  Flower2,
  Cake,
  Wine,
  Camera,
} from "lucide-react";

const getServiceIcon = (id, bieuTuong) => {
  if (id === "hoa" || (bieuTuong && bieuTuong.includes("🌷"))) return Flower2;
  if (id === "banh" || (bieuTuong && bieuTuong.includes("🎂"))) return Cake;
  if (id === "ruou" || (bieuTuong && bieuTuong.includes("🍷"))) return Wine;
  if (id === "anh" || (bieuTuong && bieuTuong.includes("📸"))) return Camera;
  return Sparkles;
};

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
    if (!guestDetails.hoTen?.trim()) loiForm.hoTen = "Vui lòng nhập họ và tên";
    if (!/^((0|\+84)[0-9]{8,10})$/.test(guestDetails.soDienThoai?.trim()))
      loiForm.soDienThoai = "Vui lòng nhập số điện thoại hợp lệ (10 số)";
    setErrors(loiForm);
    if (!Object.keys(loiForm).length) onXacNhan();
  };

  return (
    <div className="rounded-3xl p-5 sm:p-8 bg-black/40 border border-amber-500/20 backdrop-blur-md shadow-2xl space-y-6">
      <div>
        <div className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
          Bước 4 / 4
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
          Thông Tin Người Đặt Bàn
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/60 mt-1">
          Vui lòng cung cấp thông tin liên hệ để nhân viên xác nhận và đón tiếp
          chu đáo.
        </p>
      </div>

      <div className="space-y-4 pt-1">
        {/* Full Name */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
            <User size={13} />
            Họ và tên quý khách *
          </label>
          <input
            className={`w-full p-3.5 rounded-xl bg-white/5 border text-sm text-amber-100 outline-none transition-colors ${
              errors.hoTen
                ? "border-red-500 bg-red-950/10"
                : "border-white/15 focus:border-amber-400"
            }`}
            value={guestDetails.hoTen}
            onChange={(e) => handleCapNhatTruong("hoTen", e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn Hoàng"
          />
          {errors.hoTen && (
            <p className="mt-1 text-xs text-red-400 font-medium">
              {errors.hoTen}
            </p>
          )}
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              <Phone size={13} />
              Số điện thoại liên hệ *
            </label>
            <input
              type="tel"
              className={`w-full p-3.5 rounded-xl bg-white/5 border text-sm text-amber-100 outline-none transition-colors font-mono ${
                errors.soDienThoai
                  ? "border-red-500 bg-red-950/10"
                  : "border-white/15 focus:border-amber-400"
              }`}
              value={guestDetails.soDienThoai}
              onChange={(e) =>
                handleCapNhatTruong("soDienThoai", e.target.value)
              }
              placeholder="0912 345 678"
            />
            {errors.soDienThoai && (
              <p className="mt-1 text-xs text-red-400 font-medium">
                {errors.soDienThoai}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              <Mail size={13} />
              Email nhận vé đặt bàn
            </label>
            <input
              type="email"
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400 text-sm text-amber-100 outline-none transition-colors"
              value={guestDetails.email}
              onChange={(e) => handleCapNhatTruong("email", e.target.value)}
              placeholder="email@example.com"
            />
          </div>
        </div>

        {/* Occasion Selector */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
            <Gift size={13} />
            Dịp đặc biệt của quý khách:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DIP_DAT_BAN.map((occasion) => {
              const isSelected = guestDetails.dip === occasion.id;
              return (
                <button
                  key={occasion.id}
                  type="button"
                  onClick={() => handleCapNhatTruong("dip", occasion.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    isSelected
                      ? "bg-amber-400 text-black border-amber-300 font-bold shadow-md shadow-amber-400/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10 text-amber-200/70"
                  }`}
                >
                  {occasion.ten}
                </button>
              );
            })}
          </div>
        </div>

        {/* Special Requests / Notes */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
            <MessageSquare size={13} />
            Yêu cầu đặc biệt (tùy chọn)
          </label>
          <input
            className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400 text-sm text-amber-100 outline-none transition-colors"
            value={guestDetails.ghiChu}
            onChange={(e) => handleCapNhatTruong("ghiChu", e.target.value)}
            placeholder="Ví dụ: Bàn gần cửa sổ, ghế ăn cho trẻ em, ăn chay, dị ứng..."
          />
        </div>

        {/* Additional VIP Services */}
        {additionalServices && additionalServices.length > 0 && (
          <div className="pt-3">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 mb-2.5">
              <Sparkles size={13} />
              Dịch vụ hỗ trợ & setup đặc biệt:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {additionalServices.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                const ServiceIcon = getServiceIcon(
                  service.id,
                  service.bieuTuong,
                );
                return (
                  <div
                    key={service.id}
                    onClick={() => handleChonDichVu(service.id)}
                    className={`cursor-pointer rounded-2xl p-3 border flex items-center justify-between transition-all ${
                      isSelected
                        ? "bg-amber-500/15 border-amber-400 text-amber-100"
                        : "bg-white/5 border-white/10 hover:border-amber-500/30 text-amber-200/70"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs transition-colors ${
                          isSelected
                            ? "bg-amber-400 text-black"
                            : "border border-white/20 bg-white/5"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                      <ServiceIcon size={14} className="text-amber-400 shrink-0" />
                      <span className="text-xs font-medium">
                        {service.ten}
                      </span>
                    </div>
                    <span className="font-serif text-xs font-bold text-amber-300">
                      +{Number(service.gia || 0).toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t border-amber-500/20 flex items-center gap-3">
        <button
          type="button"
          onClick={onQuayLai}
          className="px-6 py-3.5 rounded-2xl border border-white/15 text-amber-200/80 hover:text-amber-100 hover:bg-white/5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Quay lại</span>
        </button>

        <button
          type="button"
          onClick={handleKiemTraVaXacNhan}
          className="flex-1 btn-primary rounded-2xl py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-900/40 hover:scale-[1.01] transition-transform"
        >
          <Sparkles size={16} />
          <span>Hoàn tất & Xác nhận đặt bàn</span>
        </button>
      </div>
    </div>
  );
}

export default GuestDetails;
