import { useState } from "react";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { mockInvoices, formatCurrency } from "../../data/pos/data";
const statusColor = {
  "Ho\xE0n th\xE0nh": { bg: "#F0FDF4", text: "#16A34A" },
  "Ch\u1EDD x\u1EED l\xFD": { bg: "#FFFBEB", text: "#D97706" },
  "\u0110\xE3 h\u1EE7y": { bg: "#FEF2F2", text: "#DC2626" }
};
const PAGE_SIZE = 8;
export default function Invoices({ onNavigate, onSelectInvoice }) {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const filtered = mockInvoices.filter((inv) => {
    if (search && !inv.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (sourceFilter && inv.source !== sourceFilter) return false;
    if (statusFilter && inv.status !== statusFilter) return false;
    return true;
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectStyle = "text-sm border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white";
  return <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-700" style={{ color: "var(--foreground)" }}>Hóa đơn</h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{filtered.length} hóa đơn</p>
        </div>
        <button
    onClick={() => onNavigate("create-invoice")}
    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 transition-opacity hover:opacity-90"
    style={{ background: "var(--primary)", color: "white" }}
  >
          <Plus size={15} />
          Tạo hóa đơn
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          <input
    type="text"
    placeholder="Tìm mã hóa đơn..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    className="text-sm border rounded-lg pl-8 pr-3 py-1.5 w-52 outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
    style={{ borderColor: "var(--border)" }}
  />
        </div>
        <select value={sourceFilter} onChange={(e) => {
    setSourceFilter(e.target.value);
    setPage(1);
  }} className={selectStyle} style={{ borderColor: "var(--border)" }}>
          <option value="">Tất cả nguồn</option>
          <option value="ONLINE">Online</option>
          <option value="WALK_IN">Tại quầy</option>
        </select>
        <select value={statusFilter} onChange={(e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  }} className={selectStyle} style={{ borderColor: "var(--border)" }}>
          <option value="">Tất cả trạng thái</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Chờ xử lý">Chờ xử lý</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--secondary)" }}>
            <tr>
              {["M\xE3 h\xF3a \u0111\u01A1n", "Th\u1EDDi gian", "Ngu\u1ED3n", "T\u1ED5ng ti\u1EC1n", "Tr\u1EA1ng th\xE1i", "Thao t\xE1c"].map((h) => <th key={h} className="px-4 py-3 text-left text-xs font-600" style={{ color: "var(--muted-foreground)" }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>Không tìm thấy hóa đơn</td></tr>}
            {paged.map((inv) => <tr key={inv.id} className="border-t hover:bg-[var(--secondary)] transition-colors" style={{ borderColor: "var(--border)" }}>
                <td className="px-4 py-3 font-600 text-xs" style={{ color: "var(--primary)" }}>{inv.id}</td>
                <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{inv.createdAt}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-md font-500" style={{
    background: inv.source === "ONLINE" ? "#EFF6FF" : "#F0FDF4",
    color: inv.source === "ONLINE" ? "#2563EB" : "#16A34A"
  }}>{inv.source === "ONLINE" ? "Online" : "T\u1EA1i qu\u1EA7y"}</span>
                </td>
                <td className="px-4 py-3 text-xs font-600" style={{ color: "var(--foreground)" }}>{formatCurrency(inv.total)}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-md font-500" style={{ background: statusColor[inv.status].bg, color: statusColor[inv.status].text }}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
    className="text-xs font-500 hover:underline"
    style={{ color: "var(--primary)" }}
    onClick={() => {
      onSelectInvoice(inv.id);
      onNavigate("invoice-detail");
    }}
  >
                    Chi tiết
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>

        {totalPages > 1 && <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Trang {page} / {totalPages}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-40 hover:bg-[var(--secondary)]">
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-40 hover:bg-[var(--secondary)]">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>}
      </div>
    </div>;
}
