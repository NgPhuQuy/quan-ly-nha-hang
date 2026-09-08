import { useState, useEffect } from "react";
import { Users, Plus, Building2, Trash2, Edit2, X } from "lucide-react";
import {
  layDanhSachBan,
  doiTrangThaiBan,
  taoBan,
} from "../../services/banAn.service";
import apis, { endpoints } from "../../services/apis";

const statusStyle = {
  Trống: {
    bg: "var(--success-bg)",
    border: "#16A34A",
    text: "var(--success)",
    dot: "var(--success)",
  },
  "Đang phục vụ": {
    bg: "var(--danger-bg)",
    border: "#DC2626",
    text: "var(--danger)",
    dot: "var(--danger)",
  },
  "Đã đặt trước": {
    bg: "var(--warning-bg)",
    border: "#D97706",
    text: "var(--warning)",
    dot: "var(--warning)",
  },
};

const STATUS_OPTIONS = ["Trống", "Đang phục vụ", "Đã đặt trước"];

function Tables({ branches = [] }) {
  const [tables, setTables] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [filter, setFilter] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [thongBaoLoi, setThongBaoLoi] = useState("");
  const [formData, setFormData] = useState({
    soBan: "",
    sucChua: 4,
    trangThai: "Trống",
    maChiNhanh: 1,
  });

  useEffect(() => {
    if (branches.length && !selectedBranchId) {
      setSelectedBranchId(branches[0].maChiNhanh);
    }
  }, [branches, selectedBranchId]);

  const fetchTables = async () => {
    try {
      const data = await layDanhSachBan(selectedBranchId || undefined);
      setTables(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Could not fetch tables", err);
      setTables([]);
    }
  };

  useEffect(() => {
    if (selectedBranchId) {
      fetchTables();
    }
  }, [selectedBranchId]);

  const handleDoiTrangThaiBan = async (maBan, currentStatus, e) => {
    if (e) e.stopPropagation();
    const idx = STATUS_OPTIONS.indexOf(currentStatus);
    const nextStatus = STATUS_OPTIONS[(idx + 1) % STATUS_OPTIONS.length];
    try {
      await doiTrangThaiBan(maBan, nextStatus);
      setTables((prev) =>
        prev.map((t) =>
          t.maBan === maBan
            ? {
                ...t,
                trangThai: nextStatus,
              }
            : t,
        ),
      );
    } catch (err) {
      alert(err.response?.data?.message || "Cập nhật trạng thái bàn thất bại!");
    }
  };

  const handleOpenAdd = () => {
    setEditingTable(null);
    setThongBaoLoi("");
    setFormData({
      soBan: `Bàn ${tables.length + 1}`,
      sucChua: 4,
      trangThai: "Trống",
      maChiNhanh: selectedBranchId || (branches[0]?.maChiNhanh ?? 1),
    });
    setShowModal(true);
  };

  const handleOpenEdit = (t, e) => {
    if (e) e.stopPropagation();
    setEditingTable(t);
    setThongBaoLoi("");
    setFormData({
      soBan: t.soBan,
      sucChua: t.sucChua,
      trangThai: t.trangThai,
      maChiNhanh: t.maChiNhanh || selectedBranchId || 1,
    });
    setShowModal(true);
  };

  const handleDelete = async (t, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm(`Bạn có chắc muốn đổi trạng thái ${t.soBan}?`)) return;
    try {
      await doiTrangThaiBan(t.maBan);
      fetchTables();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi đổi trạng thái bàn!");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setThongBaoLoi("");
    try {
      if (editingTable) {
        await apis.put(endpoints.cap_nhat_ban(editingTable.maBan), {
          ...formData,
          sucChua: Number(formData.sucChua),
          maChiNhanh: Number(formData.maChiNhanh),
        });
      } else {
        await taoBan({
          ...formData,
          sucChua: Number(formData.sucChua),
          maChiNhanh: Number(formData.maChiNhanh),
        });
      }
      setShowModal(false);
      fetchTables();
    } catch (err) {
      setThongBaoLoi(err.response?.data?.message || "Lỗi khi lưu bàn!");
    }
  };

  const filtered = filter ? tables.filter((t) => t.trangThai === filter) : tables;
  const counts = tables.reduce(
    (acc, t) => {
      acc[t.trangThai] = (acc[t.trangThai] || 0) + 1;
      return acc;
    },
    { Trống: 0, "Đang phục vụ": 0, "Đã đặt trước": 0 },
  );

  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2
            className="text-base font-700"
            style={{
              color: "var(--foreground)",
            }}
          >
            Sơ đồ bàn
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {tables.length} bàn phục vụ
          </p>
        </div>

        {/* Chọn Chi nhánh & Nút thêm bàn */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Building2 size={15} style={{ color: "var(--primary)" }} />
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="text-xs font-600 border rounded-lg px-2.5 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
              style={{ borderColor: "var(--border)" }}
            >
              {branches.map((b) => (
                <option key={b.maChiNhanh} value={b.maChiNhanh}>
                  {b.tenChiNhanh}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-700 text-white shadow-sm hover:opacity-90 transition-opacity"
            style={{ background: "var(--primary)" }}
          >
            <Plus size={14} /> Thêm bàn
          </button>
        </div>
      </div>

      {/* Thống kê trạng thái & Bộ lọc */}
      <div
        className="flex items-center justify-between border-y py-2.5 flex-wrap gap-2"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilter("")}
            className="px-3 py-1 rounded-full text-xs font-600 transition-colors"
            style={{
              background: !filter ? "var(--primary)" : "var(--secondary)",
              color: !filter ? "white" : "var(--secondary-foreground)",
            }}
          >
            Tất cả ({tables.length})
          </button>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-3 py-1 rounded-full text-xs font-600 transition-colors"
              style={{
                background:
                  filter === s ? "var(--primary)" : "var(--secondary)",
                color: filter === s ? "white" : "var(--secondary-foreground)",
              }}
            >
              {s} ({counts[s] || 0})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs">
          {Object.entries(counts).map(([status, count]) => (
            <div key={status} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: statusStyle[status]?.dot || "#999",
                }}
              />
              <span style={{ color: "var(--foreground)" }}>{status}:</span>
              <span className="font-bold">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sơ đồ danh sách bàn */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {filtered.map((table) => {
          const s = statusStyle[table.trangThai] || statusStyle["Trống"];
          return (
            <div
              key={table.maBan}
              onClick={(e) =>
                handleDoiTrangThaiBan(table.maBan, table.trangThai, e)
              }
              className="bg-white rounded-xl border-2 p-3.5 text-left transition-all hover:shadow-md cursor-pointer relative group flex flex-col justify-between"
              style={{
                borderColor: s.border,
              }}
              title="Nhấn vào thẻ bàn để chuyển đổi trạng thái"
            >
              {/* Nút Edit & Delete xuất hiện khi hover */}
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={(e) => handleOpenEdit(table, e)}
                  className="p-1.5 rounded-lg bg-white/90 hover:bg-amber-100 text-amber-800 shadow-sm transition-all cursor-pointer"
                  title="Sửa bàn"
                >
                  <Edit2 size={16} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDelete(table, e)}
                  className="p-1.5 rounded-lg bg-white/90 hover:bg-red-100 text-red-600 shadow-sm transition-all cursor-pointer"
                  title="Xóa bàn"
                >
                  <Trash2 size={16} strokeWidth={2} />
                </button>
              </div>

              <div>
                <div
                  className="text-xl font-800 mb-1"
                  style={{
                    color: s.text,
                  }}
                >
                  {table.soBan}
                </div>
                <div
                  className="flex items-center gap-1 text-xs mb-2.5 font-medium"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  <Users size={11} /> {table.sucChua} chỗ
                </div>
              </div>

              <span
                className="text-[11px] px-2 py-0.5 rounded font-700 block text-center"
                style={{
                  background: s.bg,
                  color: s.text,
                }}
              >
                {table.trangThai}
              </span>
            </div>
          );
        })}
      </div>

      {/* Modal Thêm / Sửa Bàn */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-700">
                {editingTable ? "Sửa Bàn Ăn" : "Thêm Bàn Ăn Mới"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            {thongBaoLoi && (
              <div className="p-2.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {thongBaoLoi}
              </div>
            )}

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

              <div>
                <label className="block font-600 mb-1">Số / Tên bàn:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bàn 01, VIP 01..."
                  value={formData.soBan}
                  onChange={(e) =>
                    setFormData({ ...formData, soBan: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-600 mb-1">
                    Sức chứa (người):
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.sucChua}
                    onChange={(e) =>
                      setFormData({ ...formData, sucChua: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-600 mb-1">Trạng thái:</label>
                  <select
                    value={formData.trangThai}
                    onChange={(e) =>
                      setFormData({ ...formData, trangThai: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-600 border"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-700 text-white"
                style={{ background: "var(--primary)" }}
              >
                {editingTable ? "Cập nhật" : "Tạo bàn"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Tables;
