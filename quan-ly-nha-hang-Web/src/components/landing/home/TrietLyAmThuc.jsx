import { Sparkles, Eye, Flame, HeartHandshake, Music, Wine, Award } from "lucide-react";

function TrietLyAmThuc() {
  const nguGiacQuan = [
    {
      icon: Eye,
      ten: "Sight (Thị Giác)",
      moTa: "Mỗi món ăn là một tác phẩm điêu khắc thị giác tinh xảo, phối màu hài hòa như bức tranh nghệ thuật.",
    },
    {
      icon: Flame,
      ten: "Scent (Khứu Giác)",
      moTa: "Hương thơm nồng nàn từ thảo mộc tươi, gỗ sồi hun khói và gia vị tự nhiên đánh thức khứu giác.",
    },
    {
      icon: Wine,
      ten: "Savor (Vị Giác)",
      moTa: "Sự bùng nổ của tầng tầng lớp lớp hương vị: ngọt thanh của hải sản sống, béo ngậy của thịt bò hảo hạng.",
    },
    {
      icon: Music,
      ten: "Sound (Thính Giác)",
      moTa: "Thanh âm xèo xèo trên đá nóng, tiếng chạm ly pha lê trong không gian giao hưởng cổ điển nhẹ nhàng.",
    },
    {
      icon: HeartHandshake,
      ten: "Soul (Tâm Hồn)",
      moTa: "Sự tận tụy của người đầu bếp và lòng hiếu khách chuẩn mực, mang đến cảm xúc trọn vẹn và an yên.",
    },
  ];

  return (
    <section
      id="story"
      className="px-4 py-24 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden scroll-mt-16"
    >

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Tag */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg shadow-amber-950/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Câu Chuyện Thương Hiệu</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-4 leading-tight">
            Triết Lý Ẩm Thực L'Délice
          </h2>

          <p className="text-sm sm:text-base text-amber-200/70 font-light leading-relaxed">
            Tại L'Délice, ẩm thực không đơn thuần là món ăn được dọn lên bàn, mà là một hành trình nghệ thuật đánh thức trọn vẹn năm giác quan của thực khách.
          </p>

          <div className="my-5 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-sm shadow-amber-400" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
        </div>

        {/* Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          {/* Visual Showcase (Images) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] aspect-[4/3] bg-[#1a120a] group">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1000&q=80&fit=crop&auto=format"
                alt="Nghệ thuật chế tác món ăn L'Délice Haute Gastronomie"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Floating Quality Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-100 font-serif">100% Nguồn Cung Tuyển Chọn</p>
                    <p className="text-[11px] text-amber-200/60">Vận chuyển lạnh hàng không mỗi sớm</p>
                  </div>
                </div>
                <span className="text-[11px] text-amber-400 font-mono font-semibold">EST. 2010</span>
              </div>
            </div>

            {/* Decorative offset border */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-amber-500/20 -z-10 pointer-events-none" />
          </div>

          {/* Text Story & Senses breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 leading-snug">
                Bản Giao Hưởng Từ Sự Tận Tâm Và Kỹ Nghệ Bậc Thầy
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/75 leading-relaxed font-light">
                Chúng tôi tin rằng bữa tiệc tuyệt hảo nhất được sinh ra từ lòng tôn kính với từng nguyên liệu tự nhiên. Từ nấm Truffle đen Alba, bò Wagyu A5 vân mỡ tuyết hảo hạng đến hải sản tươi sống từ vùng biển lạnh Alaska — tất cả đều được chế tác chuẩn xác dưới ngọn lửa của niềm đam mê ẩm thực thuần khiết.
              </p>
            </div>

            {/* 5 Senses List */}
            <div className="space-y-3 pt-2">
              {nguGiacQuan.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-amber-500/15 hover:border-amber-500/40 hover:bg-amber-500/[0.06] transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-amber-200">{item.ten}</h4>
                      <p className="text-[11px] sm:text-xs text-amber-200/60 leading-relaxed font-light mt-0.5">
                        {item.moTa}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chef Quote & Signature */}
            <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between">
              <div>
                <p className="font-serif text-sm font-bold text-amber-200">Jean-Baptiste Vũ</p>
                <p className="text-[11px] text-amber-400/70">Chef de Cuisine & Bếp trưởng Điều hành L'Délice</p>
              </div>
              <span className="font-serif italic text-amber-400/40 text-lg sm:text-xl font-light tracking-widest select-none">
                ~ Jean-Baptiste Vũ ~
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrietLyAmThuc;
