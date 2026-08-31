import { useEffect, useRef } from "react";
import { ANH } from "../../../assets/anh";
import { Sparkles, Star } from "lucide-react";
import ThanhDatBanNhanh from "./ThanhDatBanNhanh";

function Hero({ onDatBan }) {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      imageRef.current.style.transform = `scale(1.08) translateY(${progress * 40}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] h-screen w-full flex flex-col justify-center items-center bg-[#0c0905] pt-16 sm:pt-20 pb-6 sm:pb-8 z-10 snap-start overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          ref={imageRef}
          src={ANH.hero}
          alt="Không gian ẩm thực 5S Dining"
          className="h-full w-full object-cover brightness-[0.45] transition-transform duration-700"
          style={{ transform: "scale(1.08)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0905] via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,136,42,0.12)_0,transparent_70%)]" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center my-auto w-full">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-4 sm:mb-5 backdrop-blur-md shadow-lg shadow-amber-900/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Tinh Hoa Ẩm Thực Đương Đại & Đẳng Cấp 5 Sao</span>
        </div>

        {/* Hero Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-amber-100 leading-[1.15] mb-3 sm:mb-4">
          Một Bàn Tiệc Sang Trọng,
          <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent italic font-normal">
            Trọn Vẹn Từng Khoảnh Khắc
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base text-amber-200/70 font-light leading-relaxed mb-6 sm:mb-8">
          Hơn 15 năm nâng tầm trải nghiệm ẩm thực thượng hạng tại Việt Nam.
          Không gian tinh tế, dịch vụ chuẩn mực và thực đơn được sáng tạo bởi
          các bếp trưởng hàng đầu.
        </p>

        {/* Quick Booking Interactive Widget on Hero */}
        <ThanhDatBanNhanh onDatBan={onDatBan} />

        {/* Key Highlight Accolades */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-3 sm:pt-4 border-t border-amber-500/20 text-center">
          <div>
            <div className="font-serif text-lg sm:text-2xl font-bold text-amber-300">
              15+
            </div>
            <div className="text-[10px] sm:text-[11px] text-amber-200/60 font-medium">
              Năm kinh nghiệm
            </div>
          </div>
          <div>
            <div className="font-serif text-lg sm:text-2xl font-bold text-amber-300">
              50K+
            </div>
            <div className="text-[10px] sm:text-[11px] text-amber-200/60 font-medium">
              Thực khách hài lòng
            </div>
          </div>
          <div>
            <div className="font-serif text-lg sm:text-2xl font-bold text-amber-300 flex items-center justify-center gap-1">
              4.9 <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[10px] sm:text-[11px] text-amber-200/60 font-medium">
              Đánh giá xuất sắc
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
