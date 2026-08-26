import { KHUNG_GIO } from "../../data/datBan";
import { mutedCream } from "../../themes";

function NhomGio({ nhan, danhSach, gioDaChon, setGioDaChon }) {
  if (!danhSach.length) return null;
  return (
    <div className="mb-5">
      <p className="mb-2.5 text-xs" style={{ color: mutedCream }}>
        {nhan}
      </p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {danhSach.map((mocGio) =>
          mocGio.trangThai === "het" ? (
            <button key={mocGio.gio} disabled className="time-full">
              {mocGio.gio}
            </button>
          ) : (
            <button
              key={mocGio.gio}
              onClick={() => setGioDaChon(mocGio.gio)}
              className={`${mocGio.trangThai === "it" ? "time-scarce" : "time-available"} ${gioDaChon === mocGio.gio ? "selected" : ""}`}
            >
              {mocGio.gio}
              {mocGio.trangThai === "it" && (
                <span className="mt-1 block text-[10px]">Few tables left</span>
              )}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

function TimeSelection({ gioDaChon, setGioDaChon, khiTiepTuc, khiQuayLai }) {
  const buoiTrua = KHUNG_GIO.filter((m) => m.gio < "15:00");
  const buoiToi = KHUNG_GIO.filter((m) => m.gio >= "15:00");

  return (
    <div className="card-warm rounded-2xl p-5 sm:p-7">
      <p
        className="text-xs uppercase tracking-[.2em]"
        style={{ color: "rgba(200,136,42,.6)" }}
      >
        Step 2
      </p>
      <h1
        className="mb-8 mt-2 font-serif text-2xl"
        style={{ color: "rgba(240,216,144,.9)" }}
      >
        Choose an arrival time
      </h1>
      <NhomGio
        nhan="Lunch"
        danhSach={buoiTrua}
        gioDaChon={gioDaChon}
        setGioDaChon={setGioDaChon}
      />
      <NhomGio
        nhan="Dinner"
        danhSach={buoiToi}
        gioDaChon={gioDaChon}
        setGioDaChon={setGioDaChon}
      />
      <div className="mt-8 flex gap-3">
        <button
          onClick={khiQuayLai}
          className="btn-ghost flex-1 rounded-xl py-3"
        >
          Back
        </button>
        <button
          onClick={khiTiepTuc}
          disabled={!gioDaChon}
          className="btn-primary flex-1 rounded-xl py-3"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
export default TimeSelection;
