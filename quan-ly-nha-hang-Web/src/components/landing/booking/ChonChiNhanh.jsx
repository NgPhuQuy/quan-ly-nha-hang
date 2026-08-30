import { useEffect, useState } from "react";
import { layDanhSachChiNhanh } from "../../../services/chiNhanh.service";

function BranchSelection({
  branchId,
  setBranchId,
  date,
  setDate,
  guestCount,
  setGuestCount,
  onTiepTuc,
}) {
  const [branches, setBranches] = useState([]);
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    layDanhSachChiNhanh()
      .then((data) => {
        if (data && data.length) setBranches(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="card-warm rounded-2xl p-5 sm:p-7">
      <p
        className="text-xs uppercase tracking-[.2em]"
        style={{ color: "rgba(200,136,42,.6)" }}
      >
        Bước 1
      </p>
      <h1
        className="mb-8 mt-2 font-serif text-2xl"
        style={{ color: "rgba(240,216,144,.9)" }}
      >
        Chọn chi nhánh & ngày đặt bàn
      </h1>
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm">Chi nhánh</label>
          <select
            value={branchId}
            onChange={(event) => setBranchId(event.target.value)}
            className="select-warm px-4 py-3"
          >
            <option value="">-- Chọn chi nhánh --</option>
            {branches.map((branch) => {
              const bId = branch.maChiNhanh ?? branch.id;
              const bName = branch.tenChiNhanh ?? branch.ten ?? "5S Dining";
              return (
                <option key={bId} value={bId}>
                  {bName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm">Ngày đặt bàn</label>
            <input
              type="date"
              min={todayStr}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="input-warm px-4 py-3 w-full cursor-pointer"
              style={{
                colorScheme: "dark",
              }}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm">Số lượng khách</label>
            <input
              type="number"
              min="1"
              max="20"
              value={guestCount}
              onChange={(event) => setGuestCount(Number(event.target.value))}
              className="input-warm px-4 py-3"
            />
          </div>
        </div>
        <button
          onClick={onTiepTuc}
          disabled={!branchId || !date}
          className="btn-primary w-full rounded-xl py-3 disabled:opacity-50"
        >
          Tiếp tục chọn giờ
        </button>
      </div>
    </div>
  );
}
export default BranchSelection;
