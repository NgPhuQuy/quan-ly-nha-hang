import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Users,
  MapPin,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { layDanhSachChiNhanh } from "../../../services/chiNhanh.service";

function ThanhDatBanNhanh({ onDatBan }) {
  const dropdownBranchRef = useRef(null);
  const dropdownDateRef = useRef(null);

  const layNgayDiaPhuong = (d = new Date()) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const homNayStr = layNgayDiaPhuong();

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isMoDropdownChiNhanh, setIsMoDropdownChiNhanh] = useState(false);

  const [selectedDate, setSelectedDate] = useState(homNayStr);
  const [isMoDatePicker, setIsMoDatePicker] = useState(false);
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());

  const [guestCount, setGuestCount] = useState(2);

  useEffect(() => {
    layDanhSachChiNhanh().then((res) => {
      if (res && res.length) {
        setBranches(res);
        setSelectedBranch(res[0].maChiNhanh);
      }
    });
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownBranchRef.current &&
        !dropdownBranchRef.current.contains(event.target)
      ) {
        setIsMoDropdownChiNhanh(false);
      }
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

  const handleQuickBook = () => {
    onDatBan?.();
  };

  const chiNhanhHienTai = branches.find((b) => b.maChiNhanh === selectedBranch);

  // Helper định dạng ngày hiển thị
  const dinhDangNgayHienThi = (dateStr) => {
    if (!dateStr) return "Chọn ngày";
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

    const thuNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const thu = thuNames[dateObj.getDay()];
    return `${thu}, ${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  };

  // Tính ma trận ngày trong tháng
  const generateCalendarDays = () => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
    const days = [];

    // Blank cells before first day
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ day: null, key: `empty-${i}` });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const isPast = dateString < homNayStr;
      const isSelected = dateString === selectedDate;
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
    setSelectedDate(str);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
    setIsMoDatePicker(false);
  };

  return (
    <div className="relative z-30 mx-auto max-w-4xl p-3 sm:p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-amber-500/30 shadow-2xl shadow-black/95 mb-6 sm:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 text-left items-stretch">
        {/* Custom Branch Dropdown (4 cols) */}
        <div
          ref={dropdownBranchRef}
          className="relative sm:col-span-4 flex flex-col"
        >
          <button
            type="button"
            onClick={() => {
              setIsMoDropdownChiNhanh(!isMoDropdownChiNhanh);
              setIsMoDatePicker(false);
            }}
            className="w-full h-full text-left p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 focus:border-amber-400 transition-all flex flex-col justify-between gap-1 group cursor-pointer"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Chi
              nhánh
            </span>
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-medium text-amber-100">
              <span className="truncate">
                {chiNhanhHienTai?.tenChiNhanh ||
                  (branches.length
                    ? "Chọn chi nhánh"
                    : "Đang tải chi nhánh...")}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-amber-400/80 group-hover:text-amber-300 transition-transform duration-200 shrink-0 ${
                  isMoDropdownChiNhanh ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Branch Dropdown Menu - mở lên trên */}
          {isMoDropdownChiNhanh && (
            <div className="absolute bottom-full left-0 right-0 mb-2.5 py-1.5 rounded-xl bg-[#18110a] border border-amber-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-50 max-h-60 overflow-y-auto">
              {branches.length > 0 ? (
                branches.map((b) => {
                  const isSelected = selectedBranch === b.maChiNhanh;
                  return (
                    <button
                      key={b.maChiNhanh}
                      type="button"
                      onClick={() => {
                        setSelectedBranch(b.maChiNhanh);
                        setIsMoDropdownChiNhanh(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs sm:text-sm flex items-center justify-between gap-2 transition-colors ${
                        isSelected
                          ? "bg-amber-400/20 text-amber-300 font-semibold"
                          : "text-amber-100/90 hover:bg-white/10 hover:text-amber-200"
                      }`}
                    >
                      <div className="flex flex-col truncate">
                        <span className="truncate">{b.tenChiNhanh}</span>
                        {b.diaChi && (
                          <span className="text-[10px] text-amber-200/50 truncate">
                            {b.diaChi}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-2 text-xs text-amber-200/60 text-center">
                  Đang tải danh sách chi nhánh...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Custom Luxury Theme Date Picker (3 cols) */}
        <div
          ref={dropdownDateRef}
          className="relative sm:col-span-3 flex flex-col"
        >
          <button
            type="button"
            onClick={() => {
              setIsMoDatePicker(!isMoDatePicker);
              setIsMoDropdownChiNhanh(false);
            }}
            className="w-full h-full text-left p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 focus:border-amber-400 transition-all flex flex-col justify-between gap-1 group cursor-pointer"
          >
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Ngày
              đến
            </span>
            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm font-medium text-amber-100">
              <span className="truncate">
                {dinhDangNgayHienThi(selectedDate)}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-amber-400/80 group-hover:text-amber-300 transition-transform duration-200 shrink-0 ${
                  isMoDatePicker ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Custom Date Picker Popover - mở lên trên không che section dưới */}
          {isMoDatePicker && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mb-2.5 p-3.5 rounded-2xl bg-[#18110a] border border-amber-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-50 w-[290px] sm:w-[310px]">
              {/* Quick Select Buttons */}
              <div className="flex items-center justify-between gap-1.5 mb-3 pb-2.5 border-b border-amber-500/20">
                <button
                  type="button"
                  onClick={() => chonNgayNhanh("today")}
                  className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                    selectedDate === homNayStr
                      ? "bg-amber-400 text-black shadow-sm"
                      : "bg-white/5 text-amber-200/80 hover:bg-amber-400/20 hover:text-amber-300"
                  }`}
                >
                  Hôm nay
                </button>
                <button
                  type="button"
                  onClick={() => chonNgayNhanh("tomorrow")}
                  className="flex-1 py-1 text-[11px] font-semibold rounded-lg bg-white/5 text-amber-200/80 hover:bg-amber-400/20 hover:text-amber-300 transition-all"
                >
                  Ngày mai
                </button>
                <button
                  type="button"
                  onClick={() => chonNgayNhanh("weekend")}
                  className="flex-1 py-1 text-[11px] font-semibold rounded-lg bg-white/5 text-amber-200/80 hover:bg-amber-400/20 hover:text-amber-300 transition-all"
                >
                  Cuối tuần
                </button>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-2.5 px-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 hover:bg-amber-400/20 text-amber-300 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs sm:text-sm font-serif font-bold text-amber-200">
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
                        setSelectedDate(item.dateString);
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

        {/* Luxury Guest Stepper & Input (3 cols) */}
        <div className="sm:col-span-3 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 focus-within:border-amber-400 transition-all flex flex-col justify-between gap-1">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Số khách
          </span>
          <div className="flex items-center justify-between gap-1">
            <button
              type="button"
              onClick={() =>
                setGuestCount((g) => Math.max(1, (Number(g) || 1) - 1))
              }
              disabled={Number(guestCount) <= 1}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-400/10 hover:bg-amber-400/25 active:scale-90 text-amber-300 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-all border border-amber-500/30 hover:border-amber-500/60 cursor-pointer shrink-0"
              title="Giảm 1"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
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
              className="w-full bg-transparent text-center text-sm sm:text-base font-bold text-amber-100 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:text-amber-300"
            />
            <button
              type="button"
              onClick={() =>
                setGuestCount((g) => Math.min(99, (Number(g) || 0) + 1))
              }
              disabled={Number(guestCount) >= 99}
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-400/10 hover:bg-amber-400/25 active:scale-90 text-amber-300 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center transition-all border border-amber-500/30 hover:border-amber-500/60 cursor-pointer shrink-0"
              title="Tăng 1"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Button (2 cols) */}
        <div className="sm:col-span-2 flex">
          <button
            type="button"
            onClick={handleQuickBook}
            className="w-full h-full min-h-[46px] sm:min-h-[56px] px-4 py-2.5 rounded-xl btn-primary flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold shadow-lg shadow-amber-900/40 hover:scale-[1.03] active:scale-98 transition-all cursor-pointer"
          >
            <span>Tìm bàn</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThanhDatBanNhanh;
