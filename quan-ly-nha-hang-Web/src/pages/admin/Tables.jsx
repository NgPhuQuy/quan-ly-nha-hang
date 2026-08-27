import { useState } from "react";
import { tables as initialTables, branches } from "../../data/admin/mockData";
import PageHeader from "../../components/admin/PageHeader";
import PlusIcon from "../../components/admin/PlusIcon";
import Button from "../../components/admin/Button";
import Card from "../../components/admin/Card";
import Table, { Tr, Td } from "../../components/admin/Table";
import Badge from "../../components/admin/Badge";
import Modal from "../../components/admin/Modal";
import Input from "../../components/admin/Input";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import Pagination from "../../components/admin/Pagination";
import EmptyState from "../../components/admin/EmptyState";
import Select from "../../components/admin/Select";
import EditIcon from "../../components/admin/EditIcon";
import TrashIcon from "../../components/admin/TrashIcon";

const PAGE_SIZE = 8;
const branchOptions = [
  { label: "T\u1EA5t c\u1EA3 chi nh\xE1nh", value: "all" },
  ...branches.map((b) => ({ label: b.name, value: b.name })),
];
export default function Tables() {
  const [items, setItems] = useState(initialTables);
  const [filterBranch, setFilterBranch] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    branch: branches[0].name,
    capacity: "",
  });
  const filtered = items.filter(
    (t) => filterBranch === "all" || t.branch === filterBranch,
  );
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  function handleAdd() {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: form.name,
        branch: form.branch,
        capacity: parseInt(form.capacity) || 4,
        status: "available",
      },
    ]);
    setAddOpen(false);
    setForm({ name: "", branch: branches[0].name, capacity: "" });
  }
  function handleEdit() {
    if (!editItem) return;
    setItems((prev) => prev.map((t) => (t.id === editItem.id ? editItem : t)));
    setEditItem(null);
  }
  return (
    <div style={{ padding: "28px 32px" }}>
      <PageHeader
        title="Quản lý bàn"
        subtitle={`${items.length} b\xE0n trong to\xE0n h\u1EC7 th\u1ED1ng`}
        action={
          <Button icon={<PlusIcon />} onClick={() => setAddOpen(true)}>
            Thêm bàn
          </Button>
        }
      />
      <Card>
        <div style={{ padding: "16px 16px 0" }}>
          <Select
            value={filterBranch}
            onChange={(v) => {
              setFilterBranch(v);
              setPage(1);
            }}
            options={branchOptions}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          {paged.length === 0 ? (
            <EmptyState />
          ) : (
            <Table
              headers={[
                "T\xEAn b\xE0n",
                "Chi nh\xE1nh",
                "S\u1EE9c ch\u1EE9a",
                "Tr\u1EA1ng th\xE1i",
                "Thao t\xE1c",
              ]}
            >
              {paged.map((t) => (
                <Tr key={t.id}>
                  <Td>
                    <span style={{ fontWeight: 600 }}>{t.name}</span>
                  </Td>
                  <Td>{t.branch}</Td>
                  <Td>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        color: "#5a4030",
                      }}
                    >
                      {t.capacity} người
                    </span>
                  </Td>
                  <Td>
                    <Badge status={t.status} />
                  </Td>
                  <Td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<EditIcon />}
                        onClick={() => setEditItem({ ...t })}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<TrashIcon />}
                        onClick={() => setDeleteId(t.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </Td>
                </Tr>
              ))}
            </Table>
          )}
          <Pagination
            page={page}
            total={filtered.length}
            pageSize={PAGE_SIZE}
            onChange={setPage}
          />
        </div>
      </Card>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Thêm bàn mới"
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
              Tên / Số bàn
            </label>
            <Input
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="VD: Bàn 09 hoặc VIP 02"
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
              Chi nhánh
            </label>
            <Select
              value={form.branch}
              onChange={(v) => setForm({ ...form, branch: v })}
              options={branches.map((b) => ({ label: b.name, value: b.name }))}
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
              Sức chứa (người)
            </label>
            <Input
              value={form.capacity}
              onChange={(v) => setForm({ ...form, capacity: v })}
              placeholder="4"
              type="number"
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
            <Button onClick={handleAdd}>Thêm bàn</Button>
          </div>
        </div>
      </Modal>

      {editItem && (
        <Modal
          open={!!editItem}
          onClose={() => setEditItem(null)}
          title="Chỉnh sửa bàn"
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
                Tên bàn
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
                Sức chứa
              </label>
              <Input
                value={String(editItem.capacity)}
                onChange={(v) =>
                  setEditItem({ ...editItem, capacity: parseInt(v) || 4 })
                }
                type="number"
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
            setItems((p) => p.filter((t) => t.id !== deleteId));
            setDeleteId(null);
          }
        }}
        message="Bạn có chắc muốn xóa bàn này?"
      />
    </div>
  );
}
