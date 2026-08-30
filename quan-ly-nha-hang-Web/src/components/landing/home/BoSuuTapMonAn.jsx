import { useState, useEffect } from "react";
import { ANH } from "../../../assets/anh";
import { layTatCaMonAn } from "../../../services/monAn.service";
import { Sparkles, Utensils, Star } from "lucide-react";

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

import { dinhDangTien } from "../../../utils/dinhDang";

function MenuGallery() {
  const [items, setItems] = useState(SIGNATURE_FALLBACK);
  const [selectedCat, setSelectedCat] = useState("Tất cả");

  useEffect(() => {
    layTatCaMonAn().then((data) => {
      if (data && data.length > 0) {
        setItems(
          data.map((m, idx) => ({
            id: m.id || idx + 1,
            ten: m.ten || m.name || "Món ngon 5S",
            moTa:
              m.moTa ||
              m.description ||
              "Chế biến từ nguyên liệu tươi thượng hạng mỗi ngày.",
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
      className="px-4 py-20 sm:px-6 lg:px-8 bg-[#0c0905] relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Utensils size={12} />
            <span>Món Ngon Đặc Sắc</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-4 leading-tight">
            Mỗi Món Ăn Là Một Tuyệt Tác
          </h2>

          <p className="text-sm sm:text-base text-amber-200/60 font-light">
            Sự kết hợp hoàn mỹ giữa nguyên liệu nhập khẩu tươi sống cùng kỹ nghệ
            chế biến đỉnh cao từ đội ngũ đầu bếp 5 sao.
          </p>

          <div className="my-4 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/40" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/40" />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCat === cat
                    ? "bg-amber-400 text-black shadow-lg shadow-amber-500/20 font-bold"
                    : "bg-white/5 text-amber-200/70 hover:bg-white/10 hover:text-amber-200 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-black/40 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 backdrop-blur-xs hover:shadow-xl hover:shadow-amber-950/30"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1a120a]">
                <img
                  src={item.anh}
                  alt={item.ten}
                  className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {item.isSignature && (
                  <span className="absolute top-3 left-3 flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/90 text-black backdrop-blur-md shadow-md">
                    <Star size={11} className="fill-black" /> Signature
                  </span>
                )}

                <div className="absolute bottom-3 right-3 text-sm sm:text-base font-serif font-bold text-amber-300 bg-black/70 px-3 py-1 rounded-lg border border-amber-500/30 backdrop-blur-md">
                  {dinhDangTien(item.gia)}
                </div>
              </div>

              <div className="p-4 sm:p-5 flex flex-1 flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {item.ten}
                  </h3>
                  <p className="text-xs text-amber-200/60 line-clamp-2 mt-1 leading-relaxed">
                    {item.moTa}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-500/10 flex items-center justify-between text-xs">
                  <span className="text-amber-400/80 font-medium">
                    {item.nhom}
                  </span>
                  <span className="text-[11px] text-amber-200/40">
                    Phục vụ hàng ngày
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuGallery;
