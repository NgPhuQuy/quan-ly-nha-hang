import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { layDanhSachKhachHang } from "../../services/khachHang.service";
import { dinhDangTien } from "../../utils/dinhDang";
function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    layDanhSachKhachHang().then((data) => {
      if (data && data.length > 0) {
        setCustomers(data);
      }
    });
  }, []);

  const filtered = customers.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
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
            Khách hàng
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {customers.length} khách hàng
          </p>
        </div>
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
          placeholder="Tìm theo tên, SĐT..."
          className="w-full text-sm border rounded-lg pl-8 pr-3 py-1.5 outline-none bg-white"
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
                "Khách hàng",
                "Số điện thoại",
                "Email",
                "Số đơn",
                "Tổng chi tiêu",
                "Lần cuối ghé",
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
            {filtered.map((c) => (
              <tr
                className="border-t hover:bg-[var(--secondary)] transition-colors"
                style={{
                  borderColor: "var(--border)",
                }}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 text-white shrink-0"
                      style={{
                        background: "var(--muted-foreground)",
                      }}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <span
                      className="text-sm font-500"
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      {c.name}
                    </span>
                  </div>
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {c.phone}
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {c.email}
                </td>
                <td
                  className="px-4 py-3 text-xs font-600"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {c.totalOrders}
                </td>
                <td
                  className="px-4 py-3 text-xs font-600"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  {dinhDangTien(c.totalSpent)}
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {c.lastVisit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export { Customers as default };
