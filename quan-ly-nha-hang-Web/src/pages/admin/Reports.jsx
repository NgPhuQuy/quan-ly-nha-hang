import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card } from "../../components/admin/Card";
import {
  revenueByMonth,
  revenueByBranch,
  branches,
} from "../../data/admin/mockData";
function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(0) + " tr";
  return n.toLocaleString("vi-VN");
}
const invoiceData = [
  { month: "T1", invoices: 210, online: 72, walkin: 138 },
  { month: "T2", invoices: 185, online: 60, walkin: 125 },
  { month: "T3", invoices: 256, online: 92, walkin: 164 },
  { month: "T4", invoices: 228, online: 85, walkin: 143 },
  { month: "T5", invoices: 295, online: 110, walkin: 185 },
  { month: "T6", invoices: 342, online: 124, walkin: 218 },
];
export default function Reports() {
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-06-30");
  const [filterBranch, setFilterBranch] = useState("all");
  const totalRevenue = branches.reduce((s, b) => s + b.revenue, 0);
  const totalInvoices = invoiceData.reduce((s, m) => s + m.invoices, 0);
  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{ fontSize: 22, fontWeight: 700, color: "#2c1a0e", margin: 0 }}
        >
          Báo cáo chi tiết
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "#7a6248" }}>
          Phân tích hiệu suất toàn hệ thống
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#7a6248", fontWeight: 500 }}>
            Từ ngày
          </span>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={{
              height: 36,
              padding: "0 10px",
              borderRadius: 8,
              border: "1px solid #e5ddd0",
              fontSize: 13,
              fontFamily: "inherit",
              outline: "none",
              color: "#2c1a0e",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#7a6248", fontWeight: 500 }}>
            Đến ngày
          </span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={{
              height: 36,
              padding: "0 10px",
              borderRadius: 8,
              border: "1px solid #e5ddd0",
              fontSize: 13,
              fontFamily: "inherit",
              outline: "none",
              color: "#2c1a0e",
            }}
          />
        </div>
        <select
          value={filterBranch}
          onChange={(e) => setFilterBranch(e.target.value)}
          style={{
            height: 36,
            padding: "0 30px 0 10px",
            borderRadius: 8,
            border: "1px solid #e5ddd0",
            fontSize: 13,
            fontFamily: "inherit",
            outline: "none",
            cursor: "pointer",
            color: "#2c1a0e",
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a6248' strokeWidth='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 8px center",
            backgroundColor: "#fff",
          }}
        >
          <option value="all">Tất cả chi nhánh</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* KPI summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "T\u1ED5ng doanh thu",
            value: fmt(totalRevenue) + " \u0111",
            color: "#c9922a",
          },
          {
            label: "T\u1ED5ng h\xF3a \u0111\u01A1n",
            value: totalInvoices.toString(),
            color: "#1d4ed8",
          },
          { label: "Online", value: "35%", color: "#15803d" },
          { label: "Walk-in", value: "65%", color: "#7a6248" },
          {
            label: "Doanh thu TB/H\u0110",
            value: fmt(Math.round(totalRevenue / totalInvoices)) + " \u0111",
            color: "#2c1a0e",
          },
        ].map(({ label, value, color }) => (
          <Card key={label} style={{ padding: "16px 20px" }}>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: "#7a6248",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
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
            Doanh thu theo tháng
          </div>
          <div style={{ fontSize: 12.5, color: "#7a6248", marginBottom: 14 }}>
            6 tháng gần nhất
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#7a6248" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={fmt}
                tick={{ fontSize: 11, fill: "#7a6248" }}
                axisLine={false}
                tickLine={false}
                width={56}
              />
              <Tooltip
                formatter={(v) => [fmt(Number(v)) + " \u0111"]}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#c9922a"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#c9922a" }}
                name="Doanh thu"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ padding: "20px 24px" }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#2c1a0e",
              marginBottom: 4,
            }}
          >
            Hóa đơn theo nguồn
          </div>
          <div style={{ fontSize: 12.5, color: "#7a6248", marginBottom: 14 }}>
            Online vs Walk-in
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={invoiceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#7a6248" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#7a6248" }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar
                dataKey="online"
                stackId="a"
                fill="#c9922a"
                name="Online"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="walkin"
                stackId="a"
                fill="#e5ddd0"
                name="Walk-in"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Branch revenue table */}
      <Card>
        <div
          style={{
            padding: "18px 20px 12px",
            borderBottom: "1px solid #f0ece3",
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: "#2c1a0e" }}>
            Doanh thu từng chi nhánh
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "Chi nh\xE1nh",
                  "Doanh thu",
                  "T\u1EF7 l\u1EC7",
                  "So v\u1EDBi th\xE1ng tr\u01B0\u1EDBc",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 16px",
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
              {revenueByBranch.map((b) => {
                const pct = Math.round((b.revenue / totalRevenue) * 100);
                const trends = ["+8.4%", "+3.2%", "+12.1%", "\u2212", "\u2212"];
                const idx = revenueByBranch.indexOf(b);
                return (
                  <tr
                    key={b.name}
                    style={{ borderBottom: "1px solid #f0ece3" }}
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 13.5,
                        fontWeight: 500,
                        color: "#2c1a0e",
                      }}
                    >
                      {b.name}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: "#c9922a",
                      }}
                    >
                      {fmt(b.revenue)} đ
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 80,
                            height: 6,
                            background: "#f0ece3",
                            borderRadius: 3,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${pct}%`,
                              background: "#c9922a",
                              borderRadius: 3,
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 12.5, color: "#7a6248" }}>
                          {pct}%
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        fontSize: 13,
                        color: b.revenue > 0 ? "#15803d" : "#7a6248",
                        fontWeight: 600,
                      }}
                    >
                      {trends[idx]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
