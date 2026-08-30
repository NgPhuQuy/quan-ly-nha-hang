import { useDatLich } from "../../hooks/useDatLich";
import ChonChiNhanh from "../../components/landing/booking/ChonChiNhanh";
import ChonKhungGio from "../../components/landing/booking/ChonKhungGio";
import ChonMonAn from "../../components/landing/booking/ChonMonAn";
import ThongTinKhachHang from "../../components/landing/booking/ThongTinKhachHang";
import TienTrinhDatBan from "../../components/landing/booking/TienTrinhDatBan";
import TomTatDatBan from "../../components/landing/booking/TomTatDatBan";
import XacNhanDatBan from "../../components/landing/booking/XacNhanDatBan";
import { ArrowLeft, PhoneCall, Sparkles, ShieldCheck } from "lucide-react";

function TrangDatBan({ onQuayLai }) {
  const booking = useDatLich();

  return (
    <div className="min-h-screen bg-[#0a0704] text-amber-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-[rgba(12,9,5,0.96)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <button
            onClick={onQuayLai}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-200/80 hover:text-amber-300 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="text-amber-400 group-hover:-translate-x-1 transition-transform"
            />
            <span>Quay lại trang chủ</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Sparkles size={14} />
            </div>
            <span className="font-serif text-base sm:text-lg font-bold tracking-wide text-amber-200">
              5S DINING
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-amber-200/60 font-mono">
            <PhoneCall size={13} className="text-amber-400" />
            <span>
              Hotline: <strong className="text-amber-300">1800 5678</strong>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 flex-1 w-full">
        <TienTrinhDatBan currentStep={booking.step} />

        {booking.step < 5 ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <div className="w-full">
              {booking.step === 1 && (
                <ChonChiNhanh
                  branches={booking.branches}
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

            {/* Sidebar Summary */}
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

      {/* Booking Footer */}
      <footer className="border-t border-amber-500/10 bg-[#080503] py-4 text-center text-xs text-amber-200/40">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Thông tin đặt bàn của quý khách được bảo mật tuyệt đối.</span>
          </div>
          <p>© {new Date().getFullYear()} 5S Dining Restaurant Chain.</p>
        </div>
      </footer>
    </div>
  );
}

export default TrangDatBan;
