import {
  Sun,
  Moon,
  Clock,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

function NhomKhungGio({
  icon: Icon,
  label,
  slots,
  selectedTime,
  setSelectedTime,
}) {
  if (!slots.length) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
        <Icon size={14} className="text-amber-400" />
        <span>{label}</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.gio;
          const isFull = slot.trangThai === "het";
          const isScarce = slot.trangThai === "it";

          if (isFull) {
            return (
              <div
                key={slot.gio}
                className="p-3 rounded-xl bg-white/5 border border-white/5 opacity-40 cursor-not-allowed text-center"
              >
                <span className="font-mono text-sm font-semibold text-gray-400 block">
                  {slot.gio}
                </span>
                <span className="text-[10px] text-red-400 font-medium">
                  Hết bàn
                </span>
              </div>
            );
          }

          return (
            <button
              key={slot.gio}
              type="button"
              onClick={() => setSelectedTime(slot.gio)}
              className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                isSelected
                  ? "bg-amber-400 text-black border-amber-300 font-bold shadow-lg shadow-amber-400/20 scale-105"
                  : "bg-white/5 border-white/10 hover:border-amber-500/40 text-amber-100 hover:bg-white/10"
              }`}
            >
              <span className="font-mono text-sm font-bold block">
                {slot.gio}
              </span>
              <span
                className={`text-[10px] block mt-0.5 ${
                  isSelected
                    ? "text-black font-semibold"
                    : isScarce
                      ? "text-amber-400"
                      : "text-emerald-400"
                }`}
              >
                {isScarce ? "Còn ít bàn" : "Trống bàn"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimeSelection({
  timeSlots,
  selectedTime,
  setSelectedTime,
  onTiepTuc,
  onQuayLai,
}) {
  const danhSachGioTrua = timeSlots.filter((slot) => slot.gio < "15:00");
  const danhSachGioToi = timeSlots.filter((slot) => slot.gio >= "15:00");

  return (
    <div className="rounded-3xl p-5 sm:p-8 bg-black/40 border border-amber-500/20 backdrop-blur-md shadow-2xl space-y-6">
      <div>
        <div className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
          Bước 2 / 4
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
          Chọn Khung Giờ Đến
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/60 mt-1">
          Chúng tôi giữ bàn cho quý khách trong vòng 15 phút kể từ giờ hẹn.
        </p>
      </div>

      <div className="space-y-6 pt-2">
        <NhomKhungGio
          icon={Sun}
          label="Buổi Trưa (11:00 – 14:30)"
          slots={danhSachGioTrua}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />

        <NhomKhungGio
          icon={Moon}
          label="Buổi Tối (17:00 – 22:00)"
          slots={danhSachGioToi}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
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
          onClick={onTiepTuc}
          disabled={!selectedTime}
          className="flex-1 btn-primary rounded-2xl py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-900/40 disabled:opacity-50 hover:scale-[1.01] transition-transform"
        >
          <span>Tiếp tục chọn món đặt trước</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default TimeSelection;
