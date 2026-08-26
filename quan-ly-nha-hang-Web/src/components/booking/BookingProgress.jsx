const BOOKING_STEPS = [
  "Choose a branch",
  "Choose a time",
  "Pre-order",
  "Guest details",
  "Confirmation",
];

function BookingProgress({ currentStep }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2 overflow-x-auto">
      {BOOKING_STEPS.map((stepName, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        return (
          <div key={stepName} className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs"
              style={{
                background: isActive ? "rgba(200,136,42,.9)" : "rgba(200,136,42,.08)",
                color: isActive ? "#1a120a" : "rgba(240,216,144,.4)",
              }}
            >
              {stepNumber}
            </div>
            <span className="hidden text-xs sm:inline">{stepName}</span>
            {stepNumber < BOOKING_STEPS.length && (
              <div className="h-px w-6 bg-[rgba(200,136,42,.18)]" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BookingProgress;
