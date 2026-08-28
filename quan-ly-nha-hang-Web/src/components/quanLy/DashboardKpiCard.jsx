export default function DashboardKpiCard({ label, value, sub, icon: Icon, color }) {
  return (
    <div
      className="bg-white rounded-xl p-4 border flex items-start gap-3"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}18` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div className="min-w-0">
        <div
          className="text-xs mb-0.5 truncate"
          style={{ color: "var(--muted-foreground)" }}
        >
          {label}
        </div>
        <div
          className="text-lg font-700 leading-tight"
          style={{ color: "var(--foreground)" }}
        >
          {value}
        </div>
        {sub && (
          <div
            className="text-xs mt-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}