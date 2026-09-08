import { useState, useEffect } from "react";
import {
  TrendingUp,
  FileText,
  DollarSign,
  Wallet,
  PiggyBank,
  Building2,
  UserCircle,
  ArrowUpRight,
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
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  layDashboardOverview,
  layDoanhThuTheoNgay,
  layDoanhThuTheoChiNhanh,
  layDoanhThuTheoNguon,
} from "../../services/dashboard.service";
import { layDanhSachHoaDon } from "../../services/hoaDon.service";
import {
  dinhDangTien,
  dinhDangTienRutGon,
  layThangHienTai,
} from "../../utils/dinhDang";

function DashboardKpiCard({ label, value, sub, icon: Icon, color }) {
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
const statusBadge = {
  "Hoàn thành": "var(--success)",
  "Chờ xử lý": "var(--warning)",
  "Đã hủy": "var(--danger)",
};
const statusBg = {
  "Hoàn thành": "var(--success-bg)",
  "Chờ xử lý": "var(--warning-bg)",
  "Đã hủy": "var(--danger-bg)",
};
function Dashboard({ role, onNavigate }) {
  const isAdmin = role === "admin";
  const [revenueByDay, setRevenueByDay] = useState([]);
  const [revenueBySource, setRevenueBySource] = useState([]);
  const [revenueByBranch, setRevenueByBranch] = useState([]);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [expenseList] = useState([
    { category: "Nguyên vật liệu", amount: 45000000, pct: 45 },
    { category: "Nhân sự", amount: 30000000, pct: 30 },
    { category: "Mặt bằng & Tiện ích", amount: 15000000, pct: 15 },
    { category: "Khác", amount: 10000000, pct: 10 },
  ]);
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
    layDanhSachHoaDon().then((data) => {
      if (data && data.length > 0) setRecentInvoices(data.slice(0, 5));
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
  return (
    <div className="p-5 flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <p
            className="text-xs"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {isAdmin
              ? `Tổng quan toàn chuỗi · ${layThangHienTai()}`
              : `Chi nhánh Quận 1 · ${layThangHienTai()}`}
          </p>
        </div>
      </div>
      {isAdmin ? (
        <div className="grid grid-cols-4 gap-3">
          <DashboardKpiCard
            label="Tổng doanh thu"
            value={dinhDangTienRutGon(totalRevenue)}
            sub="Toàn chuỗi"
            icon={TrendingUp}
            color="#D4962B"
          />
          <DashboardKpiCard
            label="Chi nhánh hoạt động"
            value={
              overview?.tongChiNhanh
                ? `${overview.chiNhanhHoatDong || 0} / ${overview.tongChiNhanh}`
                : "3 / 3"
            }
            sub="Hệ thống chi nhánh"
            icon={Building2}
            color="#7C3AED"
          />
          <DashboardKpiCard
            label="Tổng hóa đơn"
            value={`${overview?.tongHoaDon ?? totalInvoices}`}
            sub="Toàn hệ thống"
            icon={FileText}
            color="#2563EB"
          />
          <DashboardKpiCard
            label="Khách hàng"
            value={`${overview?.tongKhachHang ?? 0}`}
            sub="Thành viên đã đăng ký"
            icon={UserCircle}
            color="#0891B2"
          />
          <DashboardKpiCard
            label="Tổng thu"
            value={dinhDangTienRutGon(totalIncome)}
            icon={DollarSign}
            color="#059669"
          />
          <DashboardKpiCard
            label="Tổng chi"
            value={dinhDangTienRutGon(totalExpense)}
            icon={Wallet}
            color="#DC2626"
          />
          <DashboardKpiCard
            label="Lợi nhuận"
            value={dinhDangTienRutGon(profit)}
            sub={profit >= 0 ? "▲ Dương" : "▼ Âm"}
            icon={PiggyBank}
            color="#059669"
          />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-3">
          <DashboardKpiCard
            label="Tổng doanh thu"
            value={dinhDangTienRutGon(totalRevenue)}
            sub={layThangHienTai()}
            icon={TrendingUp}
            color="#D4962B"
          />
          <DashboardKpiCard
            label="Tổng hóa đơn"
            value={`${totalInvoices}`}
            sub="Đã xử lý"
            icon={FileText}
            color="#7C3AED"
          />
          <DashboardKpiCard
            label="Tổng thu"
            value={dinhDangTienRutGon(totalIncome)}
            icon={DollarSign}
            color="#059669"
          />
          <DashboardKpiCard
            label="Tổng chi"
            value={dinhDangTienRutGon(totalExpense)}
            icon={Wallet}
            color="#DC2626"
          />
          <DashboardKpiCard
            label="Lợi nhuận"
            value={dinhDangTienRutGon(profit)}
            sub={profit >= 0 ? "▲ Dương" : "▼ Âm"}
            icon={PiggyBank}
            color="#059669"
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="col-span-2 bg-white rounded-xl border p-4"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div
                className="text-sm font-600"
                style={{
                  color: "var(--foreground)",
                }}
              >
                {isAdmin ? "Doanh thu toàn hệ thống" : "Doanh thu theo ngày"}
              </div>
              <div
                className="text-xs"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {layThangHienTai()}
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={196}>
            <AreaChart
              data={revenueByDay}
              margin={{
                top: 4,
                right: 4,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4962B" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#D4962B" stopOpacity={0} />
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
                formatter={(v) => [dinhDangTien(v), "Doanh thu"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#D4962B"
                strokeWidth={2}
                fill="url(#revGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          className="bg-white rounded-xl border p-4 flex flex-col"
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
                Doanh thu theo chi nhánh
              </div>
              <div
                className="text-xs mb-3"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {layThangHienTai()}
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart
                  data={revenueByBranch}
                  layout="vertical"
                  margin={{
                    top: 0,
                    right: 8,
                    left: 8,
                    bottom: 0,
                  }}
                >
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
                    width={60}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
                    itemStyle={tooltipItemStyle}
                    formatter={(v) => [dinhDangTien(v), "Doanh thu"]}
                  />
                  <Bar dataKey="revenue" fill="#D4962B" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div
                className="mt-auto pt-2 border-t flex flex-col gap-1.5"
                style={{
                  borderColor: "var(--border)",
                }}
              >
                {revenueByBranch.map((b) => (
                  <div className="flex justify-between text-xs" key={b.branch}>
                    <span
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      {b.branch}
                    </span>
                    <span
                      className="font-600"
                      style={{
                        color: "var(--foreground)",
                      }}
                    >
                      {dinhDangTienRutGon(b.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div
                className="text-sm font-600 mb-1"
                style={{
                  color: "var(--foreground)",
                }}
              >
                Theo nguồn
              </div>
              <div
                className="text-xs mb-2"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                Doanh thu theo kênh
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
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
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
              <div className="mt-auto flex flex-col gap-2">
                {revenueBySource.map((s, i) => (
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-sm"
                        style={{
                          background: PIE_COLORS[i],
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
      <div className="grid grid-cols-3 gap-4">
        <div
          className="col-span-2 bg-white rounded-xl border p-4"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className="text-sm font-600"
              style={{
                color: "var(--foreground)",
              }}
            >
              Hóa đơn gần đây
            </div>
            <button
              className="text-xs font-500 flex items-center gap-1"
              style={{
                color: "var(--primary)",
              }}
              onClick={() => onNavigate("invoices")}
            >
              Xem tất cả <ArrowUpRight size={11} />
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {[
                  "Mã HĐ",
                  "Thời gian",
                  isAdmin ? "Chi nhánh" : "Nguồn",
                  "Tổng tiền",
                  "Trạng thái",
                ].map((h) => (
                  <th
                    className="pb-2 text-left text-xs font-600"
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
              {recentInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b last:border-0"
                  style={{
                    borderColor: "var(--border)",
                  }}
                >
                  <td
                    className="py-2.5 font-600 text-xs"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    {inv.id}
                  </td>
                  <td
                    className="py-2.5 text-xs"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {inv.createdAt}
                  </td>
                  <td className="py-2.5">
                    {isAdmin ? (
                      <span
                        className="text-xs"
                        style={{
                          color: "var(--foreground)",
                        }}
                      >
                        {inv.branch}
                      </span>
                    ) : (
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
                    )}
                  </td>
                  <td
                    className="py-2.5 text-xs font-600"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {dinhDangTien(inv.total)}
                  </td>
                  <td className="py-2.5">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-500"
                      style={{
                        background: statusBg[inv.status] || "var(--muted)",
                        color: statusBadge[inv.status] || "var(--foreground)",
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
        <div
          className="bg-white rounded-xl border p-4"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div
            className="text-sm font-600 mb-3"
            style={{
              color: "var(--foreground)",
            }}
          >
            Chi phí tháng này
          </div>
          <div className="flex flex-col gap-3">
            {expenseList.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    className="font-600"
                    style={{
                      color: "var(--foreground)",
                    }}
                  >
                    {item.pct}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{
                    background: "var(--muted)",
                  }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.pct}%`,
                      background: "var(--primary)",
                    }}
                  />
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  {dinhDangTien(item.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export { Dashboard as default };
