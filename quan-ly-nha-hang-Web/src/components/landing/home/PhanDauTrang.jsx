import { Sparkles, Star } from "lucide-react";
import ThanhDatBanNhanh from "./ThanhDatBanNhanh";

function Hero({ onDatBan, branches }) {
  return (
    <section
      className="relative min-h-[100dvh] w-full flex flex-col justify-center items-center bg-transparent pt-24 sm:pt-32 pb-14 sm:pb-20 z-10 overflow-hidden"
    >
      {/* Subtle top glow spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Main Hero Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center my-auto w-full">
        {/* Floating Accolade Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md shadow-lg shadow-amber-900/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Michelin Guide Selected &bull; Haute Gastronomie Française</span>
        </div>

        {/* Hero Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-amber-100 leading-[1.12] mb-4 sm:mb-5">
          Nơi Ẩm Thực Pháp
          <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent italic font-normal">
            Thăng Hoa Thành Nghệ Thuật
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base text-amber-200/75 font-light leading-relaxed mb-8 sm:mb-10">
          Chào mừng quý khách đến với <strong className="text-amber-200 font-medium">L'Délice</strong>. Không gian sang trọng thầm lặng (Quiet Luxury), dịch vụ đón tiếp chuẩn mực đài các và thực đơn được chế tác tỉ mỉ từ những nguyên liệu mùa thượng hạng.
        </p>

        {/* Quick Booking Interactive Widget on Hero */}
        <ThanhDatBanNhanh onDatBan={onDatBan} branches={branches} />

        {/* Key Highlight Accolades */}
        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto pt-6 border-t border-amber-500/20 text-center">
          <div>
            <div className="font-serif text-xl sm:text-3xl font-bold text-amber-300">
              15+
            </div>
            <div className="text-[10px] sm:text-xs text-amber-200/65 font-medium mt-0.5">
              Năm tôn vinh ẩm thực Pháp
            </div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-3xl font-bold text-amber-300">
              50.000+
            </div>
            <div className="text-[10px] sm:text-xs text-amber-200/65 font-medium mt-0.5">
              Bữa tiệc đáng nhớ
            </div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-3xl font-bold text-amber-300 flex items-center justify-center gap-1">
              4.9 <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[10px] sm:text-xs text-amber-200/65 font-medium mt-0.5">
              Đánh giá từ thực khách
            </div>
          </div>
        </div>

        {/* Subtle Downward Scroll Indicator */}
        <div className="pt-8 flex flex-col items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-300/70">Khám phá câu chuyện</span>
          <div className="w-px h-8 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
