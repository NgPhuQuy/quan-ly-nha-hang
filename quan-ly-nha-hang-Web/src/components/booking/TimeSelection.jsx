import { mutedCream } from "../../themes";

function TimeGroup({ label, slots, selectedTime, setSelectedTime }) {
  if (!slots.length) return null;
  return (
    <div className="mb-5">
      <p className="mb-2.5 text-xs" style={{ color: mutedCream }}>
        {label}
      </p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {slots.map((slot) =>
          slot.trangThai === "het" ? (
            <button key={slot.gio} disabled className="time-full">
              {slot.gio}
            </button>
          ) : (
            <button
              key={slot.gio}
              onClick={() => setSelectedTime(slot.gio)}
              className={`${slot.trangThai === "it" ? "time-scarce" : "time-available"} ${selectedTime === slot.gio ? "selected" : ""}`}
            >
              {slot.gio}
              {slot.trangThai === "it" && (
                <span className="mt-1 block text-[10px]">Few tables left</span>
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
  onContinue,
  onBack,
}) {
  const lunchSlots = timeSlots.filter((slot) => slot.gio < "15:00");
  const dinnerSlots = timeSlots.filter((slot) => slot.gio >= "15:00");

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
      <TimeGroup
        label="Lunch"
        slots={lunchSlots}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <TimeGroup
        label="Dinner"
        slots={dinnerSlots}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
      <div className="mt-8 flex gap-3">
        <button onClick={onBack} className="btn-ghost flex-1 rounded-xl py-3">
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={!selectedTime}
          className="btn-primary flex-1 rounded-xl py-3"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
export default TimeSelection;
