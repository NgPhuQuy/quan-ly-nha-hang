import { useEffect, useState } from "react";
import { fetchBranches } from "../../services/branch.service";
import { cardBackground, cream, mutedCream, subtleGoldBorder } from "../../themes";
import GoldDivider from "./GoldDivider";

function BranchSection({ onBookTable }) {
  const [branches, setBranches] = useState([]);
  useEffect(() => {
    fetchBranches()
      .then((data) => {
        if (data.length) setBranches(data);
      })
      .catch(() => {});
  }, []);
  return (
    <section
      id="branches"
      className="px-4 py-20 sm:px-10"
      style={{ background: "linear-gradient(180deg,#160d06,#100a04)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-xs uppercase tracking-widest"
            style={{ color: "rgba(200,136,42,.6)" }}
          >
            Our locations
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.65rem,4vw,2.5rem)",
              color: cream,
            }}
          >
            Find your table
          </h2>
          <GoldDivider />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {branches.map((branch) => (
            <article
              key={branch.id}
              className="branch-card overflow-hidden rounded-2xl"
              style={{
                background: cardBackground,
                border: `1px solid ${subtleGoldBorder}`,
              }}
            >
              <div className="h-[175px] overflow-hidden">
                <img
                  src={branch.anh}
                  alt={branch.ten}
                  className="branch-image h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif" style={{ color: cream }}>
                  {branch.ten}
                </h3>
                <p className="mt-1 text-xs" style={{ color: mutedCream }}>
                  {branch.diaChi}
                </p>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "rgba(200,136,42,.5)" }}
                >
                  {branch.soDienThoai}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <button
                    onClick={onBookTable}
                    className="btn-primary rounded-full px-4 py-1.5 text-xs"
                  >
                    Book a table
                  </button>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(240,216,144,.26)" }}
                  >
                    {branch.soCho} seats
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default BranchSection;
