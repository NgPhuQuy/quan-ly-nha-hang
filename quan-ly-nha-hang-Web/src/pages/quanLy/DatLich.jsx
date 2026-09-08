import { useState, useEffect } from "react";
import { Search, Plus, ChevronLeft, ChevronRight, Utensils } from "lucide-react";
import {
  layDanhSachDatLich,
  capNhatTrangThaiDatLich,
  taoDatLich,
} from "../../services/datLich.service";
import { layDanhSachBan } from "../../services/banAn.service";
import {
  ModalGanBan,
  ModalMonDatTruoc,
  ModalTaoDatLich,
} from "../../components/quanLy/datLich/ModalDatLich";

const statusStyle = {
  DA_XAC_NHAN: {
    bg: "var(--success-bg)",
    color: "var(--success)",
    label: "Đã xác nhận",
  },
  CHO_XAC_NHAN: {
    bg: "var(--warning-bg)",
    color: "var(--warning)",
    label: "Chờ xác nhận",
  },
  DA_HUY: {
    bg: "var(--danger-bg)",
    color: "var(--danger)",
    label: "Đã huỷ",
  },
};

const PAGE_SIZE = 8;

function Bookings({ chi_nhanh = [] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [bookings, setBookings] = useState([]);
  const [tables, setTables] = useState([]);
  const [page, setPage] = useState(1);

  // Modals
  const [checkInBooking, setCheckInBooking] = useState(null);
  const [selectedTableId, setSelectedTableId] = useState("");
  const [viewPreOrderBooking, setViewPreOrderBooking] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [thongBaoLoi, setThongBaoLoi] = useState("");
  const [formData, setFormData] = useState({
    maChiNhanh: 1,
    hoTen: "",
    soDienThoai: "",
    ngay: new Date().toISOString().slice(0, 10),
    gio: "18:00:00",
    soKhach: 2,
    ghiChu: "",
  });

  const fetchBookings = async () => {
    try {
      const data = await layDanhSachDatLich();
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      console.warn("Lỗi tải đặt lịch", e);
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (chi_nhanh.length && !formData.maChiNhanh) {
      setFormData((prev) => ({ ...prev, maChiNhanh: chi_nhanh[0].maChiNhanh }));
    }
  }, [chi_nhanh, formData.maChiNhanh]);

  const handleOpenCheckIn = (booking) => {
    setCheckInBooking(booking);
    setSelectedTableId("");
    layDanhSachBan(booking.maChiNhanh).then((res) =>
      setTables(Array.isArray(res) ? res : []),
    );
  };

  const handleConfirmCheckIn = async () => {
    if (!checkInBooking) return;
    try {
      await capNhatTrangThaiDatLich(
        checkInBooking.maDatLich,
        "DA_XAC_NHAN",
        selectedTableId ? Number(selectedTableId) : null,
      );
      setCheckInBooking(null);
      fetchBookings();
    } catch (e) {
      alert(e.response?.data?.message || "Lỗi khi xác nhận check-in!");
    }
  };

  const handleHuyLich = async (booking) => {
    if (!window.confirm(`Xác nhận hủy đặt bàn #${booking.maDatLich}?`)) return;
    try {
      await capNhatTrangThaiDatLich(booking.maDatLich, "DA_HUY", null);
      fetchBookings();
    } catch (e) {
      alert(e.response?.data?.message || "Lỗi khi hủy lịch!");
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setThongBaoLoi("");
    try {
      await taoDatLich({
        ...formData,
        maChiNhanh: Number(formData.maChiNhanh),
        soKhach: Number(formData.soKhach),
      });
      setShowCreateModal(false);
      fetchBookings();
    } catch (err) {
      setThongBaoLoi(err.response?.data?.message || "Lỗi khi tạo lịch đặt!");
    }
  };

  const filtered = bookings.filter((b) => {
    if (search) {
      const q = search.toLowerCase();
      const maStr = String(b.maDatLich);
      const ghiChuStr = b.ghiChu ? b.ghiChu.toLowerCase() : "";
      if (!maStr.includes(q) && !ghiChuStr.includes(q)) {
        return false;
      }
    }
    if (statusFilter && b.trangThai !== statusFilter) return false;
    if (branchFilter && String(b.maChiNhanh) !== String(branchFilter)) return false;
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
          {chi_nhanh.map((b) => (
            <option key={b.maChiNhanh} value={b.maChiNhanh}>
              {b.tenChiNhanh}
            </option>
          ))}
        </select>
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
          <option value="DA_XAC_NHAN">Đã xác nhận</option>
          <option value="CHO_XAC_NHAN">Chờ xác nhận</option>
          <option value="DA_HUY">Đã huỷ</option>
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
                "Chi nhánh",
                "Ngày / Giờ",
                "Số khách",
                "Đặt trước",
                "Ghi chú",
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
                  colSpan={8}
                  className="text-center py-8 text-xs text-gray-400"
                >
                  Không có lịch đặt nào phù hợp
                </td>
              </tr>
            ) : (
              paged.map((b) => {
                const s = statusStyle[b.trangThai] || statusStyle.CHO_XAC_NHAN;
                const tenCn =
                  chi_nhanh.find((br) => br.maChiNhanh === b.maChiNhanh)
                    ?.tenChiNhanh || `Chi nhánh #${b.maChiNhanh}`;
                return (
                  <tr
                    key={b.maDatLich}
                    className="border-t hover:bg-[var(--secondary)] transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td
                      className="px-4 py-3 text-xs font-700"
                      style={{ color: "var(--primary)" }}
                    >
                      #{b.maDatLich}
                    </td>
                    <td
                      className="px-4 py-3 text-xs font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {tenCn}
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--foreground)" }}
                    >
                      {b.ngay} <span className="font-semibold">{b.gio}</span>
                    </td>
                    <td
                      className="px-4 py-3 text-xs font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {b.soKhach} khách
                    </td>
                    <td className="px-4 py-3">
                      {b.listDatTruoc && b.listDatTruoc.length > 0 ? (
                        <button
                          onClick={() => setViewPreOrderBooking(b)}
                          className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200 hover:bg-amber-100 cursor-pointer"
                        >
                          <Utensils size={11} /> {b.listDatTruoc.length} món
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td
                      className="px-4 py-3 text-xs text-gray-500 max-w-[150px] truncate"
                      title={b.ghiChu}
                    >
                      {b.ghiChu || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2.5 py-0.5 rounded-full font-600"
                        style={{
                          background: s.bg,
                          color: s.color,
                        }}
                      >
                        {s.label || b.trangThai}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {b.trangThai !== "DA_HUY" && (
                          <button
                            onClick={() => handleOpenCheckIn(b)}
                            className="px-2 py-1 rounded text-xs font-600 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 cursor-pointer"
                          >
                            Xếp bàn
                          </button>
                        )}
                        {b.trangThai === "CHO_XAC_NHAN" && (
                          <button
                            onClick={() => handleHuyLich(b)}
                            className="px-2 py-1 rounded text-xs font-600 bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
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
        chi_nhanh={chi_nhanh}
        onSubmit={handleCreateSubmit}
        thongBaoLoi={thongBaoLoi}
      />
    </div>
  );
}

export default Bookings;
