import { useState } from "react";
import { invoices as initialInvoices } from "../../data/admin/mockData";
import { Badge, Button, Card, EmptyState, Input, Modal, PageHeader, Pagination, Select, Table, Td, Tr } from "../../components/admin/ui";
function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
}
function EyeIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>;
}
const PAGE_SIZE = 8;
export default function Invoices() {
  const [search, setSearch] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [viewItem, setViewItem] = useState(null);
  const filtered = initialInvoices.filter((inv) => {
    const matchSearch = inv.id.toLowerCase().includes(search.toLowerCase()) || inv.branch.toLowerCase().includes(search.toLowerCase());
    const matchSource = filterSource === "all" || inv.source === filterSource;
    const matchStatus = filterStatus === "all" || inv.status === filterStatus;
    return matchSearch && matchSource && matchStatus;
  });
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return <div style={{ padding: "28px 32px" }}>
      <PageHeader title="Quản lý hóa đơn" subtitle="Tất cả hóa đơn từ mọi chi nhánh" />
      <Card>
        <div style={{ padding: "16px 16px 0", display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Input value={search} onChange={(v) => {
    setSearch(v);
    setPage(1);
  }} placeholder="Mã HĐ, chi nhánh..." icon={<SearchIcon />} />
          <Select value={filterSource} onChange={(v) => {
    setFilterSource(v);
    setPage(1);
  }} options={[
    { label: "T\u1EA5t c\u1EA3 ngu\u1ED3n", value: "all" },
    { label: "WALK-IN", value: "WALK-IN" },
    { label: "ONLINE", value: "ONLINE" }
  ]} />
          <Select value={filterStatus} onChange={(v) => {
    setFilterStatus(v);
    setPage(1);
  }} options={[
    { label: "T\u1EA5t c\u1EA3 tr\u1EA1ng th\xE1i", value: "all" },
    { label: "\u0110\xE3 thanh to\xE1n", value: "paid" },
    { label: "Ch\u1EDD x\u1EED l\xFD", value: "pending" },
    { label: "\u0110\xE3 h\u1EE7y", value: "cancelled" }
  ]} />
        </div>
        <div style={{ marginTop: 12 }}>
          {paged.length === 0 ? <EmptyState /> : <Table headers={["M\xE3 H\u0110", "Chi nh\xE1nh", "Th\u1EDDi gian", "Ngu\u1ED3n", "T\u1ED5ng ti\u1EC1n", "Tr\u1EA1ng th\xE1i", "Thao t\xE1c"]}>
              {paged.map((inv) => <Tr key={inv.id}>
                  <Td mono>{inv.id}</Td>
                  <Td>{inv.branch}</Td>
                  <Td mono>{inv.time}</Td>
                  <Td>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: inv.source === "ONLINE" ? "#dbeafe" : "#f5f0e8", color: inv.source === "ONLINE" ? "#1d4ed8" : "#7a6248" }}>
                      {inv.source}
                    </span>
                  </Td>
                  <Td>
                    <span style={{ fontWeight: 700, color: "#2c1a0e" }}>{inv.total.toLocaleString("vi-VN")} đ</span>
                  </Td>
                  <Td><Badge status={inv.status} /></Td>
                  <Td>
                    <Button variant="ghost" size="sm" icon={<EyeIcon />} onClick={() => setViewItem(inv)}>Xem</Button>
                  </Td>
                </Tr>)}
            </Table>}
          <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
        </div>
      </Card>

      {viewItem && <Modal open={!!viewItem} onClose={() => setViewItem(null)} title={`Chi ti\u1EBFt h\xF3a \u0111\u01A1n ${viewItem.id}`}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
    ["M\xE3 h\xF3a \u0111\u01A1n", viewItem.id],
    ["Chi nh\xE1nh", viewItem.branch],
    ["Th\u1EDDi gian", viewItem.time],
    ["Ngu\u1ED3n", viewItem.source],
    ["T\u1ED5ng ti\u1EC1n", viewItem.total.toLocaleString("vi-VN") + " \u0111"]
  ].map(([label, value]) => <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0ece3" }}>
                <span style={{ fontSize: 13.5, color: "#7a6248" }}>{label}</span>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#2c1a0e" }}>{value}</span>
              </div>)}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
              <span style={{ fontSize: 13.5, color: "#7a6248" }}>Trạng thái</span>
              <Badge status={viewItem.status} />
            </div>
          </div>
        </Modal>}
    </div>;
}
