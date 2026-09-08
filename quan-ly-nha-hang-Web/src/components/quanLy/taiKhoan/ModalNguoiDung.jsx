import { Shield, X } from "lucide-react";

function ModalNguoiDung({
  show,
  onClose,
  editingUser,
  formData,
  setFormData,
  branches,
  onSubmit,
  thongBaoLoi,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3.5 shadow-xl"
      >
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-sm font-700 flex items-center gap-2">
            <Shield size={16} style={{ color: "var(--primary)" }} />
            {editingUser ? "Sửa Tài Khoản" : "Thêm Tài Khoản Mới"}
          </h3>
          <button
            type="button"
            onClick={onClose}
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
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-600 border cursor-pointer hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-1.5 rounded-lg text-xs font-700 text-white cursor-pointer shadow-sm"
            style={{ background: "var(--primary)" }}
          >
            {editingUser ? "Cập Nhật" : "Tạo Mới"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalNguoiDung;
