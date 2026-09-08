import { Bell, ChevronDown, Building2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Header({
  title,
  selectedBranchId,
  onSelectBranch,
  chi_nhanh = [],
  loadingBranches = false,
}) {
  const { nguoiDung } = useAuth();
  const now = new Date();
  const dateStr = now.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const hoTen = [nguoiDung?.ho, nguoiDung?.ten].filter(Boolean).join(" ").trim();
  const tenHienThi = hoTen || nguoiDung?.taiKhoan || "Người dùng";
  const tenVietTat = tenHienThi.slice(0, 2).toUpperCase();
  const tenVaiTro = nguoiDung?.vaiTro || "Thành viên";

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
      <div className="flex items-center gap-3">
        {/* Khung chọn chi nhánh */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold bg-white shadow-xs"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <Building2 size={15} style={{ color: "var(--primary)" }} />
          <select
            value={selectedBranchId || ""}
            onChange={(e) => onSelectBranch?.(e.target.value)}
            disabled={loadingBranches || chi_nhanh.length === 0}
            className="bg-transparent outline-none cursor-pointer text-xs font-600 pr-1"
            style={{
              color: "var(--foreground)",
            }}
            title="Chi nhánh đang làm việc"
          >
            {loadingBranches && <option value="">Đang tải chi nhánh...</option>}
            {!loadingBranches && chi_nhanh.length === 0 && (
              <option value="">Không có chi nhánh</option>
            )}
            {chi_nhanh.map((b) => (
              <option key={b.maChiNhanh} value={b.maChiNhanh}>
                {b.tenChiNhanh}
              </option>
            ))}
          </select>
        </div>

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
