import { useState, useEffect } from "react";
import { Search, User } from "lucide-react";
import { layDanhSachNguoiDung } from "../../services/nguoiDung.service";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [dangTai, setDangTai] = useState(false);
  const [loi, setLoi] = useState(null);

  useEffect(() => {
    const taiDanhSach = async () => {
      setDangTai(true);
      setLoi(null);
      try {
        const data = await layDanhSachNguoiDung();
        if (Array.isArray(data)) {
          // Lọc danh sách khách hàng (hoặc hiển thị tất cả nếu chưa gán role)
          const khachHangs = data.filter(
            (u) => !u.vaiTro || u.vaiTro === "KHACH_HANG"
          );
          setCustomers(khachHangs);
        }
      } catch (err) {
        setLoi(
          err.response?.data?.message ||
            err.message ||
            "Không thể tải danh sách khách hàng!"
        );
      } finally {
        setDangTai(false);
      }
    };
    taiDanhSach();
  }, []);

  const filtered = customers.filter((c) => {
    const hoTen = `${c.ho || ""} ${c.ten || ""}`.trim().toLowerCase();
    const s = search.toLowerCase();
    return (
      !search ||
      hoTen.includes(s) ||
      (c.taiKhoan && c.taiKhoan.toLowerCase().includes(s)) ||
      (c.soDienThoai && c.soDienThoai.includes(search)) ||
      (c.email && c.email.toLowerCase().includes(s))
    );
  });

  return (
    <div className="p-5 flex flex-col gap-4">
      {loi && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
          {loi}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-base font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Khách hàng
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            {customers.length} khách hàng trong hệ thống
          </p>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--muted-foreground)" }}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên, tài khoản, SĐT..."
          className="w-full text-sm border rounded-lg pl-8 pr-3 py-1.5 outline-none bg-white"
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      <div
        className="bg-white rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        <table className="w-full text-sm">
          <thead style={{ background: "var(--secondary)" }}>
            <tr>
              {[
                "Mã KH",
                "Họ và tên",
                "Tài khoản",
                "Số điện thoại",
                "Email",
                "Trạng thái",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-semibold"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dangTai ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-xs text-muted-foreground"
                >
                  Đang tải danh sách khách hàng...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-xs text-muted-foreground"
                >
                  Không tìm thấy khách hàng nào
                </td>
              </tr>
            ) : (
              filtered.map((c) => {
                const hoTen = `${c.ho || ""} ${c.ten || ""}`.trim() || c.taiKhoan;
                return (
                  <tr
                    key={c.maNguoiDung}
                    className="border-t hover:bg-[var(--secondary)] transition-colors"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td
                      className="px-4 py-3 text-xs font-semibold"
                      style={{ color: "var(--primary)" }}
                    >
                      #{c.maNguoiDung}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: "var(--muted-foreground)" }}
                        >
                          {hoTen.charAt(0).toUpperCase()}
                        </div>
                        <span
                          className="text-sm font-medium"
                          style={{ color: "var(--foreground)" }}
                        >
                          {hoTen}
                        </span>
                      </div>
                    </td>
                    <td
                      className="px-4 py-3 text-xs font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {c.taiKhoan}
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--foreground)" }}
                    >
                      {c.soDienThoai || "—"}
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {c.email || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded font-medium"
                        style={{
                          background: c.trangThai
                            ? "var(--success-bg)"
                            : "var(--danger-bg)",
                          color: c.trangThai
                            ? "var(--success)"
                            : "var(--danger)",
                        }}
                      >
                        {c.trangThai ? "Hoạt động" : "Khóa"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
