import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Users,
  Clock,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { layDanhSachChiNhanh } from "../../../services/chiNhanh.service";

function BranchSection({ onDatBan }) {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    layDanhSachChiNhanh()
      .then((data) => {
        if (data && data.length) setBranches(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="branches"
      className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c0905] via-[#140e08] to-[#0a0704] relative overflow-hidden scroll-mt-16"
    >
      {/* Atmosphere Texture Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-luminosity overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
          alt="Kiến trúc không gian nhà hàng"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0905] via-[#140e08]/90 to-[#0a0704]" />
      </div>

      {/* Luxury Golden Ambient Glows */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,150,43,0.12),_transparent_70%)] pointer-events-none" />

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
            Tọa lạc tại các vị trí đắc địa nhất, mỗi không gian của 5S Dining
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
          {branches.map((branch) => {
            const bId = branch.maChiNhanh ?? branch.id;
            const bName = branch.tenChiNhanh ?? branch.ten ?? "5S Dining";
            const bAddress = branch.diaChi ?? "TP. Hồ Chí Minh";
            const bPhone = branch.soDienThoai ?? "028 3822 9999";
            const bImage = branch.anhChiNhanh ?? branch.anh;
            const bSeats = branch.sucChua ?? 50;

            return (
              <article
                key={bId}
                className="group flex flex-col rounded-3xl overflow-hidden bg-gradient-to-b from-[#181109]/90 to-[#0e0904]/95 border border-amber-500/25 hover:border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(212,150,43,0.18)] transition-all duration-300 backdrop-blur-md"
              >
                {/* Branch Image */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-[#1a120a]">
                  <img
                    src={bImage}
                    alt={bName}
                    className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181109] via-transparent to-black/30" />

                  {/* Status Badge */}
                  <span className="absolute top-3.5 right-3.5 text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-950/85 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-md">
                    Đang mở cửa
                  </span>

                  {/* Seat capacity badge */}
                  <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 text-xs text-amber-200 bg-black/75 px-3 py-1 rounded-xl backdrop-blur-md border border-amber-500/30 shadow-md">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{bSeats} chỗ ngồi</span>
                  </div>
                </div>

                {/* Branch Details */}
                <div className="p-6 flex flex-1 flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-3">
                      {bName}
                    </h3>

                    <div className="space-y-2 text-xs text-amber-200/70">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{bAddress}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-mono">{bPhone}</span>
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
