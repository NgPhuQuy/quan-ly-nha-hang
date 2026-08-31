import { useState } from "react";
import { DIP_DAT_BAN } from "../../../data/datBan";
import {
  CheckCircle2,
  Copy,
  Check,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Sparkles,
  Home,
  RotateCcw,
} from "lucide-react";

function BookingConfirmation({
  bookingCode,
  branch,
  time,
  date,
  guestCount,
  guestDetails,
  totalAmount,
  onDatLai,
  onVeTrangChu,
}) {
  const [copied, setCopied] = useState(false);
  const branchName =
    branch?.tenChiNhanh || branch?.ten || "5S Dining Fine Cuisine";
  const branchAddress = branch?.diaChi || "Hệ thống nhà hàng 5S Dining";

  const handleCopyCode = () => {
    if (bookingCode) {
      navigator.clipboard.writeText(bookingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const dipName =
    DIP_DAT_BAN.find((occasion) => occasion.id === guestDetails.dip)?.ten ||
    "Bữa tiệc thân mật";

  return (
    <div className="mx-auto max-w-2xl py-4 space-y-6">
      {/* Top Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950/50">
          <CheckCircle2 size={36} className="sm:w-10 sm:h-10" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={12} />
            <span>Xác Nhận Thành Công</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            Đặt Bàn Thành Công!
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/60 mt-1 max-w-md mx-auto">
            Nhà hàng 5S Dining đã ghi nhận lịch hẹn của quý khách và đang chuẩn
            bị tiếp đón.
          </p>
        </div>
      </div>

      {/* Digital VIP Voucher Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#18110a] via-[#100b05] to-[#0a0704] border-2 border-amber-500/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Top Gold Ribbon Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-400/70 block">
              Phiếu Đặt Bàn Điện Tử
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-200 mt-0.5">
              5S DINING VIP PASS
            </h3>
          </div>

          {/* Booking Code Box */}
          <div className="flex items-center gap-2 bg-black/60 px-4 py-2.5 rounded-2xl border border-amber-500/30">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-amber-200/50 block">
                Mã đặt bàn
              </span>
              <span className="font-mono text-base sm:text-lg font-bold text-amber-300 tracking-wider">
                {bookingCode || "5S-VIP"}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 text-amber-400 transition-colors ml-2"
              title="Sao chép mã"
            >
              {copied ? (
                <Check size={16} className="text-emerald-400" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Voucher Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 text-xs text-amber-200/80 border-b border-amber-500/20">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-amber-200/40 block">
              Chi nhánh
            </span>
            <div className="font-serif text-sm font-bold text-amber-100 flex items-center gap-1.5">
              <MapPin size={14} className="text-amber-400 shrink-0" />
              <span>{branchName}</span>
            </div>
            <p className="text-[11px] text-amber-200/50 pl-5">
              {branchAddress}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase text-amber-200/40 block">
              Thời gian & Số khách
            </span>
            <div className="font-serif text-sm font-bold text-amber-100 flex items-center gap-2 font-mono">
              <Clock size={14} className="text-amber-400 shrink-0" />
              <span>{time}</span>
              <span>—</span>
              <Calendar size={14} className="text-amber-400 shrink-0" />
              <span>{date}</span>
            </div>
            <p className="text-[11px] text-amber-300 font-semibold pl-5">
              {guestCount} người · {dipName}
            </p>
          </div>

          <div className="space-y-1 sm:pt-2">
            <span className="text-[10px] uppercase text-amber-200/40 block">
              Người đặt bàn
            </span>
            <div className="font-bold text-amber-100 flex items-center gap-1.5 text-sm">
              <User size={14} className="text-amber-400 shrink-0" />
              <span>{guestDetails.hoTen}</span>
            </div>
          </div>

          <div className="space-y-1 sm:pt-2">
            <span className="text-[10px] uppercase text-amber-200/40 block">
              Số điện thoại liên hệ
            </span>
            <div className="font-bold text-amber-100 flex items-center gap-1.5 text-sm font-mono">
              <Phone size={14} className="text-amber-400 shrink-0" />
              <span>{guestDetails.soDienThoai}</span>
            </div>
          </div>
        </div>

        {/* Notes & Pre-order Total */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="text-amber-200/60 text-[11px]">
            {guestDetails.ghiChu ? (
              <span>
                Ghi chú:{" "}
                <em className="text-amber-200">{guestDetails.ghiChu}</em>
              </span>
            ) : (
              <span>
                * Vui lòng đến đúng giờ để được xếp vị trí bàn tốt nhất.
              </span>
            )}
          </div>

          {totalAmount > 0 && (
            <div className="text-right sm:shrink-0">
              <span className="text-[10px] text-amber-200/50 block uppercase">
                Món đặt trước:
              </span>
              <span className="font-serif text-base font-bold text-amber-300">
                {Number(totalAmount).toLocaleString("vi-VN")}₫
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={onDatLai}
          className="flex-1 py-3.5 rounded-2xl border border-white/15 text-amber-200/80 hover:bg-white/5 hover:text-amber-100 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw size={15} />
          <span>Đặt thêm bàn khác</span>
        </button>

        <button
          onClick={onVeTrangChu}
          className="flex-1 btn-primary rounded-2xl py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-900/40 hover:scale-[1.01] transition-transform"
        >
          <Home size={15} />
          <span>Về trang chủ</span>
        </button>
      </div>
    </div>
  );
}

export default BookingConfirmation;
