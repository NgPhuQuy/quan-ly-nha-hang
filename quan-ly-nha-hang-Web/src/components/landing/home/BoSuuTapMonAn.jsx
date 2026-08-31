import { useState, useEffect } from "react";
import { ANH } from "../../../assets/anh";
import { layTatCaMonAn } from "../../../services/monAn.service";
import { Utensils, Star, Sparkles } from "lucide-react";

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
];

function DishCollection() {
  const [selectedCat, setSelectedCat] = useState("Tất cả");
  const [items, setItems] = useState(SIGNATURE_FALLBACK);

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
            nhom: m.nhom || m.category || "Món chính",
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

  return (
    <section
      id="menu"
      className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0704] via-[#130d07] to-[#0c0804] relative overflow-hidden min-h-screen flex flex-col justify-center snap-start scroll-mt-16"
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
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg shadow-amber-950/40">
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
            <span>Món Ngon Đặc Sắc</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-4 leading-tight">
            Mỗi Món Ăn Là Một Tuyệt Tác
          </h2>

          <p className="text-sm sm:text-base text-amber-200/70 font-light leading-relaxed">
            Sự kết hợp hoàn mỹ giữa nguyên liệu nhập khẩu tươi sống cùng kỹ nghệ
            chế biến đỉnh cao từ đội ngũ đầu bếp 5 sao.
          </p>

          <div className="my-5 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-sm shadow-amber-400" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCat === cat
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-900/50 font-bold scale-105"
                    : "bg-white/5 text-amber-200/70 hover:bg-white/10 hover:text-amber-200 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {filteredItems.map((dish) => (
            <article
              key={dish.id}
              className="group flex flex-col rounded-3xl overflow-hidden bg-gradient-to-b from-[#181109]/90 to-[#0e0904]/95 border border-amber-500/25 hover:border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(212,150,43,0.18)] transition-all duration-300 backdrop-blur-md"
            >
              {/* Dish Image */}
              <div className="relative h-56 overflow-hidden bg-[#1a120a]">
                <img
                  src={dish.anh}
                  alt={dish.ten}
                  className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181109] via-transparent to-black/30" />

                {dish.isSignature && (
                  <span className="absolute top-3.5 right-3.5 text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500 text-black shadow-lg flex items-center gap-1 font-sans">
                    <Sparkles className="w-3 h-3 text-black fill-black" /> Signature
                  </span>
                )}

                <span className="absolute bottom-3.5 left-3.5 text-xs text-amber-300 font-semibold px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-amber-500/30">
                  {dish.nhom}
                </span>
              </div>

              {/* Dish Content */}
              <div className="p-6 flex flex-1 flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1 mb-2">
                    {dish.ten}
                  </h3>
                  <p className="text-xs text-amber-200/60 font-light line-clamp-2 leading-relaxed">
                    {dish.moTa}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-amber-200/50 block uppercase tracking-wider">
                      Giá phục vụ
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-amber-300">
                      {dish.gia.toLocaleString("vi-VN")} đ
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>5.0</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DishCollection;
