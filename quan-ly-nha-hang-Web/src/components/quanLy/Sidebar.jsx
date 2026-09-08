import {
  LayoutDashboard,
  FileText,
  Utensils,
  BarChart3,
  Settings,
  LogOut,
  ChefHat,
  Building2,
  Users,
  UserCircle,
  CalendarDays,
  TableProperties,
} from "lucide-react";
const adminNav = [
  {
    id: "tong_quan",
    label: "Tổng quan",
    icon: LayoutDashboard,
  },
  {
    id: "chi_nhanh",
    label: "Chi nhánh",
    icon: Building2,
  },
  {
    id: "tai_khoan",
    label: "Tài khoản",
    icon: Users,
  },
  {
    id: "khach_hang",
    label: "Khách hàng",
    icon: UserCircle,
  },
  {
    id: "mon_an",
    label: "Món ăn",
    icon: Utensils,
  },
  {
    id: "ban",
    label: "Bàn",
    icon: TableProperties,
  },
  {
    id: "hoa_don",
    label: "Hóa đơn",
    icon: FileText,
  },
  {
    id: "dat_lich",
    label: "Đặt lịch",
    icon: CalendarDays,
  },
  {
    id: "bao_cao",
    label: "Báo cáo",
    icon: BarChart3,
  },
];
function Sidebar({ activePage, onNavigate, onDangXuat }) {
  const activeNav = ["tao_hoa_don", "chi_tiet_hoa_don"].includes(activePage)
    ? "hoa_don"
    : activePage;
  return (
    <aside
      className="w-60 shrink-0 flex flex-col bg-white border-r h-full"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <div
        className="px-4 py-4 border-b"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: "var(--primary)",
            }}
          >
            <ChefHat size={16} color="white" />
          </div>
          <div className="min-w-0">
            <div
              className="text-sm font-700 truncate"
              style={{
                color: "var(--foreground)",
              }}
            >
              Nhà Hàng Vị Việt
            </div>
            <div
              className="text-xs truncate"
              style={{
                color: "var(--muted-foreground)",
              }}
            >
              Hệ thống quản lý
            </div>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {adminNav.map(({ id, label, icon: Icon }) => {
          const isActive = activeNav === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-500 transition-colors text-left"
              style={{
                background: isActive ? "var(--primary-light)" : "transparent",
                color: isActive ? "var(--primary)" : "var(--foreground)",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.background = "var(--secondary)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
              {label}
            </button>
          );
        })}
      </nav>
      <div
        className="px-3 pb-3 pt-3 border-t flex flex-col gap-0.5"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <button
          type="button"
          onClick={() => onNavigate("cai_dat")}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-500 transition-colors text-left"
          style={{
            background:
              activeNav === "cai_dat" ? "var(--primary-light)" : "transparent",
            color:
              activeNav === "cai_dat" ? "var(--primary)" : "var(--foreground)",
          }}
          onMouseEnter={(e) => {
            if (activeNav !== "cai_dat")
              e.currentTarget.style.background = "var(--secondary)";
          }}
          onMouseLeave={(e) => {
            if (activeNav !== "cai_dat")
              e.currentTarget.style.background = "transparent";
          }}
        >
          <Settings size={16} strokeWidth={1.8} />
          Cài đặt
        </button>
        <button
          type="button"
          onClick={onDangXuat}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-500 transition-colors text-left"
          style={{
            color: "var(--danger)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--danger-bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <LogOut size={16} strokeWidth={1.8} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
export { Sidebar as default };
