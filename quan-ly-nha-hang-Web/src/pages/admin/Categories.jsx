import { useState } from "react";
import { categories as initialCategories } from "../../data/admin/mockData";
import { Badge, Button, Card, ConfirmDialog, EmptyState, Input, Modal, PageHeader, Table, Td, Tr } from "../../components/admin/ui";
function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
}
function EditIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
}
function TrashIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>;
}
export default function Categories() {
  const [items, setItems] = useState(initialCategories);
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  function handleAdd() {
    setItems((prev) => [...prev, { id: prev.length + 1, name: form.name, description: form.description, itemCount: 0, status: "active" }]);
    setAddOpen(false);
    setForm({ name: "", description: "" });
  }
  function handleEdit() {
    if (!editItem) return;
    setItems((prev) => prev.map((c) => c.id === editItem.id ? editItem : c));
    setEditItem(null);
  }
  return <div style={{ padding: "28px 32px" }}>
      <PageHeader
    title="Danh mục món ăn"
    subtitle={`${items.length} danh m\u1EE5c`}
    action={<Button icon={<PlusIcon />} onClick={() => setAddOpen(true)}>Thêm danh mục</Button>}
  />
      <Card>
        {items.length === 0 ? <EmptyState /> : <Table headers={["T\xEAn danh m\u1EE5c", "M\xF4 t\u1EA3", "S\u1ED1 m\xF3n", "Tr\u1EA1ng th\xE1i", "Thao t\xE1c"]}>
            {items.map((c) => <Tr key={c.id}>
                <Td><span style={{ fontWeight: 600 }}>{c.name}</span></Td>
                <Td>{c.description}</Td>
                <Td>
                  <span style={{ fontWeight: 700, color: "#c9922a" }}>{c.itemCount}</span>
                </Td>
                <Td><Badge status={c.status} /></Td>
                <Td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Button variant="ghost" size="sm" icon={<EditIcon />} onClick={() => setEditItem({ ...c })}>Sửa</Button>
                    <Button variant="danger" size="sm" icon={<TrashIcon />} onClick={() => setDeleteId(c.id)}>Xóa</Button>
                  </div>
                </Td>
              </Tr>)}
          </Table>}
      </Card>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Thêm danh mục mới">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Tên danh mục</label>
            <Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="VD: Món chính" />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Mô tả</label>
            <Input value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Mô tả ngắn về danh mục" />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Hủy</Button>
            <Button onClick={handleAdd}>Thêm danh mục</Button>
          </div>
        </div>
      </Modal>

      {editItem && <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Chỉnh sửa danh mục">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Tên danh mục</label>
              <Input value={editItem.name} onChange={(v) => setEditItem({ ...editItem, name: v })} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Mô tả</label>
              <Input value={editItem.description} onChange={(v) => setEditItem({ ...editItem, description: v })} />
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
        setItems((p) => p.filter((c) => c.id !== deleteId));
        setDeleteId(null);
      }
    }}
    message="Bạn có chắc muốn xóa danh mục này? Các món ăn thuộc danh mục này sẽ không còn danh mục."
  />
    </div>;
}
