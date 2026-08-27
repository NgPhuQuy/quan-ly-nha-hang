import { useState } from "react";
import { Plus, Search, MapPin, Phone, TrendingUp } from "lucide-react";
import { mockBranches } from "../../data/quanLyMock";
import { dinhDangTienRutGon } from "../../utils/dinhDang";
const statusStyle = {
  "Hoạt động": {
    bg: "var(--success-bg)",
    color: "var(--success)",
  },
  "Tạm đóng": {
    bg: "var(--warning-bg)",
    color: "var(--warning)",
  },
};
function Branches() {
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState(mockBranches);
  const filtered = branches.filter(
    (b) =>
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase()),
  );
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
            Chi nhánh
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {branches.length} chi nhánh trong hệ thống
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 hover:opacity-90"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          <Plus size={14} /> Thêm chi nhánh
        </button>
      </div>
      <div className="relative max-w-xs">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{
            color: "var(--muted-foreground)",
          }}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm chi nhánh..."
          className="w-full text-sm border rounded-lg pl-8 pr-3 py-1.5 outline-none focus:ring-2 bg-white"
          style={{
            borderColor: "var(--border)",
          }}
        />
      </div>
      <div
        className="bg-white rounded-xl border overflow-hidden"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <table className="w-full text-sm">
          <thead
            style={{
              background: "var(--secondary)",
            }}
          >
            <tr>
              {[
                "Tên chi nhánh",
                "Địa chỉ",
                "Số điện thoại",
                "Quản lý",
                "Doanh thu (tháng)",
                "Trạng thái",
                "Thao tác",
              ].map((h) => (
                <th
                  className="px-4 py-2.5 text-left text-xs font-600"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr
                className="border-t hover:bg-[var(--secondary)] transition-colors"
                style={{
                  borderColor: "var(--border)",
                }}
              >
                <td className="px-4 py-3">
                  <div
                    className="text-sm font-600"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {b.name}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-start gap-1.5 text-xs"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <MapPin size={12} className="mt-0.5 shrink-0" />
                    <span className="max-w-[180px]">{b.address}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center gap-1.5 text-xs"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <Phone size={12} /> {b.phone}
                  </div>
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {b.manager}
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center gap-1.5 text-xs font-600"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    <TrendingUp size={12} /> {dinhDangTienRutGon(b.revenue)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-500"
                    style={{
                      background: statusStyle[b.status].bg,
                      color: statusStyle[b.status].color,
                    }}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
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
                        setBranches((prev) => prev.filter((x) => x.id !== b.id))
                      }
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export { Branches as default };
