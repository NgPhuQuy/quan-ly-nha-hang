import { useState, useEffect } from "react";
import { CAM_NHAN_KHACH_HANG } from "../../../data/camNhanKhachHang";
import {
  Star,
  Quote,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function CustomerTestimonials() {
  const [viTriHienTai, setViTriHienTai] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setViTriHienTai((idx) => (idx + 1) % CAM_NHAN_KHACH_HANG.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setViTriHienTai(
      (idx) =>
        (idx - 1 + CAM_NHAN_KHACH_HANG.length) % CAM_NHAN_KHACH_HANG.length,
    );
  };

  const handleNext = () => {
    setViTriHienTai((idx) => (idx + 1) % CAM_NHAN_KHACH_HANG.length);
  };

  const camNhan = CAM_NHAN_KHACH_HANG[viTriHienTai];

  return (
    <section
      id="reviews"
      className="px-4 py-20 sm:px-6 lg:px-8 bg-[#0a0704] relative overflow-hidden"
    >
      <div className="mx-auto max-w-5xl relative z-10">
        {/* Awards strip */}
        <div className="mb-16 p-4 sm:p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x-0 md:divide-x divide-amber-500/10">
            <div className="p-2">
              <p className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                Michelin Guide
              </p>
              <p className="text-xs text-amber-200/60 mt-0.5">
                Selected 2024 - 2026
              </p>
            </div>
            <div className="p-2">
              <p className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                Top 10 Fine Dining
              </p>
              <p className="text-xs text-amber-200/60 mt-0.5">
                Vietnam Culinary Awards
              </p>
            </div>
            <div className="p-2">
              <p className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                TripAdvisor
              </p>
              <p className="text-xs text-amber-200/60 mt-0.5">
                Travellers' Choice Winner
              </p>
            </div>
            <div className="p-2">
              <p className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                5-Star Luxury
              </p>
              <p className="text-xs text-amber-200/60 mt-0.5">
                Hospitality Standard
              </p>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles size={12} />
            <span>Trải Nghiệm Thực Khách</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100">
            Đánh Giá Từ Khách Hàng
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative max-w-3xl mx-auto p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#140e08] to-[#0e0a05] border border-amber-500/30 shadow-2xl shadow-black/80 text-center">
          <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 text-amber-400">
            <Quote size={22} className="rotate-180" />
          </div>

          {/* 5 Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-6 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-amber-400" />
            ))}
          </div>

          <p className="font-serif text-base sm:text-xl text-amber-100/90 italic leading-relaxed min-h-[90px] mb-6">
            "{camNhan.noiDung}"
          </p>

          <div className="border-t border-amber-500/20 pt-4">
            <h4 className="font-serif text-base font-bold text-amber-300">
              {camNhan.ten}
            </h4>
            <p className="text-xs text-amber-200/50 mt-0.5">{camNhan.vaiTro}</p>
          </div>

          {/* Prev/Next arrows */}
          <div className="flex items-center justify-between mt-6 pt-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Indicator dots */}
            <div className="flex items-center gap-2">
              {CAM_NHAN_KHACH_HANG.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setViTriHienTai(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === viTriHienTai
                      ? "w-7 bg-amber-400"
                      : "w-2 bg-amber-500/30 hover:bg-amber-500/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerTestimonials;
