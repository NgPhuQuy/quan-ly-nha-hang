import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import {
  TrendingUp,
  FileText,
  DollarSign,
  Wallet,
  PiggyBank,
} from "lucide-react";
import {
  revenueByDay,
  revenueBySource,
  formatCurrency,
  formatCurrencyShort,
  mockInvoices,
} from "../../data/posMock";
const MONTHS = ["Th\xE1ng 1/2025", "Th\xE1ng 12/2024", "Th\xE1ng 11/2024"];
const PIE_COLORS = ["#C8862A", "#E8C080"];
const incomeVsExpense = revenueByDay.map((d, i) => ({
  date: d.date,
  Thu: d.revenue,
  Chi: [42e4, 38e4, 51e4, 46e4, 49e4, 35e4, 62e4, 44e4][i],
}));
export default function BaoCao() {
  const [month, setMonth] = useState("Th\xE1ng 1/2025");
  const totalRevenue = revenueByDay.reduce((s, d) => s + d.revenue, 0);
  const totalInvoices = revenueByDay.reduce((s, d) => s + d.invoices, 0);
  const totalIncome = 144e5;
  const totalExpense = 82e5;
  const profit = totalIncome - totalExpense;
  const tooltipStyle = {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: 8,
    fontSize: 12,
  };
  const kpis = [
    {
      label: "T\u1ED5ng doanh thu",
      value: formatCurrencyShort(totalRevenue),
      icon: TrendingUp,
      color: "#C8862A",
    },
    {
      label: "T\u1ED5ng h\xF3a \u0111\u01A1n",
      value: `${totalInvoices}`,
      icon: FileText,
      color: "#7C3AED",
    },
    {
      label: "T\u1ED5ng thu",
      value: formatCurrencyShort(totalIncome),
      icon: DollarSign,
      color: "#059669",
    },
    {
      label: "T\u1ED5ng chi",
      value: formatCurrencyShort(totalExpense),
      icon: Wallet,
      color: "#DC2626",
    },
    {
      label: "L\u1EE3i nhu\u1EADn",
      value: formatCurrencyShort(profit),
      icon: PiggyBank,
      color: "#059669",
    },
  ];
  return (
    <div className="p-6 flex flex-col gap-5 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-base font-700"
            style={{ color: "var(--foreground)" }}
          >
            Báo cáo doanh thu
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            Thống kê chi nhánh theo tháng
          </p>
        </div>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="text-sm border rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
          style={{ borderColor: "var(--border)" }}
        >
          {MONTHS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl border p-4 flex items-start gap-3"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${color}18` }}
            >
              <Icon size={17} style={{ color }} />
            </div>
            <div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                {label}
              </div>
              <div
                className="text-lg font-700"
                style={{ color: "var(--foreground)" }}
              >
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div
          className="col-span-2 bg-white rounded-xl border p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="text-sm font-600 mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Doanh thu theo ngày
          </div>
          <div
            className="text-xs mb-4"
            style={{ color: "var(--muted-foreground)" }}
          >
            {month}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={revenueByDay}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            >
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
              <Bar dataKey="revenue" fill="#C8862A" radius={[4, 4, 0, 0]} />
            </BarChart>
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
            Doanh thu theo kênh
          </div>
          <div
            className="text-xs mb-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            {month}
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={revenueBySource}
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={66}
                paddingAngle={3}
                dataKey="value"
              >
                {revenueBySource.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v) => [formatCurrency(v)]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-2">
            {revenueBySource.map((s, i) => (
              <div
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
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="bg-white rounded-xl border p-4"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="text-sm font-600 mb-1"
          style={{ color: "var(--foreground)" }}
        >
          Thu – Chi theo ngày
        </div>
        <div
          className="text-xs mb-4"
          style={{ color: "var(--muted-foreground)" }}
        >
          So sánh thu và chi mỗi ngày
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={incomeVsExpense}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="thuGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="chiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
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
              formatter={(v, name) => [formatCurrency(v), name]}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="Thu"
              stroke="#059669"
              strokeWidth={2}
              fill="url(#thuGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="Chi"
              stroke="#DC2626"
              strokeWidth={2}
              fill="url(#chiGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div
        className="bg-white rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="px-5 py-3 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="text-sm font-600"
            style={{ color: "var(--foreground)" }}
          >
            Tóm tắt hóa đơn
          </div>
        </div>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--secondary)" }}>
            <tr>
              {[
                "M\xE3 h\xF3a \u0111\u01A1n",
                "Th\u1EDDi gian",
                "Ngu\u1ED3n",
                "T\u1ED5ng ti\u1EC1n",
                "Tr\u1EA1ng th\xE1i",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-600"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockInvoices.slice(0, 6).map((inv) => (
              <tr
                key={inv.id}
                className="border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <td
                  className="px-4 py-2.5 text-xs font-600"
                  style={{ color: "var(--primary)" }}
                >
                  {inv.id}
                </td>
                <td
                  className="px-4 py-2.5 text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {inv.createdAt}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className="text-xs px-2 py-0.5 rounded-md font-500"
                    style={{
                      background:
                        inv.source === "ONLINE" ? "#EFF6FF" : "#F0FDF4",
                      color: inv.source === "ONLINE" ? "#2563EB" : "#16A34A",
                    }}
                  >
                    {inv.source === "ONLINE" ? "Online" : "T\u1EA1i qu\u1EA7y"}
                  </span>
                </td>
                <td
                  className="px-4 py-2.5 text-xs font-600"
                  style={{ color: "var(--foreground)" }}
                >
                  {formatCurrency(inv.total)}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className="text-xs px-2 py-0.5 rounded-md font-500"
                    style={{
                      background:
                        inv.status === "Ho\xE0n th\xE0nh"
                          ? "#F0FDF4"
                          : inv.status === "Ch\u1EDD x\u1EED l\xFD"
                            ? "#FFFBEB"
                            : "#FEF2F2",
                      color:
                        inv.status === "Ho\xE0n th\xE0nh"
                          ? "#16A34A"
                          : inv.status === "Ch\u1EDD x\u1EED l\xFD"
                            ? "#D97706"
                            : "#DC2626",
                    }}
                  >
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
