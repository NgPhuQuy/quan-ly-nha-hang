import { useState, useEffect, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  TrendingUp,
  Building2,
  FileText,
  DollarSign,
  Wallet,
  PiggyBank,
  ArrowUpRight,
} from "lucide-react";
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
          className="text-lg font-bold leading-tight"
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
  HOAN_THANH: "var(--success)",
  DANG_PHUC_VU: "var(--warning)",
  DANG_XU_LY: "var(--info)",
};
const statusBg = {
  HOAN_THANH: "var(--success-bg)",
  DANG_PHUC_VU: "var(--warning-bg)",
  DANG_XU_LY: "var(--info-bg)",
};
const statusLabel = {
  HOAN_THANH: "Hoàn thành",
  DANG_PHUC_VU: "Đang phục vụ",
  DANG_XU_LY: "Đang xử lý",
};

function Dashboard({
  onNavigate,
  chi_nhanh = [],
  selectedBranchId,
  isPos,
}) {
  const [invoices, setInvoices] = useState([]);
  const [loi, setLoi] = useState(null);

  const expenseList = [];

  useEffect(() => {
    const taiDuLieu = async () => {
      try {
        setLoi(null);
        const data = await layDanhSachHoaDon();
        if (Array.isArray(data)) {
          setInvoices(data);
        }
      } catch (err) {
        setLoi(err.response?.data?.message || err.message || "Không thể tải dữ liệu hóa đơn!");
      }
    };
    taiDuLieu();
  }, []);

  const branchInvoices = useMemo(() => {
    if (isPos && selectedBranchId) {
      return invoices.filter(
        (inv) => String(inv.maChiNhanh) === String(selectedBranchId),
      );
    }
    return invoices;
  }, [invoices, isPos, selectedBranchId]);

  const totalRevenue = useMemo(() => {
    return branchInvoices
      .filter((inv) => inv.trangThai === "HOAN_THANH")
      .reduce((sum, inv) => sum + Number(inv.tongTien || 0), 0);
  }, [branchInvoices]);

  const totalInvoices = branchInvoices.length;
  const totalIncome = totalRevenue;
  const totalExpense = 0;
  const profit = totalIncome - totalExpense;

  const revenueByDay = useMemo(() => {
    const dayMap = {};
    branchInvoices
      .filter((inv) => inv.trangThai === "HOAN_THANH")
      .forEach((inv) => {
        const dateStr = inv.ngayLapHoaDon
          ? new Date(inv.ngayLapHoaDon).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
            })
          : "Khác";
        dayMap[dateStr] = (dayMap[dateStr] || 0) + Number(inv.tongTien || 0);
      });

    const entries = Object.entries(dayMap).map(([date, revenue]) => ({
      date,
      revenue,
    }));

    if (entries.length === 0) {
      return [{ date: "Hôm nay", revenue: 0 }];
    }
    return entries;
  }, [branchInvoices]);

  const revenueByBranch = useMemo(() => {
    return chi_nhanh.map((b) => {
      const rev = invoices
        .filter((i) => i.maChiNhanh === b.maChiNhanh && i.trangThai === "HOAN_THANH")
        .reduce((sum, i) => sum + Number(i.tongTien || 0), 0);
      return {
        branch: b.tenChiNhanh,
        revenue: rev,
      };
    });
  }, [chi_nhanh, invoices]);

  const recentInvoices = branchInvoices.slice(0, 5);

  return (
    <div className="p-5 flex flex-col gap-4 overflow-y-auto">
      {loi && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
          {loi}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Tổng quan hoạt động chuỗi nhà hàng · {layThangHienTai()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <DashboardKpiCard
          label="Tổng doanh thu"
          value={dinhDangTienRutGon(totalRevenue)}
          sub="Đã thanh toán"
          icon={TrendingUp}
          color="#D4962B"
        />
        <DashboardKpiCard
          label="Chi nhánh"
          value={`${chi_nhanh.length}`}
          sub="Chi nhánh hoạt động"
          icon={Building2}
          color="#7C3AED"
        />
        <DashboardKpiCard
          label="Tổng hóa đơn"
          value={`${totalInvoices}`}
          sub="Hóa đơn hệ thống"
          icon={FileText}
          color="#2563EB"
        />
        <DashboardKpiCard
          label="Tổng thu"
          value={dinhDangTienRutGon(totalIncome)}
          icon={DollarSign}
          color="#059669"
        />
        <DashboardKpiCard
          label="Tổng chi ước tính"
          value={dinhDangTienRutGon(totalExpense)}
          icon={Wallet}
          color="#DC2626"
        />
        <DashboardKpiCard
          label="Lợi nhuận ước tính"
          value={dinhDangTienRutGon(profit)}
          sub={profit >= 0 ? "▲ Dương" : "▼ Âm"}
          icon={PiggyBank}
          color="#059669"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          className="lg:col-span-2 bg-white rounded-xl border p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                Doanh thu theo ngày
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                {layThangHienTai()}
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={196}>
            <AreaChart
              data={revenueByDay}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
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
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Doanh thu theo chi nhánh
          </div>
          <div
            className="text-xs mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            {layThangHienTai()}
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={revenueByBranch}
              layout="vertical"
              margin={{ top: 0, right: 8, left: 8, bottom: 0 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1e6).toFixed(0)}tr`}
              />
              <YAxis
                type="category"
                dataKey="branch"
                tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                width={70}
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
            style={{ borderColor: "var(--border)" }}
          >
            {revenueByBranch.map((b) => (
              <div className="flex justify-between text-xs" key={b.branch}>
                <span style={{ color: "var(--foreground)" }}>{b.branch}</span>
                <span
                  className="font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {dinhDangTienRutGon(b.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          className="lg:col-span-2 bg-white rounded-xl border p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Hóa đơn gần đây
            </div>
            <button
              className="text-xs font-medium flex items-center gap-1 cursor-pointer hover:underline"
              style={{ color: "var(--primary)" }}
              onClick={() => onNavigate?.("hoa_don")}
            >
              Xem tất cả <ArrowUpRight size={11} />
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Mã HĐ", "Thời gian", "Chi nhánh", "Tổng tiền", "Trạng thái"].map(
                  (h) => (
                    <th
                      key={h}
                      className="pb-2 text-left text-xs font-semibold"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((inv) => {
                const chiNhanh = chi_nhanh.find((b) => b.maChiNhanh === inv.maChiNhanh);
                const tenCN = chiNhanh?.tenChiNhanh || `Chi nhánh #${inv.maChiNhanh}`;
                return (
                  <tr
                    key={inv.maHoaDon}
                    className="border-b last:border-0"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td
                      className="py-2.5 font-semibold text-xs"
                      style={{ color: "var(--primary)" }}
                    >
                      #{inv.maHoaDon}
                    </td>
                    <td
                      className="py-2.5 text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {inv.ngayLapHoaDon
                        ? new Date(inv.ngayLapHoaDon).toLocaleDateString("vi-VN")
                        : "---"}
                    </td>
                    <td
                      className="py-2.5 text-xs"
                      style={{ color: "var(--foreground)" }}
                    >
                      {tenCN}
                    </td>
                    <td
                      className="py-2.5 text-xs font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {dinhDangTien(inv.tongTien)}
                    </td>
                    <td className="py-2.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded font-medium"
                        style={{
                          background: statusBg[inv.trangThai] || "var(--muted)",
                          color: statusBadge[inv.trangThai] || "var(--foreground)",
                        }}
                      >
                        {statusLabel[inv.trangThai] || inv.trangThai}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div
          className="bg-white rounded-xl border p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--foreground)" }}
          >
            Chi phí tháng này
          </div>
          <div className="flex flex-col gap-3">
            {expenseList.length === 0 ? (
              <div
                className="py-8 text-center text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Chưa có dữ liệu chi phí
              </div>
            ) : expenseList.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: "var(--foreground)" }}>
                    {item.category}
                  </span>
                  <span
                    className="font-semibold"
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
                      background: "var(--primary)",
                    }}
                  />
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "var(--muted-foreground)" }}
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

export default Dashboard;
