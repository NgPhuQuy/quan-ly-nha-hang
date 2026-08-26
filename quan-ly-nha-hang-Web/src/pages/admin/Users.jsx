import { useState } from "react";
import { users as initialUsers } from "../../data/admin/mockData";
import { Badge, Button, Card, ConfirmDialog, EmptyState, Input, Modal, PageHeader, Pagination, Select, Table, Td, Tr } from "../../components/admin/ui";
function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
}
function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
}
function EditIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
}
function TrashIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>;
}
const PAGE_SIZE = 6;
const roleColors = {
  Admin: { bg: "#fef3d8", color: "#c9922a" },
  Manager: { bg: "#dbeafe", color: "#1d4ed8" },
  Staff: { bg: "#f5f0e8", color: "#5a4030" }
};
export default function Users() {
  const [items, setItems] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "Staff", branch: "" });
  const filtered = items.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  function handleAdd() {
    setItems((prev) => [...prev, { id: prev.length + 1, ...form, status: "active", createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0] }]);
    setAddOpen(false);
    setForm({ name: "", email: "", role: "Staff", branch: "" });
  }
  function handleEdit() {
    if (!editItem) return;
    setItems((prev) => prev.map((u) => u.id === editItem.id ? editItem : u));
    setEditItem(null);
  }
  return <div style={{ padding: "28px 32px" }}>
      <PageHeader
    title="Quản lý tài khoản"
    subtitle={`${items.length} t\xE0i kho\u1EA3n trong h\u1EC7 th\u1ED1ng`}
    action={<Button icon={<PlusIcon />} onClick={() => setAddOpen(true)}>Thêm tài khoản</Button>}
  />
      <Card>
        <div style={{ padding: "16px 16px 0", display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Input value={search} onChange={(v) => {
    setSearch(v);
    setPage(1);
  }} placeholder="Tên, email..." icon={<SearchIcon />} />
          <Select value={filterRole} onChange={(v) => {
    setFilterRole(v);
    setPage(1);
  }} options={[
    { label: "T\u1EA5t c\u1EA3 vai tr\xF2", value: "all" },
    { label: "Admin", value: "Admin" },
    { label: "Manager", value: "Manager" },
    { label: "Staff", value: "Staff" }
  ]} />
        </div>
        <div style={{ marginTop: 12 }}>
          {paged.length === 0 ? <EmptyState message="Không tìm thấy tài khoản nào" /> : <Table headers={["H\u1ECD t\xEAn", "Email", "Vai tr\xF2", "Chi nh\xE1nh", "Ng\xE0y t\u1EA1o", "Tr\u1EA1ng th\xE1i", "Thao t\xE1c"]}>
              {paged.map((u) => <Tr key={u.id}>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#c9922a,#e8a83a)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
                        {u.name[0]}
                      </div>
                      <span style={{ fontWeight: 600 }}>{u.name}</span>
                    </div>
                  </Td>
                  <Td mono>{u.email}</Td>
                  <Td>
                    <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 9px", borderRadius: 20, ...roleColors[u.role] }}>{u.role}</span>
                  </Td>
                  <Td>{u.branch}</Td>
                  <Td mono>{u.createdAt}</Td>
                  <Td><Badge status={u.status} /></Td>
                  <Td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Button variant="ghost" size="sm" icon={<EditIcon />} onClick={() => setEditItem({ ...u })}>Sửa</Button>
                      <Button variant="danger" size="sm" icon={<TrashIcon />} onClick={() => setDeleteId(u.id)}>Xóa</Button>
                    </div>
                  </Td>
                </Tr>)}
            </Table>}
          <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
        </div>
      </Card>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Thêm tài khoản mới">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
    { label: "H\u1ECD t\xEAn", key: "name", placeholder: "Nguy\u1EC5n V\u0103n A" },
    { label: "Email", key: "email", placeholder: "example@restaurant.vn" },
    { label: "Chi nh\xE1nh", key: "branch", placeholder: "VD: CN Ho\xE0n Ki\u1EBFm" }
  ].map(({ label, key, placeholder }) => <div key={key}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>{label}</label>
              <Input value={form[key]} onChange={(v) => setForm({ ...form, [key]: v })} placeholder={placeholder} />
            </div>)}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Vai trò</label>
            <Select value={form.role} onChange={(v) => setForm({ ...form, role: v })} options={[
    { label: "Admin", value: "Admin" },
    { label: "Manager", value: "Manager" },
    { label: "Staff", value: "Staff" }
  ]} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Hủy</Button>
            <Button onClick={handleAdd}>Thêm tài khoản</Button>
          </div>
        </div>
      </Modal>

      {editItem && <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Chỉnh sửa tài khoản">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Họ tên</label>
              <Input value={editItem.name} onChange={(v) => setEditItem({ ...editItem, name: v })} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Email</label>
              <Input value={editItem.email} onChange={(v) => setEditItem({ ...editItem, email: v })} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Vai trò</label>
              <Select value={editItem.role} onChange={(v) => setEditItem({ ...editItem, role: v })} options={[
    { label: "Admin", value: "Admin" },
    { label: "Manager", value: "Manager" },
    { label: "Staff", value: "Staff" }
  ]} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
              <Button variant="ghost" onClick={() => setEditItem(null)}>Hủy</Button>
              <Button onClick={handleEdit}>Lưu thay đổi</Button>
            </div>
          </div>
        </Modal>}

      <ConfirmDialog
    open={!!deleteId}
    onClose={() => setDeleteId(null)}
    onConfirm={() => {
      if (deleteId) {
        setItems((p) => p.filter((u) => u.id !== deleteId));
        setDeleteId(null);
      }
    }}
    message="Bạn có chắc muốn xóa tài khoản này? Hành động này không thể hoàn tác."
  />
    </div>;
}
