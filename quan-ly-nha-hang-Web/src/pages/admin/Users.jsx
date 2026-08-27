import { useState } from "react";
import { users as initialUsers } from "../../data/admin/mockData";
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
import Select from "../../components/admin/Select";
import EditIcon from "../../components/admin/EditIcon";
import TrashIcon from "../../components/admin/TrashIcon";

const PAGE_SIZE = 6;
const roleColors = {
  Admin: { bg: "#fef3d8", color: "#c9922a" },
  Manager: { bg: "#dbeafe", color: "#1d4ed8" },
  Staff: { bg: "#f5f0e8", color: "#5a4030" },
};
export default function Users() {
  const [items, setItems] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Staff",
    branch: "",
  });
  const filtered = items.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  function handleAdd() {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...form,
        status: "active",
        createdAt: /* @__PURE__ */ new Date().toISOString().split("T")[0],
      },
    ]);
    setAddOpen(false);
    setForm({ name: "", email: "", role: "Staff", branch: "" });
  }
  function handleEdit() {
    if (!editItem) return;
    setItems((prev) => prev.map((u) => (u.id === editItem.id ? editItem : u)));
    setEditItem(null);
  }
  return (
    <div style={{ padding: "28px 32px" }}>
      <PageHeader
        title="Quản lý tài khoản"
        subtitle={`${items.length} t\xE0i kho\u1EA3n trong h\u1EC7 th\u1ED1ng`}
        action={
          <Button icon={<PlusIcon />} onClick={() => setAddOpen(true)}>
            Thêm tài khoản
          </Button>
        }
      />
      <Card>
        <div
          style={{
            padding: "16px 16px 0",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <Input
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Tên, email..."
            icon={<SearchIcon />}
          />
          <Select
            value={filterRole}
            onChange={(v) => {
              setFilterRole(v);
              setPage(1);
            }}
            options={[
              { label: "T\u1EA5t c\u1EA3 vai tr\xF2", value: "all" },
              { label: "Admin", value: "Admin" },
              { label: "Manager", value: "Manager" },
              { label: "Staff", value: "Staff" },
            ]}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          {paged.length === 0 ? (
            <EmptyState message="Không tìm thấy tài khoản nào" />
          ) : (
            <Table
              headers={[
                "H\u1ECD t\xEAn",
                "Email",
                "Vai tr\xF2",
                "Chi nh\xE1nh",
                "Ng\xE0y t\u1EA1o",
                "Tr\u1EA1ng th\xE1i",
                "Thao t\xE1c",
              ]}
            >
              {paged.map((u) => (
                <Tr key={u.id}>
                  <Td>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg,#c9922a,#e8a83a)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: 12,
                          flexShrink: 0,
                        }}
                      >
                        {u.name[0]}
                      </div>
                      <span style={{ fontWeight: 600 }}>{u.name}</span>
                    </div>
                  </Td>
                  <Td mono>{u.email}</Td>
                  <Td>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "2px 9px",
                        borderRadius: 20,
                        ...roleColors[u.role],
                      }}
                    >
                      {u.role}
                    </span>
                  </Td>
                  <Td>{u.branch}</Td>
                  <Td mono>{u.createdAt}</Td>
                  <Td>
                    <Badge status={u.status} />
                  </Td>
                  <Td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<EditIcon />}
                        onClick={() => setEditItem({ ...u })}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<TrashIcon />}
                        onClick={() => setDeleteId(u.id)}
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
        title="Thêm tài khoản mới"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            {
              label: "H\u1ECD t\xEAn",
              key: "name",
              placeholder: "Nguy\u1EC5n V\u0103n A",
            },
            {
              label: "Email",
              key: "email",
              placeholder: "example@restaurant.vn",
            },
            {
              label: "Chi nh\xE1nh",
              key: "branch",
              placeholder: "VD: CN Ho\xE0n Ki\u1EBFm",
            },
          ].map(({ label, key, placeholder }) => (
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
              />
            </div>
          ))}
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
              Vai trò
            </label>
            <Select
              value={form.role}
              onChange={(v) => setForm({ ...form, role: v })}
              options={[
                { label: "Admin", value: "Admin" },
                { label: "Manager", value: "Manager" },
                { label: "Staff", value: "Staff" },
              ]}
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
            <Button onClick={handleAdd}>Thêm tài khoản</Button>
          </div>
        </div>
      </Modal>

      {editItem && (
        <Modal
          open={!!editItem}
          onClose={() => setEditItem(null)}
          title="Chỉnh sửa tài khoản"
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
                Họ tên
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
                Email
              </label>
              <Input
                value={editItem.email}
                onChange={(v) => setEditItem({ ...editItem, email: v })}
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
                Vai trò
              </label>
              <Select
                value={editItem.role}
                onChange={(v) => setEditItem({ ...editItem, role: v })}
                options={[
                  { label: "Admin", value: "Admin" },
                  { label: "Manager", value: "Manager" },
                  { label: "Staff", value: "Staff" },
                ]}
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
            setItems((p) => p.filter((u) => u.id !== deleteId));
            setDeleteId(null);
          }
        }}
        message="Bạn có chắc muốn xóa tài khoản này? Hành động này không thể hoàn tác."
      />
    </div>
  );
}
