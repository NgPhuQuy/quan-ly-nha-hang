import { useBooking } from "../../hooks/booking/useBooking";
import BranchSelection from "../../components/booking/BranchSelection";
import TimeSelection from "../../components/booking/TimeSelection";
import MenuSelection from "../../components/booking/MenuSelection";
import GuestDetails from "../../components/booking/GuestDetails";
import BookingProgress from "../../components/booking/BookingProgress";
import BookingSummary from "../../components/booking/BookingSummary";
import BookingConfirmation from "../../components/booking/BookingConfirmation";

function BookingPage({ onBack }) {
  const booking = useBooking();

  return (
    <div className="min-h-screen bg-[var(--color-warm-black)]">
      <header className="sticky top-0 z-50 border-b border-[rgba(200,136,42,.18)] bg-[rgba(10,7,4,.96)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <button onClick={onBack} style={{ color: "rgba(200,136,42,.65)" }}>
            ← 5S Dining
          </button>
          <span className="font-serif" style={{ color: "rgba(240,216,144,.62)" }}>
            Table reservation
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <BookingProgress currentStep={booking.step} />
        {booking.step < 5 ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              {booking.step === 1 && (
                <BranchSelection
                  branchId={booking.branchId}
                  setBranchId={booking.setBranchId}
                  date={booking.date}
                  setDate={booking.setDate}
                  guestCount={booking.guestCount}
                  setGuestCount={booking.setGuestCount}
                  onContinue={() => booking.setStep(2)}
                />
              )}
              {booking.step === 2 && (
                <TimeSelection
                  timeSlots={booking.timeSlots}
                  selectedTime={booking.selectedTime}
                  setSelectedTime={booking.setSelectedTime}
                  onContinue={() => booking.setStep(3)}
                  onBack={() => booking.setStep(1)}
                />
              )}
              {booking.step === 3 && (
                <MenuSelection
                  menuItems={booking.menuItems}
                  selectedItems={booking.selectedItems}
                  setSelectedItems={booking.setSelectedItems}
                  onContinue={() => booking.setStep(4)}
                  onBack={() => booking.setStep(2)}
                />
              )}
              {booking.step === 4 && (
                <GuestDetails
                  additionalServices={booking.additionalServices}
                  guestDetails={booking.guestDetails}
                  setGuestDetails={booking.setGuestDetails}
                  selectedServices={booking.selectedServices}
                  setSelectedServices={booking.setSelectedServices}
                  onConfirm={booking.submitBooking}
                  onBack={() => booking.setStep(3)}
                />
              )}
            </div>
            <BookingSummary
              branch={booking.selectedBranch}
              date={booking.date}
              time={booking.selectedTime}
              guestCount={booking.guestCount}
              selectedItems={booking.selectedItems}
              selectedServices={booking.selectedServices}
              menuItems={booking.menuItems}
              additionalServices={booking.additionalServices}
            />
          </div>
        ) : (
          <BookingConfirmation
            bookingCode={booking.bookingCode}
            branch={booking.selectedBranch}
            time={booking.selectedTime}
            date={booking.date}
            guestCount={booking.guestCount}
            guestDetails={booking.guestDetails}
            totalAmount={booking.totalAmount}
            onReset={booking.resetBooking}
            onBackHome={onBack}
          />
        )}
      </main>
    </div>
  );
}

export default BookingPage;
