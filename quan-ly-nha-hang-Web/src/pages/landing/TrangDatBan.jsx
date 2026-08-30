import { useDatLich } from "../../hooks/useDatLich";
import ChonChiNhanh from "../../components/landing/booking/ChonChiNhanh";
import ChonKhungGio from "../../components/landing/booking/ChonKhungGio";
import ChonMonAn from "../../components/landing/booking/ChonMonAn";
import ThongTinKhachHang from "../../components/landing/booking/ThongTinKhachHang";
import TienTrinhDatBan from "../../components/landing/booking/TienTrinhDatBan";
import TomTatDatBan from "../../components/landing/booking/TomTatDatBan";
import XacNhanDatBan from "../../components/landing/booking/XacNhanDatBan";

function TrangDatBan({ onQuayLai }) {
  const booking = useDatLich();

  return (
    <div className="min-h-screen bg-[var(--color-warm-black)]">
      <header className="sticky top-0 z-50 border-b border-[rgba(200,136,42,.18)] bg-[rgba(10,7,4,.96)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <button onClick={onQuayLai} style={{ color: "rgba(200,136,42,.65)" }} className="hover:text-amber-300 transition-colors">
            ← 5S Dining
          </button>
          <span
            className="font-serif font-medium"
            style={{ color: "rgba(240,216,144,.85)" }}
          >
            Đặt bàn trực tuyến
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <TienTrinhDatBan currentStep={booking.step} />
        {booking.step < 5 ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              {booking.step === 1 && (
                <ChonChiNhanh
                  branchId={booking.branchId}
                  setBranchId={booking.setBranchId}
                  date={booking.date}
                  setDate={booking.setDate}
                  guestCount={booking.guestCount}
                  setGuestCount={booking.setGuestCount}
                  onTiepTuc={() => booking.setStep(2)}
                />
              )}
              {booking.step === 2 && (
                <ChonKhungGio
                  timeSlots={booking.timeSlots}
                  selectedTime={booking.selectedTime}
                  setSelectedTime={booking.setSelectedTime}
                  onTiepTuc={() => booking.setStep(3)}
                  onQuayLai={() => booking.setStep(1)}
                />
              )}
              {booking.step === 3 && (
                <ChonMonAn
                  menuItems={booking.menuItems}
                  selectedItems={booking.selectedItems}
                  setSelectedItems={booking.setSelectedItems}
                  onTiepTuc={() => booking.setStep(4)}
                  onQuayLai={() => booking.setStep(2)}
                />
              )}
              {booking.step === 4 && (
                <ThongTinKhachHang
                  additionalServices={booking.additionalServices}
                  guestDetails={booking.guestDetails}
                  setGuestDetails={booking.setGuestDetails}
                  selectedServices={booking.selectedServices}
                  setSelectedServices={booking.setSelectedServices}
                  onXacNhan={booking.handleDatLich}
                  onQuayLai={() => booking.setStep(3)}
                />
              )}
            </div>
            <TomTatDatBan
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
          <XacNhanDatBan
            bookingCode={booking.bookingCode}
            branch={booking.selectedBranch}
            time={booking.selectedTime}
            date={booking.date}
            guestCount={booking.guestCount}
            guestDetails={booking.guestDetails}
            totalAmount={booking.totalAmount}
            onDatLai={booking.handleDatLai}
            onVeTrangChu={onQuayLai}
          />
        )}
      </main>
    </div>
  );
}

export default TrangDatBan;
