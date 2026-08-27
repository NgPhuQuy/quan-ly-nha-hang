import { useState } from "react";
import { Users } from "lucide-react";
import { mockTables } from "../../data/quanLyMock";
const statusStyle = {
  Trống: {
    bg: "var(--success-bg)",
    border: "#16A34A",
    text: "var(--success)",
    dot: "var(--success)",
  },
  "Đang phục vụ": {
    bg: "var(--danger-bg)",
    border: "#DC2626",
    text: "var(--danger)",
    dot: "var(--danger)",
  },
  "Đã đặt trước": {
    bg: "var(--warning-bg)",
    border: "#D97706",
    text: "var(--warning)",
    dot: "var(--warning)",
  },
};
const STATUS_OPTIONS = ["Trống", "Đang phục vụ", "Đã đặt trước"];
function Tables() {
  const [tables, setTables] = useState(mockTables);
  const [filter, setFilter] = useState("");
  const filtered = filter ? tables.filter((t) => t.status === filter) : tables;
  const counts = {
    Trống: tables.filter((t) => t.status === "Trống").length,
    "Đang phục vụ": tables.filter((t) => t.status === "Đang phục vụ").length,
    "Đã đặt trước": tables.filter((t) => t.status === "Đã đặt trước").length,
  };
  const cycleStatus = (id, current) => {
    const idx = STATUS_OPTIONS.indexOf(current);
    setTables((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: STATUS_OPTIONS[(idx + 1) % STATUS_OPTIONS.length],
            }
          : t,
      ),
    );
  };
  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-base font-700"
            style={{
              color: "var(--foreground)",
            }}
          >
            Sơ đồ bàn
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            Chi nhánh Quận 1 · {tables.length} bàn
          </p>
        </div>
        <div className="flex items-center gap-3">
          {Object.entries(counts).map(([status, count]) => (
            <div className="flex items-center gap-1.5 text-xs">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: statusStyle[status].dot,
                }}
              />
              <span
                style={{
                  color: "var(--foreground)",
                }}
              >
                {status}
              </span>
              <span
                className="font-600"
                style={{
                  color: "var(--foreground)",
                }}
              >
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setFilter("")}
          className="px-3 py-1 rounded-full text-xs font-500 transition-colors"
          style={{
            background: !filter ? "var(--primary)" : "var(--secondary)",
            color: !filter ? "white" : "var(--secondary-foreground)",
          }}
        >
          Tất cả
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            onClick={() => setFilter(s)}
            className="px-3 py-1 rounded-full text-xs font-500 transition-colors"
            style={{
              background: filter === s ? "var(--primary)" : "var(--secondary)",
              color: filter === s ? "white" : "var(--secondary-foreground)",
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3 xl:grid-cols-6">
        {filtered.map((table) => {
          const s = statusStyle[table.status];
          return (
            <button
              onClick={() => cycleStatus(table.id, table.status)}
              className="bg-white rounded-xl border-2 p-4 text-left transition-all hover:shadow-md"
              style={{
                borderColor: s.border,
              }}
              title="Nhấn để đổi trạng thái"
            >
              <div
                className="text-2xl font-800 mb-2"
                style={{
                  color: s.text,
                }}
              >
                {table.number}
              </div>
              <div
                className="flex items-center gap-1 text-xs mb-2"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                <Users size={11} /> {table.capacity} chỗ
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded font-500 block text-center"
                style={{
                  background: s.bg,
                  color: s.text,
                }}
              >
                {table.status}
              </span>
              {table.currentInvoice && (
                <div
                  className="text-xs mt-1.5 text-center"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {table.currentInvoice}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export { Tables as default };
