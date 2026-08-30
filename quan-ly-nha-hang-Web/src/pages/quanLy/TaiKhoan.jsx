import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { mockUsers, BRANCH_OPTIONS } from "../../data/quanLyMock";
import {
  layDanhSachNguoiDung,
  xoaNguoiDung,
} from "../../services/nguoiDung.service";
const roleStyle = {
  "Quản lý": {
    bg: "rgba(212,150,43,0.12)",
    color: "var(--primary)",
  },
  "Nhân viên": {
    bg: "var(--info-bg)",
    color: "var(--info)",
  },
  Admin: {
    bg: "rgba(139,92,246,0.12)",
    color: "#8B5CF6",
  },
};
function Users() {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [users, setUsers] = useState(mockUsers);

  useEffect(() => {
    layDanhSachNguoiDung().then((data) => {
      if (data && data.length > 0) {
        setUsers(data);
      }
    });
  }, []);

  const handleDelete = async (user) => {
    if (user.maNguoiDungId) {
      try {
        await xoaNguoiDung(user.maNguoiDungId);
      } catch (e) {
        console.warn("Delete user API failed:", e);
      }
    }
    setUsers((prev) => prev.filter((x) => x.id !== user.id));
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
            Tài khoản
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {users.length} tài khoản
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-600 hover:opacity-90"
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
            className="w-52 text-sm border rounded-lg pl-8 pr-3 py-1.5 outline-none bg-white"
            style={{
              borderColor: "var(--border)",
            }}
          />
        </div>
        <select
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
          className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <option value="">Tất cả chi nhánh</option>
          {BRANCH_OPTIONS.map((b) => (
            <option>{b}</option>
          ))}
        </select>
      </div>
      <div
        className="bg-white rounded-xl border overflow-hidden"
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
            {filtered.map((u) => (
              <tr
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
                      {u.name.charAt(0)}
                    </div>
                    <span
                      className="text-sm font-500"
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      {u.name}
                    </span>
                  </div>
                </td>
                <td
                  className="px-4 py-3 text-xs"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {u.email}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-500"
                    style={{
                      background: roleStyle[u.role].bg,
                      color: roleStyle[u.role].color,
                    }}
                  >
                    {u.role}
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
                  <span
                    className="text-xs px-2 py-0.5 rounded font-500"
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
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
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
                      onClick={() => handleDelete(u)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export { Users as default };
