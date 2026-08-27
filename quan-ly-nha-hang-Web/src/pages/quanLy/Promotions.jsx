import { useState } from "react";
import { Plus, Tag } from "lucide-react";
import { mockPromotions } from "../../data/quanLyMock";
const statusStyle = {
  "Đang chạy": {
    bg: "var(--success-bg)",
    color: "var(--success)",
  },
  "Chờ chạy": {
    bg: "var(--info-bg)",
    color: "var(--info)",
  },
  "Đã kết thúc": {
    bg: "var(--muted)",
    color: "var(--muted-foreground)",
  },
};
function Promotions() {
  const [promos, setPromos] = useState(mockPromotions);
  const [filter, setFilter] = useState("");
  const filtered = filter ? promos.filter((p) => p.status === filter) : promos;
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
            Khuyến mãi
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {promos.length} chương trình
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 hover:opacity-90"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          <Plus size={14} /> Tạo khuyến mãi
        </button>
      </div>
      <div className="flex items-center gap-1.5">
        {["", "Đang chạy", "Chờ chạy", "Đã kết thúc"].map((s) => (
          <button
            onClick={() => setFilter(s)}
            className="px-3 py-1 rounded-full text-xs font-500 transition-colors"
            style={{
              background: filter === s ? "var(--primary)" : "var(--secondary)",
              color: filter === s ? "white" : "var(--secondary-foreground)",
            }}
          >
            {s || "Tất cả"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
        {filtered.map((p) => (
          <div
            className="bg-white rounded-xl border p-4"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-start gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--primary-light)",
                  }}
                >
                  <Tag
                    size={14}
                    style={{
                      color: "var(--primary)",
                    }}
                  />
                </div>
                <div>
                  <div
                    className="text-sm font-600"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {p.type} · {p.value}
                  </div>
                </div>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded font-500 shrink-0"
                style={{
                  background: statusStyle[p.status].bg,
                  color: statusStyle[p.status].color,
                }}
              >
                {p.status}
              </span>
            </div>
            <div
              className="text-xs mb-3"
              style={{
                color: "var(--muted-foreground)",
              }}
            >
              {p.startDate} → {p.endDate}
            </div>
            <div className="flex items-center justify-between">
              <div
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                Đã dùng:{" "}
                <span
                  className="font-600"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {p.usedCount} lần
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="text-xs font-500 hover:underline"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  Sửa
                </button>
                <button
                  className="text-xs font-500 hover:underline"
                  style={{
                    color: "var(--danger)",
                  }}
                  onClick={() =>
                    setPromos((prev) => prev.filter((x) => x.id !== p.id))
                  }
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export { Promotions as default };
