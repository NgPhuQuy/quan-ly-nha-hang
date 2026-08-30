import { useEffect, useState } from "react";
import { layDanhSachChiNhanh } from "../../../services/chiNhanh.service";
import {
  cardBackground,
  cream,
  mutedCream,
  subtleGoldBorder,
} from "../../../themes";
function BranchSection({ onDatBan }) {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    layDanhSachChiNhanh()
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
            Hệ thống nhà hàng
          </p>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.65rem,4vw,2.5rem)",
              color: cream,
            }}
          >
            Không gian & Chi nhánh
          </h2>

          <div className="my-2 flex items-center justify-center gap-3">
            <div
              className="h-px w-20"
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
              className="h-px w-20"
              style={{
                background:
                  "linear-gradient(90deg,rgba(200,136,42,.45),transparent)",
              }}
            />
          </div>
        </div>

        <div className="grid items-stretch gap-4 sm:grid-cols-3">
          {branches.map((branch) => {
            const bId = branch.maChiNhanh ?? branch.id;
            const bName = branch.tenChiNhanh ?? branch.ten ?? "5S Dining";
            const bAddress = branch.diaChi ?? "TP. Hồ Chí Minh";
            const bPhone = branch.soDienThoai ?? "028 3822 xxxx";
            const bImage = branch.anhChiNhanh ?? branch.anh;
            const bSeats = branch.sucChua ?? 50;

            return (
              <article
                key={bId}
                className="branch-card flex h-full flex-col overflow-hidden rounded-2xl"
                style={{
                  background: cardBackground,
                  border: `1px solid ${subtleGoldBorder}`,
                }}
              >
                <div className="h-[175px] shrink-0 overflow-hidden">
                  <img
                    src={bImage}
                    alt={bName}
                    className="branch-image h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3
                    className="min-h-[28px] font-serif"
                    style={{ color: cream }}
                  >
                    {bName}
                  </h3>

                  <div className="min-h-[40px]">
                    <p className="mt-1 text-xs" style={{ color: mutedCream }}>
                      {bAddress}
                    </p>

                    <p
                      className="mt-1 text-xs"
                      style={{ color: "rgba(200,136,42,.5)" }}
                    >
                      {bPhone}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <button
                      onClick={onDatBan}
                      className="btn-primary rounded-full px-4 py-1.5 text-xs"
                    >
                      Đặt bàn
                    </button>

                    <span
                      className="text-xs"
                      style={{ color: "rgba(240,216,144,.26)" }}
                    >
                      {bSeats} chỗ ngồi
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BranchSection;
