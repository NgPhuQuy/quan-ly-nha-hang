import ThanhDieuHuong from "../../components/landing/home/ThanhDieuHuong";
import PhanDauTrang from "../../components/landing/home/PhanDauTrang";
import KhuVucChiNhanh from "../../components/landing/home/KhuVucChiNhanh";
import BoSuuTapMonAn from "../../components/landing/home/BoSuuTapMonAn";
import CamNhanKhachHang from "../../components/landing/home/CamNhanKhachHang";
import DatBan from "../../components/landing/home/DatBan";
import ChanTrang from "../../components/landing/home/ChanTrang";

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
    <div>
      <ThanhDieuHuong
        onDatBan={handleDatBan}
        onTraCuuDatBan={handleTraCuuDatBan}
        onDangNhap={onDangNhap}
      />
      <PhanDauTrang onDatBan={handleDatBan} />
      <KhuVucChiNhanh onDatBan={handleDatBan} />
      <BoSuuTapMonAn onDatBan={handleDatBan} />
      <CamNhanKhachHang />
      <DatBan onDatBan={handleDatBan} onTraCuuDatBan={handleTraCuuDatBan} />
      <ChanTrang />
    </div>
  );
}

export default TrangChu;
