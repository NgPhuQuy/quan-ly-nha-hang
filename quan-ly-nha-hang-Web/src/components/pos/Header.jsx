import { Bell, ChevronDown } from "lucide-react";
export default function Header({ title }) {
  const now = /* @__PURE__ */ new Date();
  const dateStr = now.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <header
      className="h-14 shrink-0 flex items-center justify-between px-6 bg-white border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div>
        <h1
          className="text-base font-700"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h1>
        <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {dateStr}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--secondary)]">
          <Bell size={16} style={{ color: "var(--muted-foreground)" }} />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ background: "var(--primary)" }}
          />
        </button>
        <div
          className="flex items-center gap-2 pl-3 border-l cursor-pointer"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 text-white"
            style={{ background: "var(--primary)" }}
          >
            TL
          </div>
          <div
            className="text-sm font-500"
            style={{ color: "var(--foreground)" }}
          >
            Trần Long
          </div>
          <ChevronDown size={14} style={{ color: "var(--muted-foreground)" }} />
        </div>
      </div>
    </header>
  );
}
