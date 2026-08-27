import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, Badge } from "../../components/admin";
import {
  revenueByMonth,
  revenueByBranch,
  revenueBySource,
  invoices,
  branches,
} from "../../data/admin/mockData";
function fmt(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + " t\u1EF7";
  if (n >= 1e6) return (n / 1e6).toFixed(0) + " tr";
  return n.toLocaleString("vi-VN");
}
function KpiCard({ label, value, sub, trend, accent }) {
  return (
    <Card style={{ padding: "18px 20px" }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "#7a6248",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: accent ? "#c9922a" : "#2c1a0e",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12.5, color: "#7a6248", marginTop: 4 }}>
          {sub}
        </div>
      )}
      {trend && (
        <div
          style={{
            fontSize: 12,
            color: "#15803d",
            marginTop: 6,
            fontWeight: 600,
          }}
        >
          ↑ {trend} so với tháng trước
        </div>
      )}
    </Card>
  );
}
const branchPerf = branches.map((b, i) => ({
  name: b.name.replace("Chi nh\xE1nh ", "CN "),
  revenue: b.revenue,
  invoices: [42, 31, 58, 0, 38][i],
  expenses: [65e6, 48e6, 72e6, 0, 55e6][i],
  profit: b.revenue - [65e6, 48e6, 72e6, 0, 55e6][i],
}));
export default function Dashboard() {
  const totalRevenue = branches.reduce((s, b) => s + b.revenue, 0);
  const totalExpenses = 24e7;
  const totalIncome = 312e6;
  return (
    <div style={{ padding: "28px 32px", maxWidth: 1400 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{ fontSize: 22, fontWeight: 700, color: "#2c1a0e", margin: 0 }}
        >
          Tổng quan hệ thống
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "#7a6248" }}>
          Tháng 6, 2024 · Toàn bộ chi nhánh
        </p>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <KpiCard
          label="Tổng doanh thu"
          value={fmt(totalRevenue)}
          sub="Tất cả chi nhánh"
          trend="8.4%"
          accent
        />
        <KpiCard label="Chi nhánh hoạt động" value="4" sub="1 tạm dừng" />
        <KpiCard
          label="Tổng hóa đơn"
          value="1,842"
          sub="Tháng này"
          trend="5.2%"
        />
        <KpiCard
          label="Khách hàng"
          value="1,248"
          sub="Tổng đăng ký"
          trend="12.1%"
        />
        <KpiCard label="Tổng thu" value={fmt(totalIncome)} sub="Tháng 6" />
        <KpiCard label="Tổng chi" value={fmt(totalExpenses)} sub="Tháng 6" />
        <KpiCard
          label="Lợi nhuận"
          value={fmt(totalIncome - totalExpenses)}
          sub="Chênh lệch"
          accent
        />
      </div>

      {/* Row 1: Revenue chart + Source pie */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card style={{ padding: "20px 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#2c1a0e" }}>
                Doanh thu toàn hệ thống
              </div>
              <div style={{ fontSize: 12.5, color: "#7a6248" }}>
                So sánh với mục tiêu
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueByMonth} margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#7a6248" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => fmt(v)}
                tick={{ fontSize: 11, fill: "#7a6248" }}
                axisLine={false}
                tickLine={false}
                width={62}
              />
              <Tooltip
                formatter={(v) => [fmt(Number(v)) + " \u0111", ""]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "1px solid #e5ddd0",
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#c9922a"
                strokeWidth={2.5}
                dot={{ r: 3.5, fill: "#c9922a" }}
                name="Doanh thu"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#e5ddd0"
                strokeWidth={1.5}
                strokeDasharray="5 3"
                dot={false}
                name="Mục tiêu"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ padding: "20px 20px" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#2c1a0e",
              marginBottom: 4,
            }}
          >
            Nguồn doanh thu
          </div>
          <div style={{ fontSize: 12.5, color: "#7a6248", marginBottom: 12 }}>
            Online vs Walk-in
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={revenueBySource}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={62}
                paddingAngle={3}
                dataKey="value"
              >
                {revenueBySource.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v}%`]}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {revenueBySource.map((s) => (
              <div
                key={s.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: s.color,
                    }}
                  />
                  <span style={{ fontSize: 13, color: "#5a4030" }}>
                    {s.name}
                  </span>
                </div>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#2c1a0e" }}
                >
                  {s.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 2: Branch bar + Finance */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card style={{ padding: "20px 24px" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#2c1a0e",
              marginBottom: 4,
            }}
          >
            Doanh thu theo chi nhánh
          </div>
          <div style={{ fontSize: 12.5, color: "#7a6248", marginBottom: 16 }}>
            Tháng 6, 2024
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={revenueByBranch}
              layout="vertical"
              margin={{ left: 0, right: 24 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0ece3"
                horizontal={false}
              />
              <XAxis
                type="number"
                tickFormatter={(v) => fmt(v)}
                tick={{ fontSize: 11, fill: "#7a6248" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fill: "#5a4030" }}
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <Tooltip
                formatter={(v) => [fmt(Number(v)) + " \u0111"]}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Bar
                dataKey="revenue"
                fill="#c9922a"
                radius={[0, 4, 4, 0]}
                name="Doanh thu"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ padding: "20px 20px" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#2c1a0e",
              marginBottom: 16,
            }}
          >
            Thu & Chi
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "#7a6248",
                  marginBottom: 4,
                  fontWeight: 600,
                }}
              >
                TỔNG THU
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#15803d" }}>
                {fmt(totalIncome)} đ
              </div>
            </div>
            <div style={{ height: 1, background: "#f0ece3" }} />
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "#7a6248",
                  marginBottom: 4,
                  fontWeight: 600,
                }}
              >
                TỔNG CHI
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#b91c1c" }}>
                {fmt(totalExpenses)} đ
              </div>
            </div>
            <div style={{ height: 1, background: "#f0ece3" }} />
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "#7a6248",
                  marginBottom: 4,
                  fontWeight: 600,
                }}
              >
                LỢI NHUẬN
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#c9922a" }}>
                {fmt(totalIncome - totalExpenses)} đ
              </div>
            </div>
            <div
              style={{
                background: "#fafaf8",
                borderRadius: 8,
                padding: "10px 12px",
              }}
            >
              <div style={{ fontSize: 12, color: "#7a6248", marginBottom: 3 }}>
                Tỷ lệ lợi nhuận
              </div>
              <div
                style={{
                  height: 6,
                  background: "#f0ece3",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)}%`,
                    background: "#c9922a",
                    borderRadius: 3,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#c9922a",
                  fontWeight: 700,
                  marginTop: 4,
                }}
              >
                {Math.round(
                  ((totalIncome - totalExpenses) / totalIncome) * 100,
                )}
                %
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 3: Branch performance + Recent invoices */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Card>
          <div
            style={{
              padding: "18px 20px 12px",
              borderBottom: "1px solid #f0ece3",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: "#2c1a0e" }}>
              Hiệu suất chi nhánh
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[
                    "Chi nh\xE1nh",
                    "Doanh thu",
                    "H\u0110",
                    "Chi ph\xED",
                    "L\u1EE3i nhu\u1EADn",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 14px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#7a6248",
                        borderBottom: "1px solid #e5ddd0",
                        whiteSpace: "nowrap",
                        background: "#fafaf8",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {branchPerf.map((b) => (
                  <tr
                    key={b.name}
                    style={{ borderBottom: "1px solid #f0ece3" }}
                  >
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#2c1a0e",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {b.name}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 13,
                        color: "#c9922a",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmt(b.revenue)}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 13,
                        color: "#5a4030",
                      }}
                    >
                      {b.invoices}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 13,
                        color: "#b91c1c",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmt(b.expenses)}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 13,
                        color: b.profit > 0 ? "#15803d" : "#7a6248",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {b.profit > 0 ? "+" : ""}
                      {fmt(b.profit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div
            style={{
              padding: "18px 20px 12px",
              borderBottom: "1px solid #f0ece3",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: "#2c1a0e" }}>
              Hóa đơn gần đây
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[
                    "M\xE3 H\u0110",
                    "Chi nh\xE1nh",
                    "Ngu\u1ED3n",
                    "T\u1ED5ng ti\u1EC1n",
                    "Tr\u1EA1ng th\xE1i",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 14px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#7a6248",
                        borderBottom: "1px solid #e5ddd0",
                        background: "#fafaf8",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 6).map((inv) => (
                  <tr
                    key={inv.id}
                    style={{ borderBottom: "1px solid #f0ece3" }}
                  >
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 12.5,
                        fontFamily: "'DM Mono', monospace",
                        color: "#5a4030",
                      }}
                    >
                      {inv.id}
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 12.5,
                        color: "#5a4030",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {inv.branch}
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: 4,
                          background:
                            inv.source === "ONLINE" ? "#dbeafe" : "#f5f0e8",
                          color:
                            inv.source === "ONLINE" ? "#1d4ed8" : "#7a6248",
                        }}
                      >
                        {inv.source}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#2c1a0e",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {inv.total.toLocaleString("vi-VN")} đ
                    </td>
                    <td style={{ padding: "10px 14px" }}>
                      <Badge status={inv.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
