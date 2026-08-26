import { KHUNG_GIO } from "../../data/datBan";
import { kemMo } from "../../themes";

function NhomGio({ nhan, danhSach, gioDaChon, setGioDaChon }) {
  if (!danhSach.length) return null;
  return (
    <div className="mb-5">
      <p className="mb-2.5 text-xs" style={{ color: kemMo }}>
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
                <span className="mt-1 block text-[10px]">Còn ít bàn</span>
              )}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

function BuocChonGio({ gioDaChon, setGioDaChon, khiTiepTuc, khiQuayLai }) {
  const buoiTrua = KHUNG_GIO.filter((m) => m.gio < "15:00");
  const buoiToi = KHUNG_GIO.filter((m) => m.gio >= "15:00");

  return (
    <div className="card-warm rounded-2xl p-5 sm:p-7">
      <p
        className="text-xs uppercase tracking-[.2em]"
        style={{ color: "rgba(200,136,42,.6)" }}
      >
        Bước 2
      </p>
      <h1
        className="mb-8 mt-2 font-serif text-2xl"
        style={{ color: "rgba(240,216,144,.9)" }}
      >
        Chọn giờ đến
      </h1>
      <NhomGio
        nhan="Buổi trưa"
        danhSach={buoiTrua}
        gioDaChon={gioDaChon}
        setGioDaChon={setGioDaChon}
      />
      <NhomGio
        nhan="Buổi tối"
        danhSach={buoiToi}
        gioDaChon={gioDaChon}
        setGioDaChon={setGioDaChon}
      />
      <div className="mt-8 flex gap-3">
        <button
          onClick={khiQuayLai}
          className="btn-ghost flex-1 rounded-xl py-3"
        >
          Quay lại
        </button>
        <button
          onClick={khiTiepTuc}
          disabled={!gioDaChon}
          className="btn-primary flex-1 rounded-xl py-3"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
export default BuocChonGio;
