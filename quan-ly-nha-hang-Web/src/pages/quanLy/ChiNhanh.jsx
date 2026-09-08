import { useState } from "react";
import {
  Plus,
  Search,
  MapPin,
  Phone,
  Building2,
  Edit2,
  Trash2,
  X,
  ShoppingBag,
} from "lucide-react";
import {
  taoChiNhanh,
  capNhatChiNhanh,
  doiTrangThaiChiNhanh,
} from "../../services/chiNhanh.service";

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

function Branches({ chi_nhanh = [], onRefreshBranches }) {
  const [search, setSearch] = useState("");

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [thongBaoLoi, setThongBaoLoi] = useState("");
  const [formData, setFormData] = useState({
    tenChiNhanh: "",
    diaChi: "",
    soDienThoai: "",
    trangThaiChiNhanh: true,
  });

  const handleOpenAdd = () => {
    setEditingBranch(null);
    setThongBaoLoi("");
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
    setThongBaoLoi("");
    setFormData({
      tenChiNhanh: b.tenChiNhanh,
      diaChi: b.diaChi || "",
      soDienThoai: b.soDienThoai || "",
      trangThaiChiNhanh: b.trangThaiChiNhanh,
    });
    setShowModal(true);
  };

  const handleToggleStatus = async (b) => {
    try {
      await doiTrangThaiChiNhanh(b.maChiNhanh);
      onRefreshBranches?.();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi đổi trạng thái chi nhánh!");
    }
  };

  const handleDelete = async (b) => {
    if (!window.confirm(`Bạn có chắc muốn đổi trạng thái / đóng chi nhánh "${b.tenChiNhanh}"?`)) return;
    try {
      await doiTrangThaiChiNhanh(b.maChiNhanh);
      onRefreshBranches?.();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi đổi trạng thái chi nhánh!");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setThongBaoLoi("");
    try {
      const fd = new FormData();
      fd.append("tenChiNhanh", formData.tenChiNhanh.trim());
      fd.append("diaChi", formData.diaChi.trim());
      fd.append("soDienThoai", formData.soDienThoai.trim());
      fd.append("trangThaiChiNhanh", formData.trangThaiChiNhanh);

      if (editingBranch) {
        await capNhatChiNhanh(editingBranch.maChiNhanh, fd);
      } else {
        await taoChiNhanh(fd);
      }
      setShowModal(false);
      onRefreshBranches?.();
    } catch (err) {
      setThongBaoLoi(err.response?.data?.message || "Lỗi khi lưu chi nhánh!");
    }
  };

  const filtered = chi_nhanh.filter(
    (b) =>
      !search ||
      b.tenChiNhanh?.toLowerCase().includes(search.toLowerCase()) ||
      b.diaChi?.toLowerCase().includes(search.toLowerCase()) ||
      b.soDienThoai?.includes(search),
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
            {chi_nhanh.length} chi nhánh trong hệ thống
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
                "Số lượng đơn",
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
                key={b.maChiNhanh}
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
                    {b.tenChiNhanh}
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
                    <span className="max-w-[200px]">{b.diaChi || "—"}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center gap-1.5 text-xs font-mono"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <Phone size={12} /> {b.soDienThoai || "—"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div
                    className="flex items-center gap-1.5 text-xs font-600"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    <ShoppingBag size={12} /> {b.soLuongDon ?? 0} đơn
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleStatus(b)}
                    className="text-xs px-2.5 py-0.5 rounded-full font-600 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      background: b.trangThaiChiNhanh
                        ? "var(--success-bg)"
                        : "var(--warning-bg)",
                      color: b.trangThaiChiNhanh
                        ? "var(--success)"
                        : "var(--warning)",
                    }}
                    title="Nhấn để đổi trạng thái"
                  >
                    {b.trangThaiChiNhanh ? "Hoạt động" : "Tạm đóng"}
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
                      title="Đổi trạng thái chi nhánh"
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
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
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
