import { MapPin, Clock, Utensils, User, CheckCircle2 } from "lucide-react";

const BOOKING_STEPS = [
  { roman: "I", label: "Chi nhánh & Ngày", icon: MapPin },
  { roman: "II", label: "Khung giờ", icon: Clock },
  { roman: "III", label: "Thực đơn chọn", icon: Utensils },
  { roman: "IV", label: "Thông tin tiệc", icon: User },
  { roman: "V", label: "Xác nhận đặt chỗ", icon: CheckCircle2 },
];

function BookingProgress({ currentStep }) {
  const currentStepInfo =
    BOOKING_STEPS[Math.min(currentStep - 1, BOOKING_STEPS.length - 1)];

  return (
    <div className="mb-8">
      {/* Mobile view progress pill */}
      <div className="flex sm:hidden items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#181109] to-[#0f0b06] border border-amber-500/25 mb-4 shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-black text-xs font-serif font-bold flex items-center justify-center shadow-md">
            {currentStepInfo.roman}
          </span>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-amber-400/80 block">
              Giai đoạn {currentStep}/5
            </span>
            <span className="text-xs font-serif font-bold text-amber-100">
              {currentStepInfo.label}
            </span>
          </div>
        </div>
        <div className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          {Math.round((currentStep / 5) * 100)}%
        </div>
      </div>

      {/* Desktop/Tablet step stepper */}
      <div className="hidden sm:flex items-center justify-between max-w-3xl mx-auto px-4 py-2">
        {BOOKING_STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isDone = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          return (
            <div
              key={step.label}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center gap-1.5 relative group">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-serif font-bold transition-all duration-300 ${
                    isCurrent
                      ? "bg-gradient-to-br from-amber-300 to-amber-500 text-black ring-4 ring-amber-400/25 shadow-[0_0_20px_rgba(212,150,43,0.5)] scale-110"
                      : isDone
                        ? "bg-amber-600/90 text-amber-100 border border-amber-400/50 shadow-md"
                        : "bg-white/[0.04] border border-amber-500/20 text-amber-200/40"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 size={16} className="text-amber-100" />
                  ) : (
                    <span className="tracking-wide">{step.roman}</span>
                  )}
                </div>

                <div className="text-center">
                  <span
                    className={`text-[11px] block font-medium tracking-wide whitespace-nowrap transition-colors ${
                      isCurrent
                        ? "text-amber-200 font-serif font-bold scale-105"
                        : isDone
                          ? "text-amber-200/80"
                          : "text-amber-200/40"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </div>

              {stepNumber < BOOKING_STEPS.length && (
                <div className="flex-1 mx-3 -mt-5 h-[2px] bg-amber-500/15 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(212,150,43,0.6)]"
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
