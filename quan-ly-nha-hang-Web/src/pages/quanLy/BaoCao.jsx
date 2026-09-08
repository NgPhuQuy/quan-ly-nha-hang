import { useState, useEffect, useMemo } from "react";
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
import { layDanhSachHoaDon } from "../../services/hoaDon.service";
import {
  dinhDangTien,
  dinhDangTienRutGon,
  taoDanhSachThangGanNhat,
  layThangHienTai,
} from "../../utils/dinhDang";

const MONTHS = taoDanhSachThangGanNhat(6);
const PIE_COLORS = ["#D4962B", "#3B82F6", "#10B981"];

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

function Reports({ branches = [] }) {
  const [month, setMonth] = useState(layThangHienTai());
  const [branchFilter, setBranchFilter] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loi, setLoi] = useState(null);

  useEffect(() => {
    const taiHoaDon = async () => {
      try {
        setLoi(null);
        const res = await layDanhSachHoaDon();
        if (Array.isArray(res)) {
          setInvoices(res);
        }
      } catch (err) {
        setLoi(err.response?.data?.message || err.message || "Không thể tải danh sách hóa đơn!");
      }
    };
    taiHoaDon();
  }, []);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      if (branchFilter && String(inv.maChiNhanh) !== String(branchFilter)) {
        return false;
      }
      return true;
    });
  }, [invoices, branchFilter]);

  const totalRevenue = useMemo(() => {
    return filteredInvoices
      .filter((inv) => inv.trangThai === "HOAN_THANH")
      .reduce((sum, inv) => sum + Number(inv.tongTien || 0), 0);
  }, [filteredInvoices]);

  const totalInvoices = filteredInvoices.length;
  const totalIncome = totalRevenue;
  const totalExpense = Math.round(totalRevenue * 0.45);
  const profit = totalIncome - totalExpense;

  const revenueByDay = useMemo(() => {
    const dayMap = {};
    filteredInvoices.forEach((inv) => {
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
      Thu: revenue,
      Chi: Math.round(revenue * 0.45),
    }));

    if (entries.length === 0) {
      return [
        { date: "Hôm nay", revenue: 0, Thu: 0, Chi: 0 },
      ];
    }
    return entries;
  }, [filteredInvoices]);

  const revenueByBranch = useMemo(() => {
    return branches.map((b) => {
      const rev = invoices
        .filter((i) => i.maChiNhanh === b.maChiNhanh && i.trangThai === "HOAN_THANH")
        .reduce((sum, i) => sum + Number(i.tongTien || 0), 0);
      return {
        branch: b.tenChiNhanh,
        revenue: rev,
      };
    });
  }, [branches, invoices]);

  const revenueBySource = useMemo(() => {
    let onlineRev = 0;
    let offlineRev = 0;
    filteredInvoices.forEach((inv) => {
      const amount = Number(inv.tongTien || 0);
      if (inv.maKhachHang) {
        onlineRev += amount;
      } else {
        offlineRev += amount;
      }
    });
    return [
      { label: "Trực tiếp", value: offlineRev },
      { label: "Đặt trước / Online", value: onlineRev },
    ];
  }, [filteredInvoices]);

  const kpis = [
    {
      label: "Tổng doanh thu",
      value: dinhDangTienRutGon(totalRevenue),
      icon: TrendingUp,
      color: "#D4962B",
    },
    {
      label: "Tổng hóa đơn",
      value: `${totalInvoices}`,
      icon: FileText,
      color: "#7C3AED",
    },
    {
      label: "Tổng thu",
      value: dinhDangTienRutGon(totalIncome),
      icon: DollarSign,
      color: "#059669",
    },
    {
      label: "Tổng chi ước tính",
      value: dinhDangTienRutGon(totalExpense),
      icon: Wallet,
      color: "#DC2626",
    },
    {
      label: "Lợi nhuận ước tính",
      value: dinhDangTienRutGon(profit),
      icon: PiggyBank,
      color: "#059669",
    },
  ];

  return (
    <div className="p-5 flex flex-col gap-4 overflow-y-auto">
      {loi && (
        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
          {loi}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2
            className="text-base font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Báo cáo doanh thu & hoạt động
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--muted-foreground)" }}
          >
            Tổng hợp dữ liệu kinh doanh chuỗi nhà hàng
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white"
            style={{ borderColor: "var(--border)" }}
          >
            <option value="">Tất cả chi nhánh</option>
            {branches.map((b) => (
              <option key={b.maChiNhanh} value={b.maChiNhanh}>
                {b.tenChiNhanh}
              </option>
            ))}
          </select>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="text-sm border rounded-lg px-3 py-1.5 outline-none bg-white"
            style={{ borderColor: "var(--border)" }}
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {kpis.map(({ label, value, icon: Icon, color }, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border p-4 flex items-start gap-3"
            style={{ borderColor: "var(--border)" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${color}18` }}
            >
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                {label}
              </div>
              <div
                className="text-lg font-bold"
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
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Doanh thu theo ngày
          </div>
          <div
            className="text-xs mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            {month}
          </div>
          <ResponsiveContainer width="100%" height={196}>
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
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Theo chi nhánh
          </div>
          <div
            className="text-xs mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            {month}
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={revenueByBranch} layout="vertical">
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
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div
          className="col-span-2 bg-white rounded-xl border p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Thu – Chi theo ngày
          </div>
          <div
            className="text-xs mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            So sánh dòng tiền vào và ra
          </div>
          <ResponsiveContainer width="100%" height={196}>
            <AreaChart
              data={revenueByDay}
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
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
                formatter={(v, name) => [dinhDangTien(v), name]}
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
          className="bg-white rounded-xl border p-4"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--foreground)" }}
          >
            Theo kênh bán
          </div>
          <div
            className="text-xs mb-2"
            style={{ color: "var(--muted-foreground)" }}
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
          <div className="flex flex-col gap-2 mt-2">
            {revenueBySource.map((s, i) => (
              <div
                className="flex items-center justify-between text-xs"
                key={s.label || i}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-sm"
                    style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <span style={{ color: "var(--foreground)" }}>{s.label}</span>
                </div>
                <span
                  className="font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {dinhDangTienRutGon(s.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="bg-white rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="px-4 py-3 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="text-sm font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Tóm tắt hóa đơn gần đây
          </div>
        </div>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--secondary)" }}>
            <tr>
              {[
                "Mã HĐ",
                "Thời gian",
                "Chi nhánh",
                "Kênh",
                "Tổng tiền",
                "Trạng thái",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-semibold"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.slice(0, 8).map((inv) => {
              const chiNhanh = branches.find((b) => b.maChiNhanh === inv.maChiNhanh);
              const tenCN = chiNhanh?.tenChiNhanh || `Chi nhánh #${inv.maChiNhanh}`;
              return (
                <tr
                  key={inv.maHoaDon}
                  className="border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <td
                    className="px-4 py-2.5 text-xs font-semibold"
                    style={{ color: "var(--primary)" }}
                  >
                    #{inv.maHoaDon}
                  </td>
                  <td
                    className="px-4 py-2.5 text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {inv.ngayLapHoaDon
                      ? new Date(inv.ngayLapHoaDon).toLocaleDateString("vi-VN")
                      : "---"}
                  </td>
                  <td
                    className="px-4 py-2.5 text-xs"
                    style={{ color: "var(--foreground)" }}
                  >
                    {tenCN}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{
                        background: inv.maKhachHang
                          ? "var(--info-bg)"
                          : "var(--success-bg)",
                        color: inv.maKhachHang
                          ? "var(--info)"
                          : "var(--success)",
                      }}
                    >
                      {inv.maKhachHang ? "Đặt trước / Online" : "Tại quầy"}
                    </span>
                  </td>
                  <td
                    className="px-4 py-2.5 text-xs font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {dinhDangTien(inv.tongTien)}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{
                        background:
                          inv.trangThai === "HOAN_THANH"
                            ? "var(--success-bg)"
                            : inv.trangThai === "DANG_PHUC_VU"
                            ? "var(--warning-bg)"
                            : "var(--danger-bg)",
                        color:
                          inv.trangThai === "HOAN_THANH"
                            ? "var(--success)"
                            : inv.trangThai === "DANG_PHUC_VU"
                            ? "var(--warning)"
                            : "var(--danger)",
                      }}
                    >
                      {inv.trangThai === "HOAN_THANH"
                        ? "Hoàn thành"
                        : inv.trangThai === "DANG_PHUC_VU"
                        ? "Đang phục vụ"
                        : "Đang xử lý"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;
