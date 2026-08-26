import { useState } from "react";
import { promotions as initialPromotions } from "../../data/admin/mockData";
import { Badge, Button, Card, ConfirmDialog, EmptyState, Input, Modal, PageHeader, Table, Td, Tr } from "../../components/admin";
function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
}
function EditIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
}
function TrashIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>;
}
const statusLabel = {
  active: "active",
  upcoming: "upcoming",
  expired: "expired"
};
export default function Promotions() {
  const [items, setItems] = useState(initialPromotions);
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", discount: "", startDate: "", endDate: "", branch: "" });
  function handleAdd() {
    setItems((prev) => [...prev, {
      id: prev.length + 1,
      name: form.name,
      discount: form.discount,
      startDate: form.startDate,
      endDate: form.endDate,
      status: "upcoming",
      branch: form.branch
    }]);
    setAddOpen(false);
    setForm({ name: "", discount: "", startDate: "", endDate: "", branch: "" });
  }
  function handleEdit() {
    if (!editItem) return;
    setItems((prev) => prev.map((p) => p.id === editItem.id ? editItem : p));
    setEditItem(null);
  }
  return <div style={{ padding: "28px 32px" }}>
      <PageHeader
    title="Quản lý khuyến mãi"
    subtitle={`${items.length} ch\u01B0\u01A1ng tr\xECnh khuy\u1EBFn m\xE3i`}
    action={<Button icon={<PlusIcon />} onClick={() => setAddOpen(true)}>Thêm khuyến mãi</Button>}
  />
      <Card>
        {items.length === 0 ? <EmptyState /> : <Table headers={["T\xEAn khuy\u1EBFn m\xE3i", "Gi\u1EA3m gi\xE1", "Ng\xE0y b\u1EAFt \u0111\u1EA7u", "Ng\xE0y k\u1EBFt th\xFAc", "Chi nh\xE1nh \xE1p d\u1EE5ng", "Tr\u1EA1ng th\xE1i", "Thao t\xE1c"]}>
            {items.map((p) => <Tr key={p.id}>
                <Td><span style={{ fontWeight: 600 }}>{p.name}</span></Td>
                <Td>
                  <span style={{ fontWeight: 700, color: "#c9922a", fontSize: 15 }}>{p.discount}</span>
                </Td>
                <Td mono>{p.startDate}</Td>
                <Td mono>{p.endDate}</Td>
                <Td>{p.branch}</Td>
                <Td><Badge status={statusLabel[p.status]} /></Td>
                <Td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Button variant="ghost" size="sm" icon={<EditIcon />} onClick={() => setEditItem({ ...p })}>Sửa</Button>
                    <Button variant="danger" size="sm" icon={<TrashIcon />} onClick={() => setDeleteId(p.id)}>Xóa</Button>
                  </div>
                </Td>
              </Tr>)}
          </Table>}
      </Card>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Thêm chương trình khuyến mãi">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
    { label: "T\xEAn khuy\u1EBFn m\xE3i", key: "name", placeholder: "VD: Khuy\u1EBFn m\xE3i h\xE8 2024" },
    { label: "M\u1EE9c gi\u1EA3m gi\xE1", key: "discount", placeholder: "VD: 20%" },
    { label: "Ng\xE0y b\u1EAFt \u0111\u1EA7u", key: "startDate", placeholder: "2024-07-01", type: "date" },
    { label: "Ng\xE0y k\u1EBFt th\xFAc", key: "endDate", placeholder: "2024-07-31", type: "date" },
    { label: "Chi nh\xE1nh \xE1p d\u1EE5ng", key: "branch", placeholder: "VD: T\u1EA5t c\u1EA3 chi nh\xE1nh" }
  ].map(({ label, key, placeholder, type }) => <div key={key}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>{label}</label>
              <Input value={form[key]} onChange={(v) => setForm({ ...form, [key]: v })} placeholder={placeholder} type={type} />
            </div>)}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Hủy</Button>
            <Button onClick={handleAdd}>Thêm khuyến mãi</Button>
          </div>
        </div>
      </Modal>

      {editItem && <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Chỉnh sửa khuyến mãi">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Tên khuyến mãi</label>
              <Input value={editItem.name} onChange={(v) => setEditItem({ ...editItem, name: v })} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Mức giảm giá</label>
              <Input value={editItem.discount} onChange={(v) => setEditItem({ ...editItem, discount: v })} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Chi nhánh áp dụng</label>
              <Input value={editItem.branch} onChange={(v) => setEditItem({ ...editItem, branch: v })} />
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
        setItems((p) => p.filter((item) => item.id !== deleteId));
        setDeleteId(null);
      }
    }}
    message="Bạn có chắc muốn xóa chương trình khuyến mãi này?"
  />
    </div>;
}
