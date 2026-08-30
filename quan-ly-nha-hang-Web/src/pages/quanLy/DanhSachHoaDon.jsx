import { useState, useEffect } from "react";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { mockInvoices, BRANCHES } from "../../data/quanLyMock";
import { layDanhSachHoaDon } from "../../services/hoaDon.service";
import { dinhDangTien } from "../../utils/dinhDang";
const statusColor = {
  "Hoàn thành": {
    bg: "var(--success-bg)",
    text: "var(--success)",
  },
  "Chờ xử lý": {
    bg: "var(--warning-bg)",
    text: "var(--warning)",
  },
  "Đã hủy": {
    bg: "var(--danger-bg)",
    text: "var(--danger)",
  },
};
const PAGE_SIZE = 10;
function Invoices({ role, onNavigate, onSelectInvoice }) {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    layDanhSachHoaDon().then((data) => {
      if (data && data.length > 0) {
        setInvoices(data);
      }
    });
  }, []);

  const baseInvoices =
    role === "manager"
      ? invoices.filter((i) => i.branch === "Quận 1")
      : invoices;
  const filtered = baseInvoices.filter((inv) => {
    if (search && !inv.id.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (sourceFilter && inv.source !== sourceFilter) return false;
    if (statusFilter && inv.status !== statusFilter) return false;
    if (branchFilter && inv.branch !== branchFilter) return false;
    return true;
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectStyle =
    "text-sm border rounded-lg px-3 py-1.5 outline-none bg-white";
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
            Hóa đơn
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {filtered.length} hóa đơn
          </p>
        </div>
        <button
          onClick={() => onNavigate("create-invoice")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 hover:opacity-90"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          <Plus size={14} /> Tạo hóa đơn
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
            type="text"
            placeholder="Tìm mã hóa đơn..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="text-sm border rounded-lg pl-8 pr-3 py-1.5 w-48 outline-none bg-white"
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
            className={selectStyle}
            style={{
              borderColor: "var(--border)",
            }}
          >
            {BRANCHES.map((b) => (
              <option value={b === "Tất cả" ? "" : b}>{b}</option>
            ))}
          </select>
        )}
        <select
          value={sourceFilter}
          onChange={(e) => {
            setSourceFilter(e.target.value);
            setPage(1);
          }}
          className={selectStyle}
          style={{
            borderColor: "var(--border)",
          }}
        >
          <option value="">Tất cả nguồn</option>
          <option value="ONLINE">Online</option>
          <option value="WALK_IN">Tại quầy</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className={selectStyle}
          style={{
            borderColor: "var(--border)",
          }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Chờ xử lý">Chờ xử lý</option>
          <option value="Đã hủy">Đã hủy</option>
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
                "Mã hóa đơn",
                "Thời gian",
                ...(role === "admin" ? ["Chi nhánh"] : []),
                "Nguồn",
                "Tổng tiền",
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
            {paged.length === 0 && (
              <tr>
                <td
                  colSpan={role === "admin" ? 7 : 6}
                  className="px-4 py-8 text-center text-sm"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  Không tìm thấy hóa đơn
                </td>
              </tr>
            )}
            {paged.map((inv) => (
              <tr
                className="border-t hover:bg-[var(--secondary)] transition-colors cursor-pointer"
                style={{
                  borderColor: "var(--border)",
                }}
                onClick={() => {
                  onSelectInvoice(inv.id);
                  onNavigate("invoice-detail");
                }}
              >
                <td
                  className="px-4 py-3 font-600 text-xs"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  {inv.id}
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {inv.createdAt}
                </td>
                {role === "admin" && (
                  <td
                    className="px-4 py-3 text-xs"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {inv.branch}
                  </td>
                )}
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-500"
                    style={{
                      background:
                        inv.source === "ONLINE"
                          ? "var(--info-bg)"
                          : "var(--success-bg)",
                      color:
                        inv.source === "ONLINE"
                          ? "var(--info)"
                          : "var(--success)",
                    }}
                  >
                    {inv.source === "ONLINE" ? "Online" : "Tại quầy"}
                  </span>
                </td>
                <td
                  className="px-4 py-3 text-xs font-600"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {dinhDangTien(inv.total)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-500"
                    style={{
                      background: statusColor[inv.status].bg,
                      color: statusColor[inv.status].text,
                    }}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="text-xs font-500 hover:underline"
                    style={{
                      color: "var(--primary)",
                    }}
                    onClick={() => {
                      onSelectInvoice(inv.id);
                      onNavigate("invoice-detail");
                    }}
                  >
                    Chi tiết
                  </button>
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
            <div className="flex items-center gap-1">
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
export { Invoices as default };
