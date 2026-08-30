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
      className="px-4 py-20 sm:px-6 lg:px-8 bg-[#0e0a05] relative overflow-hidden"
    >
      {/* Background glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles size={12} />
            <span>Hệ Thống Ẩm Thực</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-4 leading-tight">
            Không Gian & Chi Nhánh
          </h2>

          <p className="text-sm sm:text-base text-amber-200/60 font-light">
            Tọa lạc tại các vị trí đắc địa nhất, mỗi không gian của 5S Dining
            mang đến một trải nghiệm kiến trúc và ẩm thực độc bản.
          </p>

          <div className="my-4 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/40" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/40" />
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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
                className="group flex flex-col rounded-2xl overflow-hidden bg-black/40 border border-amber-500/20 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 backdrop-blur-xs"
              >
                {/* Branch Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1a120a]">
                  <img
                    src={bImage}
                    alt={bName}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Status Badge */}
                  <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                    Đang mở cửa
                  </span>

                  {/* Seat capacity badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-amber-200/90 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10">
                    <Users size={12} className="text-amber-400" />
                    <span>{bSeats} chỗ ngồi</span>
                  </div>
                </div>

                {/* Branch Details */}
                <div className="p-5 flex flex-1 flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-100 group-hover:text-amber-300 transition-colors mb-2">
                      {bName}
                    </h3>

                    <div className="space-y-1.5 text-xs text-amber-200/60">
                      <div className="flex items-start gap-2">
                        <MapPin
                          size={14}
                          className="text-amber-400 shrink-0 mt-0.5"
                        />
                        <span className="leading-snug">{bAddress}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-amber-400 shrink-0" />
                        <span className="font-mono">{bPhone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-amber-400 shrink-0" />
                        <span>10:30 – 22:30 hàng ngày</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 border-t border-amber-500/10 flex items-center justify-between">
                    <button
                      onClick={onDatBan}
                      className="w-full btn-primary rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-900/30 group-hover:scale-[1.02] transition-transform"
                    >
                      <span>Đặt bàn tại chi nhánh này</span>
                      <ChevronRight size={14} />
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
