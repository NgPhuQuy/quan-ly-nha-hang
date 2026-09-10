import { useEffect, useState } from "react";
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
import { layDanhSachChiNhanhPublic } from "../../services/chiNhanh.service";

function TrangChu({
  onDatBan,
  onDangNhap,
  onBookTable,
  onLichDatCuaToi,
}) {
  const [chiNhanhs, setChiNhanhs] = useState([]);

  useEffect(() => {
    layDanhSachChiNhanhPublic()
      .then((data) => {
        setChiNhanhs(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setChiNhanhs([]);
      });
  }, []);

  const handleDatBan = onDatBan || onBookTable;

  return (
    <div className="bg-[#080604] text-amber-100 min-h-screen relative">
      {/* Nền kết nối toàn trang: Ánh nến tương tác theo chuột + Cột chỉ dẫn kiến trúc + Hạt bụi vàng */}
      <KetNoiKhongGian />

      <ThanhDieuHuong
        onDatBan={handleDatBan}
        onDangNhap={onDangNhap}
        onLichDatCuaToi={onLichDatCuaToi}
      />
      <PhanDauTrang onDatBan={handleDatBan} branches={chiNhanhs} />

      <DauNoiSection nhan="Triết Lý L'Délice" />
      <TrietLyAmThuc />

      <DauNoiSection nhan="Mỹ Vị Tinh Hoa" />
      <BoSuuTapMonAn onDatBan={handleDatBan} />

      <DauNoiSection nhan="Không Gian Độc Bản" />
      <KhuVucChiNhanh onDatBan={handleDatBan} chiNhanhs={chiNhanhs} />

      <DauNoiSection nhan="Đánh Giá Thực Khách" />
      <CamNhanKhachHang />

      <DauNoiSection nhan="Những Điều Quan Tâm" />
      <CauHoiThuongGap />

      <DauNoiSection nhan="Đặt Bàn Trực Tuyến" />
      <DatBan onDatBan={handleDatBan} />

      <ChanTrang />
    </div>
  );
}

export default TrangChu;
