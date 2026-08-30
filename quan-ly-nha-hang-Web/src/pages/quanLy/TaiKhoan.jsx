import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  UserCheck,
  Shield,
} from "lucide-react";
import { BRANCH_OPTIONS } from "../../data/quanLyMock";
import {
  layDanhSachNguoiDung,
  taoNguoiDung,
  capNhatNguoiDung,
  doiTrangThaiNguoiDung,
  xoaNguoiDung,
} from "../../services/nguoiDung.service";
import { layDanhSachChiNhanh } from "../../services/chiNhanh.service";

const roleStyle = {
  ROLE_QUAN_LY: {
    bg: "rgba(212,150,43,0.12)",
    color: "var(--primary)",
    label: "Quản lý",
  },
  "Quản lý": {
    bg: "rgba(212,150,43,0.12)",
    color: "var(--primary)",
    label: "Quản lý",
  },
  ROLE_NHAN_VIEN: {
    bg: "var(--info-bg)",
    color: "var(--info)",
    label: "Nhân viên",
  },
  "Nhân viên": {
    bg: "var(--info-bg)",
    color: "var(--info)",
    label: "Nhân viên",
  },
  ROLE_ADMIN: {
    bg: "rgba(139,92,246,0.12)",
    color: "#8B5CF6",
    label: "Admin",
  },
  Admin: {
    bg: "rgba(139,92,246,0.12)",
    color: "#8B5CF6",
    label: "Admin",
  },
};

