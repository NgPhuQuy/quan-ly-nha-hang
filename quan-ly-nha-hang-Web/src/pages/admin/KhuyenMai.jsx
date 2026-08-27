import { useState } from "react";
import { promotions as initialPromotions } from "../../data/adminMock";
import PageHeader from "../../components/admin/PageHeader";
import PlusIcon from "../../components/admin/PlusIcon";
import Button from "../../components/admin/Button";
import Card from "../../components/admin/Card";
import Table, { Tr } from "../../components/admin/Table";
import EditIcon from "../../components/admin/EditIcon";
import TrashIcon from "../../components/admin/TrashIcon";
import Badge from "../../components/admin/Badge";
import Modal from "../../components/admin/Modal";
import Input from "../../components/admin/Input";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import EmptyState from "../../components/admin/EmptyState";

const statusLabel = {
  active: "active",
  upcoming: "upcoming",
  expired: "expired",
};
export default function KhuyenMai() {
  const [items, setItems] = useState(initialPromotions);
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    discount: "",
    startDate: "",
    endDate: "",
    branch: "",
  });
  function handleAdd() {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: form.name,
        discount: form.discount,
        startDate: form.startDate,
        endDate: form.endDate,
        status: "upcoming",
        branch: form.branch,
      },
    ]);
    setAddOpen(false);
    setForm({ name: "", discount: "", startDate: "", endDate: "", branch: "" });
  }
  function handleEdit() {
    if (!editItem) return;
    setItems((prev) => prev.map((p) => (p.id === editItem.id ? editItem : p)));
    setEditItem(null);
  }
  return (
    <div style={{ padding: "28px 32px" }}>
      <PageHeader
        title="Quản lý khuyến mãi"
        subtitle={`${items.length} ch\u01B0\u01A1ng tr\xECnh khuy\u1EBFn m\xE3i`}
        action={
          <Button icon={<PlusIcon />} onClick={() => setAddOpen(true)}>
            Thêm khuyến mãi
          </Button>
        }
      />
      <Card>
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <Table
            headers={[
              "T\xEAn khuy\u1EBFn m\xE3i",
              "Gi\u1EA3m gi\xE1",
              "Ng\xE0y b\u1EAFt \u0111\u1EA7u",
              "Ng\xE0y k\u1EBFt th\xFAc",
              "Chi nh\xE1nh \xE1p d\u1EE5ng",
              "Tr\u1EA1ng th\xE1i",
              "Thao t\xE1c",
            ]}
          >
            {items.map((p) => (
              <Tr key={p.id}>
                <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", verticalAlign: "middle" }}>
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                </td>
                <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", verticalAlign: "middle" }}>
                  <span
                    style={{ fontWeight: 700, color: "#c9922a", fontSize: 15 }}
                  >
                    {p.discount}
                  </span>
                </td>
                <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", fontFamily: "'DM Mono', monospace", verticalAlign: "middle" }}>{p.startDate}</td>
                <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", fontFamily: "'DM Mono', monospace", verticalAlign: "middle" }}>{p.endDate}</td>
                <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", verticalAlign: "middle" }}>{p.branch}</td>
                <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", verticalAlign: "middle" }}>
                  <Badge status={statusLabel[p.status]} />
                </td>
                <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", verticalAlign: "middle" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<EditIcon />}
                      onClick={() => setEditItem({ ...p })}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<TrashIcon />}
                      onClick={() => setDeleteId(p.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </td>
              </Tr>
            ))}
          </Table>
        )}
      </Card>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Thêm chương trình khuyến mãi"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            {
              label: "T\xEAn khuy\u1EBFn m\xE3i",
              key: "name",
              placeholder: "VD: Khuy\u1EBFn m\xE3i h\xE8 2024",
            },
            {
              label: "M\u1EE9c gi\u1EA3m gi\xE1",
              key: "discount",
              placeholder: "VD: 20%",
            },
            {
              label: "Ng\xE0y b\u1EAFt \u0111\u1EA7u",
              key: "startDate",
              placeholder: "2024-07-01",
              type: "date",
            },
            {
              label: "Ng\xE0y k\u1EBFt th\xFAc",
              key: "endDate",
              placeholder: "2024-07-31",
              type: "date",
            },
            {
              label: "Chi nh\xE1nh \xE1p d\u1EE5ng",
              key: "branch",
              placeholder: "VD: T\u1EA5t c\u1EA3 chi nh\xE1nh",
            },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#5a4030",
                  display: "block",
                  marginBottom: 5,
                }}
              >
                {label}
              </label>
              <Input
                value={form[key]}
                onChange={(v) => setForm({ ...form, [key]: v })}
                placeholder={placeholder}
                type={type}
              />
            </div>
          ))}
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
            <Button onClick={handleAdd}>Thêm khuyến mãi</Button>
          </div>
        </div>
      </Modal>

      {editItem && (
        <Modal
          open={!!editItem}
          onClose={() => setEditItem(null)}
          title="Chỉnh sửa khuyến mãi"
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
                Tên khuyến mãi
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
                Mức giảm giá
              </label>
              <Input
                value={editItem.discount}
                onChange={(v) => setEditItem({ ...editItem, discount: v })}
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
                Chi nhánh áp dụng
              </label>
              <Input
                value={editItem.branch}
                onChange={(v) => setEditItem({ ...editItem, branch: v })}
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
            setItems((p) => p.filter((item) => item.id !== deleteId));
            setDeleteId(null);
          }
        }}
        message="Bạn có chắc muốn xóa chương trình khuyến mãi này?"
      />
    </div>
  );
}
