import {
  ArrowLeft,
  MapPin,
  Clock,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { mockInvoices, formatCurrency } from "../../data/pos/data";
const statusIcon = {
  "Ho\xE0n th\xE0nh": <CheckCircle size={14} color="#16A34A" />,
  "Ch\u1EDD x\u1EED l\xFD": <AlertCircle size={14} color="#D97706" />,
  "\u0110\xE3 h\u1EE7y": <XCircle size={14} color="#DC2626" />,
};
const statusStyle = {
  "Ho\xE0n th\xE0nh": { bg: "#F0FDF4", text: "#16A34A" },
  "Ch\u1EDD x\u1EED l\xFD": { bg: "#FFFBEB", text: "#D97706" },
  "\u0110\xE3 h\u1EE7y": { bg: "#FEF2F2", text: "#DC2626" },
};
export default function InvoiceDetail({ invoiceId, onNavigate }) {
  const invoice = mockInvoices.find((inv) => inv.id === invoiceId);
  if (!invoice)
    return (
      <div
        className="p-8 text-center text-sm"
        style={{ color: "var(--muted-foreground)" }}
      >
        Không tìm thấy hóa đơn.
      </div>
    );
  return (
    <div className="p-6 max-w-3xl">
      <button
        onClick={() => onNavigate("invoices")}
        className="flex items-center gap-1.5 text-sm font-500 mb-5"
        style={{ color: "var(--muted-foreground)" }}
      >
        <ArrowLeft size={15} /> Quay lại danh sách
      </button>

      <div
        className="bg-white rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="px-6 py-5 border-b"
          style={{
            borderColor: "var(--border)",
            background: "var(--secondary)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div
                className="text-xs font-500 mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                Mã hóa đơn
              </div>
              <div
                className="text-xl font-800"
                style={{ color: "var(--primary)" }}
              >
                {invoice.id}
              </div>
            </div>
            <span
              className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full font-500"
              style={{
                background: statusStyle[invoice.status].bg,
                color: statusStyle[invoice.status].text,
              }}
            >
              {statusIcon[invoice.status]}
              {invoice.status}
            </span>
          </div>
        </div>

        <div
          className="px-6 py-5 grid grid-cols-3 gap-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-start gap-2">
            <MapPin
              size={14}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--muted-foreground)" }}
            />
            <div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Chi nhánh
              </div>
              <div
                className="text-sm font-600"
                style={{ color: "var(--foreground)" }}
              >
                Nhà Hàng Vị Việt – Q1
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock
              size={14}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--muted-foreground)" }}
            />
            <div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Thời gian
              </div>
              <div
                className="text-sm font-600"
                style={{ color: "var(--foreground)" }}
              >
                {invoice.createdAt}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Tag
              size={14}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--muted-foreground)" }}
            />
            <div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Nguồn
              </div>
              <span
                className="text-sm px-2 py-0.5 rounded font-500 inline-flex"
                style={{
                  background:
                    invoice.source === "ONLINE" ? "#EFF6FF" : "#F0FDF4",
                  color: invoice.source === "ONLINE" ? "#2563EB" : "#16A34A",
                }}
              >
                {invoice.source === "ONLINE" ? "Online" : "T\u1EA1i qu\u1EA7y"}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <div
            className="text-sm font-600 mb-3"
            style={{ color: "var(--foreground)" }}
          >
            Danh sách món
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {[
                  "M\xF3n",
                  "\u0110\u01A1n gi\xE1",
                  "S\u1ED1 l\u01B0\u1EE3ng",
                  "Th\xE0nh ti\u1EC1n",
                ].map((h) => (
                  <th
                    key={h}
                    className="pb-2 text-left text-xs font-600"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <td
                    className="py-3 text-sm font-500"
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.name}
                  </td>
                  <td
                    className="py-3 text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td
                    className="py-3 text-sm"
                    style={{ color: "var(--foreground)" }}
                  >
                    ×{item.quantity}
                  </td>
                  <td
                    className="py-3 text-sm font-600"
                    style={{ color: "var(--foreground)" }}
                  >
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="flex justify-end mt-4 pt-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-6">
              <span
                className="text-sm font-600"
                style={{ color: "var(--foreground)" }}
              >
                Tổng tiền
              </span>
              <span
                className="text-xl font-800"
                style={{ color: "var(--primary)" }}
              >
                {formatCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
