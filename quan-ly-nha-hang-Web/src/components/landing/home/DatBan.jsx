import { Calendar, Search, PhoneCall, Sparkles } from "lucide-react";

function DatBan({ onDatBan, onTraCuuDatBan }) {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden scroll-mt-16">

      <div className="mx-auto max-w-4xl relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-[#130e09] border border-amber-500/30 text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl overflow-hidden">
          {/* Subtle gold decorative rings */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md shadow-lg shadow-amber-950/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Trải Nghiệm Đẳng Cấp</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-4 leading-tight">
            Sẵn Sàng Cho Một Buổi Tối Khó Quên?
          </h2>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-amber-200/75 mb-8 font-light leading-relaxed">
            Hãy để chúng tôi chuẩn bị đón tiếp quý khách một cách hoàn hảo nhất.
            Đặt bàn trực tuyến ngay để nhận ưu đãi và giữ được vị trí bàn đẹp
            nhất.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onDatBan}
              className="btn-primary w-full sm:w-auto rounded-full px-8 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 hover:scale-105 transition-transform cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Đặt bàn trực tuyến</span>
            </button>

            <button
              onClick={onTraCuuDatBan}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-amber-200 border border-amber-500/35 bg-white/5 hover:bg-amber-500/15 hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Tra cứu lịch đặt</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-amber-500/20 flex items-center justify-center gap-2 text-xs text-amber-200/60">
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>Hotline hỗ trợ 24/7: </span>
            <span className="text-amber-300 font-mono font-bold text-sm">
              1800 5678
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DatBan;
