import { useEffect, useRef, useState } from "react";
import { ANH } from "../../../assets/anh";
import {
  Calendar,
  Users,
  MapPin,
  Sparkles,
  ChevronRight,
  Award,
  Star,
} from "lucide-react";
import { layDanhSachChiNhanh } from "../../../services/chiNhanh.service";

function Hero({ onDatBan }) {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const layNgayDiaPhuong = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDate, setSelectedDate] = useState(layNgayDiaPhuong());
  const [guestCount, setGuestCount] = useState(2);

  useEffect(() => {
    layDanhSachChiNhanh().then((res) => {
      if (res && res.length) {
        setBranches(res);
        setSelectedBranch(res[0].maChiNhanh);
      }
    });
  }, []);

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

  const handleQuickBook = () => {
    onDatBan();
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0c0905] pt-24 pb-12"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
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
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center my-auto">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md shadow-lg shadow-amber-900/20 animate-pulse">
          <Sparkles size={14} className="text-amber-400" />
          <span>Tinh Hoa Ẩm Thực Đương Đại & Đẳng Cấp 5 Sao</span>
        </div>

        {/* Hero Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-amber-100 leading-[1.15] mb-6">
          Một Bàn Tiệc Sang Trọng,
          <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent italic font-normal">
            Trọn Vẹn Từng Khoảnh Khắc
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-amber-200/70 font-light leading-relaxed mb-8 sm:mb-12">
          Hơn 15 năm nâng tầm trải nghiệm ẩm thực thượng hạng tại Việt Nam.
          Không gian tinh tế, dịch vụ chuẩn mực và thực đơn được sáng tạo bởi
          các bếp trưởng hàng đầu.
        </p>

        {/* Quick Booking Interactive Widget on Hero */}
        <div className="mx-auto max-w-3xl p-3 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/30 shadow-2xl shadow-black/80 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {/* Branch Picker */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                <MapPin size={12} /> Chi nhánh
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-amber-100 outline-none cursor-pointer"
              >
                {branches.map((b) => (
                  <option
                    key={b.maChiNhanh}
                    value={b.maChiNhanh}
                    className="bg-[#1a120a] text-amber-100"
                  >
                    {b.tenChiNhanh}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-colors">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                <Calendar size={12} /> Ngày đến
              </label>
              <input
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-amber-100 outline-none cursor-pointer"
                style={{ colorScheme: "dark" }}
              />
            </div>

            {/* Guest Count & Action Button */}
            <div className="flex items-center gap-2">
              <div className="flex-1 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-colors">
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                  <Users size={12} /> Số khách
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-amber-100 outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((n) => (
                    <option
                      key={n}
                      value={n}
                      className="bg-[#1a120a] text-amber-100"
                    >
                      {n} khách
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleQuickBook}
                className="h-full px-5 rounded-xl btn-primary flex items-center justify-center gap-1.5 text-xs font-bold shrink-0 shadow-lg shadow-amber-900/40 hover:scale-105 transition-transform"
              >
                <span>Tìm bàn</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Key Highlight Accolades */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-4 border-t border-amber-500/20 text-center">
          <div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-amber-300">
              15+
            </div>
            <div className="text-[11px] text-amber-200/60 font-medium">
              Năm kinh nghiệm
            </div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-amber-300">
              50K+
            </div>
            <div className="text-[11px] text-amber-200/60 font-medium">
              Thực khách hài lòng
            </div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-amber-300 flex items-center justify-center gap-1">
              4.9 <Star size={16} className="fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[11px] text-amber-200/60 font-medium">
              Đánh giá xuất sắc
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
