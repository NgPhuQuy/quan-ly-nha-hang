import { ANH } from "../../assets/anh";
import { cream } from "../../themes";
import GoldDivider from "./GoldDivider.jsx";

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
            className="mb-3 text-xs uppercase tracking-widest"
            style={{ color: "rgba(200,136,42,.6)" }}
          >
            Culinary highlights
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.65rem,4vw,2.5rem)",
              color: cream,
            }}
          >
            Every dish, a signature
          </h2>
          <GoldDivider />
        </div>
        <div
          className="grid grid-cols-2 gap-2.5 md:grid-cols-4"
          style={{ gridAutoRows: 155 }}
        >
          <div className="food-card relative row-span-2 overflow-hidden rounded-xl md:col-span-2">
            <img
              src={ANH.monAn1}
              alt="Cheese-baked lobster"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="food-card overflow-hidden rounded-xl">
            <img
              src={ANH.monAn2}
              alt="A5 Wagyu beef"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="food-card overflow-hidden rounded-xl">
            <img
              src={ANH.monAn3}
              alt="Mixed hot pot"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="food-card overflow-hidden rounded-xl">
            <img
              src={ANH.monAn4}
              alt="Grilled seafood"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="food-card overflow-hidden rounded-xl">
            <img
              src={ANH.monAn5}
              alt="Sashimi"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default MenuGallery;
