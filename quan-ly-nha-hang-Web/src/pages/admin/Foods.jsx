import { useState } from "react";
import { foods as initialFoods, categories } from "../../data/admin/mockData";
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
const catOptions = [{ label: "T\u1EA5t c\u1EA3 danh m\u1EE5c", value: "all" }, ...categories.map((c) => ({ label: c.name, value: c.name }))];
export default function Foods() {
  const [items, setItems] = useState(initialFoods);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: categories[0].name, price: "" });
  const filtered = items.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || f.category === filterCat;
    return matchSearch && matchCat;
  });
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const foodImages = [
    "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=80&h=80&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=80&h=80&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=80&h=80&fit=crop&auto=format"
  ];
  function handleAdd() {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: form.name,
        category: form.category,
        price: parseInt(form.price) || 0,
        status: "active",
        image: foodImages[Math.floor(Math.random() * foodImages.length)]
      }
    ]);
    setAddOpen(false);
    setForm({ name: "", category: categories[0].name, price: "" });
  }
  function handleEdit() {
    if (!editItem) return;
    setItems((prev) => prev.map((f) => f.id === editItem.id ? editItem : f));
    setEditItem(null);
  }
  return <div style={{ padding: "28px 32px" }}>
      <PageHeader
    title="Quản lý món ăn"
    subtitle={`${items.length} m\xF3n \u0103n trong th\u1EF1c \u0111\u01A1n`}
    action={<Button icon={<PlusIcon />} onClick={() => setAddOpen(true)}>Thêm món ăn</Button>}
  />
      <Card>
        <div style={{ padding: "16px 16px 0", display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Input value={search} onChange={(v) => {
    setSearch(v);
    setPage(1);
  }} placeholder="Tên món ăn..." icon={<SearchIcon />} />
          <Select value={filterCat} onChange={(v) => {
    setFilterCat(v);
    setPage(1);
  }} options={catOptions} />
        </div>
        <div style={{ marginTop: 12 }}>
          {paged.length === 0 ? <EmptyState message="Không tìm thấy món ăn nào" /> : <Table headers={["M\xF3n \u0103n", "Danh m\u1EE5c", "Gi\xE1", "Tr\u1EA1ng th\xE1i", "Thao t\xE1c"]}>
              {paged.map((f) => <Tr key={f.id}>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <img
    src={f.image}
    alt={f.name}
    width={40}
    height={40}
    style={{ borderRadius: 8, objectFit: "cover", background: "#f5f0e8", flexShrink: 0 }}
  />
                      <span style={{ fontWeight: 600 }}>{f.name}</span>
                    </div>
                  </Td>
                  <Td>
                    <span style={{ fontSize: 12.5, background: "#f5f0e8", color: "#7a6248", padding: "2px 9px", borderRadius: 20, fontWeight: 500 }}>{f.category}</span>
                  </Td>
                  <Td>
                    <span style={{ fontWeight: 700, color: "#c9922a" }}>{f.price.toLocaleString("vi-VN")} đ</span>
                  </Td>
                  <Td><Badge status={f.status} /></Td>
                  <Td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Button variant="ghost" size="sm" icon={<EditIcon />} onClick={() => setEditItem({ ...f })}>Sửa</Button>
                      <Button variant="danger" size="sm" icon={<TrashIcon />} onClick={() => setDeleteId(f.id)}>Xóa</Button>
                    </div>
                  </Td>
                </Tr>)}
            </Table>}
          <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
        </div>
      </Card>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Thêm món ăn mới">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Tên món ăn</label>
            <Input value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="VD: Phở bò đặc biệt" />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Danh mục</label>
            <Select value={form.category} onChange={(v) => setForm({ ...form, category: v })} options={categories.map((c) => ({ label: c.name, value: c.name }))} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Giá (đồng)</label>
            <Input value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="VD: 85000" type="number" />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Hủy</Button>
            <Button onClick={handleAdd}>Thêm món</Button>
          </div>
        </div>
      </Modal>

      {editItem && <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Chỉnh sửa món ăn">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Tên món ăn</label>
              <Input value={editItem.name} onChange={(v) => setEditItem({ ...editItem, name: v })} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Danh mục</label>
              <Select value={editItem.category} onChange={(v) => setEditItem({ ...editItem, category: v })} options={categories.map((c) => ({ label: c.name, value: c.name }))} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#5a4030", display: "block", marginBottom: 5 }}>Giá (đồng)</label>
              <Input value={String(editItem.price)} onChange={(v) => setEditItem({ ...editItem, price: parseInt(v) || 0 })} type="number" />
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
        setItems((p) => p.filter((f) => f.id !== deleteId));
        setDeleteId(null);
      }
    }}
    message="Bạn có chắc muốn xóa món ăn này?"
  />
    </div>;
}
