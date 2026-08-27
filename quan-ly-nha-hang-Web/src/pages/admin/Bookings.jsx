import { useState } from "react";
import { bookings as initialBookings } from "../../data/admin/mockData";
import {
  Badge,
  Button,
  Card,
  ConfirmDialog,
  EmptyState,
  PageHeader,
  Pagination,
  Select,
  Table,
  Td,
  Tr,
} from "../../components/admin";
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
export default function Bookings() {
  const [items, setItems] = useState(initialBookings);
  const [filterBranch, setFilterBranch] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const branchOptions = [
    { label: "T\u1EA5t c\u1EA3 chi nh\xE1nh", value: "all" },
    ...Array.from(new Set(items.map((b) => b.branch))).map((b) => ({
      label: b,
      value: b,
    })),
  ];
  const filtered = items.filter((b) => {
    const matchBranch = filterBranch === "all" || b.branch === filterBranch;
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    return matchBranch && matchStatus;
  });
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div style={{ padding: "28px 32px" }}>
      <PageHeader
        title="Quản lý đặt lịch"
        subtitle="Tất cả đặt lịch từ mọi chi nhánh"
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
          <Select
            value={filterBranch}
            onChange={(v) => {
              setFilterBranch(v);
              setPage(1);
            }}
            options={branchOptions}
          />
          <Select
            value={filterStatus}
            onChange={(v) => {
              setFilterStatus(v);
              setPage(1);
            }}
            options={[
              { label: "T\u1EA5t c\u1EA3 tr\u1EA1ng th\xE1i", value: "all" },
              { label: "\u0110\xE3 x\xE1c nh\u1EADn", value: "confirmed" },
              { label: "Ch\u1EDD x\u1EED l\xFD", value: "pending" },
              { label: "\u0110\xE3 h\u1EE7y", value: "cancelled" },
            ]}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          {paged.length === 0 ? (
            <EmptyState />
          ) : (
            <Table
              headers={[
                "M\xE3 \u0110L",
                "Kh\xE1ch h\xE0ng",
                "Chi nh\xE1nh",
                "Th\u1EDDi gian",
                "S\u1ED1 kh\xE1ch",
                "Tr\u1EA1ng th\xE1i",
                "Thao t\xE1c",
              ]}
            >
              {paged.map((b) => (
                <Tr key={b.id}>
                  <Td mono>{b.id}</Td>
                  <Td>
                    <span style={{ fontWeight: 600 }}>{b.customer}</span>
                  </Td>
                  <Td>{b.branch}</Td>
                  <Td mono>{b.datetime}</Td>
                  <Td>
                    <span style={{ fontWeight: 600, color: "#5a4030" }}>
                      {b.guests} người
                    </span>
                  </Td>
                  <Td>
                    <Badge status={b.status} />
                  </Td>
                  <Td>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<TrashIcon />}
                      onClick={() => setDeleteId(b.id)}
                    >
                      Hủy
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
            setItems((p) => p.filter((b) => b.id !== deleteId));
            setDeleteId(null);
          }
        }}
        message="Bạn có chắc muốn hủy đặt lịch này?"
      />
    </div>
  );
}
