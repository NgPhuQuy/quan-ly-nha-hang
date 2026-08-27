import { useState } from "react";
import { customers as initialCustomers } from "../../data/adminMock";
import PageHeader from "../../components/admin/PageHeader";
import Card from "../../components/admin/Card";
import Table, { Tr } from "../../components/admin/Table";
import Badge from "../../components/admin/Badge";
import Button from "../../components/admin/Button";
import Pagination from "../../components/admin/Pagination";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import EmptyState from "../../components/admin/EmptyState";
import Input from "../../components/admin/Input";
import SearchIcon from "../../components/admin/SearchIcon";
import TrashIcon from "../../components/admin/TrashIcon";

const PAGE_SIZE = 6;
export default function KhachHang() {
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
                  <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", verticalAlign: "middle" }}>
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
                  </td>
                  <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", fontFamily: "'DM Mono', monospace", verticalAlign: "middle" }}>{c.phone}</td>
                  <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", fontFamily: "'DM Mono', monospace", verticalAlign: "middle" }}>{c.email}</td>
                  <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", verticalAlign: "middle" }}>
                    <span style={{ fontWeight: 600, color: "#c9922a" }}>
                      {c.bookings}
                    </span>
                  </td>
                  <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", verticalAlign: "middle" }}>
                    <span style={{ fontWeight: 600, color: "#2c1a0e" }}>
                      {c.totalSpent.toLocaleString("vi-VN")} đ
                    </span>
                  </td>
                  <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", verticalAlign: "middle" }}>
                    <Badge status={c.status} />
                  </td>
                  <td style={{ padding: "11px 16px", fontSize: 13.5, color: "#2c1a0e", borderBottom: "1px solid #f0ece3", verticalAlign: "middle" }}>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<TrashIcon />}
                      onClick={() => setDeleteId(c.id)}
                    >
                      Xóa
                    </Button>
                  </td>
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
