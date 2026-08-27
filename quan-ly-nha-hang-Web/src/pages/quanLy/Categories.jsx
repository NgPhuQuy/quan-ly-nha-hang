import { useState } from "react";
import { Plus } from "lucide-react";
import { mockCategories } from "../../data/quanLyMock";
function Categories() {
  const [cats, setCats] = useState(mockCategories);
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
            Danh mục món
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {cats.length} danh mục
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 hover:opacity-90"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          <Plus size={14} /> Thêm danh mục
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 xl:grid-cols-4">
        {cats.map((cat) => (
          <div
            className="bg-white rounded-xl border p-4 flex items-start gap-3"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div
              className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
              style={{
                background: "var(--secondary)",
              }}
            >
              {cat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div
                  className="text-sm font-600"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {cat.name}
                </div>
                <span
                  className="text-xs px-1.5 py-0.5 rounded font-500 shrink-0"
                  style={{
                    background:
                      cat.status === "Hoạt động"
                        ? "var(--success-bg)"
                        : "var(--muted)",
                    color:
                      cat.status === "Hoạt động"
                        ? "var(--success)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {cat.status}
                </span>
              </div>
              <div
                className="text-xs mt-1"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {cat.itemCount} món
              </div>
              <div className="flex gap-3 mt-3">
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
                    setCats((prev) => prev.filter((c) => c.id !== cat.id))
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
export { Categories as default };
