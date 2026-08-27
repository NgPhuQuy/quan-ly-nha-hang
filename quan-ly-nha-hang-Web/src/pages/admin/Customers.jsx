import { useState } from "react";
import { customers as initialCustomers } from "../../data/admin/mockData";
import {
  Badge,
  Button,
  Card,
  ConfirmDialog,
  EmptyState,
  Input,
  PageHeader,
  Pagination,
  Table,
  Td,
  Tr,
} from "../../components/admin";
function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}
const PAGE_SIZE = 6;
export default function Customers() {
  const [items, setItems] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const filtered = items.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div style={{ padding: "28px 32px" }}>
      <PageHeader
        title="Quản lý khách hàng"
        subtitle={`${items.length} kh\xE1ch h\xE0ng \u0111\xE3 \u0111\u0103ng k\xFD`}
      />
      <Card>
        <div style={{ padding: "16px 16px 0" }}>
          <Input
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder="Tên, SĐT, email..."
            icon={<SearchIcon />}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          {paged.length === 0 ? (
            <EmptyState />
          ) : (
            <Table
              headers={[
                "H\u1ECD t\xEAn",
                "\u0110i\u1EC7n tho\u1EA1i",
                "Email",
                "L\u01B0\u1EE3t \u0111\u1EB7t",
                "T\u1ED5ng chi ti\xEAu",
                "Tr\u1EA1ng th\xE1i",
                "Thao t\xE1c",
              ]}
            >
              {paged.map((c) => (
                <Tr key={c.id}>
                  <Td>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: "#f5f0e8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#c9922a",
                          fontWeight: 700,
                          fontSize: 12,
                        }}
                      >
                        {c.name[0]}
                      </div>
                      <span style={{ fontWeight: 600 }}>{c.name}</span>
                    </div>
                  </Td>
                  <Td mono>{c.phone}</Td>
                  <Td mono>{c.email}</Td>
                  <Td>
                    <span style={{ fontWeight: 600, color: "#c9922a" }}>
                      {c.bookings}
                    </span>
                  </Td>
                  <Td>
                    <span style={{ fontWeight: 600, color: "#2c1a0e" }}>
                      {c.totalSpent.toLocaleString("vi-VN")} đ
                    </span>
                  </Td>
                  <Td>
                    <Badge status={c.status} />
                  </Td>
                  <Td>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<TrashIcon />}
                      onClick={() => setDeleteId(c.id)}
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

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            setItems((p) => p.filter((c) => c.id !== deleteId));
            setDeleteId(null);
          }
        }}
        message="Bạn có chắc muốn xóa khách hàng này?"
      />
    </div>
  );
}
