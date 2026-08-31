import { MapPin, Users, Calendar, ChevronRight, Check } from "lucide-react";

function BranchSelection({
  branches = [],
  branchId,
  setBranchId,
  date,
  setDate,
  guestCount,
  setGuestCount,
  onTiepTuc,
}) {
  const layNgayDinhDang = (daysOffset = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const todayStr = layNgayDinhDang(0);
  const tomorrowStr = layNgayDinhDang(1);
  const dayAfterStr = layNgayDinhDang(2);

  const quickDates = [
    { label: "Hôm nay", val: todayStr },
    { label: "Ngày mai", val: tomorrowStr },
    { label: "Ngày kia", val: dayAfterStr },
  ];

  const handleQuickDate = (val) => {
    setDate(val);
  };

  return (
    <div className="rounded-3xl p-5 sm:p-8 bg-black/40 border border-amber-500/20 backdrop-blur-md shadow-2xl space-y-6">
      <div>
        <div className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
          Bước 1 / 4
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
          Chọn Chi Nhánh & Ngày Đặt Bàn
        </h1>
        <p className="text-xs sm:text-sm text-amber-200/60 mt-1">
          Chọn địa điểm phù hợp và số lượng khách tham dự bữa tiệc.
        </p>
      </div>

      {/* 1. Branch Cards */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-amber-300">
          1. Chọn Chi Nhánh 5S Dining:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {branches.map((b) => {
            const isSelected = branchId === b.maChiNhanh;
            return (
              <div
                key={b.maChiNhanh}
                onClick={() => setBranchId(b.maChiNhanh)}
                className={`cursor-pointer rounded-2xl p-3.5 border transition-all duration-200 flex flex-col justify-between relative ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-900/30 ring-2 ring-amber-400/20"
                    : "bg-white/5 border-white/10 hover:border-amber-500/40 hover:bg-white/10"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
                <div>
                  <h4 className="font-serif text-sm font-bold text-amber-100">
                    {b.tenChiNhanh}
                  </h4>
                  <div className="flex items-start gap-1.5 text-xs text-amber-200/60 mt-1.5">
                    <MapPin
                      size={13}
                      className="text-amber-400 shrink-0 mt-0.5"
                    />
                    <span className="line-clamp-2 leading-tight">
                      {b.diaChi}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-amber-500/10 flex items-center justify-between text-[11px] text-amber-200/50">
                  <span>Sức chứa: {b.sucChua ?? 50} chỗ</span>
                  <span className="text-emerald-400 font-semibold">Mở cửa</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Date & Guest Count Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Date Selection */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Calendar size={13} />
            2. Ngày Đến:
          </label>
          <input
            type="date"
            min={todayStr}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-[#140e08] border border-amber-500/30 focus:border-amber-400 text-sm font-medium text-amber-100 outline-none transition-colors shadow-inner cursor-pointer"
            style={{ colorScheme: "dark" }}
          />
          {/* Quick Date Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {quickDates.map((pill) => {
              const isSelected = date === pill.val;
              return (
                <button
                  key={pill.val}
                  type="button"
                  onClick={() => handleQuickDate(pill.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-amber-400 text-black shadow-md shadow-amber-500/20 font-bold scale-[1.02]"
                      : "bg-white/5 border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 text-amber-200/80 hover:text-amber-100"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Guest Count Selection */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Users size={13} />
            3. Số Lượng Khách:
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 hover:border-amber-400 text-lg font-bold text-amber-300 flex items-center justify-center active:scale-95 transition-all"
            >
              -
            </button>
            <div className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/15 text-center">
              <span className="font-serif text-xl font-bold text-amber-200">
                {guestCount}
              </span>
              <span className="text-xs text-amber-200/60 ml-1.5">khách</span>
            </div>
            <button
              type="button"
              onClick={() => setGuestCount(Math.min(30, guestCount + 1))}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 hover:border-amber-400 text-lg font-bold text-amber-300 flex items-center justify-center active:scale-95 transition-all"
            >
              +
            </button>
          </div>

          {/* Quick Party Presets */}
          <div className="flex items-center gap-1.5 pt-1">
            {[2, 4, 6, 8, 10, 15].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setGuestCount(n)}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                  guestCount === n
                    ? "bg-amber-400 text-black font-bold"
                    : "bg-white/5 border border-white/10 text-amber-200/60 hover:bg-white/10"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-amber-500/20">
        <button
          onClick={onTiepTuc}
          disabled={!branchId || !date || !guestCount}
          className="btn-primary w-full rounded-2xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-900/40 disabled:opacity-50 hover:scale-[1.01] transition-transform"
        >
          <span>Tiếp tục chọn khung giờ đến</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default BranchSelection;
