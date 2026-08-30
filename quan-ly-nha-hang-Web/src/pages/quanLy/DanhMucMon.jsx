import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { layTatCaMonAn } from "../../services/monAn.service";

function Categories() {
  const [cats, setCats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    icon: "🍽️",
    status: "Hoạt động",
  });

  useEffect(() => {
    layTatCaMonAn().then((foods) => {
      if (foods && foods.length > 0) {
        const counts = {};
        foods.forEach((f) => {
          const catName = f.category || "Món chính";
          counts[catName] = (counts[catName] || 0) + 1;
        });

        const iconMap = {
          "Món chính": "🥩",
          "Khai vị": "🥗",
          "Tráng miệng": "🍰",
          "Đồ uống": "🍷",
          "Hải sản": "🦞",
          "Rượu vang": "🍾",
        };

        const dynamicCats = Object.keys(counts).map((name, idx) => ({
          id: idx + 1,
          name,
          icon: iconMap[name] || "🍽️",
          itemCount: counts[name],
          status: "Hoạt động",
        }));

        if (dynamicCats.length > 0) {
          setCats(dynamicCats);
        }
      }
    });
  }, []);

  const handleOpenCreate = () => {
    setEditingCat(null);
    setFormData({ name: "", icon: "🍽️", status: "Hoạt động" });
    setShowModal(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCat(cat);
    setFormData({ name: cat.name, icon: cat.icon, status: cat.status });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCat) {
      setCats((prev) =>
        prev.map((c) => (c.id === editingCat.id ? { ...c, ...formData } : c)),
      );
    } else {
      setCats((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
          itemCount: 0,
        },
      ]);
    }
    setShowModal(false);
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
            Danh mục món
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {cats.length} danh mục
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 hover:opacity-90 transition-opacity"
          style={{
            background: "var(--primary)",
            color: "white",
          }}
        >
          <Plus size={14} /> Thêm danh mục
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {cats.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border p-4 flex items-start gap-3 shadow-sm hover:shadow transition-shadow"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div
              className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg shrink-0"
              style={{
                background: "var(--secondary)",
              }}
            >
              {cat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div
                  className="text-sm font-600 truncate"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {cat.name}
                </div>
                <span
                  className="text-xs px-1.5 py-0.5 rounded font-500 shrink-0"
                  style={{
                    background:
                      cat.status === "Hoạt động"
                        ? "var(--success-bg)"
                        : "var(--muted)",
                    color:
                      cat.status === "Hoạt động"
                        ? "var(--success)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {cat.status}
                </span>
              </div>
              <div
                className="text-xs mt-1"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {cat.itemCount} món
              </div>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="text-xs font-500 hover:underline"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  Sửa
                </button>
                <button
                  className="text-xs font-500 hover:underline"
                  style={{
                    color: "var(--danger)",
                  }}
                  onClick={() =>
                    setCats((prev) => prev.filter((c) => c.id !== cat.id))
                  }
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Thêm / Sửa Danh Mục */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-[var(--foreground)]">
                {editingCat ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[var(--foreground)] mb-1">
                  Tên danh mục *
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-[var(--primary)]"
                  placeholder="Ví dụ: Khai vị, Món nướng..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--foreground)] mb-1">
                  Icon biểu tượng
                </label>
                <input
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-[var(--primary)]"
                  placeholder="🥩, 🥗, 🍰, 🍷..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--foreground)] mb-1">
                  Trạng thái
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full border rounded-lg p-2.5 text-xs outline-none focus:border-[var(--primary)] bg-white"
                >
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Tạm ngưng">Tạm ngưng</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 rounded-lg border text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg text-xs font-semibold text-white bg-[var(--primary)] hover:opacity-90"
                >
                  {editingCat ? "Lưu thay đổi" : "Tạo danh mục"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
