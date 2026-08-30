import { MapPin, Clock, Utensils, User, CheckCircle2 } from "lucide-react";

const BOOKING_STEPS = [
  { label: "Chi nhánh", icon: MapPin },
  { label: "Giờ đến", icon: Clock },
  { label: "Đặt món", icon: Utensils },
  { label: "Thông tin", icon: User },
  { label: "Xác nhận", icon: CheckCircle2 },
];

function BookingProgress({ currentStep }) {
  const currentStepInfo =
    BOOKING_STEPS[Math.min(currentStep - 1, BOOKING_STEPS.length - 1)];

  return (
    <div className="mb-8">
      {/* Mobile view progress pill */}
      <div className="flex sm:hidden items-center justify-between p-3 rounded-xl bg-black/40 border border-amber-500/20 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-400 text-black text-xs font-bold flex items-center justify-center">
            {currentStep}
          </span>
          <span className="text-xs font-bold text-amber-200">
            Bước {currentStep}/5: {currentStepInfo.label}
          </span>
        </div>
        <div className="text-[11px] font-semibold text-amber-400">
          {Math.round((currentStep / 5) * 100)}%
        </div>
      </div>

      {/* Desktop/Tablet step stepper */}
      <div className="hidden sm:flex items-center justify-between max-w-2xl mx-auto px-4">
        {BOOKING_STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isDone = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center gap-1.5 relative">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCurrent
                      ? "bg-amber-400 text-black ring-4 ring-amber-400/20 shadow-lg shadow-amber-400/30 scale-110"
                      : isDone
                        ? "bg-amber-600 text-white"
                        : "bg-white/5 border border-amber-500/20 text-amber-200/40"
                  }`}
                >
                  {isDone ? <CheckCircle2 size={16} /> : <Icon size={15} />}
                </div>

                <span
                  className={`text-[11px] font-semibold tracking-wide whitespace-nowrap ${
                    isCurrent
                      ? "text-amber-300 font-bold"
                      : isDone
                        ? "text-amber-200/80"
                        : "text-amber-200/40"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {stepNumber < BOOKING_STEPS.length && (
                <div className="flex-1 mx-2 -mt-5 h-[2px] bg-amber-500/20 relative">
                  <div
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: isDone ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingProgress;
