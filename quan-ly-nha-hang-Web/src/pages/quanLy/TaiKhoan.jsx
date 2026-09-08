import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import {
  layDanhSachNguoiDung,
  doiTrangThaiNguoiDung,
} from "../../services/nguoiDung.service";
import apis, { endpoints } from "../../services/apis";
import { layDanhSachChiNhanh } from "../../services/chiNhanh.service";
import ModalNguoiDung from "../../components/quanLy/taiKhoan/ModalNguoiDung";

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
    if (!window.confirm(`Bạn có chắc muốn đổi trạng thái tài khoản ${user.name}?`)) return;
    const id = user.maNguoiDungId || user.maNguoiDung || user.id;
    if (id) {
      try {
        await doiTrangThaiNguoiDung(id);
        fetchUsers();
      } catch (e) {
        console.error("Change user status failed:", e);
        alert("Lỗi khi cập nhật trạng thái người dùng!");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Cập nhật trạng thái nếu có
        const id = editingUser.maNguoiDungId || editingUser.maNguoiDung;
        await doiTrangThaiNguoiDung(id);
      } else {
        await apis.post(endpoints.dang_ky, formData);
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
          {branches.map((b) => {
            const name = b.tenChiNhanh || b.ten;
            return (
              <option key={b.maChiNhanh || b.id || name} value={name}>
                {name}
              </option>
            );
          })}
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
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(u)}
                        className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100/60 transition-colors cursor-pointer"
                        title="Sửa tài khoản"
                      >
                        <Edit2 size={16} strokeWidth={2} />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Xóa tài khoản"
                        onClick={() => handleDelete(u)}
                      >
                        <Trash2 size={16} strokeWidth={2} />
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
      <ModalNguoiDung
        show={showModal}
        onClose={() => setShowModal(false)}
        editingUser={editingUser}
        formData={formData}
        setFormData={setFormData}
        branches={branches}
        onSubmit={handleSave}
      />
    </div>
  );
}

export default Users;
