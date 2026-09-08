import { useState } from "react";
import {
  Search,
  ArrowLeft,
  ChevronRight,
  Plus,
  Minus,
  Info,
} from "lucide-react";

function MenuSelection({
  menuItems,
  nhomMenu,
  setNhomMenu,
  selectedItems,
  setSelectedItems,
  onTiepTuc,
  onQuayLai,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const loaiTabs = [
    { key: "ALL", label: "Tất cả" },
    { key: "MON_AN", label: "Món ăn" },
    { key: "THUC_UONG", label: "Thức uống" },
    { key: "DICH_VU", label: "Dịch vụ" },
  ];

  const filteredItems = menuItems.filter((mon) => {
    const matchesSearch =
      !searchQuery ||
      mon.tenMatHang?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getSoLuong = (maMatHang) =>
    selectedItems.find((item) => (item.maMatHang || item.monAnId) === maMatHang)?.soLuong || 0;

  const tangSoLuong = (mon) =>
    setSelectedItems((items) => {
      const id = mon.maMatHang;
      const daCo = items.find((item) => (item.maMatHang || item.monAnId) === id);

      if (daCo) {
        return items.map((item) =>
          (item.maMatHang || item.monAnId) === id
            ? { ...item, soLuong: item.soLuong + 1 }
            : item,
        );
      }

      return [
        ...items,
        {
          maMatHang: id,
          monAnId: id,
          soLuong: 1,
          tenMatHang: mon.tenMatHang,
          giaMatHang: mon.giaMatHang,
        },
      ];
    });

  const giamSoLuong = (mon) =>
    setSelectedItems((items) => {
      const id = mon.maMatHang;
      return items
        .map((item) =>
          (item.maMatHang || item.monAnId) === id
            ? { ...item, soLuong: item.soLuong - 1 }
            : item,
        )
        .filter((item) => item.soLuong > 0);
    });

  const totalPreorderItems = selectedItems.reduce(
    (sum, item) => sum + item.soLuong,
    0,
  );
  return (
    <div className="rounded-3xl p-5 sm:p-8 bg-black/40 border border-amber-500/20 backdrop-blur-md shadow-2xl space-y-6">
      <div>
        <div className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
          Giai đoạn III / V
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
          Đặt Trước Món Ăn
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-amber-200/60 mt-1">
          <Info size={13} className="text-amber-400 shrink-0" />
          <span>
            Quý khách có thể chọn món trước để nhà hàng chuẩn bị sẵn, hoặc bỏ
            qua để gọi món tại bàn.
          </span>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-3 pt-1">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/60"
          />
          <input
            type="text"
            placeholder="Tìm kiếm món ăn, thức uống..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-amber-100 placeholder:text-amber-200/30 outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {loaiTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setNhomMenu(tab.key)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                nhomMenu === tab.key
                  ? "bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20"
                  : "bg-white/5 text-amber-200/70 border border-white/10 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Food items list */}
      <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
        {filteredItems.length === 0 && (
          <div className="py-12 text-center text-xs text-amber-200/40">
            Không tìm thấy món ăn phù hợp với từ khóa "{searchQuery}"
          </div>
        )}

        {filteredItems.map((mon) => {
          const qty = getSoLuong(mon.maMatHang);
          return (
            <div
              key={mon.maMatHang}
              className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all duration-200 ${
                qty > 0
                  ? "bg-amber-500/10 border-amber-400/60"
                  : "bg-white/5 border-white/10 hover:border-amber-500/30"
              }`}
            >
              <img
                src={mon.anhMinhHoa || "/food-placeholder.png"}
                alt={mon.tenMatHang}
                className="w-16 h-16 object-cover rounded-xl border border-white/10"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-sm sm:text-base font-bold text-amber-100 leading-snug">
                  {mon.tenMatHang}
                </h4>
                <div className="mt-1.5 font-serif text-xs sm:text-sm font-bold text-amber-300">
                  {Number(mon.giaMatHang || 0).toLocaleString("vi-VN")}₫
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 bg-black/40 p-1.5 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => giamSoLuong(mon)}
                  disabled={!qty}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-amber-500/20 text-amber-300 disabled:opacity-20 flex items-center justify-center transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="w-6 text-center font-bold text-xs sm:text-sm text-amber-100">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => tangSoLuong(mon)}
                  className="w-7 h-7 rounded-lg bg-amber-400 text-black hover:bg-amber-300 flex items-center justify-center font-bold transition-colors"
                >
                  <Plus size={13} strokeWidth={3} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-amber-500/20 flex items-center gap-3">
        <button
          type="button"
          onClick={onQuayLai}
          className="px-6 py-3.5 rounded-2xl border border-white/15 text-amber-200/80 hover:text-amber-100 hover:bg-white/5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Quay lại</span>
        </button>

        <button
          type="button"
          onClick={onTiepTuc}
          className="flex-1 btn-primary rounded-2xl py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-900/40 hover:scale-[1.01] transition-transform"
        >
          <span>
            {totalPreorderItems > 0
              ? `Tiếp tục (${totalPreorderItems} món đã chọn)`
              : "Tiếp tục (Gọi món tại bàn)"}
          </span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default MenuSelection;