function Users() {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    hoTen: "",
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDienThoai: "",
    vaiTro: "ROLE_NHAN_VIEN",
    maChiNhanh: 1,
    trangThai: true,
  });

  const fetchUsers = async () => {
    try {
      const data = await layDanhSachNguoiDung();
      if (data) setUsers(data);
    } catch (e) {
      console.warn("Fetch users failed", e);
    }
  };

  useEffect(() => {
    fetchUsers();
    layDanhSachChiNhanh().then((res) => {
      if (res && res.length) setBranches(res);
    });
  }, []);

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      hoTen: "",
      taiKhoan: "",
      matKhau: "123456",
      email: "",
      soDienThoai: "",
      vaiTro: "ROLE_NHAN_VIEN",
      maChiNhanh: branches[0]?.maChiNhanh || 1,
      trangThai: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (u) => {
    setEditingUser(u);
    setFormData({
      hoTen: u.name,
      taiKhoan: u.username || u.name,
      matKhau: "",
      email: u.email,
      soDienThoai: u.phone || "",
      vaiTro: u.role?.startsWith("ROLE_")
        ? u.role
        : u.role === "Quản lý"
          ? "ROLE_QUAN_LY"
          : u.role === "Admin"
            ? "ROLE_ADMIN"
            : "ROLE_NHAN_VIEN",
      maChiNhanh: u.branchId || 1,
      trangThai: u.status === "Hoạt động",
    });
    setShowModal(true);
  };

  const handleToggleStatus = async (u) => {
    try {
      await doiTrangThaiNguoiDung(u.maNguoiDungId);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi đổi trạng thái tài khoản!");
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Bạn có chắc muốn xóa tài khoản ${user.name}?`)) return;
    if (user.maNguoiDungId) {
      try {
        await xoaNguoiDung(user.maNguoiDungId);
        fetchUsers();
      } catch (e) {
        console.error("Delete user failed:", e);
        alert("Lỗi khi xóa người dùng!");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await capNhatNguoiDung(editingUser.maNguoiDungId, formData);
      } else {
        await taoNguoiDung(formData);
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu thông tin tài khoản!");
    }
  };

  const filtered = users.filter((u) => {
    if (branchFilter && u.branch !== branchFilter) return false;
    if (
      search &&
      !u.name.toLowerCase().includes(search.toLowerCase()) &&
      !u.email.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

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
            Quản lý Tài khoản
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {users.length} tài khoản người dùng
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
          <Plus size={14} /> Thêm tài khoản
        </button>
      </div>

      <div className="flex items-center gap-3">
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
            placeholder="Tìm theo tên, email..."
            className="w-56 text-sm border rounded-lg pl-8 pr-3 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
            style={{
              borderColor: "var(--border)",
            }}
          />
        </div>
        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white font-medium"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <option value="">Tất cả chi nhánh</option>
          {BRANCH_OPTIONS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
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
                "Họ tên",
                "Email",
                "Vai trò",
                "Chi nhánh",
                "Ngày tham gia",
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
            {filtered.map((u) => {
              const rStyle = roleStyle[u.role] || roleStyle["ROLE_NHAN_VIEN"];
              return (
                <tr
                  key={u.id}
                  className="border-t hover:bg-[var(--secondary)] transition-colors"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 text-white shrink-0"
                        style={{
                          background: "var(--primary)",
                        }}
                      >
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span
                        className="text-sm font-600"
                        style={{
                          color: "var(--foreground)",
                        }}
                      >
                        {u.name}
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-xs font-mono"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {u.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-600"
                      style={{
                        background: rStyle.bg,
                        color: rStyle.color,
                      }}
                    >
                      {rStyle.label || u.role}
                    </span>
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {u.branch}
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {u.joinDate}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className="text-xs px-2 py-0.5 rounded-full font-600 cursor-pointer hover:opacity-80"
                      style={{
                        background:
                          u.status === "Hoạt động"
                            ? "var(--success-bg)"
                            : "var(--muted)",
                        color:
                          u.status === "Hoạt động"
                            ? "var(--success)"
                            : "var(--muted-foreground)",
                      }}
                      title="Nhấn để đổi trạng thái"
                    >
                      {u.status}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="text-xs font-600 hover:underline flex items-center gap-1"
                        style={{
                          color: "var(--primary)",
                        }}
                      >
                        <Edit2 size={12} /> Sửa
                      </button>
                      <button
                        className="text-xs font-600 hover:underline flex items-center gap-1 text-red-500"
                        onClick={() => handleDelete(u)}
                      >
                        <Trash2 size={12} /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Thêm / Sửa Tài khoản */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3.5 shadow-xl"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-700 flex items-center gap-2">
                <Shield size={16} style={{ color: "var(--primary)" }} />
                {editingUser ? "Sửa Tài Khoản" : "Thêm Tài Khoản Mới"}
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
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-600 mb-1">Họ và tên:</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.hoTen}
                    onChange={(e) =>
                      setFormData({ ...formData, hoTen: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-600 mb-1">Tên đăng nhập:</label>
                  <input
                    type="text"
                    required
                    placeholder="user123"
                    value={formData.taiKhoan}
                    onChange={(e) =>
                      setFormData({ ...formData, taiKhoan: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </div>

              {!editingUser && (
                <div>
                  <label className="block font-600 mb-1">Mật khẩu:</label>
                  <input
                    type="password"
                    required
                    placeholder="******"
                    value={formData.matKhau}
                    onChange={(e) =>
                      setFormData({ ...formData, matKhau: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-600 mb-1">Email:</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block font-600 mb-1">Số điện thoại:</label>
                  <input
                    type="text"
                    placeholder="0912345678"
                    value={formData.soDienThoai}
                    onChange={(e) =>
                      setFormData({ ...formData, soDienThoai: e.target.value })
                    }
                    className="w-full border rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-600 mb-1">Vai trò:</label>
                  <select
                    value={formData.vaiTro}
                    onChange={(e) =>
                      setFormData({ ...formData, vaiTro: e.target.value })
                    }
                    className="w-full border rounded-lg p-2 font-medium"
                  >
                    <option value="ROLE_NHAN_VIEN">Nhân viên</option>
                    <option value="ROLE_QUAN_LY">Quản lý chi nhánh</option>
                    <option value="ROLE_ADMIN">Admin chuỗi</option>
                  </select>
                </div>
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
                {editingUser ? "Cập nhật" : "Tạo tài khoản"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Users;
