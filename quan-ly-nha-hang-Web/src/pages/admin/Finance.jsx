import { useState } from "react";
import { financeItems } from "../../data/admin/mockData";
import Badge from "../../components/admin/Badge";
import Card from "../../components/admin/Card";
import Button from "../../components/admin/Button";
import Modal from "../../components/admin/Modal";
import PageHeader from "../../components/admin/PageHeader";
import Select from "../../components/admin/Select";
import Table, { Tr, Td } from "../../components/admin/Table";
import Pagination from "../../components/admin/Pagination";
import EmptyState from "../../components/admin/EmptyState";
import TrashIcon from "../../components/admin/TrashIcon";
import PlusIcon from "../../components/admin/PlusIcon";

const PAGE_SIZE = 7;
function SummaryCard({ label, value, color }) {
  return (
    <Card style={{ padding: "16px 20px", flex: 1, minWidth: 160 }}>
      <div
        style={{
          fontSize: 11.5,
          fontWeight: 600,
          color: "#7a6248",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
    </Card>
  );
}
export default function Finance() {
  const [items, setItems] = useState(financeItems);
  const [filterType, setFilterType] = useState("all");
  const [filterBranch, setFilterBranch] = useState("all");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    date: "",
    branch: "",
    type: "thu",
    category: "",
    description: "",
    amount: "",
  });
  const branchOptions = [
    { label: "T\u1EA5t c\u1EA3 chi nh\xE1nh", value: "all" },
    ...Array.from(new Set(items.map((i) => i.branch))).map((b) => ({
      label: b,
      value: b,
    })),
  ];
  const filtered = items.filter((i) => {
    const matchType = filterType === "all" || i.type === filterType;
    const matchBranch = filterBranch === "all" || i.branch === filterBranch;
    return matchType && matchBranch;
  });
  const totalThu = items
    .filter((i) => i.type === "thu")
    .reduce((s, i) => s + i.amount, 0);
  const totalChi = items
    .filter((i) => i.type === "chi")
    .reduce((s, i) => s + i.amount, 0);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  function handleAdd() {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        date: form.date,
        branch: form.branch,
        type: form.type,
        category: form.category,
        description: form.description,
        amount: parseInt(form.amount) || 0,
      },
    ]);
    setAddOpen(false);
    setForm({
      date: "",
      branch: "",
      type: "thu",
      category: "",
      description: "",
      amount: "",
    });
  }
  return (
    <div style={{ padding: "28px 32px" }}>
      <PageHeader
        title="Quản lý thu chi"
        subtitle="Tất cả giao dịch tài chính toàn hệ thống"
        action={
          <Button icon={<PlusIcon />} onClick={() => setAddOpen(true)}>
            Thêm giao dịch
          </Button>
        }
      />

      {/* Summary cards */}
      <div
        style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}
      >
        <SummaryCard
          label="Tổng thu"
          value={`${totalThu.toLocaleString("vi-VN")} \u0111`}
          color="#15803d"
        />
        <SummaryCard
          label="Tổng chi"
          value={`${totalChi.toLocaleString("vi-VN")} \u0111`}
          color="#b91c1c"
        />
        <SummaryCard
          label="Chênh lệch"
          value={`${(totalThu - totalChi).toLocaleString("vi-VN")} \u0111`}
          color="#c9922a"
        />
      </div>

      <Card>
        <div
          style={{
            padding: "16px 16px 0",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <Select
            value={filterBranch}
            onChange={(v) => {
              setFilterBranch(v);
              setPage(1);
            }}
            options={branchOptions}
          />
          <Select
            value={filterType}
            onChange={(v) => {
              setFilterType(v);
              setPage(1);
            }}
            options={[
              { label: "T\u1EA5t c\u1EA3 lo\u1EA1i", value: "all" },
              { label: "Thu", value: "thu" },
              { label: "Chi", value: "chi" },
            ]}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          {paged.length === 0 ? (
            <EmptyState />
          ) : (
            <Table
              headers={[
                "Ng\xE0y",
                "Chi nh\xE1nh",
                "Lo\u1EA1i",
                "Danh m\u1EE5c",
                "M\xF4 t\u1EA3",
                "S\u1ED1 ti\u1EC1n",
                "",
              ]}
            >
              {paged.map((item) => (
                <Tr key={item.id}>
                  <Td mono>{item.date}</Td>
                  <Td>{item.branch}</Td>
                  <Td>
                    <Badge status={item.type} />
                  </Td>
                  <Td>{item.category}</Td>
                  <Td>{item.description}</Td>
                  <Td>
                    <span
                      style={{
                        fontWeight: 700,
                        color: item.type === "thu" ? "#15803d" : "#b91c1c",
                      }}
                    >
                      {item.type === "thu" ? "+" : "\u2212"}
                      {item.amount.toLocaleString("vi-VN")} đ
                    </span>
                  </Td>
                  <Td>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<TrashIcon />}
                      onClick={() =>
                        setItems((p) => p.filter((i) => i.id !== item.id))
                      }
                    >
                      Xóa
                    </Button>
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
        title="Thêm giao dịch thu chi"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Ng\xE0y", key: "date", type: "date", placeholder: "" },
            {
              label: "Chi nh\xE1nh",
              key: "branch",
              placeholder: "VD: CN Ho\xE0n Ki\u1EBFm",
            },
            {
              label: "Danh m\u1EE5c",
              key: "category",
              placeholder: "VD: Nguy\xEAn v\u1EADt li\u1EC7u",
            },
            {
              label: "M\xF4 t\u1EA3",
              key: "description",
              placeholder: "M\xF4 t\u1EA3 giao d\u1ECBch",
            },
            {
              label: "S\u1ED1 ti\u1EC1n (\u0111\u1ED3ng)",
              key: "amount",
              type: "number",
              placeholder: "1000000",
            },
          ].map(({ label, key, type, placeholder }) => (
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
              <input
                type={type ?? "text"}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                style={{
                  height: 36,
                  padding: "0 12px",
                  borderRadius: 8,
                  border: "1px solid #e5ddd0",
                  background: "#fff",
                  color: "#2c1a0e",
                  fontSize: 13.5,
                  fontFamily: "inherit",
                  outline: "none",
                  width: "100%",
                }}
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
              Loại giao dịch
            </label>
            <Select
              value={form.type}
              onChange={(v) => setForm({ ...form, type: v })}
              options={[
                { label: "Thu", value: "thu" },
                { label: "Chi", value: "chi" },
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
            <Button onClick={handleAdd}>Thêm giao dịch</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
