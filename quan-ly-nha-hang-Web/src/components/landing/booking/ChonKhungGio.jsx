import { mutedCream } from "../../../themes";

function NhomKhungGio({ label, slots, selectedTime, setSelectedTime }) {
  if (!slots.length) return null;
  return (
    <div className="mb-5">
      <p className="mb-2.5 text-xs font-semibold" style={{ color: mutedCream }}>
        {label}
      </p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {slots.map((slot) =>
          slot.trangThai === "het" ? (
            <button key={slot.gio} disabled className="time-full">
              {slot.gio}
              <span className="mt-0.5 block text-[10px]">Hết bàn</span>
            </button>
          ) : (
            <button
              key={slot.gio}
              onClick={() => setSelectedTime(slot.gio)}
              className={`${slot.trangThai === "it" ? "time-scarce" : "time-available"} ${selectedTime === slot.gio ? "selected" : ""}`}
            >
              {slot.gio}
              {slot.trangThai === "it" && (
                <span className="mt-1 block text-[10px]">Còn ít bàn</span>
              )}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

function TimeSelection({
  timeSlots,
  selectedTime,
  setSelectedTime,
  onTiepTuc,
  onQuayLai,
}) {
  const danhSachGioTrua = timeSlots.filter((slot) => slot.gio < "15:00");
  const danhSachGioToi = timeSlots.filter((slot) => slot.gio >= "15:00");

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
        Chọn khung giờ đến
      </h1>
      <NhomKhungGio
        label="Buổi trưa (11:00 – 14:30)"
        slots={danhSachGioTrua}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <NhomKhungGio
        label="Buổi tối (17:00 – 22:00)"
        slots={danhSachGioToi}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <div className="mt-8 flex gap-3">
        <button onClick={onQuayLai} className="btn-ghost flex-1 rounded-xl py-3">
          Quay lại
        </button>
        <button
          onClick={onTiepTuc}
          disabled={!selectedTime}
          className="btn-primary flex-1 rounded-xl py-3 disabled:opacity-50"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
export default TimeSelection;
