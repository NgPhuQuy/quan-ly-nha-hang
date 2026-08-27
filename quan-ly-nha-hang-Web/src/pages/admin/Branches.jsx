import { useState } from "react";
import { branches as initialBranches } from "../../data/admin/mockData";
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
import SearchIcon from "../../components/admin/SearchIcon";
import EditIcon from "../../components/admin/EditIcon";
import TrashIcon from "../../components/admin/TrashIcon";

const PAGE_SIZE = 5;
export default function Branches() {
  const [items, setItems] = useState(initialBranches);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const filtered = items.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()),
  );
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  function handleDelete(id) {
    setItems((prev) => prev.filter((b) => b.id !== id));
  }
  function handleAdd() {
    const newItem = {
      id: `CN00${items.length + 1}`,
      name: form.name,
      address: form.address,
      phone: form.phone,
      status: "active",
      revenue: 0,
    };
    setItems((prev) => [...prev, newItem]);
    setAddOpen(false);
    setForm({ name: "", address: "", phone: "" });
  }
  function handleEdit() {
    if (!editItem) return;
    setItems((prev) => prev.map((b) => (b.id === editItem.id ? editItem : b)));
    setEditItem(null);
  }
  return (
    <div style={{ padding: "28px 32px" }}>
      <PageHeader
        title="Quản lý chi nhánh"
        subtitle={`${items.length} chi nh\xE1nh trong h\u1EC7 th\u1ED1ng`}
        action={
          <Button icon={<PlusIcon />} onClick={() => setAddOpen(true)}>
            Thêm chi nhánh
          </Button>
        }
      />

      <Card>
        <div style={{ padding: "16px 16px 0", display: "flex", gap: 12 }}>
          <Input
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Tìm theo tên, mã..."
            icon={<SearchIcon />}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          {paged.length === 0 ? (
            <EmptyState message="Không tìm thấy chi nhánh nào" />
          ) : (
            <Table
              headers={[
                "M\xE3 CN",
                "T\xEAn chi nh\xE1nh",
                "\u0110\u1ECBa ch\u1EC9",
                "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
                "Tr\u1EA1ng th\xE1i",
                "Thao t\xE1c",
              ]}
            >
              {paged.map((b) => (
                <Tr key={b.id}>
                  <Td mono>{b.id}</Td>
                  <Td>
                    <span style={{ fontWeight: 600 }}>{b.name}</span>
                  </Td>
                  <Td>{b.address}</Td>
                  <Td mono>{b.phone}</Td>
                  <Td>
                    <Badge status={b.status} />
                  </Td>
                  <Td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<EditIcon />}
                        onClick={() => setEditItem({ ...b })}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<TrashIcon />}
                        onClick={() => setDeleteId(b.id)}
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

      {/* Add Modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Thêm chi nhánh mới"
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
              Tên chi nhánh
            </label>
            <Input
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="VD: Chi nhánh Quận 1"
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
              Địa chỉ
            </label>
            <Input
              value={form.address}
              onChange={(v) => setForm({ ...form, address: v })}
              placeholder="Địa chỉ chi nhánh"
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
              Số điện thoại
            </label>
            <Input
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder="024 XXXX XXXX"
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
            <Button onClick={handleAdd} icon={<PlusIcon />}>
              Thêm chi nhánh
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      {editItem && (
        <Modal
          open={!!editItem}
          onClose={() => setEditItem(null)}
          title="Chỉnh sửa chi nhánh"
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
                Tên chi nhánh
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
                Địa chỉ
              </label>
              <Input
                value={editItem.address}
                onChange={(v) => setEditItem({ ...editItem, address: v })}
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
                Số điện thoại
              </label>
              <Input
                value={editItem.phone}
                onChange={(v) => setEditItem({ ...editItem, phone: v })}
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
          if (deleteId) handleDelete(deleteId);
          setDeleteId(null);
        }}
        message={`B\u1EA1n c\xF3 ch\u1EAFc mu\u1ED1n x\xF3a chi nh\xE1nh n\xE0y? H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c.`}
      />
    </div>
  );
}
