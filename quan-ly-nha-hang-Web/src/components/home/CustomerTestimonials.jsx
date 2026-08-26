import { useEffect, useState } from "react";
import { CAM_NHAN_KHACH_HANG } from "../../data/home/camNhanKhachHang";

function CustomerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const rotationTimer = setInterval(
      () => setActiveIndex((index) => (index + 1) % CAM_NHAN_KHACH_HANG.length),
      5500,
    );
    return () => clearInterval(rotationTimer);
  }, []);
  const testimonial = CAM_NHAN_KHACH_HANG[activeIndex];
  return (
    <section
      className="px-4 py-20"
      style={{ background: "linear-gradient(180deg,#1e1209,#120b05)" }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <p
          className="mb-8 text-xs uppercase tracking-widest"
          style={{ color: "rgba(200,136,42,.6)" }}
        >
          Guest stories
        </p>
        <div className="min-h-[150px]">
          <p
            className="mb-5 text-lg italic sm:text-xl"
            style={{
              fontFamily: "var(--font-serif)",
              color: "rgba(250,243,224,.86)",
            }}
          >
            {testimonial.noiDung}
          </p>
          <p
            className="text-sm font-semibold"
            style={{ color: "rgba(200,136,42,.85)" }}
          >
            {testimonial.ten}
          </p>
          <p
            className="mt-1 text-xs"
            style={{ color: "rgba(240,216,144,.35)" }}
          >
            {testimonial.vaiTro}
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {CAM_NHAN_KHACH_HANG.map((mau, index) => (
            <button
              key={mau.ten}
              onClick={() => setActiveIndex(index)}
              className="rounded-full"
              style={{
                width: index === activeIndex ? 22 : 6,
                height: 6,
                background:
                  index === activeIndex
                    ? "rgba(200,136,42,.9)"
                    : "rgba(200,136,42,.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default CustomerTestimonials;
