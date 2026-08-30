import { Bell, ChevronDown } from "lucide-react";
import { layNguoiDungHienTai } from "../../services/xacThuc.service";

function Header({ title, role }) {
  const nguoiDung = layNguoiDungHienTai();
  const now = new Date();
  const dateStr = now.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const tenHienThi = nguoiDung?.hoTen || nguoiDung?.taiKhoan || (role === "admin" ? "Admin 5S" : "Quản lý 5S");
  const tenVietTat = tenHienThi.slice(0, 2).toUpperCase();
  const tenVaiTro = nguoiDung?.vaiTro === "ADMIN" ? "Quản trị viên" : nguoiDung?.vaiTro === "QUANLY" ? "Quản lý chi nhánh" : nguoiDung?.vaiTro === "NHANVIEN" ? "Nhân viên POS" : (role === "admin" ? "Quản trị viên" : "Quản lý");

  return (
    <header
      className="h-13 shrink-0 flex items-center justify-between px-6 bg-white border-b"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <div>
        <h1
          className="text-sm font-700 leading-tight"
          style={{
            color: "var(--foreground)",
          }}
        >
          {title}
        </h1>
        <div
          className="text-xs"
          style={{
            color: "var(--muted-foreground)",
          }}
        >
          {dateStr}
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <button className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--secondary)] transition-colors">
          <Bell
            size={15}
            style={{
              color: "var(--muted-foreground)",
            }}
          />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--primary)",
            }}
          />
        </button>
        <div
          className="flex items-center gap-2 pl-3 border-l cursor-pointer"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 text-white shrink-0"
            style={{
              background: "var(--primary)",
            }}
          >
            {tenVietTat}
          </div>
          <div>
            <div
              className="text-xs font-600 leading-tight"
              style={{
                color: "var(--foreground)",
              }}
            >
              {tenHienThi}
            </div>
            <div
              className="text-xs leading-tight"
              style={{
                color: "var(--muted-foreground)",
              }}
            >
              {tenVaiTro}
            </div>
          </div>
          <ChevronDown
            size={13}
            style={{
              color: "var(--muted-foreground)",
            }}
          />
        </div>
      </div>
    </header>
  );
}
export { Header as default };
