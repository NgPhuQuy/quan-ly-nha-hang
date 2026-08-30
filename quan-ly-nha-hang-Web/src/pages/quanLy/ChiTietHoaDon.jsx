import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { mockInvoices } from "../../data/quanLyMock";
import { layChiTietHoaDon } from "../../services/hoaDon.service";
import { dinhDangTien } from "../../utils/dinhDang";
const statusIcon = {
  "Hoàn thành": <CheckCircle size={14} color="#16A34A" />,
  "Chờ xử lý": <AlertCircle size={14} color="#D97706" />,
  "Đã hủy": <XCircle size={14} color="#DC2626" />,
};
const statusStyle = {
  "Hoàn thành": {
    bg: "#F0FDF4",
    text: "#16A34A",
  },
  "Chờ xử lý": {
    bg: "#FFFBEB",
    text: "#D97706",
  },
  "Đã hủy": {
    bg: "#FEF2F2",
    text: "#DC2626",
  },
};
function InvoiceDetail({ invoiceId, onNavigate }) {
  const [invoice, setInvoice] = useState(
    () => mockInvoices.find((inv) => inv.id === invoiceId) || null
  );

  useEffect(() => {
    if (invoiceId) {
      layChiTietHoaDon(invoiceId).then((data) => {
        if (data) setInvoice(data);
      });
    }
  }, [invoiceId]);

  if (!invoice)
    return (
      <div
        className="p-8 text-center text-sm"
        style={{
          color: "var(--muted-foreground)",
        }}
      >
        Không tìm thấy hóa đơn.
      </div>
    );
  return (
    <div className="p-6 max-w-3xl">
      <button
        onClick={() => onNavigate("invoices")}
        className="flex items-center gap-1.5 text-sm font-500 mb-5"
        style={{
          color: "var(--muted-foreground)",
        }}
      >
        <ArrowLeft size={15} /> Quay lại danh sách
      </button>
      <div
        className="bg-white rounded-xl border overflow-hidden"
        style={{
          borderColor: "var(--border)",
        }}
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
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                Mã hóa đơn
              </div>
              <div
                className="text-xl font-800"
                style={{
                  color: "var(--primary)",
                }}
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
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-start gap-2">
            <MapPin
              size={14}
              className="mt-0.5 shrink-0"
              style={{
                color: "var(--muted-foreground)",
              }}
            />
            <div>
              <div
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                Chi nhánh
              </div>
              <div
                className="text-sm font-600"
                style={{
                  color: "var(--foreground)",
                }}
              >
                Nhà Hàng Vị Việt – Q1
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock
              size={14}
              className="mt-0.5 shrink-0"
              style={{
                color: "var(--muted-foreground)",
              }}
            />
            <div>
              <div
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                Thời gian
              </div>
              <div
                className="text-sm font-600"
                style={{
                  color: "var(--foreground)",
                }}
              >
                {invoice.createdAt}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Tag
              size={14}
              className="mt-0.5 shrink-0"
              style={{
                color: "var(--muted-foreground)",
              }}
            />
            <div>
              <div
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
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
                {invoice.source === "ONLINE" ? "Online" : "Tại quầy"}
              </span>
            </div>
          </div>
        </div>
        <div className="px-6 py-5">
          <div
            className="text-sm font-600 mb-3"
            style={{
              color: "var(--foreground)",
            }}
          >
            Danh sách món
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {["Món", "Đơn giá", "Số lượng", "Thành tiền"].map((h) => (
                  <th
                    className="pb-2 text-left text-xs font-600"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr
                  className="border-b last:border-0"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <td
                    className="py-3 text-sm font-500"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {item.name}
                  </td>
                  <td
                    className="py-3 text-sm"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {dinhDangTien(item.unitPrice)}
                  </td>
                  <td
                    className="py-3 text-sm"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    ×{item.quantity}
                  </td>
                  <td
                    className="py-3 text-sm font-600"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {dinhDangTien(item.unitPrice * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="flex justify-end mt-4 pt-4 border-t"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-6">
              <span
                className="text-sm font-600"
                style={{
                  color: "var(--foreground)",
                }}
              >
                Tổng tiền
              </span>
              <span
                className="text-xl font-800"
                style={{
                  color: "var(--primary)",
                }}
              >
                {dinhDangTien(invoice.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { InvoiceDetail as default };
