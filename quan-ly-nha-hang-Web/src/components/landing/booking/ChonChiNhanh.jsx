import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Users,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  Minus,
  Plus,
} from "lucide-react";

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
  const dropdownDateRef = useRef(null);

  const layNgayDiaPhuong = (d = new Date()) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const homNayStr = layNgayDiaPhuong();

  const [isMoDatePicker, setIsMoDatePicker] = useState(false);
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());

  // Đóng DatePicker khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownDateRef.current &&
        !dropdownDateRef.current.contains(event.target)
      ) {
        setIsMoDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format ngày hiển thị tiếng Việt sang trọng
  const dinhDangNgayHienThi = (dateStr) => {
    if (!dateStr) return "Chọn ngày đến";
    const [y, m, d] = dateStr.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);

    if (dateStr === homNayStr) {
      return `Hôm nay, ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`;
    }

    const ngayMai = new Date();
    ngayMai.setDate(ngayMai.getDate() + 1);
    if (dateStr === layNgayDiaPhuong(ngayMai)) {
      return `Ngày mai, ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`;
    }

    const thuNames = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const thu = thuNames[dateObj.getDay()];
    return `${thu}, ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  };

  // Tính ma trận ngày trong tháng cho DatePicker
  const generateCalendarDays = () => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ day: null, key: `empty-${i}` });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isPast = dateString < homNayStr;
      const isSelected = dateString === date;
      const isToday = dateString === homNayStr;

      days.push({
        day: d,
        dateString,
        isPast,
        isSelected,
        isToday,
        key: `day-${d}`,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((v) => v - 1);
    } else {
      setViewMonth((v) => v - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((v) => v + 1);
    } else {
      setViewMonth((v) => v + 1);
    }
  };

  const chonNgayNhanh = (kieu) => {
    const d = new Date();
    if (kieu === "today") {
      // today
    } else if (kieu === "tomorrow") {
      d.setDate(d.getDate() + 1);
    } else if (kieu === "weekend") {
      const dayOfWeek = d.getDay();
      const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
      d.setDate(d.getDate() + daysUntilSat);
    }
    const str = layNgayDiaPhuong(d);
    setDate(str);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
    setIsMoDatePicker(false);
  };

  return (
    <div className="rounded-3xl p-5 sm:p-8 bg-black/40 border border-amber-500/20 backdrop-blur-md shadow-2xl space-y-6">
      <div>
        <div className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
          Giai đoạn I / V
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
          1. Chọn Chi Nhánh L'Délice:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {branches.map((b) => {
            const isSelected = branchId === b.maChiNhanh;
            return (
              <div
                key={b.maChiNhanh}
                onClick={() => setBranchId(b.maChiNhanh)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between relative ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-900/30 ring-2 ring-amber-400/20"
                    : "bg-white/5 border-white/10 hover:border-amber-500/40 hover:bg-white/10"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md">
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

                <div className="mt-3.5 pt-2 border-t border-amber-500/10 flex items-center justify-between text-[11px] text-amber-200/50">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Còn chỗ nhận đặt
                  </span>
                  <span className="text-emerald-400/80 font-semibold">Đang mở cửa</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Date & Guest Count Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Luxury Date Selection (Custom Popover) */}
        <div ref={dropdownDateRef} className="relative space-y-2.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Calendar size={13} />
            2. Ngày Đến:
          </label>

          {/* Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMoDatePicker(!isMoDatePicker)}
            className="w-full p-3 rounded-xl bg-white/5 border border-amber-500/30 hover:border-amber-400 focus:border-amber-400 text-left flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-sm font-medium text-amber-100">
                {dinhDangNgayHienThi(date)}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-transform duration-200 ${
                isMoDatePicker ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Quick Date Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => chonNgayNhanh("today")}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                date === homNayStr
                  ? "bg-amber-400 text-black shadow-md shadow-amber-500/20 font-bold scale-[1.02]"
                  : "bg-white/5 border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 text-amber-200/80 hover:text-amber-100"
              }`}
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => chonNgayNhanh("tomorrow")}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 text-amber-200/80 hover:text-amber-100 transition-all cursor-pointer"
            >
              Ngày mai
            </button>
            <button
              type="button"
              onClick={() => chonNgayNhanh("weekend")}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 border border-white/10 hover:bg-amber-500/10 hover:border-amber-500/30 text-amber-200/80 hover:text-amber-100 transition-all cursor-pointer"
            >
              Cuối tuần
            </button>
          </div>

          {/* Custom Date Picker Popover */}
          {isMoDatePicker && (
            <div className="absolute top-full left-0 mt-2 p-4 rounded-2xl bg-[#18110a] border border-amber-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-50 w-[300px] sm:w-[320px]">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-3 px-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 hover:bg-amber-400/20 text-amber-300 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-serif font-bold text-amber-200">
                  Tháng {viewMonth + 1}, {viewYear}
                </span>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 hover:bg-amber-400/20 text-amber-300 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-amber-400/70 uppercase">
                <span>T2</span>
                <span>T3</span>
                <span>T4</span>
                <span>T5</span>
                <span>T6</span>
                <span>T7</span>
                <span className="text-amber-500">CN</span>
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {generateCalendarDays().map((item) => {
                  if (!item.day) {
                    return <div key={item.key} className="h-7 w-7" />;
                  }

                  if (item.isPast) {
                    return (
                      <div
                        key={item.key}
                        className="h-7 w-7 mx-auto flex items-center justify-center text-xs text-white/20 cursor-not-allowed select-none"
                      >
                        {item.day}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        setDate(item.dateString);
                        setIsMoDatePicker(false);
                      }}
                      className={`h-7 w-7 mx-auto rounded-lg flex items-center justify-center text-xs transition-all cursor-pointer ${
                        item.isSelected
                          ? "bg-gradient-to-br from-amber-400 to-amber-500 text-black font-bold shadow-md shadow-amber-900/60 scale-105"
                          : item.isToday
                            ? "border border-amber-400 text-amber-300 font-semibold hover:bg-amber-400/20"
                            : "text-amber-100/90 hover:bg-white/10 hover:text-amber-200"
                      }`}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Luxury Guest Stepper & Direct Input */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Users size={13} />
            3. Số Lượng Khách:
          </label>

          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-amber-500/30 focus-within:border-amber-400 transition-all">
            <button
              type="button"
              onClick={() => setGuestCount(Math.max(1, (Number(guestCount) || 1) - 1))}
              disabled={Number(guestCount) <= 1}
              className="w-9 h-9 rounded-lg bg-amber-400/10 hover:bg-amber-400/25 active:scale-95 text-amber-300 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-all border border-amber-500/30 cursor-pointer shrink-0"
              title="Giảm 1 khách"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="flex-1 flex items-center justify-center">
              <input
                type="number"
                min={1}
                max={99}
                value={guestCount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setGuestCount("");
                  } else {
                    const num = parseInt(val, 10);
                    if (!isNaN(num))
                      setGuestCount(Math.min(99, Math.max(1, num)));
                  }
                }}
                onBlur={() => {
                  if (!guestCount || Number(guestCount) < 1) {
                    setGuestCount(1);
                  }
                }}
                className="w-full bg-transparent text-center text-lg font-bold text-amber-100 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:text-amber-300"
              />
            </div>

            <button
              type="button"
              onClick={() => setGuestCount(Math.min(99, (Number(guestCount) || 0) + 1))}
              disabled={Number(guestCount) >= 99}
              className="w-9 h-9 rounded-lg bg-amber-400/10 hover:bg-amber-400/25 active:scale-95 text-amber-300 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-all border border-amber-500/30 cursor-pointer shrink-0"
              title="Tăng 1 khách"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Party Presets */}
          <div className="flex items-center gap-1.5 pt-1">
            {[2, 4, 6, 8, 10, 15, 20].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setGuestCount(n)}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  Number(guestCount) === n
                    ? "bg-amber-400 text-black font-bold shadow-sm"
                    : "bg-white/5 border border-white/10 text-amber-200/70 hover:bg-white/10 hover:text-amber-100"
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
          className="btn-primary w-full rounded-2xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-900/40 disabled:opacity-50 hover:scale-[1.01] transition-transform cursor-pointer"
        >
          <span>Tiếp tục chọn khung giờ đến</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default BranchSelection;
