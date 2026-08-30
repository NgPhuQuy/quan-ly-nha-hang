import { useState, useEffect } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { mockBookings, BRANCH_OPTIONS } from "../../data/quanLyMock";
import { layDanhSachDatLich, xoaDatLich } from "../../services/datLich.service";
const statusStyle = {
  "Xác nhận": {
    bg: "var(--success-bg)",
    color: "var(--success)",
  },
  "Chờ xác nhận": {
    bg: "var(--warning-bg)",
    color: "var(--warning)",
  },
  "Đã huỷ": {
    bg: "var(--danger-bg)",
    color: "var(--danger)",
  },
};
const PAGE_SIZE = 8;
function Bookings({ role }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [bookings, setBookings] = useState(mockBookings);
  const [page, setPage] = useState(1);

  useEffect(() => {
    layDanhSachDatLich().then((data) => {
      if (data && data.length > 0) {
        setBookings(data);
      }
    });
  }, []);

  const handleDelete = async (booking) => {
    if (booking.maDatLichId) {
      try {
        await xoaDatLich(booking.maDatLichId);
      } catch (e) {
        console.warn("Delete API failed, removing locally", e);
      }
    }
    setBookings((prev) => prev.filter((x) => x.id !== booking.id));
  };
  const filtered = bookings.filter((b) => {
    if (
      search &&
      !b.customer.toLowerCase().includes(search.toLowerCase()) &&
      !b.phone.includes(search)
    )
      return false;
    if (statusFilter && b.status !== statusFilter) return false;
    if (branchFilter && b.branch !== branchFilter) return false;
    return true;
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
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
            Đặt lịch
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {filtered.length} lịch đặt
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 hover:opacity-90"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          <Plus size={14} /> Thêm đặt lịch
        </button>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{
              color: "var(--muted-foreground)",
            }}
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm khách hàng, SĐT..."
            className="w-52 text-sm border rounded-lg pl-8 pr-3 py-1.5 outline-none bg-white"
            style={{
              borderColor: "var(--border)",
            }}
          />
        </div>
        {role === "admin" && (
          <select
            value={branchFilter}
            onChange={(e) => {
              setBranchFilter(e.target.value);
              setPage(1);
            }}
            className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <option value="">Tất cả chi nhánh</option>
            {BRANCH_OPTIONS.map((b) => (
              <option>{b}</option>
            ))}
          </select>
        )}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <option value="">Tất cả trạng thái</option>
          {["Xác nhận", "Chờ xác nhận", "Đã huỷ"].map((s) => (
            <option>{s}</option>
          ))}
        </select>
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
                "Mã",
                "Khách hàng",
                "Ngày / Giờ",
                "Số khách",
                "Bàn",
                ...(role === "admin" ? ["Chi nhánh"] : []),
                "Trạng thái",
                "Ghi chú",
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
            {paged.map((b) => (
              <tr
                className="border-t hover:bg-[var(--secondary)] transition-colors"
                style={{
                  borderColor: "var(--border)",
                }}
              >
                <td
                  className="px-4 py-3 text-xs font-600"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  {b.id}
                </td>
                <td className="px-4 py-3">
                  <div
                    className="text-xs font-500"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {b.customer}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {b.phone}
                  </div>
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {b.date} {b.time}
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {b.guests} người
                </td>
                <td
                  className="px-4 py-3 text-xs font-600"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  Bàn {b.table}
                </td>
                {role === "admin" && (
                  <td
                    className="px-4 py-3 text-xs"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {b.branch}
                  </td>
                )}
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
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {b.note || "—"}
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
                      onClick={() => handleDelete(b)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div
            className="flex items-center justify-between px-4 py-2.5 border-t"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <span
              className="text-xs"
              style={{
                color: "var(--muted-foreground)",
              }}
            >
              Trang {page} / {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-40 hover:bg-[var(--secondary)]"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-40 hover:bg-[var(--secondary)]"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export { Bookings as default };
