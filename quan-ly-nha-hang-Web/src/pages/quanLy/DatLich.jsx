import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  Utensils,
  X,
  Building2,
  Calendar,
  User,
  Phone,
} from "lucide-react";
import {
  layDanhSachDatLich,
  capNhatTrangThaiDatLich,
  taoDatLich,
  xoaDatLich,
} from "../../services/datLich.service";
import { layDanhSachBan } from "../../services/banAn.service";
import { layDanhSachChiNhanh } from "../../services/chiNhanh.service";

const statusStyle = {
  "Xác nhận": {
    bg: "var(--success-bg)",
    color: "var(--success)",
  },
  "Chờ xác nhận": {
    bg: "var(--warning-bg)",
    color: "var(--warning)",
  },
  "Đã huỷ": {
    bg: "var(--danger-bg)",
    color: "var(--danger)",
  },
};

const PAGE_SIZE = 8;

function Bookings({ role }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [bookings, setBookings] = useState([]);
  const [branches, setBranches] = useState([]);
  const [tables, setTables] = useState([]);
  const [page, setPage] = useState(1);

  // Modals
  const [checkInBooking, setCheckInBooking] = useState(null);
  const [selectedTableId, setSelectedTableId] = useState("");
  const [viewPreOrderBooking, setViewPreOrderBooking] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    maChiNhanh: 1,
    hoTen: "",
    soDienThoai: "",
    ngay: new Date().toISOString().slice(0, 10),
    gio: "18:00:00",
    soKhach: 2,
    ghiChu: "",
  });

  const fetchBookings = () => {
    layDanhSachDatLich().then((data) => {
      if (data) setBookings(data);
    });
  };

  useEffect(() => {
    fetchBookings();
    layDanhSachChiNhanh().then((res) => {
      if (res && res.length) {
        setBranches(res);
        setFormData((prev) => ({ ...prev, maChiNhanh: res[0].maChiNhanh }));
      }
    });
  }, []);

  const handleOpenCheckIn = (booking) => {
    setCheckInBooking(booking);
    setSelectedTableId("");
    // Lấy danh sách bàn
    layDanhSachBan().then((res) => setTables(res || []));
  };

  const handleConfirmCheckIn = async () => {
    if (!checkInBooking) return;
    try {
      await capNhatTrangThaiDatLich(
        checkInBooking.maDatLichId,
        "DA_XAC_NHAN",
        selectedTableId ? Number(selectedTableId) : null,
      );
      setCheckInBooking(null);
      fetchBookings();
      alert("Xếp bàn và Check-in thành công!");
    } catch (e) {
      console.error(e);
      alert("Lỗi khi xác nhận check-in!");
    }
  };

  const handleHuyLich = async (booking) => {
    if (!window.confirm(`Xác nhận hủy đặt bàn mã ${booking.id}?`)) return;
    try {
      await capNhatTrangThaiDatLich(booking.maDatLichId, "DA_HUY", null);
      fetchBookings();
    } catch (e) {
      console.error(e);
      alert("Lỗi khi hủy lịch!");
    }
  };

  const handleDelete = async (booking) => {
    if (!window.confirm(`Bạn có chắc muốn xóa lịch đặt ${booking.id}?`)) return;
    if (booking.maDatLichId) {
      try {
        await xoaDatLich(booking.maDatLichId);
      } catch (e) {
        console.warn("Delete API error:", e);
      }
    }
    setBookings((prev) => prev.filter((x) => x.id !== booking.id));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await taoDatLich({
        ...formData,
        maChiNhanh: Number(formData.maChiNhanh),
        soKhach: Number(formData.soKhach),
      });
      setShowCreateModal(false);
      fetchBookings();
      alert("Tạo đặt lịch thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo lịch đặt!");
    }
  };

  const filtered = bookings.filter((b) => {
    if (
      search &&
      !b.customer.toLowerCase().includes(search.toLowerCase()) &&
      !b.phone.includes(search)
    )
      return false;
    if (statusFilter && b.status !== statusFilter) return false;
    if (branchFilter && b.branch !== branchFilter) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-base font-700"
            style={{ color: "var(--foreground)" }}
          >
            Quản lý Đặt lịch
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            {filtered.length} lịch hẹn khách hàng
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 hover:opacity-90 transition-opacity"
          style={{ background: "var(--primary)", color: "white" }}
        >
          <Plus size={14} /> Thêm đặt lịch
        </button>
      </div>

      {/* Bộ lọc */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--muted-foreground)" }}
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm khách hàng, SĐT..."
            className="w-56 text-sm border rounded-lg pl-8 pr-3 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
            style={{ borderColor: "var(--border)" }}
          />
        </div>
        {role === "admin" && (
          <select
            value={branchFilter}
            onChange={(e) => {
              setBranchFilter(e.target.value);
              setPage(1);
            }}
            className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
            style={{ borderColor: "var(--border)" }}
          >
            <option value="">Tất cả chi nhánh</option>
            {BRANCH_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        )}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
          style={{ borderColor: "var(--border)" }}
        >
          <option value="">Tất cả trạng thái</option>
          {["Xác nhận", "Chờ xác nhận", "Đã huỷ"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Bảng danh sách */}
      <div
        className="bg-white rounded-xl border overflow-hidden shadow-sm"
        style={{ borderColor: "var(--border)" }}
      >
        <table className="w-full text-sm">
          <thead style={{ background: "var(--secondary)" }}>
            <tr>
              {[
                "Mã",
                "Khách hàng",
                "Ngày / Giờ",
                "Số khách",
                "Bàn",
                ...(role === "admin" ? ["Chi nhánh"] : []),
                "Đặt trước",
                "Trạng thái",
                "Thao tác",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-600"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-8 text-xs text-gray-400"
                >
                  Không có lịch đặt nào phù hợp
                </td>
              </tr>
            ) : (
              paged.map((b) => (
                <tr
                  key={b.id}
                  className="border-t hover:bg-[var(--secondary)] transition-colors"
                  style={{ borderColor: "var(--border)" }}
                >
                  <td
                    className="px-4 py-3 text-xs font-700"
                    style={{ color: "var(--primary)" }}
                  >
                    {b.id}
                  </td>
                  <td className="px-4 py-3">
                    <div
                      className="text-xs font-600"
                      style={{ color: "var(--foreground)" }}
                    >
                      {b.customer}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {b.phone}
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{ color: "var(--foreground)" }}
                  >
                    {b.date} <span className="font-semibold">{b.time}</span>
                  </td>
                  <td
                    className="px-4 py-3 text-xs font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {b.guests} khách
                  </td>
                  <td
                    className="px-4 py-3 text-xs font-bold"
                    style={{ color: "var(--primary)" }}
                  >
                    {b.table && b.table !== "—" ? `Bàn ${b.table}` : "Chưa gán"}
                  </td>
                  {role === "admin" && (
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--foreground)" }}
                    >
                      {b.branch}
                    </td>
                  )}
                  <td className="px-4 py-3">
                    {b.listDatTruoc && b.listDatTruoc.length > 0 ? (
                      <button
                        onClick={() => setViewPreOrderBooking(b)}
                        className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200 hover:bg-amber-100"
                      >
                        <Utensils size={11} /> {b.listDatTruoc.length} món
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-600"
                      style={{
                        background: statusStyle[b.status]?.bg || "#FFFBEB",
                        color: statusStyle[b.status]?.color || "#D97706",
                      }}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {b.status !== "Đã huỷ" && (
                        <button
                          onClick={() => handleOpenCheckIn(b)}
                          className="px-2 py-1 rounded text-xs font-600 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                        >
                          Xếp bàn
                        </button>
                      )}
                      {b.status === "Chờ xác nhận" && (
                        <button
                          onClick={() => handleHuyLich(b)}
                          className="px-2 py-1 rounded text-xs font-600 bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Hủy
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(b)}
                        className="text-xs text-gray-400 hover:text-red-600 transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div
            className="flex items-center justify-between px-4 py-2.5 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              Trang {page} / {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-40 hover:bg-[var(--secondary)]"
              >
                <ChevronLeft size={13} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-7 h-7 rounded flex items-center justify-center disabled:opacity-40 hover:bg-[var(--secondary)]"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Xếp bàn & Check-in */}
      {checkInBooking && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-700">Xếp bàn & Check-in</h3>
              <button
                onClick={() => setCheckInBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <div className="text-xs space-y-1.5 text-gray-600">
              <p>
                <strong>Khách hàng:</strong> {checkInBooking.customer} (
                {checkInBooking.phone})
              </p>
              <p>
                <strong>Số khách:</strong> {checkInBooking.guests} người
              </p>
              <p>
                <strong>Chi nhánh:</strong> {checkInBooking.branch}
              </p>
            </div>
            <div>
              <label className="block text-xs font-600 mb-1">
                Chọn bàn phục vụ:
              </label>
              <select
                value={selectedTableId}
                onChange={(e) => setSelectedTableId(e.target.value)}
                className="w-full text-xs border rounded-lg p-2 outline-none font-semibold focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">-- Chọn bàn trống --</option>
                {tables.map((t) => (
                  <option key={t.maBan} value={t.maBan}>
                    {t.soBan} ({t.sucChua} chỗ - {t.trangThai})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setCheckInBooking(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-600 border"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmCheckIn}
                className="px-4 py-1.5 rounded-lg text-xs font-700 text-white"
                style={{ background: "var(--primary)" }}
              >
                Xác nhận Check-in
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xem món đặt trước */}
      {viewPreOrderBooking && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-700 flex items-center gap-1.5">
                <Utensils size={15} style={{ color: "var(--primary)" }} /> Món
                ăn đặt trước ({viewPreOrderBooking.id})
              </h3>
              <button
                onClick={() => setViewPreOrderBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2 text-xs divide-y">
              {viewPreOrderBooking.listDatTruoc.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center pt-2"
                >
                  <span className="font-semibold">
                    {item.tenMatHang || `Món #${item.maMatHang}`}
                  </span>
                  <span className="font-bold text-amber-600">
                    ×{item.soLuong}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-right pt-2 border-t">
              <button
                onClick={() => setViewPreOrderBooking(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-600 border"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thêm đặt lịch mới */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleCreateSubmit}
            className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-700">Tạo Đặt Lịch Mới</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              <div>
                <label className="block font-600 mb-1">Chi nhánh:</label>
                <select
                  value={formData.maChiNhanh}
                  onChange={(e) =>
                    setFormData({ ...formData, maChiNhanh: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 font-medium"
                >
                  {branches.map((b) => (
                    <option key={b.maChiNhanh} value={b.maChiNhanh}>
                      {b.tenChiNhanh}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-600 mb-1">Họ tên khách:</label>
                  <input
                    type="text"
                    required
                    value={formData.hoTen}
                    onChange={(e) =>
                      setFormData({ ...formData, hoTen: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block font-600 mb-1">Số điện thoại:</label>
                  <input
                    type="text"
                    required
                    value={formData.soDienThoai}
                    onChange={(e) =>
                      setFormData({ ...formData, soDienThoai: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                    placeholder="0912345678"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-600 mb-1">Ngày đặt:</label>
                  <input
                    type="date"
                    required
                    value={formData.ngay}
                    onChange={(e) =>
                      setFormData({ ...formData, ngay: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-600 mb-1">Giờ đến:</label>
                  <input
                    type="time"
                    required
                    value={formData.gio.slice(0, 5)}
                    onChange={(e) =>
                      setFormData({ ...formData, gio: `${e.target.value}:00` })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-600 mb-1">Số khách:</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.soKhach}
                    onChange={(e) =>
                      setFormData({ ...formData, soKhach: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </div>
              <div>
                <label className="block font-600 mb-1">Ghi chú:</label>
                <textarea
                  rows="2"
                  value={formData.ghiChu}
                  onChange={(e) =>
                    setFormData({ ...formData, ghiChu: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  placeholder="Yêu cầu chỗ ngồi..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-600 border"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-700 text-white"
                style={{ background: "var(--primary)" }}
              >
                Lưu Đặt Lịch
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Bookings;
