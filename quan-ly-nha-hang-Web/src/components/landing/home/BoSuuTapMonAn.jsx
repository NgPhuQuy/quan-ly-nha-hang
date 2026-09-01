import { useState, useEffect, useRef } from "react";
import { ANH } from "../../../assets/anh";
import { layTatCaMonAn } from "../../../services/monAn.service";
import {
  Utensils,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const SIGNATURE_FALLBACK = [
  {
    id: 1,
    ten: "Tôm Hùm Alaska Nướng Phô Mai",
    moTa: "Tôm hùm tươi sống đút lò phô mai Mozzarella hảo hạng và sốt bơ tỏi.",
    gia: 1250000,
    anh: ANH.monAn1,
    nhom: "Hải sản",
    isSignature: true,
  },
  {
    id: 2,
    ten: "Bò Wagyu A5 Nướng Đá Nóng",
    moTa: "Thịt bò Wagyu vân mỡ cẩm thạch A5 nướng trên đá nham thạch Nhật Bản.",
    gia: 1850000,
    anh: ANH.monAn2,
    nhom: "Món chính",
    isSignature: true,
  },
  {
    id: 3,
    ten: "Lẩu Nấm Hoàng Gia 5S",
    moTa: "Nước cốt xương hầm 24 giờ cùng các loại nấm quý tự nhiên bồi bổ sức khỏe.",
    gia: 890000,
    anh: ANH.monAn3,
    nhom: "Món chính",
    isSignature: false,
  },
  {
    id: 4,
    ten: "Hải Sản Áp Chảo Sốt Bơ Chanh",
    moTa: "Cồi sò điệp Hokkaido & vẹm xanh New Zealand hòa quyện sốt bơ chanh thảo mộc.",
    gia: 650000,
    anh: ANH.monAn4,
    nhom: "Hải sản",
    isSignature: false,
  },
  {
    id: 5,
    ten: "Sashimi Tổng Hợp Premium",
    moTa: "Cá hồi Na Uy, cá ngừ vây xanh, bạch tuộc & trứng cá hồi nhập khẩu.",
    gia: 980000,
    anh: ANH.monAn5,
    nhom: "Khai vị",
    isSignature: true,
  },
  {
    id: 6,
    ten: "Salad Cá Hồi Xông Khói",
    moTa: "Rau rocket hữu cơ, cá hồi xông khói gỗ sồi, sốt giấm balsamic Ý.",
    gia: 320000,
    anh: ANH.monMenu1,
    nhom: "Khai vị",
    isSignature: false,
  },
  {
    id: 7,
    ten: "Rượu Vang Đỏ Chateau Margaux",
    moTa: "Hương vị nồng nàn của trái cây chín mọng, gỗ sồi và gia vị quý phái.",
    gia: 2450000,
    anh: ANH.monMenu5,
    nhom: "Thức uống",
    isSignature: true,
  },
];

function DishCollection({ onDatBan }) {
  const [selectedCat, setSelectedCat] = useState("Tất cả");
  const [items, setItems] = useState(SIGNATURE_FALLBACK);
  const sliderRef = useRef(null);

  useEffect(() => {
    layTatCaMonAn().then((res) => {
      if (res && res.length > 0) {
        setItems(
          res.map((m, idx) => ({
            id: m.maMatHang || m.id || idx + 1,
            ten: m.tenMatHang || m.name || "Món ăn",
            moTa: m.moTa || m.description || "Món ngon tinh hoa ẩm thực 5 sao",
            gia: Number(m.gia ?? m.price ?? 0),
            anh:
              m.anh ||
              m.image ||
              SIGNATURE_FALLBACK[idx % SIGNATURE_FALLBACK.length].anh,
            nhom:
              m.loaiMatHang === "THUC_UONG"
                ? "Thức uống"
                : m.loaiMatHang === "DICH_VU"
                  ? "Dịch vụ"
                  : m.nhom || m.category || "Món chính",
            isSignature: idx < 3,
          })),
        );
      }
    });
  }, []);

  const categories = [
    "Tất cả",
    ...new Set(items.map((i) => i.nhom).filter(Boolean)),
  ];

  const filteredItems =
    selectedCat === "Tất cả"
      ? items
      : items.filter((i) => i.nhom === selectedCat);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 340;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="menu"
      className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0704] via-[#130d07] to-[#0c0804] relative overflow-hidden scroll-mt-16"
    >
      {/* Atmosphere Texture Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15 mix-blend-luminosity overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1920&q=80"
          alt="Nghệ thuật ẩm thực cao cấp"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0704] via-[#130d07]/90 to-[#0c0804]" />
      </div>

      {/* Luxury Golden Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,150,43,0.1),_transparent_75%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg shadow-amber-950/40">
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
            <span>Món Ngon Đặc Sắc</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-3 leading-tight">
            Mỗi Món Ăn Là Một Tuyệt Tác
          </h2>

          <p className="text-xs sm:text-sm text-amber-200/70 font-light leading-relaxed">
            Sự kết hợp hoàn mỹ giữa nguyên liệu nhập khẩu tươi sống cùng kỹ nghệ
            chế biến đỉnh cao từ đội ngũ đầu bếp 5 sao.
          </p>

          <div className="my-4 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-sm shadow-amber-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>

          {/* Category Tabs & Slider Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-2">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 mx-auto sm:mx-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCat === cat
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-900/50 font-bold scale-105"
                      : "bg-white/5 text-amber-200/70 hover:bg-white/10 hover:text-amber-200 border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Next / Prev Navigation Controls */}
            <div className="hidden sm:flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => scrollSlider("left")}
                className="w-9 h-9 rounded-full bg-white/5 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/20 text-amber-300 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                title="Xem món trước"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollSlider("right")}
                className="w-9 h-9 rounded-full bg-white/5 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/20 text-amber-300 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                title="Xem món tiếp theo"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Fixed-Height Showcase Carousel */}
        <div className="relative">
          {/* Scrollable Container with Smooth Touch / Mouse Drag */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredItems.map((dish) => (
              <article
                key={dish.id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start flex flex-col rounded-3xl overflow-hidden bg-gradient-to-b from-[#181109]/95 to-[#0e0904]/98 border border-amber-500/25 hover:border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(212,150,43,0.22)] transition-all duration-300 backdrop-blur-md group"
              >
                {/* Dish Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1a120a]">
                  <img
                    src={dish.anh}
                    alt={dish.ten}
                    className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181109] via-transparent to-black/40" />

                  {dish.isSignature && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-black shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-black fill-black" /> Signature
                    </span>
                  )}

                  <span className="absolute bottom-3 left-3 text-[11px] text-amber-300 font-semibold px-2.5 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-amber-500/30">
                    {dish.nhom}
                  </span>
                </div>

                {/* Dish Content */}
                <div className="p-5 flex flex-1 flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-1.5">
                      {dish.ten}
                    </h3>
                    <p className="text-xs text-amber-200/60 font-light line-clamp-2 leading-relaxed">
                      {dish.moTa}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-amber-500/15 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-amber-200/50 block uppercase tracking-wider">
                        Giá phục vụ
                      </span>
                      <span className="font-serif text-base font-bold text-amber-300">
                        {dish.gia.toLocaleString("vi-VN")} đ
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={onDatBan}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-400 hover:text-black border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer group-hover:bg-amber-400 group-hover:text-black"
                    >
                      <span>Đặt bàn</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom helper text for mobile swipe */}
          <div className="text-center sm:hidden mt-3 text-[11px] text-amber-200/40">
            ← Vuốt ngang để khám phá thêm món →
          </div>
        </div>
      </div>
    </section>
  );
}

export default DishCollection;
