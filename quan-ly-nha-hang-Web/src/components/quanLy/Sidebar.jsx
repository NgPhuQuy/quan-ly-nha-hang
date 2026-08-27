import {
  LayoutDashboard,
  FileText,
  Utensils,
  ArrowLeftRight,
  BarChart3,
  Settings,
  LogOut,
  ChefHat,
  Building2,
  Users,
  UserCircle,
  LayoutGrid,
  CalendarDays,
  Ticket,
  TableProperties,
} from "lucide-react";
const managerNav = [
  {
    id: "dashboard",
    label: "Tổng quan",
    icon: LayoutDashboard,
  },
  {
    id: "invoices",
    label: "Hóa đơn",
    icon: FileText,
  },
  {
    id: "food",
    label: "Món ăn",
    icon: Utensils,
  },
  {
    id: "tables",
    label: "Bàn",
    icon: TableProperties,
  },
  {
    id: "bookings",
    label: "Đặt lịch",
    icon: CalendarDays,
  },
  {
    id: "income-expense",
    label: "Thu chi",
    icon: ArrowLeftRight,
  },
  {
    id: "reports",
    label: "Báo cáo",
    icon: BarChart3,
  },
];
const adminNav = [
  {
    id: "dashboard",
    label: "Tổng quan",
    icon: LayoutDashboard,
  },
  {
    id: "branches",
    label: "Chi nhánh",
    icon: Building2,
  },
  {
    id: "users",
    label: "Tài khoản",
    icon: Users,
  },
  {
    id: "customers",
    label: "Khách hàng",
    icon: UserCircle,
  },
  {
    id: "food",
    label: "Món ăn",
    icon: Utensils,
  },
  {
    id: "categories",
    label: "Danh mục món",
    icon: LayoutGrid,
  },
  {
    id: "tables",
    label: "Bàn",
    icon: TableProperties,
  },
  {
    id: "invoices",
    label: "Hóa đơn",
    icon: FileText,
  },
  {
    id: "bookings",
    label: "Đặt lịch",
    icon: CalendarDays,
  },
  {
    id: "promotions",
    label: "Khuyến mãi",
    icon: Ticket,
  },
  {
    id: "income-expense",
    label: "Thu chi",
    icon: ArrowLeftRight,
  },
  {
    id: "reports",
    label: "Báo cáo",
    icon: BarChart3,
  },
];
function Sidebar({ activePage, role, onNavigate }) {
  const navItems = role === "admin" ? adminNav : managerNav;
  const activeNav = ["create-invoice", "invoice-detail"].includes(activePage)
    ? "invoices"
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
              {role === "admin" ? "Toàn hệ thống" : "Chi nhánh Quận 1"}
            </div>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeNav === id;
          return (
            <button
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
          onClick={() => onNavigate("settings")}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-500 transition-colors text-left"
          style={{
            background:
              activeNav === "settings" ? "var(--primary-light)" : "transparent",
            color:
              activeNav === "settings" ? "var(--primary)" : "var(--foreground)",
          }}
          onMouseEnter={(e) => {
            if (activeNav !== "settings")
              e.currentTarget.style.background = "var(--secondary)";
          }}
          onMouseLeave={(e) => {
            if (activeNav !== "settings")
              e.currentTarget.style.background = "transparent";
          }}
        >
          <Settings size={16} strokeWidth={1.8} />
          Cài đặt
        </button>
        <button
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
