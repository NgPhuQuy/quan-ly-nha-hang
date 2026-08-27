import { useState } from "react";
import { Search } from "lucide-react";
import {
  mockFoods,
  formatCurrency,
  FOOD_CATEGORIES,
} from "../../data/posMock";
const statusStyle = {
  "\u0110ang b\xE1n": { bg: "#F0FDF4", text: "#16A34A" },
  "H\u1EBFt m\xF3n": { bg: "#FEF2F2", text: "#DC2626" },
  "T\u1EA1m ng\u01B0ng": { bg: "#FFFBEB", text: "#D97706" },
};
const STATUS_OPTIONS = [
  "\u0110ang b\xE1n",
  "H\u1EBFt m\xF3n",
  "T\u1EA1m ng\u01B0ng",
];
export default function ThucDon() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("T\u1EA5t c\u1EA3");
  const [statusFilter, setStatusFilter] = useState("");
  const [statuses, setStatuses] = useState({});
  const getStatus = (food) => statuses[food.id] ?? food.status;
  const filtered = mockFoods.filter((f) => {
    if (catFilter !== "T\u1EA5t c\u1EA3" && f.category !== catFilter)
      return false;
    if (statusFilter && getStatus(f) !== statusFilter) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });
  const cycleStatus = (id, current) => {
    const idx = STATUS_OPTIONS.indexOf(current);
    setStatuses((prev) => ({
      ...prev,
      [id]: STATUS_OPTIONS[(idx + 1) % STATUS_OPTIONS.length],
    }));
  };
  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-base font-700"
            style={{ color: "var(--foreground)" }}
          >
            Món ăn
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            {filtered.length} món
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--muted-foreground)" }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm món ăn..."
            className="text-sm border rounded-lg pl-8 pr-3 py-1.5 w-52 outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
            style={{ borderColor: "var(--border)" }}
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className="px-3 py-1 rounded-full text-xs font-500 transition-colors"
              style={{
                background:
                  catFilter === cat ? "var(--primary)" : "var(--secondary)",
                color:
                  catFilter === cat ? "white" : "var(--secondary-foreground)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white ml-auto"
          style={{ borderColor: "var(--border)" }}
        >
          <option value="">Tất cả trạng thái</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 xl:grid-cols-4">
        {filtered.map((food) => {
          const status = getStatus(food);
          const s = statusStyle[status];
          return (
            <div
              key={food.id}
              className="bg-white rounded-xl border overflow-hidden"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="relative h-40 bg-[var(--secondary)] overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded font-500"
                  style={{ background: s.bg, color: s.text }}
                >
                  {status}
                </span>
              </div>
              <div className="p-3">
                <div
                  className="text-sm font-600 leading-snug mb-1"
                  style={{ color: "var(--foreground)" }}
                >
                  {food.name}
                </div>
                <div
                  className="text-xs mb-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {food.category}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-700"
                    style={{ color: "var(--primary)" }}
                  >
                    {formatCurrency(food.price)}
                  </span>
                  <button
                    onClick={() => cycleStatus(food.id, status)}
                    className="text-xs px-2 py-0.5 rounded border font-500 transition-colors hover:opacity-80"
                    style={{
                      borderColor: s.text,
                      color: s.text,
                      background: s.bg,
                    }}
                    title="Đổi trạng thái"
                  >
                    Đổi
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
