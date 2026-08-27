import { useState } from "react";
import { categories as initialCategories } from "../../data/admin/mockData";
import PageHeader from "../../components/admin/PageHeader";
import PlusIcon from "../../components/admin/PlusIcon";
import Button from "../../components/admin/Button";
import Card from "../../components/admin/Card";
import Table, { Tr, Td } from "../../components/admin/Table";
import EditIcon from "../../components/admin/EditIcon";
import TrashIcon from "../../components/admin/TrashIcon";
import Badge from "../../components/admin/Badge";
import Modal from "../../components/admin/Modal";
import Input from "../../components/admin/Input";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import EmptyState from "../../components/admin/EmptyState";

export default function Categories() {
  const [items, setItems] = useState(initialCategories);
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  function handleAdd() {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: form.name,
        description: form.description,
        itemCount: 0,
        status: "active",
      },
    ]);
    setAddOpen(false);
    setForm({ name: "", description: "" });
  }
  function handleEdit() {
    if (!editItem) return;
    setItems((prev) => prev.map((c) => (c.id === editItem.id ? editItem : c)));
    setEditItem(null);
  }
  return (
    <div style={{ padding: "28px 32px" }}>
      <PageHeader
        title="Danh mục món ăn"
        subtitle={`${items.length} danh m\u1EE5c`}
        action={
          <Button icon={<PlusIcon />} onClick={() => setAddOpen(true)}>
            Thêm danh mục
          </Button>
        }
      />
      <Card>
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <Table
            headers={[
              "T\xEAn danh m\u1EE5c",
              "M\xF4 t\u1EA3",
              "S\u1ED1 m\xF3n",
              "Tr\u1EA1ng th\xE1i",
              "Thao t\xE1c",
            ]}
          >
            {items.map((c) => (
              <Tr key={c.id}>
                <Td>
                  <span style={{ fontWeight: 600 }}>{c.name}</span>
                </Td>
                <Td>{c.description}</Td>
                <Td>
                  <span style={{ fontWeight: 700, color: "#c9922a" }}>
                    {c.itemCount}
                  </span>
                </Td>
                <Td>
                  <Badge status={c.status} />
                </Td>
                <Td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<EditIcon />}
                      onClick={() => setEditItem({ ...c })}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<TrashIcon />}
                      onClick={() => setDeleteId(c.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </Table>
        )}
      </Card>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Thêm danh mục mới"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#5a4030",
                display: "block",
                marginBottom: 5,
              }}
            >
              Tên danh mục
            </label>
            <Input
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="VD: Món chính"
            />
          </div>
          <div>
            <label
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#5a4030",
                display: "block",
                marginBottom: 5,
              }}
            >
              Mô tả
            </label>
            <Input
              value={form.description}
              onChange={(v) => setForm({ ...form, description: v })}
              placeholder="Mô tả ngắn về danh mục"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 4,
            }}
          >
            <Button variant="ghost" onClick={() => setAddOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAdd}>Thêm danh mục</Button>
          </div>
        </div>
      </Modal>

      {editItem && (
        <Modal
          open={!!editItem}
          onClose={() => setEditItem(null)}
          title="Chỉnh sửa danh mục"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#5a4030",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Tên danh mục
              </label>
              <Input
                value={editItem.name}
                onChange={(v) => setEditItem({ ...editItem, name: v })}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#5a4030",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                Mô tả
              </label>
              <Input
                value={editItem.description}
                onChange={(v) => setEditItem({ ...editItem, description: v })}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 4,
              }}
            >
              <Button variant="ghost" onClick={() => setEditItem(null)}>
                Hủy
              </Button>
              <Button onClick={handleEdit}>Lưu thay đổi</Button>
            </div>
          </div>
        </Modal>
      )}

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
    </div>
  );
}
