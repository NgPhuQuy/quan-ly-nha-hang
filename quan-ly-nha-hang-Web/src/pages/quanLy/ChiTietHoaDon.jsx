import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Trash2,
  Printer,
} from "lucide-react";
import {
  layChiTietHoaDon,
  thanhToanHoaDon,
  xoaHoaDon,
} from "../../services/hoaDon.service";
import { dinhDangTien } from "../../utils/dinhDang";

const statusConfig = {
  HOAN_THANH: {
    label: "Hoàn thành",
    icon: <CheckCircle size={14} color="#16A34A" />,
    bg: "#F0FDF4",
    text: "#16A34A",
  },
  DANG_PHUC_VU: {
    label: "Đang phục vụ",
    icon: <AlertCircle size={14} color="#D97706" />,
    bg: "#FFFBEB",
    text: "#D97706",
  },
  DANG_XU_LY: {
    label: "Đang xử lý",
    icon: <AlertCircle size={14} color="#2563EB" />,
    bg: "#EFF6FF",
    text: "#2563EB",
  },
};

function InvoiceDetail({ invoiceId, onNavigate, branches = [] }) {
  const [invoice, setInvoice] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loi, setLoi] = useState(null);

  const fetchDetail = async () => {
    if (!invoiceId) return;
    try {
      setLoi(null);
      const data = await layChiTietHoaDon(invoiceId);
      setInvoice(data);
    } catch (err) {
      setLoi(err.response?.data?.message || err.message || "Không thể tải chi tiết hóa đơn!");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [invoiceId]);

  const handleThanhToan = async () => {
    if (!invoice?.maHoaDon) return;
    if (!window.confirm("Xác nhận thanh toán hóa đơn này?")) return;
    setActionLoading(true);
    setLoi(null);
    try {
      await thanhToanHoaDon(invoice.maHoaDon);
      await fetchDetail();
    } catch (e) {
      const msg = e.response?.data?.message || e.message || "Lỗi khi thanh toán hóa đơn!";
      setLoi(msg);
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const handleXoa = async () => {
    if (!invoice?.maHoaDon) return;
    if (!window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) return;
    setActionLoading(true);
    setLoi(null);
    try {
      await xoaHoaDon(invoice.maHoaDon);
      onNavigate?.("invoices");
    } catch (e) {
      const msg = e.response?.data?.message || e.message || "Lỗi khi xóa hóa đơn!";
      setLoi(msg);
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  if (loi && !invoice) {
    return (
      <div className="p-6 max-w-3xl">
        <button
          onClick={() => onNavigate?.("invoices")}
          className="flex items-center gap-1.5 text-sm font-500 hover:text-[var(--primary)] transition-colors mb-4"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft size={15} /> Quay lại danh sách
        </button>
        <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
          {loi}
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div
        className="p-8 text-center text-sm"
        style={{ color: "var(--muted-foreground)" }}
      >
        Đang tải thông tin hóa đơn...
      </div>
    );
  }

  const chiNhanh = branches.find((b) => b.maChiNhanh === invoice.maChiNhanh);
  const tenChiNhanh = chiNhanh?.tenChiNhanh || `Chi nhánh #${invoice.maChiNhanh}`;
  const statusInfo = statusConfig[invoice.trangThai] || {
    label: invoice.trangThai,
    icon: null,
    bg: "#F3F4F6",
    text: "#4B5563",
  };

  return (
    <div className="p-6 max-w-3xl">
      {loi && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
          {loi}
        </div>
      )}

      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => onNavigate?.("invoices")}
          className="flex items-center gap-1.5 text-sm font-500 hover:text-[var(--primary)] transition-colors"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft size={15} /> Quay lại danh sách
        </button>

        <div className="flex items-center gap-2">
          {invoice.trangThai !== "HOAN_THANH" && (
            <>
              <button
                onClick={handleXoa}
                disabled={actionLoading}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <Trash2 size={13} /> Xóa hóa đơn
              </button>
              <button
                onClick={handleThanhToan}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ background: "var(--primary)" }}
              >
                <CreditCard size={14} /> Thanh toán
              </button>
            </>
          )}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border hover:bg-gray-50 transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <Printer size={13} /> In phiếu
          </button>
        </div>
      </div>

      <div
        className="bg-white rounded-xl border overflow-hidden shadow-sm"
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
                className="text-xs font-medium mb-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                Mã hóa đơn
              </div>
              <div
                className="text-xl font-extrabold"
                style={{ color: "var(--primary)" }}
              >
                #{invoice.maHoaDon}
              </div>
            </div>
            <span
              className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold"
              style={{
                background: statusInfo.bg,
                color: statusInfo.text,
              }}
            >
              {statusInfo.icon}
              {statusInfo.label}
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
                className="text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {tenChiNhanh}
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
                Thời gian lập
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {invoice.ngayLapHoaDon
                  ? new Date(invoice.ngayLapHoaDon).toLocaleString("vi-VN")
                  : "Chưa xác định"}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <User
              size={14}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--muted-foreground)" }}
            />
            <div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Khách hàng & Nhân viên
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {invoice.maKhachHang ? `KH #${invoice.maKhachHang}` : "Khách vãng lai"}
                {invoice.maNhanVien ? ` (NV #${invoice.maNhanVien})` : ""}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <div
            className="text-sm font-bold mb-3"
            style={{ color: "var(--foreground)" }}
          >
            Danh sách món ăn
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Món", "Đơn giá", "Số lượng", "Thành tiền"].map((h) => (
                  <th
                    key={h}
                    className="pb-2 text-left text-xs font-semibold"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(invoice.listChiTietHoaDon || []).map((item, idx) => (
                <tr
                  key={item.maChiTietHoaDon || idx}
                  className="border-b last:border-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <td
                    className="py-3 text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {item.matHang?.tenMatHang}
                  </td>
                  <td
                    className="py-3 text-sm"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {dinhDangTien(item.matHang?.giaMatHang)}
                  </td>
                  <td
                    className="py-3 text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    ×{item.soLuong}
                  </td>
                  <td
                    className="py-3 text-sm font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {dinhDangTien((item.matHang?.giaMatHang || 0) * (item.soLuong || 0))}
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
                className="text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                Tổng thanh toán:
              </span>
              <span
                className="text-xl font-extrabold"
                style={{ color: "var(--primary)" }}
              >
                {dinhDangTien(invoice.tongTien)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;
