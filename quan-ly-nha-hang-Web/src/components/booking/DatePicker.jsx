import { useState } from "react";
import { cream, subtleGoldBorder } from "../../themes";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function DatePicker({ value, onChange }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarCells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  const selectedDate = value ? new Date(value + "T00:00") : null;
  const selectDate = (day) => {
    const date = new Date(year, month, day);
    if (date < today) return;
    onChange(
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    );
  };

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        border: `1px solid ${subtleGoldBorder}`,
        background: "rgba(20,12,6,0.95)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(200,136,42,.08)" }}
      >
        <button
          type="button"
          onClick={() => setVisibleMonth(new Date(year, month - 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
          style={{ color: "rgba(200,136,42,.65)" }}
        >
          ‹
        </button>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            color: cream,
            fontSize: ".88rem",
          }}
        >
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setVisibleMonth(new Date(year, month + 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
          style={{ color: "rgba(200,136,42,.65)" }}
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 px-1 pb-1 pt-2">
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className="text-center"
            style={{
              color: "rgba(200,136,42,.45)",
              fontSize: "10px",
              paddingBottom: 4,
            }}
          >
            {weekday}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 px-1 pb-2">
        {calendarCells.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} />;
          const date = new Date(year, month, day);
          const isPast = date < today;
          const isSelected =
            selectedDate?.toDateString() === date.toDateString();
          const isToday = date.toDateString() === today.toDateString();
          return (
            <button
              key={day}
              type="button"
              onClick={() => selectDate(day)}
              disabled={isPast}
              className="relative flex flex-col items-center justify-center rounded-lg transition-all duration-150"
              style={{
                height: 34,
                background: isSelected
                  ? "linear-gradient(135deg,#c8882a,#e8b84b)"
                  : "transparent",
                color: isSelected
                  ? "#1a120a"
                  : isPast
                    ? "rgba(240,216,144,.18)"
                    : isToday
                      ? "rgba(232,184,75,.95)"
                      : "rgba(240,216,144,.78)",
                cursor: isPast ? "not-allowed" : "pointer",
                fontWeight: isSelected || isToday ? 600 : 400,
                fontSize: "13px",
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default DatePicker;
