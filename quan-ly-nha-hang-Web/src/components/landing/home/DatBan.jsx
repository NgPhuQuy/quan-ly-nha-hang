import { Calendar, Search, PhoneCall, Sparkles } from "lucide-react";

function DatBan({ onDatBan, onTraCuuDatBan }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[#0c0905] relative overflow-hidden">
      <div className="mx-auto max-w-4xl relative">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#1c130b] to-[#120b06] border border-amber-500/30 text-center shadow-2xl shadow-black overflow-hidden">
          {/* Background decorative circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={12} />
            <span>Trải Nghiệm Đẳng Cấp</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-4 leading-tight">
            Sẵn Sàng Cho Một Buổi Tối Khó Quên?
          </h2>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-amber-200/70 mb-8 font-light leading-relaxed">
            Hãy để chúng tôi chuẩn bị đón tiếp quý khách một cách hoàn hảo nhất.
            Đặt bàn trực tuyến ngay để nhận ưu đãi và giữ được vị trí bàn đẹp
            nhất.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onDatBan}
              className="btn-primary w-full sm:w-auto rounded-full px-8 py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-amber-900/40 hover:scale-105 transition-transform"
            >
              <Calendar size={16} />
              <span>Đặt bàn trực tuyến</span>
            </button>

            <button
              onClick={onTraCuuDatBan}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-amber-200 border border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
            >
              <Search size={16} className="text-amber-400" />
              <span>Tra cứu lịch đặt</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-amber-500/15 flex items-center justify-center gap-2 text-xs text-amber-200/50">
            <PhoneCall size={14} className="text-amber-400" />
            <span>Hotline hỗ trợ 24/7: </span>
            <span className="text-amber-300 font-mono font-bold">
              1800 5678
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DatBan;
