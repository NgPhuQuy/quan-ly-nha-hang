import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { layDanhSachChiNhanh } from "../../../services/chiNhanh.service";
import apis, { endpoints } from "../../../services/apis";

const layThongTinTrangThai = (trangThai) => {
  if (trangThai === "het") {
    return {
      nhan: "Hết chỗ",
      mauDot: "bg-rose-500 shadow-xs shadow-rose-500",
      mauChu: "text-rose-300",
      borderBg: "border-rose-500/40 bg-rose-950/80 shadow-rose-950/50",
    };
  }
  if (trangThai === "it") {
    return {
      nhan: "Sắp hết chỗ",
      mauDot: "bg-amber-400 animate-pulse shadow-xs shadow-amber-400",
      mauChu: "text-amber-300",
      borderBg: "border-amber-500/40 bg-amber-950/80 shadow-amber-950/50",
    };
  }
  return {
    nhan: "Còn chỗ",
    mauDot: "bg-emerald-400 shadow-xs shadow-emerald-400",
    mauChu: "text-emerald-300",
    borderBg: "border-emerald-500/30 bg-black/75 shadow-black/50",
  };
};

function BranchSection({ onDatBan }) {
  const [chiNhanhs, setChiNhanhs] = useState([]);
  const [trangThaiMap, setTrangThaiMap] = useState({});

  useEffect(() => {
    layDanhSachChiNhanh()
      .then(async (res) => {
        const danhSach = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
            ? res.data
            : [];
        setChiNhanhs(danhSach);

        const today = new Date().toLocaleDateString("en-CA");
        const map = {};

        await Promise.all(
          danhSach.map(async (cn) => {
            const id = cn.maChiNhanh ?? cn.id;
            try {
              const res = await apis.get(endpoints.khung_gio(id, today));
              const slots = res.data || [];
              // Mặc định mỗi chi nhánh có 50 đơn có thể đặt
              if (!slots || slots.length === 0) {
                map[id] = "con";
              } else {
                const allFull = slots.every((s) => s.trangThai === "het");
                const hasScarce = slots.some(
                  (s) => s.trangThai === "it" || s.trangThai === "het",
                );
                if (allFull) {
                  map[id] = "het";
                } else if (hasScarce) {
                  map[id] = "it";
                } else {
                  map[id] = "con";
                }
              }
            } catch {
              map[id] = "con";
            }
          }),
        );
        setTrangThaiMap(map);
      })
      .catch(console.error);
  }, []);

  return (
    <section
      id="branches"
      className="px-4 py-24 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg shadow-amber-950/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Hệ Thống Ẩm Thực</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-4 leading-tight">
            Không Gian & Chi Nhánh
          </h2>

          <p className="text-sm sm:text-base text-amber-200/70 font-light leading-relaxed">
            Tọa lạc tại các vị trí đắc địa nhất, mỗi không gian của L'Délice
            mang đến một trải nghiệm kiến trúc và ẩm thực độc bản.
          </p>

          <div className="my-5 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-sm shadow-amber-400" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {(Array.isArray(chiNhanhs) ? chiNhanhs : []).map((chiNhanh) => {
            return (
              <article
                key={chiNhanh.maChiNhanh}
                className="group flex flex-col rounded-3xl overflow-hidden bg-gradient-to-b from-[#181109]/90 to-[#0e0904]/95 border border-amber-500/25 hover:border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(212,150,43,0.18)] transition-all duration-300 backdrop-blur-md"
              >
                {/* Branch Image */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-[#1a120a]">
                  <img
                    src={chiNhanh.anhChiNhanh}
                    alt={chiNhanh.tenChiNhanh}
                    className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181109] via-transparent to-black/30" />

                  {/* Status Badge */}
                  <span className="absolute top-3.5 right-3.5 text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-950/85 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-md">
                    Đang mở cửa
                  </span>

                  {/* Booking Availability Badge */}
                  {(() => {
                    const statusInfo = layThongTinTrangThai(
                      trangThaiMap[chiNhanh.maChiNhanh] || "con",
                    );
                    return (
                      <div
                        className={`absolute bottom-3.5 left-3.5 flex items-center gap-2 text-xs px-3 py-1 rounded-xl backdrop-blur-md border shadow-md transition-colors ${statusInfo.borderBg} ${statusInfo.mauChu}`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${statusInfo.mauDot}`}
                        />
                        <span className="font-medium">{statusInfo.nhan}</span>
                      </div>
                    );
                  })()}
                </div>

                {/* Branch Details */}
                <div className="p-6 flex flex-1 flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-2.5">
                      {chiNhanh.tenChiNhanh}
                    </h3>

                    {/* Amenities tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/25 font-medium">
                        Phòng VIP tiệc riêng
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/25 font-medium">
                        Hầm rượu Sommelier
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/25 font-medium">
                        Đỗ xe Valet
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-amber-200/70">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{chiNhanh.diaChi}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-mono">{chiNhanh.soDienThoai}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>10:30 – 22:30 hàng ngày</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between">
                    <button
                      onClick={onDatBan}
                      className="w-full btn-primary rounded-xl py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-amber-950/50 group-hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      <span>Đặt bàn tại chi nhánh này</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BranchSection;
