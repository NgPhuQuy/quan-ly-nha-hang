import { useEffect, useState } from "react";
import { fetchBranches } from "../../services/branch.service";
import {
  cardBackground,
  cream,
  mutedCream,
  subtleGoldBorder,
} from "../../themes";

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

          {/* Gold Divider */}
          <div className="my-2 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(200,136,42,.45))",
              }}
            />
            <svg width="9" height="9" viewBox="0 0 9 9">
              <path
                d="M4.5 0L6 3H9L6.5 5L7.5 9L4.5 7L1.5 9L2.5 5L0 3H3Z"
                fill="rgba(200,136,42,.6)"
              />
            </svg>
            <div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg,rgba(200,136,42,.45),transparent)",
              }}
            />
          </div>
        </div>

        <div className="grid items-stretch gap-4 sm:grid-cols-3">
          {branches.map((branch) => (
            <article
              key={branch.maChiNhanh}
              className="branch-card flex h-full flex-col overflow-hidden rounded-2xl"
              style={{
                background: cardBackground,
                border: `1px solid ${subtleGoldBorder}`,
              }}
            >
              {/* Image */}
              <div className="h-[175px] shrink-0 overflow-hidden">
                <img
                  src={branch.anhChiNhanh}
                  alt={branch.tenChiNhanh}
                  className="branch-image h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <h3
                  className="min-h-[28px] font-serif"
                  style={{ color: cream }}
                >
                  {branch.tenChiNhanh}
                </h3>

                <div className="min-h-[40px]">
                  <p className="mt-1 text-xs" style={{ color: mutedCream }}>
                    {branch.diaChi || "\u00A0"}
                  </p>

                  <p
                    className="mt-1 text-xs"
                    style={{ color: "rgba(200,136,42,.5)" }}
                  >
                    {branch.soDienThoai || "\u00A0"}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3">
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
                    {branch.sucChua} seats
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
