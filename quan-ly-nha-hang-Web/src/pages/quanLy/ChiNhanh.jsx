import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  MapPin,
  Phone,
  TrendingUp,
  Building2,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import {
  layDanhSachChiNhanh,
  taoChiNhanh,
  capNhatChiNhanh,
  doiTrangThaiChiNhanh,
} from "../../services/chiNhanh.service";
import { dinhDangTienRutGon } from "../../utils/dinhDang";

const statusStyle = {
  "Hoạt động": {
    bg: "var(--success-bg)",
    color: "var(--success)",
  },
  "Tạm đóng": {
    bg: "var(--warning-bg)",
    color: "var(--warning)",
  },
};

function Branches() {
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({
    tenChiNhanh: "",
    diaChi: "",
    soDienThoai: "",
    trangThaiChiNhanh: true,
  });

  const fetchBranches = async () => {
    try {
      const data = await layDanhSachChiNhanh(true);
      if (data) {
        setBranches(
          data.map((b) => ({
            id: `b${b.maChiNhanh}`,
            maChiNhanhId: b.maChiNhanh,
            name: b.tenChiNhanh,
            address: b.diaChi || "Đang cập nhật",
            phone: b.soDienThoai || "028 3822 xxxx",
            manager: "Quản lý chi nhánh",
            status: b.trangThaiChiNhanh ? "Hoạt động" : "Tạm đóng",
            rawStatus: b.trangThaiChiNhanh,
            revenue: 140000000,
          })),
        );
      }
    } catch (e) {
      console.warn("Fetch branches failed", e);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleOpenAdd = () => {
    setEditingBranch(null);
    setFormData({
      tenChiNhanh: "",
      diaChi: "",
      soDienThoai: "",
      trangThaiChiNhanh: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (b) => {
    setEditingBranch(b);
    setFormData({
      tenChiNhanh: b.name,
      diaChi: b.address,
      soDienThoai: b.phone,
      trangThaiChiNhanh: b.rawStatus ?? true,
    });
    setShowModal(true);
  };

  const handleToggleStatus = async (b) => {
    try {
      await doiTrangThaiChiNhanh(b.maChiNhanhId);
      fetchBranches();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi đổi trạng thái chi nhánh!");
    }
  };

  const handleDelete = async (b) => {
    if (!window.confirm(`Bạn có chắc muốn đổi trạng thái / đóng chi nhánh "${b.name}"?`)) return;
    try {
      await doiTrangThaiChiNhanh(b.maChiNhanhId);
      fetchBranches();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi đổi trạng thái chi nhánh!");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("tenChiNhanh", formData.tenChiNhanh);
      fd.append("diaChi", formData.diaChi);
      fd.append("soDienThoai", formData.soDienThoai);
      fd.append("trangThaiChiNhanh", formData.trangThaiChiNhanh);

      if (editingBranch) {
        await capNhatChiNhanh(editingBranch.maChiNhanhId, fd);
      } else {
        await taoChiNhanh(fd);
      }
      setShowModal(false);
      fetchBranches();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu chi nhánh!");
    }
  };

  const filtered = branches.filter(
    (b) =>
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase()),
  );

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
            Quản lý Chi nhánh
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {branches.length} chi nhánh trong hệ thống
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
          <Plus size={14} /> Thêm chi nhánh
        </button>
      </div>

      <div className="relative max-w-xs">
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
          placeholder="Tìm chi nhánh, địa chỉ..."
          className="w-full text-sm border rounded-lg pl-8 pr-3 py-1.5 outline-none focus:ring-2 bg-white"
          style={{
            borderColor: "var(--border)",
          }}
        />
      </div>

      <div
        className="bg-white rounded-xl border overflow-hidden shadow-sm"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <table className="w-full text-sm">
          <thead
            style={{
              background: "var(--secondary)",
            }}
          >
            <tr>
              {[
                "Tên chi nhánh",
                "Địa chỉ",
                "Số điện thoại",
                "Quản lý",
                "Doanh thu (tháng)",
                "Trạng thái",
                "Thao tác",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-600"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr
                key={b.id}
                className="border-t hover:bg-[var(--secondary)] transition-colors"
                style={{
                  borderColor: "var(--border)",
                }}
              >
                <td className="px-4 py-3">
                  <div
                    className="text-sm font-700"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {b.name}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-start gap-1.5 text-xs"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <MapPin size={12} className="mt-0.5 shrink-0" />
                    <span className="max-w-[200px]">{b.address}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center gap-1.5 text-xs font-mono"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <Phone size={12} /> {b.phone}
                  </div>
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {b.manager}
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center gap-1.5 text-xs font-700"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    <TrendingUp size={12} /> {dinhDangTienRutGon(b.revenue)}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleStatus(b)}
                    className="text-xs px-2.5 py-0.5 rounded-full font-600 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      background: statusStyle[b.status]?.bg || "#F0FDF4",
                      color: statusStyle[b.status]?.color || "#16A34A",
                    }}
                    title="Nhấn để đổi trạng thái"
                  >
                    {b.status}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(b)}
                      className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100/60 transition-colors cursor-pointer"
                      title="Sửa chi nhánh"
                    >
                      <Edit2 size={16} strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(b)}
                      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Xóa chi nhánh"
                    >
                      <Trash2 size={16} strokeWidth={2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm / Sửa Chi Nhánh */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-700 flex items-center gap-2">
                <Building2 size={16} style={{ color: "var(--primary)" }} />
                {editingBranch ? "Sửa Chi Nhánh" : "Thêm Chi Nhánh Mới"}
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
                <label className="block font-600 mb-1">Tên chi nhánh:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nhà Hàng 5S Dining - Chi nhánh Landmark 81"
                  value={formData.tenChiNhanh}
                  onChange={(e) =>
                    setFormData({ ...formData, tenChiNhanh: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-600 mb-1">Địa chỉ:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 720A Điện Biên Phủ, P. 22, Bình Thạnh, TP.HCM"
                  value={formData.diaChi}
                  onChange={(e) =>
                    setFormData({ ...formData, diaChi: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-600 mb-1">
                  Số điện thoại liên hệ:
                </label>
                <input
                  type="text"
                  required
                  placeholder="028 3822 9999"
                  value={formData.soDienThoai}
                  onChange={(e) =>
                    setFormData({ ...formData, soDienThoai: e.target.value })
                  }
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-600 mb-1">Trạng thái:</label>
                <select
                  value={formData.trangThaiChiNhanh ? "true" : "false"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      trangThaiChiNhanh: e.target.value === "true",
                    })
                  }
                  className="w-full border rounded-lg p-2"
                >
                  <option value="true">Hoạt động</option>
                  <option value="false">Tạm đóng</option>
                </select>
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
                {editingBranch ? "Cập nhật" : "Tạo chi nhánh"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Branches;
