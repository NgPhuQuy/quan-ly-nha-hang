import { useState, useEffect } from "react";
import { Search, Plus, ChevronLeft, ChevronRight, Utensils } from "lucide-react";
import {
  layDanhSachDatLich,
  capNhatTrangThaiDatLich,
  taoDatLich,
} from "../../services/datLich.service";
import { layDanhSachBan } from "../../services/banAn.service";
import { layDanhSachChiNhanh } from "../../services/chiNhanh.service";
import {
  ModalGanBan,
  ModalMonDatTruoc,
  ModalTaoDatLich,
} from "../../components/quanLy/datLich/ModalDatLich";

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
    if (!window.confirm(`Bạn có chắc muốn hủy lịch đặt ${booking.id}?`)) return;
    if (booking.maDatLichId) {
      try {
        await capNhatTrangThaiDatLich(booking.maDatLichId, "DA_HUY");
      } catch (e) {
        console.warn("Cancel API error:", e);
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
            {branches.map((b) => {
              const name = b.tenChiNhanh || b.ten;
              return (
                <option key={b.maChiNhanh || b.id || name} value={name}>
                  {name}
                </option>
              );
            })}
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

      {/* Modals */}
      <ModalGanBan
        checkInBooking={checkInBooking}
        onClose={() => setCheckInBooking(null)}
        selectedTableId={selectedTableId}
        setSelectedTableId={setSelectedTableId}
        tables={tables}
        onConfirmCheckIn={handleConfirmCheckIn}
      />

      <ModalMonDatTruoc
        viewPreOrderBooking={viewPreOrderBooking}
        onClose={() => setViewPreOrderBooking(null)}
      />

      <ModalTaoDatLich
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        formData={formData}
        setFormData={setFormData}
        branches={branches}
        onSubmit={handleCreateSubmit}
      />
    </div>
  );
}

export default Bookings;
