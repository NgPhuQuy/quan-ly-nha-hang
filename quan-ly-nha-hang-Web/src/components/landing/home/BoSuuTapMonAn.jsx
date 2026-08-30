import { ANH } from "../../../assets/anh";
import { cream } from "../../../themes";
function MenuGallery() {
  return (
    <section
      id="menu"
      className="px-4 py-20 sm:px-10"
      style={{ background: "var(--color-warm-black)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-xs uppercase tracking-widest font-semibold"
            style={{ color: "rgba(200,136,42,.6)" }}
          >
            Món ngon đặc sắc
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.65rem,4vw,2.5rem)",
              color: cream,
            }}
          >
            Mỗi món ăn là một tuyệt tác
          </h2>
          <div className="my-2 flex items-center justify-center gap-3">
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg,transparent,rgba(200,136,42,.45))" }} />
            <svg width="9" height="9" viewBox="0 0 9 9"><path d="M4.5 0L6 3H9L6.5 5L7.5 9L4.5 7L1.5 9L2.5 5L0 3H3Z" fill="rgba(200,136,42,.6)"/></svg>
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg,rgba(200,136,42,.45),transparent)" }} />
          </div>
        </div>
        <div
          className="grid grid-cols-2 gap-2.5 md:grid-cols-4"
          style={{ gridAutoRows: 155 }}
        >
          <div className="food-card relative row-span-2 overflow-hidden rounded-xl md:col-span-2">
            <img
              src={ANH.monAn1}
              alt="Tôm hùm nướng phô mai"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="food-card overflow-hidden rounded-xl">
            <img
              src={ANH.monAn2}
              alt="Bò Wagyu A5 thượng hạng"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="food-card overflow-hidden rounded-xl">
            <img
              src={ANH.monAn3}
              alt="Lẩu đặc biệt 5S"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="food-card overflow-hidden rounded-xl">
            <img
              src={ANH.monAn4}
              alt="Hải sản nướng sốt bơ tỏi"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="food-card overflow-hidden rounded-xl">
            <img
              src={ANH.monAn5}
              alt="Sashimi tổng hợp cao cấp"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default MenuGallery;
