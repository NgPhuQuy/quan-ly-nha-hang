import {
  TrendingUp,
  FileText,
  DollarSign,
  Wallet,
  PiggyBank,
  ArrowUpRight
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  revenueByDay,
  revenueBySource,
  mockInvoices,
  expenseByCategory,
  formatCurrency,
  formatCurrencyShort
} from "../../data/pos/data";
const PIE_COLORS = ["#C8862A", "#E8C080"];
function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  color
}) {
  return <div
    className="bg-white rounded-xl p-4 border flex items-start gap-3"
    style={{ borderColor: "var(--border)" }}
  >
      <div
    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
    style={{ background: `${color}18` }}
  >
        <Icon size={17} style={{ color }} />
      </div>
      <div className="min-w-0">
        <div
    className="text-xs mb-0.5"
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
        {sub && <div
    className="text-xs mt-0.5 flex items-center gap-1"
    style={{ color: "var(--muted-foreground)" }}
  >
            {sub}
          </div>}
      </div>
    </div>;
}
const statusBadge = {
  "Ho\xE0n th\xE0nh": "#16A34A",
  "Ch\u1EDD x\u1EED l\xFD": "#D97706",
  "\u0110\xE3 h\u1EE7y": "#DC2626"
};
export default function Dashboard({ onNavigate }) {
  const totalRevenue = revenueByDay.reduce((s, d) => s + d.revenue, 0);
  const totalInvoices = revenueByDay.reduce((s, d) => s + d.invoices, 0);
  const totalIncome = 144e5;
  const totalExpense = 82e5;
  const profit = totalIncome - totalExpense;
  const tooltipStyle = {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12
  };
  return <div className="p-6 flex flex-col gap-5 min-h-0 overflow-y-auto">
      <div className="grid grid-cols-5 gap-3">
        <KpiCard
    label="Tổng doanh thu"
    value={formatCurrencyShort(totalRevenue)}
    sub="Tháng 1/2025"
    icon={TrendingUp}
    color="#C8862A"
  />
        <KpiCard
    label="Tổng hóa đơn"
    value={`${totalInvoices}`}
    sub="Đã xử lý"
    icon={FileText}
    color="#7C3AED"
  />
        <KpiCard
    label="Tổng thu"
    value={formatCurrencyShort(totalIncome)}
    sub="Mọi nguồn"
    icon={DollarSign}
    color="#059669"
  />
        <KpiCard
    label="Tổng chi"
    value={formatCurrencyShort(totalExpense)}
    sub="Mọi loại chi"
    icon={Wallet}
    color="#DC2626"
  />
        <KpiCard
    label="Lợi nhuận"
    value={formatCurrencyShort(profit)}
    sub={profit >= 0 ? "\u25B2 D\u01B0\u01A1ng" : "\u25BC \xC2m"}
    icon={PiggyBank}
    color={profit >= 0 ? "#059669" : "#DC2626"}
  />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div
    className="col-span-2 bg-white rounded-xl border p-4"
    style={{ borderColor: "var(--border)" }}
  >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div
    className="text-sm font-600"
    style={{ color: "var(--foreground)" }}
  >
                Doanh thu theo ngày
              </div>
              <div
    className="text-xs"
    style={{ color: "var(--muted-foreground)" }}
  >
                Tháng 1/2025
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
    data={revenueByDay}
    margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
  >
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C8862A" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#C8862A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
    dataKey="date"
    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
    axisLine={false}
    tickLine={false}
  />
              <YAxis
    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
    axisLine={false}
    tickLine={false}
    tickFormatter={(v) => `${(v / 1e6).toFixed(1)}tr`}
  />
              <Tooltip
    contentStyle={tooltipStyle}
    formatter={(v) => [formatCurrency(v), "Doanh thu"]}
  />
              <Area
    type="monotone"
    dataKey="revenue"
    stroke="#C8862A"
    strokeWidth={2}
    fill="url(#revGrad)"
    dot={false}
  />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
    className="bg-white rounded-xl border p-4"
    style={{ borderColor: "var(--border)" }}
  >
          <div
    className="text-sm font-600 mb-1"
    style={{ color: "var(--foreground)" }}
  >
            Theo nguồn
          </div>
          <div
    className="text-xs mb-3"
    style={{ color: "var(--muted-foreground)" }}
  >
            Doanh thu theo kênh
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
    data={revenueBySource}
    cx="50%"
    cy="50%"
    innerRadius={48}
    outerRadius={70}
    paddingAngle={3}
    dataKey="value"
  >
                {revenueBySource.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip
    contentStyle={tooltipStyle}
    formatter={(v) => [formatCurrency(v)]}
  />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {revenueBySource.map((s, i) => <div
    key={s.name}
    className="flex items-center justify-between text-xs"
  >
                <div className="flex items-center gap-2">
                  <span
    className="w-2.5 h-2.5 rounded-sm"
    style={{ background: PIE_COLORS[i] }}
  />
                  <span style={{ color: "var(--foreground)" }}>{s.label}</span>
                </div>
                <span
    className="font-600"
    style={{ color: "var(--foreground)" }}
  >
                  {formatCurrencyShort(s.value)}
                </span>
              </div>)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div
    className="col-span-2 bg-white rounded-xl border p-4"
    style={{ borderColor: "var(--border)" }}
  >
          <div className="flex items-center justify-between mb-3">
            <div
    className="text-sm font-600"
    style={{ color: "var(--foreground)" }}
  >
              Hóa đơn gần đây
            </div>
            <button
    className="text-xs font-500 flex items-center gap-1"
    style={{ color: "var(--primary)" }}
    onClick={() => onNavigate("invoices")}
  >
              Xem tất cả <ArrowUpRight size={12} />
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {[
    "M\xE3 h\xF3a \u0111\u01A1n",
    "Th\u1EDDi gian",
    "Ngu\u1ED3n",
    "T\u1ED5ng ti\u1EC1n",
    "Tr\u1EA1ng th\xE1i"
  ].map((h) => <th
    key={h}
    className="pb-2 text-left text-xs font-600"
    style={{ color: "var(--muted-foreground)" }}
  >
                    {h}
                  </th>)}
              </tr>
            </thead>
            <tbody>
              {mockInvoices.slice(0, 5).map((inv) => <tr
    key={inv.id}
    className="border-b last:border-0"
    style={{ borderColor: "var(--border)" }}
  >
                  <td
    className="py-2.5 font-600 text-xs"
    style={{ color: "var(--primary)" }}
  >
                    {inv.id}
                  </td>
                  <td
    className="py-2.5 text-xs"
    style={{ color: "var(--muted-foreground)" }}
  >
                    {inv.createdAt}
                  </td>
                  <td className="py-2.5">
                    <span
    className="text-xs px-2 py-0.5 rounded-md font-500"
    style={{
      background: inv.source === "ONLINE" ? "#EFF6FF" : "#F0FDF4",
      color: inv.source === "ONLINE" ? "#2563EB" : "#16A34A"
    }}
  >
                      {inv.source === "ONLINE" ? "Online" : "T\u1EA1i qu\u1EA7y"}
                    </span>
                  </td>
                  <td
    className="py-2.5 text-xs font-600"
    style={{ color: "var(--foreground)" }}
  >
                    {formatCurrency(inv.total)}
                  </td>
                  <td className="py-2.5">
                    <span
    className="text-xs px-2 py-0.5 rounded-md font-500"
    style={{
      background: `${statusBadge[inv.status]}18`,
      color: statusBadge[inv.status]
    }}
  >
                      {inv.status}
                    </span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>

        <div
    className="bg-white rounded-xl border p-4"
    style={{ borderColor: "var(--border)" }}
  >
          <div
    className="text-sm font-600 mb-3"
    style={{ color: "var(--foreground)" }}
  >
            Chi phí tháng này
          </div>
          <div className="flex flex-col gap-3">
            {expenseByCategory.map((item) => <div key={item.category}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span style={{ color: "var(--foreground)" }}>
                    {item.category}
                  </span>
                  <span
    className="font-600"
    style={{ color: "var(--foreground)" }}
  >
                    {item.pct}%
                  </span>
                </div>
                <div
    className="h-1.5 rounded-full overflow-hidden"
    style={{ background: "var(--muted)" }}
  >
                  <div
    className="h-full rounded-full"
    style={{
      width: `${item.pct}%`,
      background: "var(--primary)"
    }}
  />
                </div>
                <div
    className="text-xs mt-0.5"
    style={{ color: "var(--muted-foreground)" }}
  >
                  {formatCurrency(item.amount)}
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}
