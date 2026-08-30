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
const CATEGORY_OPTIONS = [
  "Món khai vị",
  "Món chính",
  "Món tráng miệng",
  "Đồ uống",
  "Dịch vụ bổ sung",
];

function FoodMenu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("");

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    tenMatHang: "",
    danhMuc: "Món chính",
    giaMatHang: 100000,
    loaiMatHang: "THUC_AN",
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
    setFormData({
      tenMatHang: "",
      danhMuc: "Món chính",
      giaMatHang: 100000,
      loaiMatHang: "THUC_AN",
      trangThai: "Đang bán",
      moTa: "",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (f, e) => {
    if (e) e.stopPropagation();
    setEditingFood(f);
    setFormData({
      tenMatHang: f.name,
      danhMuc: f.category || "Món chính",
      giaMatHang: f.price,
      loaiMatHang:
        f.category === "Đồ uống"
          ? "NUOC_UONG"
          : f.category === "Dịch vụ bổ sung"
            ? "DICH_VU"
            : "THUC_AN",
      trangThai: f.status || "Đang bán",
      moTa: "",
    });
    setShowModal(true);
  };

  const handleDelete = async (f, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm(`Bạn có chắc muốn xóa món "${f.name}"?`)) return;
    try {
      await xoaMonAn(f.id);
      fetchFoods();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa món ăn!");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const dataPayload = {
        tenMatHang: formData.tenMatHang,
        danhMuc: formData.danhMuc,
        giaMatHang: Number(formData.giaMatHang),
        loaiMatHang: formData.loaiMatHang,
        trangThai: formData.trangThai,
        moTa: formData.moTa,
      };

      const fd = new FormData();
      fd.append("tenMatHang", dataPayload.tenMatHang);
      fd.append("danhMuc", dataPayload.danhMuc);
      fd.append("giaMatHang", dataPayload.giaMatHang);
      fd.append("loaiMatHang", dataPayload.loaiMatHang);
      fd.append("trangThai", dataPayload.trangThai);
      fd.append("moTa", dataPayload.moTa);

      if (editingFood) {
        await capNhatMonAn(editingFood.id, fd);
      } else {
        await taoMonAn(fd);
      }
      setShowModal(false);
      fetchFoods();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu món ăn!");
    }
  };

  const filtered = foods.filter((f) => {
    if (catFilter !== "Tất cả" && f.category !== catFilter) return false;
    if (statusFilter && f.status !== statusFilter) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const categories = [
    "Tất cả",
    ...new Set(foods.map((f) => f.category).filter(Boolean)),
  ];

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
            Quản lý Thực đơn & Món ăn
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {filtered.length} món ăn trong thực đơn
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-700 text-white shadow-sm hover:opacity-90 transition-opacity"
          style={{ background: "var(--primary)" }}
        >
          <Plus size={14} /> Thêm món mới
        </button>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{
              color: "var(--muted-foreground)",
            }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm món ăn..."
            className="text-sm border rounded-lg pl-8 pr-3 py-1.5 w-52 outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
            style={{
              borderColor: "var(--border)",
            }}
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className="px-3 py-1 rounded-full text-xs font-600 transition-colors"
              style={{
                background:
                  catFilter === cat ? "var(--primary)" : "var(--secondary)",
                color:
                  catFilter === cat ? "white" : "var(--secondary-foreground)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs border rounded-lg px-2.5 py-1.5 outline-none bg-white font-medium ml-auto"
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
          return (
            <div
              key={food.id}
              className="bg-white rounded-xl border overflow-hidden shadow-xs hover:shadow-md transition-shadow relative group flex flex-col justify-between"
              style={{
                borderColor: "var(--border)",
              }}
            >
              <div className="relative h-32 overflow-hidden bg-gray-100">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded font-700"
                  style={{
                    background: s.bg,
                    color: s.text,
                  }}
                >
                  {food.status}
                </span>

                {/* Edit & Delete hover buttons */}
                <div className="absolute top-2 left-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleOpenEdit(food, e)}
                    className="p-1 rounded bg-white/90 shadow text-gray-700 hover:bg-white"
                    title="Sửa món"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={(e) => handleDelete(food, e)}
                    className="p-1 rounded bg-white/90 shadow text-red-600 hover:bg-white"
                    title="Xóa món"
                  >
                    <Trash2 size={12} />
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
                    {food.name}
                  </div>
                  <div
                    className="text-[11px]"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {food.category}
                  </div>
                </div>
                <div
                  className="text-sm font-800 mt-2"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  {dinhDangTien(food.price)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Thêm / Sửa Món Ăn */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-700 flex items-center gap-2">
                <UtensilsCrossed
                  size={16}
                  style={{ color: "var(--primary)" }}
                />
                {editingFood ? "Sửa Món Ăn" : "Thêm Món Ăn Mới"}
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
                <label className="block font-600 mb-1">Tên món ăn:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Phở bò đặc biệt, Cơm niêu..."
                  value={formData.tenMatHang}
                  onChange={(e) =>
                    setFormData({ ...formData, tenMatHang: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-600 mb-1">Danh mục:</label>
                  <select
                    value={formData.danhMuc}
                    onChange={(e) => {
                      const dm = e.target.value;
                      const loai =
                        dm === "Đồ uống"
                          ? "NUOC_UONG"
                          : dm === "Dịch vụ bổ sung"
                            ? "DICH_VU"
                            : "THUC_AN";
                      setFormData({
                        ...formData,
                        danhMuc: dm,
                        loaiMatHang: loai,
                      });
                    }}
                    className="w-full border rounded-lg p-2"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-600 mb-1">Giá bán (VNĐ):</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    required
                    value={formData.giaMatHang}
                    onChange={(e) =>
                      setFormData({ ...formData, giaMatHang: e.target.value })
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
                  className="w-full border rounded-lg p-2"
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
                  Mô tả / Thành phần:
                </label>
                <textarea
                  rows="2"
                  value={formData.moTa}
                  onChange={(e) =>
                    setFormData({ ...formData, moTa: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                  placeholder="Mô tả nguyên liệu, hương vị..."
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
                {editingFood ? "Cập nhật" : "Tạo món"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FoodMenu;
