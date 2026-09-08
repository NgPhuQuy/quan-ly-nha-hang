import { useState, useEffect, useCallback } from "react";
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
  Plus,
  Minus,
  X,
  Search,
  LayoutGrid,
} from "lucide-react";
import {
  layChiTietHoaDon,
  thanhToanHoaDon,
  xoaHoaDon,
  chinhSuaHoaDon,
} from "../../services/hoaDon.service";
import { layDanhSachMatHangTaiChiNhanh } from "../../services/matHang.service";
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

function InvoiceDetail({ invoiceId, onNavigate, chi_nhanh = [] }) {
  const [invoice, setInvoice] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [loi, setLoi] = useState(null);

  // Edit items state
  const [showAddModal, setShowAddModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [addQuantity, setAddQuantity] = useState(1);

  const canEdit =
    invoice &&
    invoice.trangThai !== "HOAN_THANH" &&
    invoice.trangThai !== "DA_HUY";

  const fetchDetail = useCallback(async () => {
    if (!invoiceId) return;
    try {
      setLoi(null);
      const data = await layChiTietHoaDon(invoiceId);
      setInvoice(data);
    } catch (err) {
      setLoi(err.response?.data?.message || err.message || "Không thể tải chi tiết hóa đơn!");
    }
  }, [invoiceId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDetail();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchDetail]);

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
      onNavigate?.("hoa_don");
    } catch (e) {
      const msg = e.response?.data?.message || e.message || "Lỗi khi xóa hóa đơn!";
      setLoi(msg);
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const syncItems = async (newList) => {
    setActionLoading(true);
    setLoi(null);
    try {
      const res = await chinhSuaHoaDon(invoice.maHoaDon, {
        listChiTiet: newList.map((item) => ({
          maChiTietHoaDon: item.maChiTietHoaDon || null,
          maMatHang: item.matHang?.maMatHang,
          soLuong: item.soLuong,
        })),
      });
      setInvoice(res);
    } catch (e) {
      const msg =
        e.response?.data?.message || e.message || "Cập nhật món thất bại!";
      setLoi(msg);
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      handleDeleteItem(item);
      return;
    }
    const currentList = invoice.listChiTietHoaDon || [];
    const updated = currentList.map((i) => {
      const match =
        (i.maChiTietHoaDon && i.maChiTietHoaDon === item.maChiTietHoaDon) ||
        i.matHang?.maMatHang === item.matHang?.maMatHang;
      return match ? { ...i, soLuong: newQuantity } : i;
    });
    syncItems(updated);
  };

  const handleDeleteItem = (item) => {
    if (
      !window.confirm(
        `Xóa món "${item.matHang?.tenMatHang}" khỏi hóa đơn?`,
      )
    )
      return;
    const currentList = invoice.listChiTietHoaDon || [];
    const updated = currentList.filter((i) => {
      if (i.maChiTietHoaDon && item.maChiTietHoaDon) {
        return i.maChiTietHoaDon !== item.maChiTietHoaDon;
      }
      return i.matHang?.maMatHang !== item.matHang?.maMatHang;
    });
    syncItems(updated);
  };

  const handleOpenAddModal = async () => {
    setShowAddModal(true);
    setMenuSearch("");
    setAddQuantity(1);
    const branchId = invoice?.maChiNhanh || chi_nhanh?.[0]?.maChiNhanh || 1;
    setLoadingMenu(true);
    try {
      const data = await layDanhSachMatHangTaiChiNhanh(branchId);
      const items = Array.isArray(data) ? data : [];
      setMenuItems(items);
      if (items.length > 0) {
        setSelectedFoodId(String(items[0].maMatHang));
      }
    } catch {
      setMenuItems([]);
    } finally {
      setLoadingMenu(false);
    }
  };

  const handleAddFoodSubmit = async (e) => {
    e?.preventDefault();
    if (!selectedFoodId) {
      alert("Vui lòng chọn món cần thêm!");
      return;
    }
    const foodIdNum = Number(selectedFoodId);
    const foodObj = menuItems.find((m) => m.maMatHang === foodIdNum);
    if (!foodObj) return;

    const currentList = invoice.listChiTietHoaDon || [];
    const existingIndex = currentList.findIndex(
      (i) => i.matHang?.maMatHang === foodIdNum,
    );
    let updated;
    if (existingIndex >= 0) {
      updated = currentList.map((i, idx) =>
        idx === existingIndex
          ? { ...i, soLuong: i.soLuong + Number(addQuantity) }
          : i,
      );
    } else {
      updated = [
        ...currentList,
        {
          maChiTietHoaDon: null,
          matHang: foodObj,
          soLuong: Number(addQuantity),
        },
      ];
    }
    setShowAddModal(false);
    await syncItems(updated);
  };

  if (!invoiceId || (loi && !invoice)) {
    return (
      <div className="p-6 max-w-3xl">
        <button
          onClick={() => onNavigate?.("hoa_don")}
          className="flex items-center gap-1.5 text-sm font-500 hover:text-[var(--primary)] transition-colors mb-4"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft size={15} /> Quay lại danh sách
        </button>
        <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
          {!invoiceId ? "Không tìm thấy mã hóa đơn." : loi}
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

  const chiNhanh = chi_nhanh.find((b) => b.maChiNhanh === invoice.maChiNhanh);
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
          onClick={() => onNavigate?.("hoa_don")}
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
          className="px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b"
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
            <LayoutGrid
              size={14}
              className="mt-0.5 shrink-0"
              style={{ color: "var(--muted-foreground)" }}
            />
            <div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Bàn phục vụ
              </div>
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {invoice.maBan ? `Bàn #${invoice.maBan}` : "Mang đi / Không bàn"}
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
          <div className="flex items-center justify-between mb-3">
            <div
              className="text-sm font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Danh sách món ăn ({(invoice.listChiTietHoaDon || []).length} món)
            </div>
            {canEdit && (
              <button
                type="button"
                onClick={handleOpenAddModal}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                style={{ background: "var(--primary)" }}
              >
                <Plus size={14} /> Thêm món
              </button>
            )}
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Món", "Đơn giá", "Số lượng", "Thành tiền", canEdit ? "Xóa" : null]
                  .filter(Boolean)
                  .map((h) => (
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
              {(invoice.listChiTietHoaDon || []).length === 0 && (
                <tr>
                  <td
                    colSpan={canEdit ? 5 : 4}
                    className="py-8 text-center text-xs text-gray-400"
                  >
                    Chưa có món ăn nào trong hóa đơn. Nhấn "Thêm món" để gọi món.
                  </td>
                </tr>
              )}
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
                  <td className="py-3 text-sm font-semibold">
                    {canEdit ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={actionLoading}
                          onClick={() =>
                            handleUpdateQuantity(item, item.soLuong - 1)
                          }
                          className="w-6 h-6 rounded flex items-center justify-center border hover:bg-gray-100 disabled:opacity-40 cursor-pointer text-xs font-bold text-gray-600"
                          title="Giảm số lượng"
                        >
                          -
                        </button>
                        <span
                          className="w-6 text-center text-xs font-bold"
                          style={{ color: "var(--foreground)" }}
                        >
                          {item.soLuong}
                        </span>
                        <button
                          type="button"
                          disabled={actionLoading}
                          onClick={() =>
                            handleUpdateQuantity(item, item.soLuong + 1)
                          }
                          className="w-6 h-6 rounded flex items-center justify-center border hover:bg-gray-100 disabled:opacity-40 cursor-pointer text-xs font-bold text-gray-600"
                          title="Tăng số lượng"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <span style={{ color: "var(--foreground)" }}>
                        ×{item.soLuong}
                      </span>
                    )}
                  </td>
                  <td
                    className="py-3 text-sm font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {dinhDangTien(
                      (item.matHang?.giaMatHang || 0) * (item.soLuong || 0),
                    )}
                  </td>
                  {canEdit && (
                    <td className="py-3 text-sm">
                      <button
                        type="button"
                        disabled={actionLoading}
                        onClick={() => handleDeleteItem(item)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa món này khỏi hóa đơn"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  )}
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
      {/* Modal Thêm món */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Utensils size={16} style={{ color: "var(--primary)" }} />
                <h3 className="text-sm font-bold text-gray-900">
                  Thêm món vào hóa đơn #{invoice.maHoaDon}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Tìm kiếm món */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Tìm món ăn, thức uống..."
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                className="w-full text-xs border rounded-lg pl-8 pr-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                style={{ borderColor: "var(--border)" }}
              />
            </div>

            {/* Danh sách món ăn để chọn */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700">
                Chọn món:
              </label>
              <select
                value={selectedFoodId}
                onChange={(e) => setSelectedFoodId(e.target.value)}
                className="w-full text-xs border rounded-lg p-2 outline-none font-semibold bg-white focus:ring-2 focus:ring-[var(--primary)]"
                style={{ borderColor: "var(--border)" }}
              >
                <option value="">
                  {loadingMenu
                    ? "-- Đang tải thực đơn... --"
                    : "-- Chọn món từ thực đơn chi nhánh --"}
                </option>
                {menuItems
                  .filter((m) =>
                    menuSearch
                      ? m.tenMatHang?.toLowerCase().includes(menuSearch.toLowerCase())
                      : true,
                  )
                  .map((m) => (
                    <option key={m.maMatHang} value={m.maMatHang}>
                      {m.tenMatHang} - {dinhDangTien(m.giaMatHang)}
                    </option>
                  ))}
              </select>
            </div>

            {/* Số lượng */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700">
                Số lượng:
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAddQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold hover:bg-gray-50 cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={addQuantity}
                  onChange={(e) =>
                    setAddQuantity(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-16 text-center text-xs font-bold border rounded-lg py-1.5 outline-none"
                  style={{ borderColor: "var(--border)" }}
                />
                <button
                  type="button"
                  onClick={() => setAddQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold hover:bg-gray-50 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Footer nút hành động */}
            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer hover:bg-gray-50"
                style={{ borderColor: "var(--border)" }}
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={!selectedFoodId || actionLoading}
                onClick={handleAddFoodSubmit}
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
                style={{ background: "var(--primary)" }}
              >
                Thêm vào hóa đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceDetail;
