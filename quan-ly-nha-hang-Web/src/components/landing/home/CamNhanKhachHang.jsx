import { useState, useEffect } from "react";
import { CAM_NHAN_KHACH_HANG } from "../../../data/camNhanKhachHang";
import { Star, Quote, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

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
      className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c0804] via-[#150e07] to-[#0e0905] relative overflow-hidden min-h-screen flex flex-col justify-center snap-start scroll-mt-16"
    >
      {/* Atmosphere Texture Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15 mix-blend-luminosity overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&q=80"
          alt="Không gian tiệc tối ấm cúng"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0804] via-[#150e07]/90 to-[#0e0905]" />
      </div>

      {/* Luxury Golden Ambient Glows */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Awards strip */}
        <div className="mb-16 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 border border-amber-500/30 backdrop-blur-md shadow-2xl shadow-black/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x-0 md:divide-x divide-amber-500/20">
            <div className="p-2">
              <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Michelin Guide
              </p>
              <p className="text-xs text-amber-200/70 mt-1">
                Selected 2024 - 2026
              </p>
            </div>
            <div className="p-2">
              <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Top 10 Fine Dining
              </p>
              <p className="text-xs text-amber-200/70 mt-1">
                Vietnam Culinary Awards
              </p>
            </div>
            <div className="p-2">
              <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                TripAdvisor
              </p>
              <p className="text-xs text-amber-200/70 mt-1">
                Travellers' Choice Winner
              </p>
            </div>
            <div className="p-2">
              <p className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Asia's 50 Best
              </p>
              <p className="text-xs text-amber-200/70 mt-1">
                Discovery Nominee
              </p>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg shadow-amber-950/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Trải Nghiệm Thực Khách</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-4 leading-tight">
            Những Lời Khen Ngợi Quý Báu
          </h2>

          <div className="my-5 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-sm shadow-amber-400" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
        </div>

        {/* Carousel Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#181109]/95 to-[#0f0a05]/95 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-hidden">
          <Quote className="absolute top-6 right-6 w-20 h-20 text-amber-500/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-amber-400 shadow-xl shadow-amber-950/50">
              <img
                src={camNhan.anh}
                alt={camNhan.ten}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(camNhan.soSao)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <blockquote className="font-serif text-lg sm:text-xl text-amber-100 italic font-light leading-relaxed">
                "{camNhan.noiDung}"
              </blockquote>

              <div>
                <p className="font-serif text-base font-bold text-amber-300">
                  {camNhan.ten}
                </p>
                <p className="text-xs text-amber-200/60 mt-0.5">
                  {camNhan.chucDanh} • Chi nhánh {camNhan.chiNhanh}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-amber-500/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {CAM_NHAN_KHACH_HANG.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setViTriHienTai(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    viTriHienTai === idx
                      ? "w-8 bg-amber-400"
                      : "w-2 bg-amber-500/30 hover:bg-amber-500/60"
                  }`}
                  title={`Xem đánh giá ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 hover:bg-amber-400/20 text-amber-300 border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer"
                title="Trước đó"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 hover:bg-amber-400/20 text-amber-300 border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer"
                title="Kế tiếp"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomerTestimonials;
