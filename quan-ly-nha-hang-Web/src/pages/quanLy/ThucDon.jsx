import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, X, UtensilsCrossed } from "lucide-react";
import {
  layTatCaMonAn,
  taoMonAn,
  capNhatMonAn,
  xoaMonAn,
} from "../../services/monAn.service";
import { dinhDangTien } from "../../utils/dinhDang";

const statusStyle = {
  "Đang bán": {
    bg: "#F0FDF4",
    text: "#16A34A",
  },
  "Hết món": {
    bg: "#FEF2F2",
    text: "#DC2626",
  },
  "Tạm ngưng": {
    bg: "#FFFBEB",
    text: "#D97706",
  },
};

const STATUS_OPTIONS = ["Đang bán", "Hết món", "Tạm ngưng"];

const LOAI_MAT_HANG_OPTIONS = [
  { value: "MON_AN", label: "Món ăn" },
  { value: "THUC_UONG", label: "Thức uống" },
  { value: "DICH_VU", label: "Dịch vụ" },
];

const layNhanLoai = (loai) => {
  if (loai === "THUC_UONG") return "Thức uống";
  if (loai === "DICH_VU") return "Dịch vụ";
  return "Món ăn";
};

function FoodMenu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loaiFilter, setLoaiFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("");

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    tenMatHang: "",
    giaMatHang: 100000,
    loaiMatHang: "MON_AN",
    trangThai: "Đang bán",
    moTa: "",
  });

  const fetchFoods = async () => {
    const data = await layTatCaMonAn();
    if (data) setFoods(data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleOpenAdd = () => {
    setEditingFood(null);
    setSelectedFile(null);
    setFormData({
      tenMatHang: "",
      giaMatHang: 100000,
      loaiMatHang: "MON_AN",
      trangThai: "Đang bán",
      moTa: "",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (f, e) => {
    if (e) e.stopPropagation();
    setEditingFood(f);
    setSelectedFile(null);
    setFormData({
      tenMatHang: f.name || f.tenMatHang || f.ten,
      giaMatHang: f.price || f.giaMatHang || f.gia || 0,
      loaiMatHang: f.loaiMatHang || "MON_AN",
      trangThai: f.status || f.trangThai || "Đang bán",
      moTa: f.moTa || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (f, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm(`Bạn có chắc muốn xóa "${f.name || f.ten}"?`)) return;
    try {
      await xoaMonAn(f.id);
      fetchFoods();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa mặt hàng!");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("tenMatHang", formData.tenMatHang.trim());
      fd.append("giaMatHang", Number(formData.giaMatHang));
      fd.append("loaiMatHang", formData.loaiMatHang);
      fd.append("trangThai", formData.trangThai);
      fd.append("moTa", formData.moTa || "");
      if (selectedFile) {
        fd.append("anhMinhHoa", selectedFile);
      }

      if (editingFood) {
        await capNhatMonAn(editingFood.id, fd);
      } else {
        await taoMonAn(fd);
      }
      setShowModal(false);
      fetchFoods();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu mặt hàng!");
    }
  };

  const filtered = foods.filter((f) => {
    if (loaiFilter !== "ALL" && f.loaiMatHang !== loaiFilter) return false;
    if (statusFilter && f.status !== statusFilter) return false;
    if (
      search &&
      !f.name?.toLowerCase().includes(search.toLowerCase()) &&
      !f.ten?.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-base font-700"
            style={{
              color: "var(--foreground)",
            }}
          >
            Quản lý Mặt Hàng & Thực Đơn
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {filtered.length} mặt hàng trong danh sách
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-700 text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
          style={{ background: "var(--primary)" }}
        >
          <Plus size={16} /> Thêm mặt hàng mới
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm tên mặt hàng..."
            className="text-sm border rounded-lg pl-8 pr-3 py-1.5 w-56 outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white text-stone-800 placeholder:text-stone-400"
            style={{
              borderColor: "var(--border)",
            }}
          />
        </div>

        {/* Tab Bộ Lọc Loại Mặt Hàng */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setLoaiFilter("ALL")}
            className="px-3.5 py-1.5 rounded-full text-xs font-600 transition-colors cursor-pointer"
            style={{
              background:
                loaiFilter === "ALL" ? "var(--primary)" : "var(--secondary)",
              color:
                loaiFilter === "ALL" ? "white" : "var(--secondary-foreground)",
            }}
          >
            Tất cả
          </button>
          {LOAI_MAT_HANG_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setLoaiFilter(opt.value)}
              className="px-3.5 py-1.5 rounded-full text-xs font-600 transition-colors cursor-pointer"
              style={{
                background:
                  loaiFilter === opt.value
                    ? "var(--primary)"
                    : "var(--secondary)",
                color:
                  loaiFilter === opt.value
                    ? "white"
                    : "var(--secondary-foreground)",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs border rounded-lg px-2.5 py-1.5 outline-none bg-white font-medium ml-auto text-stone-800"
          style={{ borderColor: "var(--border)" }}
        >
          <option value="">Tất cả trạng thái</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((food) => {
          const s = statusStyle[food.status] || statusStyle["Đang bán"];
          const loaiText = layNhanLoai(food.loaiMatHang);
          return (
            <div
              key={food.id}
              className="bg-white rounded-xl border overflow-hidden flex flex-col hover:shadow-md transition-shadow group relative shadow-sm"
              style={{
                borderColor: "var(--border)",
              }}
            >
              <div className="h-32 bg-[var(--secondary)] relative overflow-hidden flex items-center justify-center">
                {food.image || food.anh ? (
                  <img
                    src={food.image || food.anh}
                    alt={food.name || food.ten}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <UtensilsCrossed
                    size={32}
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  />
                )}
                <span
                  className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-700 shadow-sm"
                  style={{
                    background: s.bg,
                    color: s.text,
                  }}
                >
                  {food.status || "Đang bán"}
                </span>

                {/* Nút Sửa & Xóa size 16 với padding chuẩn */}
                <div className="absolute top-2 left-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => handleOpenEdit(food, e)}
                    className="p-1.5 rounded-lg bg-white/95 shadow-md text-amber-700 hover:bg-white transition-all cursor-pointer"
                    title="Sửa mặt hàng"
                  >
                    <Edit2 size={16} strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(food, e)}
                    className="p-1.5 rounded-lg bg-white/95 shadow-md text-red-600 hover:bg-white transition-all cursor-pointer"
                    title="Xóa mặt hàng"
                  >
                    <Trash2 size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="p-3 flex flex-col flex-1 justify-between">
                <div>
                  <div
                    className="text-xs font-700 leading-snug mb-1 truncate"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {food.name || food.ten}
                  </div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-md font-600"
                      style={{
                        background: "var(--secondary)",
                        color: "var(--secondary-foreground)",
                      }}
                    >
                      {loaiText}
                    </span>
                  </div>
                  {food.description && (
                    <div
                      className="text-[11px] line-clamp-2"
                      style={{
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {food.description}
                    </div>
                  )}
                </div>

                <div className="mt-2 pt-2 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
                  <div
                    className="text-sm font-700"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    {dinhDangTien(food.price || food.gia || 0)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div
          className="text-center py-16 text-xs bg-white rounded-xl border"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted-foreground)",
          }}
        >
          Không tìm thấy mặt hàng nào phù hợp với bộ lọc hiện tại.
        </div>
      )}

      {/* Modal Thêm / Sửa Mặt Hàng */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-sm font-700 text-[var(--foreground)]">
                {editingFood ? "Sửa Mặt Hàng" : "Thêm Mặt Hàng Mới"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-lg"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="block font-600 mb-1 text-[var(--foreground)]">
                    Tên mặt hàng: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Bò Wagyu nướng sốt tiêu, Rượu vang đỏ..."
                    value={formData.tenMatHang}
                    onChange={(e) =>
                      setFormData({ ...formData, tenMatHang: e.target.value })
                    }
                    className="w-full border rounded-lg p-2.5 outline-none focus:border-[var(--primary)] bg-white text-stone-800"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-600 mb-1 text-[var(--foreground)]">
                      Loại mặt hàng: *
                    </label>
                    <select
                      value={formData.loaiMatHang}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          loaiMatHang: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2.5 outline-none focus:border-[var(--primary)] bg-white text-stone-800 font-medium"
                      style={{ borderColor: "var(--border)" }}
                    >
                      {LOAI_MAT_HANG_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-600 mb-1 text-[var(--foreground)]">
                      Giá bán (VNĐ): *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      required
                      value={formData.giaMatHang}
                      onChange={(e) =>
                        setFormData({ ...formData, giaMatHang: e.target.value })
                      }
                      className="w-full border rounded-lg p-2.5 outline-none focus:border-[var(--primary)] bg-white text-stone-800"
                      style={{ borderColor: "var(--border)" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-600 mb-1 text-[var(--foreground)]">
                    Trạng thái:
                  </label>
                  <select
                    value={formData.trangThai}
                    onChange={(e) =>
                      setFormData({ ...formData, trangThai: e.target.value })
                    }
                    className="w-full border rounded-lg p-2.5 outline-none focus:border-[var(--primary)] bg-white text-stone-800 font-medium"
                    style={{ borderColor: "var(--border)" }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-600 mb-1 text-[var(--foreground)]">
                    Hình ảnh minh họa:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-stone-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[var(--secondary)] file:text-[var(--secondary-foreground)] hover:file:opacity-90 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block font-600 mb-1 text-[var(--foreground)]">
                    Mô tả / Thành phần:
                  </label>
                  <textarea
                    rows="2"
                    value={formData.moTa}
                    onChange={(e) =>
                      setFormData({ ...formData, moTa: e.target.value })
                    }
                    className="w-full border rounded-lg p-2.5 outline-none focus:border-[var(--primary)] bg-white text-stone-800"
                    style={{ borderColor: "var(--border)" }}
                    placeholder="Mô tả nguyên liệu, hương vị..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-2 rounded-lg text-xs font-600 border text-gray-600 hover:bg-gray-50 cursor-pointer"
                  style={{ borderColor: "var(--border)" }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-700 text-white cursor-pointer shadow-sm hover:opacity-90"
                  style={{ background: "var(--primary)" }}
                >
                  {editingFood ? "Lưu thay đổi" : "Thêm mặt hàng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodMenu;
