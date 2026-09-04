import ThanhDieuHuong from "../../components/landing/home/ThanhDieuHuong";
import PhanDauTrang from "../../components/landing/home/PhanDauTrang";
import TrietLyAmThuc from "../../components/landing/home/TrietLyAmThuc";
import BoSuuTapMonAn from "../../components/landing/home/BoSuuTapMonAn";
import KhuVucChiNhanh from "../../components/landing/home/KhuVucChiNhanh";
import CamNhanKhachHang from "../../components/landing/home/CamNhanKhachHang";
import CauHoiThuongGap from "../../components/landing/home/CauHoiThuongGap";
import DatBan from "../../components/landing/home/DatBan";
import ChanTrang from "../../components/landing/home/ChanTrang";
import KetNoiKhongGian, { DauNoiSection } from "../../components/landing/home/KetNoiKhongGian";

function TrangChu({
  onDatBan,
  onTraCuuDatBan,
  onDangNhap,
  onBookTable,
  onLookupBooking,
}) {
  const handleDatBan = onDatBan || onBookTable;
  const handleTraCuuDatBan = onTraCuuDatBan || onLookupBooking;

  return (
    <div className="bg-[#080604] text-amber-100 min-h-screen relative">
      {/* Nền kết nối toàn trang: Ánh nến tương tác theo chuột + Cột chỉ dẫn kiến trúc + Hạt bụi vàng */}
      <KetNoiKhongGian />

      <ThanhDieuHuong
        onDatBan={handleDatBan}
        onTraCuuDatBan={handleTraCuuDatBan}
        onDangNhap={onDangNhap}
      />
      <PhanDauTrang onDatBan={handleDatBan} />

      <DauNoiSection nhan="Triết Lý L'Délice" />
      <TrietLyAmThuc />

      <DauNoiSection nhan="Mỹ Vị Tinh Hoa" />
      <BoSuuTapMonAn onDatBan={handleDatBan} />

      <DauNoiSection nhan="Không Gian Độc Bản" />
      <KhuVucChiNhanh onDatBan={handleDatBan} />

      <DauNoiSection nhan="Đánh Giá Thực Khách" />
      <CamNhanKhachHang />

      <DauNoiSection nhan="Những Điều Quan Tâm" />
      <CauHoiThuongGap />

      <DauNoiSection nhan="Đặt Bàn Trực Tuyến" />
      <DatBan onDatBan={handleDatBan} onTraCuuDatBan={handleTraCuuDatBan} />

      <ChanTrang />
    </div>
  );
}

export default TrangChu;
