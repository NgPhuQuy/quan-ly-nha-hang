import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Tag,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Ban,
  Printer,
} from "lucide-react";
import {
  layChiTietHoaDon,
  thanhToanHoaDon,
} from "../../services/hoaDon.service";
import apis, { endpoints } from "../../services/apis";
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
  const [invoice, setInvoice] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDetail = () => {
    if (invoiceId) {
      layChiTietHoaDon(invoiceId).then((data) => {
        if (data) setInvoice(data);
      });
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [invoiceId]);

  const handleThanhToan = async () => {
    if (!invoice?.maHoaDonId) return;
    if (!window.confirm("Xác nhận thanh toán hóa đơn này?")) return;
    setActionLoading(true);
    try {
      await thanhToanHoaDon(invoice.maHoaDonId);
      fetchDetail();
    } catch (e) {
      console.error(e);
      alert("Lỗi khi thanh toán hóa đơn!");
    } finally {
      setActionLoading(false);
    }
  };

  const handleHuy = async () => {
    if (!invoice?.maHoaDonId) return;
    if (!window.confirm("Bạn có chắc chắn muốn hủy hóa đơn này?")) return;
    setActionLoading(true);
    try {
      await apis.post(endpoints.huy_hoa_don(invoice.maHoaDonId));
      fetchDetail();
    } catch (e) {
      console.error(e);
      alert("Lỗi khi hủy hóa đơn!");
    } finally {
      setActionLoading(false);
    }
  };

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
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => onNavigate("invoices")}
          className="flex items-center gap-1.5 text-sm font-500 hover:text-[var(--primary)] transition-colors"
          style={{
            color: "var(--muted-foreground)",
          }}
        >
          <ArrowLeft size={15} /> Quay lại danh sách
        </button>

        <div className="flex items-center gap-2">
          {invoice.status === "Chờ xử lý" && (
            <>
              <button
                onClick={handleHuy}
                disabled={actionLoading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-600 border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <Ban size={13} /> Hủy hóa đơn
              </button>
              <button
                onClick={handleThanhToan}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-700 text-white shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ background: "var(--primary)" }}
              >
                <CreditCard size={14} /> Thanh toán
              </button>
            </>
          )}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-600 border hover:bg-gray-50 transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <Printer size={13} /> In phiếu
          </button>
        </div>
      </div>

      <div
        className="bg-white rounded-xl border overflow-hidden shadow-sm"
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
              className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-600"
              style={{
                background: statusStyle[invoice.status]?.bg || "#F0FDF4",
                color: statusStyle[invoice.status]?.text || "#16A34A",
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
                Chi nhánh & Bàn
              </div>
              <div
                className="text-sm font-600"
                style={{
                  color: "var(--foreground)",
                }}
              >
                {invoice.branch || "Chi nhánh chính"} -{" "}
                {invoice.table ? `Bàn ${invoice.table}` : "Tại quầy"}
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
                Khách hàng & Nguồn
              </div>
              <div
                className="text-sm font-600"
                style={{
                  color: "var(--foreground)",
                }}
              >
                {invoice.customer || "Khách vãng lai"} (
                {invoice.source === "ONLINE" ? "Online" : "Tại quầy"})
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <div
            className="text-sm font-700 mb-3"
            style={{
              color: "var(--foreground)",
            }}
          >
            Danh sách món ăn
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
                    key={h}
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
              {(invoice.items || []).map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b last:border-0"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <td
                    className="py-3 text-sm font-600"
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
                    className="py-3 text-sm font-600"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    ×{item.quantity}
                  </td>
                  <td
                    className="py-3 text-sm font-700"
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
                Tổng thanh toán:
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

export default InvoiceDetail;
