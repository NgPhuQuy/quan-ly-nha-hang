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
  const datLich = useDatLich();

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

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-md">
              <Sparkles size={15} />
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-amber-100 block">
                L'DÉLICE
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400/80 font-serif block -mt-1">
                Haute Gastronomie
              </span>
            </div>
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
        <TienTrinhDatBan currentStep={datLich.step} />

        {datLich.step < 5 ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
            <div className="w-full">
              <div key={datLich.step} className="step-transition">
                {datLich.step === 1 && (
                  <ChonChiNhanh
                    chi_nhanh={datLich.chi_nhanh}
                    branchId={datLich.branchId}
                    setBranchId={datLich.setBranchId}
                    date={datLich.date}
                    setDate={datLich.setDate}
                    guestCount={datLich.guestCount}
                    setGuestCount={datLich.setGuestCount}
                    onTiepTuc={() => datLich.setStep(2)}
                  />
                )}
                {datLich.step === 2 && (
                  <ChonKhungGio
                    chiNhanh={datLich.chiNhanhDaChon}
                    khungGio={datLich.khungGio}
                    selectedTime={datLich.selectedTime}
                    setSelectedTime={datLich.setSelectedTime}
                    onTiepTuc={() => datLich.setStep(3)}
                    onQuayLai={() => datLich.setStep(1)}
                  />
                )}
                {datLich.step === 3 && (
                  <ChonMonAn
                    danhSachMonAn={datLich.danhSachMonAn}
                    nhomMenu={datLich.nhomMenu}
                    setNhomMenu={datLich.setNhomMenu}
                    selectedItems={datLich.selectedItems}
                    setSelectedItems={datLich.setSelectedItems}
                    onTiepTuc={() => datLich.setStep(4)}
                    onQuayLai={() => datLich.setStep(2)}
                  />
                )}
                {datLich.step === 4 && (
                  <ThongTinKhachHang
                    dichVuBoSung={datLich.dichVuBoSung}
                    guestDetails={datLich.guestDetails}
                    setGuestDetails={datLich.setGuestDetails}
                    selectedServices={datLich.selectedServices}
                    setSelectedServices={datLich.setSelectedServices}
                    onXacNhan={datLich.handleDatLich}
                    onQuayLai={() => datLich.setStep(3)}
                  />
                )}
              </div>
            </div>

            {/* Sidebar Summary */}
            <TomTatDatBan
              branch={datLich.chiNhanhDaChon}
              date={datLich.date}
              time={datLich.selectedTime}
              guestCount={datLich.guestCount}
              selectedItems={datLich.selectedItems}
              selectedServices={datLich.selectedServices}
              danhSachMonAn={datLich.danhSachMonAn}
              dichVuBoSung={datLich.dichVuBoSung}
            />
          </div>
        ) : (
          <div key="step-5-confirmation" className="step-transition">
            <XacNhanDatBan
              bookingCode={datLich.bookingCode}
              branch={datLich.chiNhanhDaChon}
              time={datLich.selectedTime}
              date={datLich.date}
              guestCount={datLich.guestCount}
              guestDetails={datLich.guestDetails}
              totalAmount={datLich.totalAmount}
              onDatLai={datLich.handleDatLai}
              onVeTrangChu={onQuayLai}
            />
          </div>
        )}
      </main>

      {/* Booking Footer */}
      <footer className="border-t border-amber-500/10 bg-[#080503] py-4 text-center text-xs text-amber-200/40">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Thông tin đặt bàn của quý khách được bảo mật tuyệt đối.</span>
          </div>
          <p>© {new Date().getFullYear()} L'Délice Restaurant Group.</p>
        </div>
      </footer>
    </div>
  );
}

export default TrangDatBan;
