import { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Trash2,
  Printer,
  Plus,
  Minus,
  Search,
  LayoutGrid,
  Building2,
  ShoppingBag,
  Save,
  CheckCircle2,
} from "lucide-react";
import {
  layChiTietHoaDon,
  thanhToanHoaDon,
  xoaHoaDon,
  goiThemMon,
} from "../../services/hoaDon.service";
import { layDanhSachMatHangTaiChiNhanh } from "../../services/matHang.service";
import { dinhDangTien, dinhDangNgayGio } from "../../utils/dinhDang";

const statusBg = {
  "Đang bán": { bg: "#F0FDF4", text: "#16A34A" },
  "Hết món": { bg: "#FEF2F2", text: "#DC2626" },
  "Tạm ngưng": { bg: "#FFFBEB", text: "#D97706" },
};

const loaiTabs = [
  { key: "ALL", label: "Tất cả" },
  { key: "MON_AN", label: "Món ăn" },
  { key: "THUC_UONG", label: "Thức uống" },
  { key: "DICH_VU", label: "Dịch vụ" },
];

function InvoiceDetail({ invoiceId, onNavigate, chi_nhanh = [] }) {
  const [invoice, setInvoice] = useState(null);
  const [loadingInvoice, setLoadingInvoice] = useState(true);
  const [danhSachMonAn, setDanhSachMonAn] = useState([]);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("ALL");
  const [cartAdd, setCartAdd] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [loi, setLoi] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchDetail = useCallback(async () => {
    if (!invoiceId) {
      setLoadingInvoice(false);
      return;
    }
    setLoadingInvoice(true);
    try {
      setLoi(null);
      const data = await layChiTietHoaDon(invoiceId);
      setInvoice(data);
    } catch (err) {
      setLoi(
        err.response?.data?.message ||
          err.message ||
          "Không thể tải chi tiết hóa đơn!",
      );
    } finally {
      setLoadingInvoice(false);
    }
  }, [invoiceId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  // Khi hóa đơn chưa hoàn thành, tải thực đơn chi nhánh để nhân viên gọi thêm món
  useEffect(() => {
    if (invoice && invoice.trangThai !== "HOAN_THANH") {
      const branchId = invoice.maChiNhanh || chi_nhanh?.[0]?.maChiNhanh || 1;
      layDanhSachMatHangTaiChiNhanh(branchId)
        .then((data) => {
          setDanhSachMonAn(Array.isArray(data) ? data : []);
        })
        .catch(() => {
          setDanhSachMonAn([]);
        });
    }
  }, [invoice, chi_nhanh]);

  const addToCart = (food) => {
    if (food.trangThai && food.trangThai !== "Đang bán") return;
    setCartAdd((prev) => {
      const existing = prev.find((c) => c.foodId === food.maMatHang);
      if (existing) {
        return prev.map((c) =>
          c.foodId === food.maMatHang ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [
        ...prev,
        {
          foodId: food.maMatHang,
          name: food.tenMatHang,
          unitPrice: food.giaMatHang,
          quantity: 1,
        },
      ];
    });
  };

  const updateQty = (foodId, delta) => {
    setCartAdd((prev) =>
      prev
        .map((c) =>
          c.foodId === foodId
            ? { ...c, quantity: Math.max(1, c.quantity + delta) }
            : c,
        )
        .filter((c) => c.quantity > 0),
    );
  };

  const removeCartItem = (foodId) => {
    setCartAdd((prev) => prev.filter((c) => c.foodId !== foodId));
  };

  const handleSaveInvoice = async () => {
    if (!invoice?.maHoaDon) return;
    setActionLoading(true);
    setLoi(null);
    try {
      if (cartAdd.length > 0) {
        const payload = cartAdd.map((c) => ({
          maMatHang: Number(c.foodId),
          soLuong: Number(c.quantity),
        }));
        await goiThemMon(invoice.maHoaDon, payload);
      }
      setSuccessMsg("Đã lưu hóa đơn #" + invoice.maHoaDon + "!");
      setTimeout(() => {
        onNavigate?.("hoa_don");
      }, 700);
    } catch (e) {
      const msg =
        e.response?.data?.message || e.message || "Lỗi khi lưu hóa đơn!";
      setLoi(msg);
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  // Thanh toán: lưu món thêm trước (nếu có), sau đó thanh toán và quay lại danh sách
  const handleThanhToan = async () => {
    if (!invoice?.maHoaDon) return;
    if (!window.confirm("Xác nhận thanh toán hóa đơn #" + invoice.maHoaDon + "?")) {
      return;
    }
    setActionLoading(true);
    setLoi(null);
    try {
      if (cartAdd.length > 0) {
        const payload = cartAdd.map((c) => ({
          maMatHang: Number(c.foodId),
          soLuong: Number(c.quantity),
        }));
        await goiThemMon(invoice.maHoaDon, payload);
      }
      await thanhToanHoaDon(invoice.maHoaDon);
      setSuccessMsg("Thanh toán thành công hóa đơn #" + invoice.maHoaDon + "!");
      setTimeout(() => {
        onNavigate?.("hoa_don");
      }, 700);
    } catch (e) {
      const msg =
        e.response?.data?.message || e.message || "Lỗi khi thanh toán hóa đơn!";
      setLoi(msg);
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  const handleXoa = async () => {
    if (!invoice?.maHoaDon) return;
    if (!window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) return;
    setActionLoading(true);
    setLoi(null);
    try {
      await xoaHoaDon(invoice.maHoaDon);
      onNavigate?.("hoa_don");
    } catch (e) {
      const msg =
        e.response?.data?.message || e.message || "Lỗi khi xóa hóa đơn!";
      setLoi(msg);
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  if (!invoiceId || (loi && !invoice)) {
    return (
      <div className="p-6 max-w-3xl">
        <button
          onClick={() => onNavigate?.("hoa_don")}
          className="flex items-center gap-1.5 text-sm font-500 hover:text-[var(--primary)] transition-colors mb-4 cursor-pointer"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft size={15} /> Quay lại danh sách
        </button>
        <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
          {!invoiceId
            ? "Chưa chọn hóa đơn nào. Vui lòng chọn hóa đơn từ danh sách."
            : loi}
        </div>
      </div>
    );
  }

  if (loadingInvoice || !invoice) {
    return (
      <div
        className="p-8 text-center text-sm"
        style={{ color: "var(--muted-foreground)" }}
      >
        Đang tải thông tin hóa đơn...
      </div>
    );
  }

  const chiNhanhObj = chi_nhanh.find(
    (b) => b.maChiNhanh === invoice.maChiNhanh,
  );
  const tenChiNhanh =
    chiNhanhObj?.tenChiNhanh || "Chi nhánh #" + invoice.maChiNhanh;

  // =========================================================================
  // TRƯỜNG HỢP 1: HÓA ĐƠN ĐÃ HOÀN THÀNH -> XUẤT CHI TIẾT HÓA ĐƠN (PHIẾU THANH TOÁN)
  // =========================================================================
  if (invoice.trangThai === "HOAN_THANH") {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => onNavigate?.("hoa_don")}
            className="flex items-center gap-1.5 text-sm font-500 hover:text-[var(--primary)] transition-colors cursor-pointer"
            style={{ color: "var(--muted-foreground)" }}
          >
            <ArrowLeft size={15} /> Quay lại danh sách
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer hover:bg-gray-50"
            style={{ borderColor: "var(--border)" }}
          >
            <Printer size={14} /> In phiếu
          </button>
        </div>

        <div
          className="bg-white rounded-xl border shadow-xs overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="px-6 py-5 border-b flex items-center justify-between"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <div
                className="text-xs font-semibold"
                style={{ color: "var(--muted-foreground)" }}
              >
                Mã hóa đơn
              </div>
              <div
                className="text-xl font-bold"
                style={{ color: "var(--primary)" }}
              >
                #{invoice.maHoaDon}
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#16A34A]">
              <CheckCircle size={14} color="#16A34A" /> Hoàn thành
            </div>
          </div>

          <div
            className="px-6 py-4 border-b grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{
              borderColor: "var(--border)",
              background: "var(--secondary)",
            }}
          >
            <div className="flex items-start gap-2">
              <Building2
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: "var(--muted-foreground)" }}
              />
              <div>
                <div
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Chi nhánh
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {tenChiNhanh}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <LayoutGrid
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: "var(--muted-foreground)" }}
              />
              <div>
                <div
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Bàn phục vụ
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {invoice.maBan
                    ? "Bàn #" + invoice.maBan
                    : "Mang đi / Không bàn"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: "var(--muted-foreground)" }}
              />
              <div>
                <div
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Thời gian lập
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {dinhDangNgayGio(invoice.ngayLapHoaDon)}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <User
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: "var(--muted-foreground)" }}
              />
              <div>
                <div
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Khách hàng
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {invoice.maKhachHang
                    ? "KH #" + invoice.maKhachHang
                    : "Khách vãng lai"}
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-5">
            <div
              className="text-sm font-bold mb-3"
              style={{ color: "var(--foreground)" }}
            >
              Danh sách món ăn ({(invoice.listChiTietHoaDon || []).length} món)
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Món", "Đơn giá", "Số lượng", "Thành tiền"].map((h) => (
                    <th
                      key={h}
                      className="pb-2 text-left text-xs font-semibold"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(invoice.listChiTietHoaDon || []).map((item, idx) => (
                  <tr
                    key={item.maChiTietHoaDon || idx}
                    className="border-b last:border-0"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <td
                      className="py-3 text-sm font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.matHang?.tenMatHang}
                    </td>
                    <td
                      className="py-3 text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {dinhDangTien(item.matHang?.giaMatHang)}
                    </td>
                    <td className="py-3 text-sm font-semibold">
                      ×{item.soLuong}
                    </td>
                    <td
                      className="py-3 text-sm font-bold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {dinhDangTien(
                        item.soLuong * (item.matHang?.giaMatHang || 0),
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              className="mt-6 pt-4 border-t flex justify-between items-center"
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--muted-foreground)" }}
              >
                Tổng thanh toán:
              </span>
              <span
                className="text-xl font-bold"
                style={{ color: "var(--primary)" }}
              >
                {dinhDangTien(invoice.tongTien)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TRƯỜNG HỢP 2: HÓA ĐƠN CHƯA HOÀN THÀNH -> GIAO DIỆN CHỈNH TIẾP I CHANG TAOHOADON
  // =========================================================================
  const foods = danhSachMonAn.filter((f) => {
    if (catFilter !== "ALL" && f.loaiMatHang !== catFilter) return false;
    if (search && !f.tenMatHang?.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const tongTienGoiThem = cartAdd.reduce(
    (s, c) => s + c.unitPrice * c.quantity,
    0,
  );
  const tongThanhToanDuKien = (invoice.tongTien || 0) + tongTienGoiThem;
  const tongSoMonDaGoi = (invoice.listChiTietHoaDon || []).reduce(
    (s, i) => s + (i.soLuong || 0),
    0,
  );
  const tongSoMonGoiThem = cartAdd.reduce((s, c) => s + c.quantity, 0);

  return (
    <div className="flex h-full overflow-hidden">
      {/* CỘT TRÁI: Chọn Món & Bộ lọc thực đơn chi nhánh */}
      <div
        className="flex-1 flex flex-col border-r overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Thanh công cụ trên */}
        <div
          className="px-5 py-3 border-b flex items-center justify-between bg-white shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate?.("hoa_don")}
              className="flex items-center gap-1.5 text-sm font-500 hover:text-[var(--primary)] transition-colors cursor-pointer"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ArrowLeft size={15} /> Quay lại
            </button>
            <span style={{ color: "var(--border)" }}>|</span>
            <span
              className="text-sm font-700"
              style={{ color: "var(--foreground)" }}
            >
              POS – Phục Vụ Hóa Đơn #{invoice.maHoaDon}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-600 bg-amber-50 text-amber-700 border border-amber-200">
              Đang phục vụ
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-600 text-gray-700">
            <Building2 size={15} style={{ color: "var(--primary)" }} />
            <span>{tenChiNhanh}</span>
          </div>
        </div>

        {/* Ô Tìm kiếm & Tab Loại món */}
        <div
          className="px-5 py-2.5 border-b bg-white flex items-center gap-3 shrink-0 flex-wrap"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Tìm món ăn, thức uống..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs border rounded-lg pl-8 pr-3 py-1.5 w-60 outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white"
              style={{ borderColor: "var(--border)" }}
            />
          </div>

          <div className="flex items-center gap-1">
            {loaiTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setCatFilter(tab.key)}
                className="px-3 py-1 rounded-full text-xs font-600 transition-colors cursor-pointer"
                style={{
                  background:
                    catFilter === tab.key
                      ? "var(--primary)"
                      : "var(--secondary)",
                  color:
                    catFilter === tab.key
                      ? "white"
                      : "var(--secondary-foreground)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách món ăn */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {foods.map((food) => {
              const inAdd = cartAdd.find((c) => c.foodId === food.maMatHang);
              const unavailable =
                food.trangThai && food.trangThai !== "Đang bán";
              return (
                <button
                  key={food.maMatHang}
                  type="button"
                  onClick={() => addToCart(food)}
                  disabled={unavailable}
                  className="bg-white rounded-xl border text-left overflow-hidden transition-all disabled:opacity-60 hover:shadow-md relative group cursor-pointer"
                  style={{
                    borderColor: inAdd ? "var(--primary)" : "var(--border)",
                    boxShadow: inAdd ? "0 0 0 1.5px var(--primary)" : void 0,
                  }}
                >
                  <div className="relative h-28 overflow-hidden bg-[var(--secondary)]">
                    <img
                      src={food.anhMinhHoa}
                      alt={food.tenMatHang}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                      className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded font-600"
                      style={{
                        background: statusBg[food.trangThai]?.bg || "#F0FDF4",
                        color: statusBg[food.trangThai]?.text || "#16A34A",
                      }}
                    >
                      {food.trangThai || "Đang bán"}
                    </span>
                    {inAdd && (
                      <span
                        className="absolute top-2 left-2 w-5 h-5 rounded-full text-xs font-700 flex items-center justify-center text-white shadow"
                        style={{ background: "var(--primary)" }}
                      >
                        +{inAdd.quantity}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <div
                      className="text-xs font-700 leading-snug mb-1 truncate"
                      style={{ color: "var(--foreground)" }}
                    >
                      {food.tenMatHang}
                    </div>
                    <div
                      className="text-sm font-800 mt-1"
                      style={{ color: "var(--primary)" }}
                    >
                      {dinhDangTien(food.giaMatHang)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: Thông tin Bàn, Món đã phục vụ & Món gọi thêm */}
      <div className="w-96 shrink-0 flex flex-col bg-white">
        {/* Header Giỏ hàng */}
        <div
          className="px-5 py-3.5 border-b shrink-0 flex items-center justify-between"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={17} style={{ color: "var(--primary)" }} />
            <span
              className="text-sm font-700"
              style={{ color: "var(--foreground)" }}
            >
              Hóa đơn #{invoice.maHoaDon}
            </span>
          </div>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-700 text-white"
            style={{ background: "var(--primary)" }}
          >
            {tongSoMonDaGoi + tongSoMonGoiThem} món
          </span>
        </div>

        {/* Thông tin Bàn phục vụ */}
        <div
          className="p-3.5 border-b bg-gray-50/50 space-y-2 shrink-0 text-xs"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-600 text-gray-700">
              <LayoutGrid size={14} className="text-gray-400" /> Bàn phục vụ:
            </span>
            <span
              className="font-bold text-sm"
              style={{ color: "var(--primary)" }}
            >
              {invoice.maBan ? "Bàn #" + invoice.maBan : "Mang đi / Không bàn"}
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> Thời gian lập:
            </span>
            <span>{dinhDangNgayGio(invoice.ngayLapHoaDon)}</span>
          </div>
        </div>

        {/* Danh sách món ăn */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* PHẦN 1: MÓN ĐÃ GỌI (Đang phục vụ) */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center justify-between">
              <span>Món đã gọi ({tongSoMonDaGoi})</span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                Đã lên bàn
              </span>
            </div>
            {(invoice.listChiTietHoaDon || []).length === 0 ? (
              <div className="text-xs text-gray-400 italic py-2">
                Chưa có món nào trên bàn.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {(invoice.listChiTietHoaDon || []).map((item, idx) => (
                  <div
                    key={item.maChiTietHoaDon || idx}
                    className="py-2 flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="font-600 text-gray-900 truncate">
                        {item.matHang?.tenMatHang}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {dinhDangTien(item.matHang?.giaMatHang)} ×{" "}
                        <span className="font-bold text-gray-800">
                          {item.soLuong}
                        </span>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900 shrink-0">
                      {dinhDangTien(
                        (item.soLuong || 0) *
                          (item.matHang?.giaMatHang || 0),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PHẦN 2: MÓN GỌI THÊM MỚI (CHƯA LƯU) */}
          <div className="pt-2 border-t" style={{ borderColor: "var(--border)" }}>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center justify-between">
              <span>Món gọi thêm ({tongSoMonGoiThem})</span>
              {cartAdd.length > 0 && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                  Chưa lưu
                </span>
              )}
            </div>

            {cartAdd.length === 0 ? (
              <div className="p-3 rounded-lg border border-dashed text-center text-xs text-gray-400 bg-gray-50/50">
                Nhấn chọn món từ menu bên trái để gọi thêm món vào bàn
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {cartAdd.map((item) => (
                  <div
                    key={item.foodId}
                    className="py-2 flex items-center gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-gray-900 truncate">
                        {item.name}
                      </div>
                      <div
                        className="text-[11px] font-semibold mt-0.5"
                        style={{ color: "var(--primary)" }}
                      >
                        {dinhDangTien(item.unitPrice)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQty(item.foodId, -1)}
                        className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer text-gray-600"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <Minus size={10} />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.foodId, 1)}
                        className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer text-gray-600"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <Plus size={10} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeCartItem(item.foodId)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-50 text-red-500 transition-colors cursor-pointer ml-0.5"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TỔNG TIỀN & NÚT HÀNH ĐỘNG */}
        <div
          className="p-4 border-t bg-gray-50/50 space-y-3 shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Đã gọi:</span>
              <span>{dinhDangTien(invoice.tongTien)}</span>
            </div>
            {cartAdd.length > 0 && (
              <div className="flex justify-between font-semibold text-amber-700">
                <span>Gọi thêm (+):</span>
                <span>{dinhDangTien(tongTienGoiThem)}</span>
              </div>
            )}
            <div
              className="flex justify-between items-center pt-1.5 border-t font-bold text-sm"
              style={{ borderColor: "var(--border)" }}
            >
              <span style={{ color: "var(--foreground)" }}>
                Tổng thanh toán:
              </span>
              <span
                className="text-base font-extrabold"
                style={{ color: "var(--primary)" }}
              >
                {dinhDangTien(tongThanhToanDuKien)}
              </span>
            </div>
          </div>

          {successMsg && (
            <div className="flex items-center gap-1.5 justify-center text-xs font-bold text-green-700 bg-green-50 py-2 rounded-lg border border-green-200">
              <CheckCircle2 size={14} />
              {successMsg}
            </div>
          )}

          {loi && (
            <div className="flex items-center justify-center text-xs font-semibold text-red-700 bg-red-50 py-2 rounded-lg border border-red-200 text-center">
              {loi}
            </div>
          )}

          <div className="pt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveInvoice}
              disabled={actionLoading}
              className="flex-1 py-2.5 px-3 rounded-lg text-xs font-bold border-2 transition-all disabled:opacity-50 hover:bg-amber-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)",
                background: "white",
              }}
              title="Lưu các món gọi thêm và quay lại danh sách hóa đơn"
            >
              <Save size={14} />
              Lưu hóa đơn
            </button>

            <button
              type="button"
              onClick={handleThanhToan}
              disabled={actionLoading}
              className="flex-1 py-2.5 px-3 rounded-lg text-xs font-bold text-white transition-opacity disabled:opacity-50 hover:opacity-90 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              style={{ background: "var(--primary)" }}
              title="Thanh toán hoàn tất hóa đơn và giải phóng bàn"
            >
              <CreditCard size={14} />
              Thanh toán
            </button>
          </div>

          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={handleXoa}
              disabled={actionLoading}
              className="text-[11px] font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer transition-colors"
            >
              Hủy / Xóa hóa đơn này
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;
