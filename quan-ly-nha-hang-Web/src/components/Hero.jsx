import { useEffect, useRef } from "react";
import { HERO_OVERLAY } from "../themes";
import { IMG } from "../assets/images";

// LỖI CŨ: Hero(onBook) -> Nó sẽ hiểu 'onBook' là cục object props chứa tất cả mọi thứ
// ĐÃ SỬA: Hero({ onBook }) -> Destructuring để lấy đúng hàm onBook ra
export default function Hero({ onBook }) {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  return (
    <section
      ref={heroRef}
      className="relative flex items-center justify-center overflow-hidden h-[100svh] min-h-[520px] bg-[#0c0905]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src='src\assets\hero-image.webp'
          alt="Không gian 5S Dining"
          className="w-full h-full object-cover scale-110 object-center"
        />
        {/* HERO_OVERLAY là biến JS nên ta giữ nguyên thẻ style ở đây */}
        <div className="absolute inset-0" style={{ background: HERO_OVERLAY }} />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_55%,rgba(200,136,42,0.07)_0%,transparent_58%)]"
        />
      </div>

      <div className="relative text-center px-5 max-w-3xl mx-auto">
        <p className="fade-in-up delay-1 text-xs uppercase mb-5 text-[rgba(200,136,42,.8)] tracking-[.25em]">
          Chuỗi nhà hàng cao cấp · Hà Nội
        </p>

        <h1 className="fade-in-up delay-2 mb-5 leading-tight font-serif text-[clamp(2rem,6.5vw,4.5rem)] font-semibold">
          <span className="text-[rgba(250,243,224,.94)]">Một chỗ ngồi,</span><br />
          <span
            className="bg-[linear-gradient(90deg,#c8882a,#e8b84b,#f0d890,#e8b84b,#c8882a)] bg-[length:200%_auto] bg-clip-text text-transparent"
            // Animation 'shimmer' là animation tự tạo, bạn có thể giữ nguyên style này
            // hoặc đưa vào tailwind config để dùng class: animate-[shimmer_3s_linear_infinite]
            style={{ animation: 'shimmer 3s linear infinite' }}
          >
            một câu chuyện
          </span>
        </h1>

        <p className="fade-in-up delay-3 mb-9 max-w-lg mx-auto text-[rgba(240,216,144,.58)] leading-[1.78] text-[clamp(.9rem,2vw,1.05rem)]">
          Mỗi bữa ăn tại 5S là một kỷ niệm. Đặt bàn trước để chúng tôi chuẩn bị trọn vẹn cho bạn.
        </p>

        <div className="fade-in-up delay-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onBook} className="btn-primary px-7 py-3.5 rounded-full font-semibold min-h-[48px]">
            Đặt bàn ngay
          </button>
          <a href="#branches" className="btn-ghost px-7 py-3.5 rounded-full min-h-[48px] flex items-center justify-center">
            Khám phá chi nhánh
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[rgba(200,136,42,.35)]">
        <span className="text-xs uppercase tracking-widest">Cuộn xuống</span>
        <div className="w-px h-7 bg-gradient-to-b from-[rgba(200,136,42,.35)] to-transparent" />
      </div>
    </section>
  );
}