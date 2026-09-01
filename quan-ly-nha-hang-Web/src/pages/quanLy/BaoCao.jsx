import { useState, useEffect } from "react";
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
  layDashboardOverview,
  layDoanhThuTheoNgay,
  layDoanhThuTheoChiNhanh,
  layDoanhThuTheoNguon,
} from "../../services/dashboard.service";
import { layDanhSachChiNhanh } from "../../services/chiNhanh.service";
import { layDanhSachHoaDon } from "../../services/hoaDon.service";
import {
  dinhDangTien,
  dinhDangTienRutGon,
  taoDanhSachThangGanNhat,
  layThangHienTai,
} from "../../utils/dinhDang";
const MONTHS = taoDanhSachThangGanNhat(6);
const PIE_COLORS = ["#D4962B", "#EEC97A"];
const tooltipStyle = {
  backgroundColor: "#18110a",
  border: "1px solid rgba(212,150,43,0.35)",
  borderRadius: "10px",
  fontSize: "12px",
  color: "#fef3c7",
  boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
  padding: "8px 12px",
};
const tooltipLabelStyle = {
  color: "#fbbf24",
  fontWeight: 700,
  marginBottom: "4px",
};
const tooltipItemStyle = {
  color: "#fde68a",
  fontSize: "12px",
};
function Reports({ role }) {
  const [month, setMonth] = useState(layThangHienTai());
  const [branchFilter, setBranchFilter] = useState("");
  const isAdmin = role === "admin";
  const [revenueByDay, setRevenueByDay] = useState([]);
  const [revenueBySource, setRevenueBySource] = useState([]);
  const [revenueByBranch, setRevenueByBranch] = useState([]);
  const [branches, setBranches] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    layDashboardOverview().then((data) => {
      if (data) setOverview(data);
    });
    layDoanhThuTheoNgay().then((data) => {
      if (data && data.length > 0) setRevenueByDay(data);
    });
    layDoanhThuTheoChiNhanh().then((data) => {
      if (data && data.length > 0) setRevenueByBranch(data);
    });
    layDoanhThuTheoNguon().then((data) => {
      if (data && data.length > 0) setRevenueBySource(data);
    });
    layDanhSachChiNhanh().then((res) => {
      if (res && res.length > 0) setBranches(res);
    });
    layDanhSachHoaDon().then((res) => {
      if (res && res.length > 0) setInvoices(res);
    });
  }, []);

  const totalRevenue = overview?.tongDoanhThu
    ? Number(overview.tongDoanhThu)
    : isAdmin
      ? 962e5
      : revenueByDay.reduce((s, d) => s + Number(d.revenue || 0), 0);

  const totalInvoices = overview?.tongHoaDon
    ? Number(overview.tongHoaDon)
    : isAdmin
      ? 847
      : revenueByDay.reduce((s, d) => s + Number(d.invoices || 0), 0);

  const totalIncome = overview?.tongThu
    ? Number(overview.tongThu)
    : isAdmin
      ? 962e5
      : 144e5;
  const totalExpense = overview?.tongChi
    ? Number(overview.tongChi)
    : isAdmin
      ? 428e5
      : 82e5;
  const profit = overview?.loiNhuan
    ? Number(overview.loiNhuan)
    : totalIncome - totalExpense;

  const incomeVsExpense = revenueByDay.map((d, i) => ({
    date: d.date,
    Thu: d.revenue,
    Chi: [42e4, 38e4, 51e4, 46e4, 49e4, 35e4, 62e4, 44e4][i % 8],
  }));
  const kpis = [
    {
      label: "Tá»•ng doanh thu",
      value: dinhDangTienRutGon(totalRevenue),
      icon: TrendingUp,
      color: "#D4962B",
    },
    {
      label: "Tá»•ng hóa đơn",
      value: `${totalInvoices}`,
      icon: FileText,
      color: "#7C3AED",
    },
    {
      label: "Tá»•ng thu",
      value: dinhDangTienRutGon(totalIncome),
      icon: DollarSign,
      color: "#059669",
    },
    {
      label: "Tá»•ng chi",
      value: dinhDangTienRutGon(totalExpense),
      icon: Wallet,
      color: "#DC2626",
    },
    {
      label: "Lợi nhuận",
      value: dinhDangTienRutGon(profit),
      icon: PiggyBank,
      color: "#059669",
    },
  ];
  return (
    <div className="p-5 flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2
            className="text-base font-700"
            style={{
              color: "var(--foreground)",
            }}
          >
            Báo cáo doanh thu
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {isAdmin ? "Toàn chuá»—i" : "Chi nhánh Quận 1"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white"
              style={{
                borderColor: "var(--border)",
              }}
            >
              <option value="">Tất cả chi nhánh</option>
              {branches.map((b) => {
                const name = b.tenChiNhanh || b.ten;
                return (
                  <option key={b.maChiNhanh || b.id || name} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          )}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white"
            style={{
              borderColor: "var(--border)",
            }}
          >
            {MONTHS.map((m) => (
              <option>{m}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <div
            className="bg-white rounded-xl border p-4 flex items-start gap-3"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: `${color}18`,
              }}
            >
              <Icon
                size={16}
                style={{
                  color,
                }}
              />
            </div>
            <div>
              <div
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {label}
              </div>
              <div
                className="text-lg font-700"
                style={{
                  color: "var(--foreground)",
                }}
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
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div
            className="text-sm font-600 mb-1"
            style={{
              color: "var(--foreground)",
            }}
          >
            Doanh thu theo ngày
          </div>
          <div
            className="text-xs mb-3"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {month}
          </div>
          <ResponsiveContainer width="100%" height={196}>
            <BarChart
              data={revenueByDay}
              margin={{
                top: 4,
                right: 4,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="date"
                tick={{
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1e6).toFixed(1)}tr`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
                formatter={(v) => [dinhDangTien(v), "Doanh thu"]}
              />
              <Bar dataKey="revenue" fill="#D4962B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          className="bg-white rounded-xl border p-4"
          style={{
            borderColor: "var(--border)",
          }}
        >
          {isAdmin ? (
            <>
              <div
                className="text-sm font-600 mb-1"
                style={{
                  color: "var(--foreground)",
                }}
              >
                Theo chi nhánh
              </div>
              <div
                className="text-xs mb-3"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {month}
              </div>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={revenueByBranch} layout="vertical">
                  <XAxis
                    type="number"
                    tick={{
                      fontSize: 10,
                      fill: "var(--muted-foreground)",
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1e6).toFixed(0)}tr`}
                  />
                  <YAxis
                    type="category"
                    dataKey="branch"
                    tick={{
                      fontSize: 11,
                      fill: "var(--muted-foreground)",
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={55}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                    formatter={(v) => [dinhDangTien(v)]}
                  />
                  <Bar dataKey="revenue" fill="#D4962B" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : (
            <>
              <div
                className="text-sm font-600 mb-1"
                style={{
                  color: "var(--foreground)",
                }}
              >
                Theo kênh bán
              </div>
              <div
                className="text-xs mb-2"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {month}
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={revenueBySource}
                    cx="50%"
                    cy="50%"
                    innerRadius={44}
                    outerRadius={64}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {revenueBySource.map((_, i) => (
                      <Cell fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                    formatter={(v) => [dinhDangTien(v)]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 mt-2">
                {revenueBySource.map((s, i) => (
                  <div className="flex items-center justify-between text-xs" key={s.label || i}>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-sm"
                        style={{
                          background: PIE_COLORS[i % PIE_COLORS.length],
                        }}
                      />
                      <span
                        style={{
                          color: "var(--foreground)",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <span
                      className="font-600"
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      {dinhDangTienRutGon(s.value)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div
        className="bg-white rounded-xl border p-4"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <div
          className="text-sm font-600 mb-1"
          style={{
            color: "var(--foreground)",
          }}
        >
          Thu – Chi theo ngày
        </div>
        <div
          className="text-xs mb-3"
          style={{
            color: "var(--muted-foreground)",
          }}
        >
          So sánh dòng tiền vào và ra
        </div>
        <ResponsiveContainer width="100%" height={196}>
          <AreaChart
            data={incomeVsExpense}
            margin={{
              top: 4,
              right: 4,
              left: 0,
              bottom: 0,
            }}
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
              tick={{
                fontSize: 11,
                fill: "var(--muted-foreground)",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fontSize: 11,
                fill: "var(--muted-foreground)",
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1e6).toFixed(1)}tr`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={tooltipItemStyle}
              formatter={(v, name) => [dinhDangTien(v), name]}
            />
            <Legend
              wrapperStyle={{
                fontSize: 12,
              }}
            />
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
        style={{
          borderColor: "var(--border)",
        }}
      >
        <div
          className="px-4 py-3 border-b"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div
            className="text-sm font-600"
            style={{
              color: "var(--foreground)",
            }}
          >
            Tóm tắt hóa đơn
          </div>
        </div>
        <table className="w-full text-sm">
          <thead
            style={{
              background: "var(--secondary)",
            }}
          >
            <tr>
              {[
                "Mã hóa đơn",
                "Thời gian",
                ...(isAdmin ? ["Chi nhánh"] : []),
                "Nguồn",
                "Tổng tiền",
                "Trạng thái",
              ].map((h) => (
                <th
                  className="px-4 py-2.5 text-left text-xs font-600"
                  style={{
                    color: "var(--muted-foreground)",
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
                className="border-t"
                style={{
                  borderColor: "var(--border)",
                }}
              >
                <td
                  className="px-4 py-2.5 text-xs font-600"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  {inv.id}
                </td>
                <td
                  className="px-4 py-2.5 text-xs"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {inv.createdAt}
                </td>
                {isAdmin && (
                  <td
                    className="px-4 py-2.5 text-xs"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {inv.branch}
                  </td>
                )}
                <td className="px-4 py-2.5">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-500"
                    style={{
                      background:
                        inv.source === "ONLINE"
                          ? "var(--info-bg)"
                          : "var(--success-bg)",
                      color:
                        inv.source === "ONLINE"
                          ? "var(--info)"
                          : "var(--success)",
                    }}
                  >
                    {inv.source === "ONLINE" ? "Online" : "Tại quầy"}
                  </span>
                </td>
                <td
                  className="px-4 py-2.5 text-xs font-600"
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {dinhDangTien(inv.total)}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-500"
                    style={{
                      background:
                        inv.status === "Hoàn thành"
                          ? "var(--success-bg)"
                          : inv.status === "Chờ xử lý"
                            ? "var(--warning-bg)"
                            : "var(--danger-bg)",
                      color:
                        inv.status === "Hoàn thành"
                          ? "var(--success)"
                          : inv.status === "Chờ xử lý"
                            ? "var(--warning)"
                            : "var(--danger)",
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
export { Reports as default };
