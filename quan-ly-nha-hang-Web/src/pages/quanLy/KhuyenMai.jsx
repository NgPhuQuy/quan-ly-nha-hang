import { useState, useEffect } from "react";
import { Plus, Tag, Edit2, Trash2, X, Gift } from "lucide-react";
// Chức năng Khuyến mãi đang được bảo trì / nâng cấp
const layDanhSachKhuyenMai = async () => [];
const taoKhuyenMai = async (data) => ({ maKhuyenMai: Date.now(), ...data });
const capNhatKhuyenMai = async (id, data) => ({ maKhuyenMai: id, ...data });
const xoaKhuyenMai = async () => true;

const statusStyle = {
  "Đang chạy": {
    bg: "var(--success-bg)",
    color: "var(--success)",
  },
  "Chờ chạy": {
    bg: "var(--info-bg)",
    color: "var(--info)",
  },
  "Đã kết thúc": {
    bg: "var(--muted)",
    color: "var(--muted-foreground)",
  },
};

const STATUS_OPTIONS = ["Đang chạy", "Chờ chạy", "Đã kết thúc"];
const TYPE_OPTIONS = ["Giảm %", "Giảm tiền mặt", "Tặng món"];

const taoFormDataMacDinh = () => {
  const batDau = new Date();
  const ketThuc = new Date();
  ketThuc.setDate(ketThuc.getDate() + 30);
  return {
    tenKhuyenMai: "",
    loaiKhuyenMai: "Giảm %",
    giaTri: "10%",
    ngayBatDau: batDau.toISOString().slice(0, 10),
    ngayKetThuc: ketThuc.toISOString().slice(0, 10),
    trangThai: "Đang chạy",
    moTa: "",
  };
};

function Promotions() {
  const [promos, setPromos] = useState([]);
  const [filter, setFilter] = useState("");

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [formData, setFormData] = useState(taoFormDataMacDinh);

  const fetchPromos = async () => {
    try {
      const data = await layDanhSachKhuyenMai(filter || undefined);
      if (data) setPromos(data);
    } catch (e) {
      console.warn("Fetch promotions failed", e);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, [filter]);

  const handleOpenAdd = () => {
    setEditingPromo(null);
    setFormData({
      tenKhuyenMai: "",
      loaiKhuyenMai: "Giảm %",
      giaTri: "10%",
      ngayBatDau: new Date().toISOString().slice(0, 10),
      ngayKetThuc: new Date(Date.now() + 30 * 86400000)
        .toISOString()
        .slice(0, 10),
      trangThai: "Đang chạy",
      moTa: "",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingPromo(p);
    setFormData({
      tenKhuyenMai: p.name,
      loaiKhuyenMai: p.type || "Giảm %",
      giaTri: p.value || "10%",
      ngayBatDau: p.startDate,
      ngayKetThuc: p.endDate,
      trangThai: p.status || "Đang chạy",
      moTa: "",
    });
    setShowModal(true);
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Bạn có chắc muốn xóa khuyến mãi "${p.name}"?`)) return;
    if (p.maKhuyenMaiId) {
      try {
        await xoaKhuyenMai(p.maKhuyenMaiId);
        fetchPromos();
      } catch (e) {
        console.error("Delete promotion failed:", e);
        alert("Lỗi khi xóa khuyến mãi!");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingPromo) {
        await capNhatKhuyenMai(editingPromo.maKhuyenMaiId, formData);
      } else {
        await taoKhuyenMai(formData);
      }
      setShowModal(false);
      fetchPromos();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu chương trình khuyến mãi!");
    }
  };

  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-base font-700"
            style={{
              color: "var(--foreground)",
            }}
          >
            Quản lý Khuyến mãi
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {promos.length} chương trình ưu đãi
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 hover:opacity-90 transition-opacity"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          <Plus size={14} /> Tạo khuyến mãi
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        {["", "Đang chạy", "Chờ chạy", "Đã kết thúc"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className="px-3 py-1 rounded-full text-xs font-600 transition-colors"
            style={{
              background: filter === s ? "var(--primary)" : "var(--secondary)",
              color: filter === s ? "white" : "var(--secondary-foreground)",
            }}
          >
            {s || "Tất cả"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {promos.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl border p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(212,150,43,0.12)",
                    }}
                  >
                    <Tag
                      size={15}
                      style={{
                        color: "var(--primary)",
                      }}
                    />
                  </div>
                  <div>
                    <div
                      className="text-sm font-700"
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      className="text-xs font-semibold mt-0.5"
                      style={{
                        color: "var(--primary)",
                      }}
                    >
                      {p.type} · {p.value}
                    </div>
                  </div>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded font-600 shrink-0"
                  style={{
                    background: statusStyle[p.status]?.bg || "#F0FDF4",
                    color: statusStyle[p.status]?.color || "#16A34A",
                  }}
                >
                  {p.status}
                </span>
              </div>

              <div
                className="text-xs font-mono mb-3"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {p.startDate} → {p.endDate}
              </div>
            </div>

            <div
              className="flex items-center justify-between pt-2 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                Đã dùng:{" "}
                <span
                  className="font-700"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {p.usedCount} lần
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(p)}
                  className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100/60 transition-colors cursor-pointer"
                  title="Sửa khuyến mãi"
                >
                  <Edit2 size={16} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p)}
                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Xóa khuyến mãi"
                >
                  <Trash2 size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Thêm / Sửa Khuyến Mãi */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-700 flex items-center gap-2">
                <Gift size={16} style={{ color: "var(--primary)" }} />
                {editingPromo ? "Sửa Khuyến Mãi" : "Tạo Khuyến Mãi Mới"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <label className="block font-600 mb-1">Tên chương trình:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Giảm 20% tiệc sinh nhật, Khai xuân đón lộc..."
                  value={formData.tenKhuyenMai}
                  onChange={(e) =>
                    setFormData({ ...formData, tenKhuyenMai: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-600 mb-1">
                    Loại khuyến mãi:
                  </label>
                  <select
                    value={formData.loaiKhuyenMai}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        loaiKhuyenMai: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg p-2 font-medium"
                  >
                    {TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-600 mb-1">Giá trị:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 15% hoặc 50000"
                    value={formData.giaTri}
                    onChange={(e) =>
                      setFormData({ ...formData, giaTri: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-600 mb-1">Ngày bắt đầu:</label>
                  <input
                    type="date"
                    required
                    value={formData.ngayBatDau}
                    onChange={(e) =>
                      setFormData({ ...formData, ngayBatDau: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-600 mb-1">Ngày kết thúc:</label>
                  <input
                    type="date"
                    required
                    value={formData.ngayKetThuc}
                    onChange={(e) =>
                      setFormData({ ...formData, ngayKetThuc: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-600 mb-1">Trạng thái:</label>
                <select
                  value={formData.trangThai}
                  onChange={(e) =>
                    setFormData({ ...formData, trangThai: e.target.value })
                  }
                  className="w-full border rounded-lg p-2 font-medium"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-600 mb-1">
                  Mô tả / Điều kiện áp dụng:
                </label>
                <textarea
                  rows="2"
                  value={formData.moTa}
                  onChange={(e) =>
                    setFormData({ ...formData, moTa: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  placeholder="Áp dụng cho hóa đơn từ 500k..."
                />
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
                {editingPromo ? "Cập nhật" : "Tạo khuyến mãi"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Promotions;
