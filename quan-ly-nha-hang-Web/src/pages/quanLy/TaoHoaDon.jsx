
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  Building2,
  LayoutGrid,
  User,
  Phone,
  Tag,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { layDanhSachBan } from "../../services/banAn.service";
import { taoHoaDon } from "../../services/hoaDon.service";
import { layDanhSachMatHang } from "../../services/matHang.service";
import { dinhDangTien } from "../../utils/dinhDang";

const statusBg = {
  "Đang bán": { bg: "#F0FDF4", text: "#16A34A" },
  "Hết món": { bg: "#FEF2F2", text: "#DC2626" },
  "Tạm ngưng": { bg: "#FFFBEB", text: "#D97706" },
};

function CreateInvoice({ onNavigate, branches = [] }) {
  const [allFoods, setAllFoods] = useState([]);
  const [tables, setTables] = useState([]);
  const [promotions] = useState([]);

  // Form states
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedTableId, setSelectedTableId] = useState("");
  const [customerName, setCustomerName] = useState("Khách vãng lai");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedPromo, setSelectedPromo] = useState("");

  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("ALL");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (branches.length > 0 && !selectedBranchId) {
      setSelectedBranchId(branches[0].maChiNhanh);
    }
  }, [branches, selectedBranchId]);

  // Load danh sách mặt hàng
  useEffect(() => {
    layDanhSachMatHang()
      .then((data) => {
        setAllFoods(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setAllFoods([]);
      });
  }, []);

  // Khi chọn chi nhánh -> load danh sách bàn trống của chi nhánh đó
  useEffect(() => {
    if (selectedBranchId) {
      layDanhSachBan(selectedBranchId)
        .then((res) => {
          setTables(Array.isArray(res) ? res : []);
        })
        .catch(() => setTables([]));
    }
  }, [selectedBranchId]);

  const loaiTabs = [
    { key: "ALL", label: "Tất cả" },
    { key: "MON_AN", label: "Món ăn" },
    { key: "THUC_UONG", label: "Thức uống" },
    { key: "DICH_VU", label: "Dịch vụ" },
  ];

  const foods = allFoods.filter((f) => {
    if (catFilter !== "ALL" && f.loaiMatHang !== catFilter) return false;
    if (search && !f.tenMatHang?.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const addToCart = (food) => {
    if (food.trangThai && food.trangThai !== "Đang bán") return;
    setCart((prev) => {
      const existing = prev.find((c) => c.foodId === food.maMatHang);
      if (existing)
        return prev.map((c) =>
          c.foodId === food.maMatHang ? { ...c, quantity: c.quantity + 1 } : c,
        );
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
    setCart((prev) =>
      prev
        .map((c) =>
          c.foodId === foodId
            ? { ...c, quantity: Math.max(1, c.quantity + delta) }
            : c,
        )
        .filter((c) => c.quantity > 0),
    );
  };

  const remove = (foodId) =>
    setCart((prev) => prev.filter((c) => c.foodId !== foodId));

  const subTotal = cart.reduce((s, c) => s + c.unitPrice * c.quantity, 0);

  // Tính giảm giá nếu có mã khuyến mãi
  let discountAmount = 0;
  if (selectedPromo) {
    const promo = promotions.find(
      (p) => String(p.maKhuyenMaiId) === String(selectedPromo),
    );
    if (promo) {
      if (promo.type.includes("%")) {
        const pct = parseFloat(promo.value) || 0;
        discountAmount = (subTotal * pct) / 100;
      } else {
        discountAmount = parseFloat(promo.value) || 0;
      }
    }
  }
  const total = Math.max(0, subTotal - discountAmount);

  const handleCreate = async (trangThaiHoaDon = "Chờ xử lý") => {
    if (cart.length === 0) {
      alert("Vui lòng chọn ít nhất một món ăn!");
      return;
    }
    if (!selectedBranchId) {
      alert("Vui lòng chọn chi nhánh!");
      return;
    }

    setLoading(true);
    try {
      await taoHoaDon({
        maChiNhanh: Number(selectedBranchId),
        maBan: selectedTableId ? Number(selectedTableId) : null,
        tenKhachHang: customerName || "Khách vãng lai",
        soDienThoai: customerPhone || null,
        nguon: "WALK_IN",
        trangThai: trangThaiHoaDon,
        items: cart.map((c) => ({
          maMatHang: typeof c.foodId === "number" ? c.foodId : 1,
          soLuong: c.quantity,
          donGia: c.unitPrice,
        })),
      });

      setSuccessMsg(
        trangThaiHoaDon === "Hoàn thành"
          ? "Thanh toán thành công!"
          : "Tạo hóa đơn thành công!",
      );
      setTimeout(() => {
        setSuccessMsg("");
        setCart([]);
        onNavigate("invoices");
      }, 1000);
    } catch (e) {
      alert(e.response?.data?.message || "Có lỗi xảy ra khi tạo hóa đơn! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Cột trái: Chọn Món & Bộ lọc */}
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
              onClick={() => onNavigate("invoices")}
              className="flex items-center gap-1.5 text-sm font-500 hover:text-[var(--primary)] transition-colors"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ArrowLeft size={15} /> Quay lại
            </button>
            <span style={{ color: "var(--border)" }}>|</span>
            <span
              className="text-sm font-700"
              style={{ color: "var(--foreground)" }}
            >
              POS – Tạo Hóa Đơn Bán Hàng
            </span>
          </div>

          {/* Chọn Chi nhánh phục vụ */}
          <div className="flex items-center gap-2">
            <Building2 size={15} style={{ color: "var(--primary)" }} />
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="text-xs font-600 border rounded-lg px-2.5 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
              style={{ borderColor: "var(--border)" }}
            >
              {branches.map((b) => (
                <option key={b.maChiNhanh} value={b.maChiNhanh}>
                  {b.tenChiNhanh}
                </option>
              ))}
            </select>
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
              const inCart = cart.find((c) => c.foodId === food.maMatHang);
              const unavailable = food.trangThai && food.trangThai !== "Đang bán";
              return (
                <button
                  key={food.maMatHang}
                  onClick={() => addToCart(food)}
                  disabled={unavailable}
                  className="bg-white rounded-xl border text-left overflow-hidden transition-all disabled:opacity-60 hover:shadow-md relative group"
                  style={{
                    borderColor: inCart ? "var(--primary)" : "var(--border)",
                    boxShadow: inCart ? "0 0 0 1.5px var(--primary)" : void 0,
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
                    {inCart && (
                      <span
                        className="absolute top-2 left-2 w-5 h-5 rounded-full text-xs font-700 flex items-center justify-center text-white shadow"
                        style={{ background: "var(--primary)" }}
                      >
                        {inCart.quantity}
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

      {/* Cột phải: Thông tin Bàn, Khách hàng, Giỏ hàng & Thanh toán */}
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
              Chi tiết Đơn hàng
            </span>
          </div>
          {cart.length > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-700 text-white"
              style={{ background: "var(--primary)" }}
            >
              {cart.reduce((s, c) => s + c.quantity, 0)} món
            </span>
          )}
        </div>

        {/* Thông tin Bàn & Khách hàng */}
        <div
          className="p-3.5 border-b bg-gray-50/50 space-y-2.5 shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Chọn Bàn */}
          <div className="flex items-center gap-2">
            <LayoutGrid size={14} className="text-gray-400 shrink-0" />
            <div className="flex-1">
              <select
                value={selectedTableId}
                onChange={(e) => setSelectedTableId(e.target.value)}
                className="w-full text-xs border rounded-lg px-2.5 py-1.5 outline-none bg-white font-600 focus:ring-2 focus:ring-[var(--primary)]"
                style={{ borderColor: "var(--border)" }}
              >
                <option value="">-- Mang về / Không chọn bàn --</option>
                {tables.map((t) => (
                  <option key={t.maBan} value={t.maBan}>
                    {t.soBan} ({t.sucChua} chỗ - {t.trangThai})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tên khách & SĐT */}
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <User
                size={12}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Tên khách hàng"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full text-xs border rounded-lg pl-7 pr-2 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
                style={{ borderColor: "var(--border)" }}
              />
            </div>
            <div className="relative">
              <Phone
                size={12}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full text-xs border rounded-lg pl-7 pr-2 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
                style={{ borderColor: "var(--border)" }}
              />
            </div>
          </div>

          {/* Chọn Khuyến mãi */}
          <div className="flex items-center gap-2">
            <Tag size={13} className="text-gray-400 shrink-0" />
            <select
              value={selectedPromo}
              onChange={(e) => setSelectedPromo(e.target.value)}
              className="w-full text-xs border rounded-lg px-2.5 py-1.5 outline-none bg-white focus:ring-2 focus:ring-[var(--primary)]"
              style={{ borderColor: "var(--border)" }}
            >
              <option value="">-- Không áp dụng khuyến mãi --</option>
              {promotions.map((p) => (
                <option key={p.maKhuyenMaiId} value={p.maKhuyenMaiId}>
                  {p.name} ({p.type} {p.value})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Danh sách món trong giỏ */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-center py-8">
              <ShoppingBag size={32} style={{ color: "var(--border)" }} />
              <p
                className="text-xs font-500"
                style={{ color: "var(--muted-foreground)" }}
              >
                Chưa có món nào được chọn
              </p>
              <p
                className="text-[11px]"
                style={{ color: "var(--muted-foreground)" }}
              >
                Nhấn vào món ăn từ danh mục bên trái để thêm vào hóa đơn
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {cart.map((item) => (
                <div
                  key={item.foodId}
                  className="flex items-center gap-2.5 py-2 border-b last:border-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-700 truncate"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="text-[11px] font-600 mt-0.5"
                      style={{ color: "var(--primary)" }}
                    >
                      {dinhDangTien(item.unitPrice)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => updateQty(item.foodId, -1)}
                      className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100 transition-colors"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <Minus size={10} />
                    </button>
                    <span
                      className="w-6 text-center text-xs font-700"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.foodId, 1)}
                      className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100 transition-colors"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => remove(item.foodId)}
                      className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-50 text-red-500 transition-colors ml-0.5"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tổng tiền & Nút hành động */}
        <div
          className="p-4 border-t bg-gray-50/50 space-y-3 shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="space-y-1.5 text-xs">
            <div
              className="flex justify-between"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span>Tạm tính:</span>
              <span>{dinhDangTien(subTotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600 font-600">
                <span>Giảm giá:</span>
                <span>-{dinhDangTien(discountAmount)}</span>
              </div>
            )}
            <div
              className="flex justify-between items-center pt-1.5 border-t font-700 text-sm"
              style={{ borderColor: "var(--border)" }}
            >
              <span style={{ color: "var(--foreground)" }}>
                Tổng thanh toán:
              </span>
              <span
                className="text-base font-800"
                style={{ color: "var(--primary)" }}
              >
                {dinhDangTien(total)}
              </span>
            </div>
          </div>

          {successMsg && (
            <div className="flex items-center gap-1.5 justify-center text-xs font-700 text-green-700 bg-green-50 py-2 rounded-lg border border-green-200">
              <CheckCircle2 size={14} />
              {successMsg}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleCreate("Chờ xử lý")}
              disabled={cart.length === 0 || loading}
              className="py-2.5 rounded-lg text-xs font-700 border transition-all disabled:opacity-50 hover:bg-gray-100"
              style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
            >
              Lưu Đơn (Chờ xử lý)
            </button>
            <button
              onClick={() => handleCreate("Hoàn thành")}
              disabled={cart.length === 0 || loading}
              className="py-2.5 rounded-lg text-xs font-700 text-white transition-opacity disabled:opacity-50 hover:opacity-90 flex items-center justify-center gap-1.5"
              style={{ background: "var(--primary)" }}
            >
              <CreditCard size={14} />
              Thanh Toán Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateInvoice;
