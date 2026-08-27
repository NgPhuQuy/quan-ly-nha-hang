import {
  LayoutDashboard,
  FileText,
  Utensils,
  ArrowLeftRight,
  BarChart3,
  Settings,
  LogOut,
  ChefHat,
} from "lucide-react";
const navItems = [
  { id: "dashboard", label: "T\u1ED5ng quan", icon: LayoutDashboard },
  { id: "invoices", label: "H\xF3a \u0111\u01A1n", icon: FileText },
  { id: "food", label: "M\xF3n \u0103n", icon: Utensils },
  { id: "income-expense", label: "Thu chi", icon: ArrowLeftRight },
  { id: "reports", label: "B\xE1o c\xE1o", icon: BarChart3 },
];
export default function Sidebar({ activePage, onNavigate }) {
  const activeNav = ["create-invoice", "invoice-detail"].includes(activePage)
    ? "invoices"
    : activePage;
  return (
    <aside
      className="w-60 shrink-0 flex flex-col bg-white border-r h-full"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="px-5 py-5 flex items-center gap-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "var(--primary)" }}
        >
          <ChefHat size={18} color="white" />
        </div>
        <div>
          <div
            className="text-sm font-700 leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            Nhà Hàng Vị Việt
          </div>
          <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Chi nhánh Quận 1
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        <div
          className="text-xs font-600 px-3 mb-2 uppercase tracking-wider"
          style={{ color: "var(--muted-foreground)" }}
        >
          Menu
        </div>
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeNav === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-500 transition-all text-left"
              style={{
                background: isActive
                  ? "rgba(200, 134, 42, 0.12)"
                  : "transparent",
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
              <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
              {label}
            </button>
          );
        })}
      </nav>

      <div
        className="px-3 pb-4 flex flex-col gap-0.5 border-t pt-3"
        style={{ borderColor: "var(--border)" }}
      >
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-500 transition-all text-left"
          style={{ color: "var(--foreground)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <Settings size={17} strokeWidth={1.8} />
          Cài đặt
        </button>
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-500 transition-all text-left"
          style={{ color: "#DC2626" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FEF2F2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <LogOut size={17} strokeWidth={1.8} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
