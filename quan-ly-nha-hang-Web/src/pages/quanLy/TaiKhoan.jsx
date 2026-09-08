import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import {
  layDanhSachNguoiDung,
  doiTrangThaiNguoiDung,
} from "../../services/nguoiDung.service";
import apis, { endpoints } from "../../services/apis";
import ModalNguoiDung from "../../components/quanLy/taiKhoan/ModalNguoiDung";

const roleStyle = {
  QUAN_LY: {
    bg: "rgba(212,150,43,0.12)",
    color: "var(--primary)",
    label: "Quản lý",
  },
  ROLE_QUAN_LY: {
    bg: "rgba(212,150,43,0.12)",
    color: "var(--primary)",
    label: "Quản lý",
  },
  NHAN_VIEN: {
    bg: "var(--info-bg)",
    color: "var(--info)",
    label: "Nhân viên",
  },
  ROLE_NHAN_VIEN: {
    bg: "var(--info-bg)",
    color: "var(--info)",
    label: "Nhân viên",
  },
  ADMIN: {
    bg: "rgba(139,92,246,0.12)",
    color: "#8B5CF6",
    label: "Admin",
  },
  ROLE_ADMIN: {
    bg: "rgba(139,92,246,0.12)",
    color: "#8B5CF6",
    label: "Admin",
  },
  KHACH_HANG: {
    bg: "rgba(16,185,129,0.12)",
    color: "#10B981",
    label: "Khách hàng",
  },
};

function Users({ branches = [] }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [users, setUsers] = useState([]);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [thongBaoLoi, setThongBaoLoi] = useState("");
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
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.warn("Fetch users failed", e);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAdd = () => {
    setEditingUser(null);
    setThongBaoLoi("");
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
    setThongBaoLoi("");
    const hoTen = [u.ho, u.ten].filter(Boolean).join(" ").trim();
    setFormData({
      hoTen: hoTen || u.taiKhoan,
      taiKhoan: u.taiKhoan,
      matKhau: "",
      email: u.email || "",
      soDienThoai: u.soDienThoai || "",
      vaiTro: u.vaiTro || "ROLE_NHAN_VIEN",
      maChiNhanh: branches[0]?.maChiNhanh || 1,
      trangThai: u.trangThai,
    });
    setShowModal(true);
  };

  const handleToggleStatus = async (u) => {
    try {
      await doiTrangThaiNguoiDung(u.maNguoiDung);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi đổi trạng thái tài khoản!");
    }
  };

  const handleDelete = async (user) => {
    const hoTen = [user.ho, user.ten].filter(Boolean).join(" ") || user.taiKhoan;
    if (!window.confirm(`Bạn có chắc muốn đổi trạng thái tài khoản ${hoTen}?`)) return;
    try {
      await doiTrangThaiNguoiDung(user.maNguoiDung);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi cập nhật trạng thái người dùng!");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setThongBaoLoi("");
    try {
      if (editingUser) {
        await doiTrangThaiNguoiDung(editingUser.maNguoiDung);
      } else {
        await apis.post(endpoints.dang_ky, formData);
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setThongBaoLoi(err.response?.data?.message || "Lỗi khi lưu thông tin tài khoản!");
    }
  };

  const filtered = users.filter((u) => {
    if (roleFilter && u.vaiTro !== roleFilter) return false;
    if (search) {
      const hoTen = [u.ho, u.ten].filter(Boolean).join(" ").toLowerCase();
      const q = search.toLowerCase();
      if (
        !hoTen.includes(q) &&
        !u.taiKhoan?.toLowerCase().includes(q) &&
        !u.email?.toLowerCase().includes(q) &&
        !u.soDienThoai?.includes(q)
      ) {
        return false;
      }
    }
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
            placeholder="Tìm theo tên, email, sđt..."
            className="w-56 text-sm border rounded-lg pl-8 pr-3 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
            style={{
              borderColor: "var(--border)",
            }}
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white font-medium"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <option value="">Tất cả vai trò</option>
          <option value="ROLE_ADMIN">Quản trị viên (Admin)</option>
          <option value="ROLE_QUAN_LY">Quản lý chi nhánh</option>
          <option value="ROLE_NHAN_VIEN">Nhân viên POS</option>
          <option value="ROLE_KHACH_HANG">Khách hàng</option>
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
                "Tài khoản / Họ tên",
                "Email",
                "Số điện thoại",
                "Vai trò",
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
              const hoTen = [u.ho, u.ten].filter(Boolean).join(" ").trim() || u.taiKhoan;
              const rStyle = roleStyle[u.vaiTro] || roleStyle["ROLE_NHAN_VIEN"];
              return (
                <tr
                  key={u.maNguoiDung}
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
                        {hoTen.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span
                          className="text-sm font-600 block leading-tight"
                          style={{
                            color: "var(--foreground)",
                          }}
                        >
                          {hoTen}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          @{u.taiKhoan}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td
                    className="px-4 py-3 text-xs font-mono"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {u.email || "—"}
                  </td>
                  <td
                    className="px-4 py-3 text-xs font-mono"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {u.soDienThoai || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-600"
                      style={{
                        background: rStyle.bg,
                        color: rStyle.color,
                      }}
                    >
                      {rStyle.label || u.vaiTro}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className="text-xs px-2 py-0.5 rounded-full font-600 cursor-pointer hover:opacity-80"
                      style={{
                        background:
                          u.trangThai
                            ? "var(--success-bg)"
                            : "var(--muted)",
                        color:
                          u.trangThai
                            ? "var(--success)"
                            : "var(--muted-foreground)",
                      }}
                      title="Nhấn để đổi trạng thái"
                    >
                      {u.trangThai ? "Hoạt động" : "Tạm khóa"}
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
                        title="Đổi trạng thái tài khoản"
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
        thongBaoLoi={thongBaoLoi}
      />
    </div>
  );
}

export default Users;
