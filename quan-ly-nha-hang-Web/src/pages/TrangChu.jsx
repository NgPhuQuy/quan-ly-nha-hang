import ThanhDieuHuong from "../components/landing/ThanhDieuHuongNav";
import PhanGioiThieu from "../components/landing/PhanGioiThieu";
import KhuVucChiNhanh from "../components/landing/KhuVucChiNhanh";
import BoSuuTapMonAn from "../components/landing/BoSuuTapMonAn";
import CamNhanKhachHang from "../components/landing/CamNhanKhachHang";
import KeuGoiDatBan from "../components/landing/KeuGoiDatBan";
import ChanTrang from "../components/landing/ChanTrangFooter";

function TrangChu({ khiDatBan, khiTraCuu }) {
    return <div><ThanhDieuHuong khiDatBan={khiDatBan} khiTraCuu={khiTraCuu} /><PhanGioiThieu khiDatBan={khiDatBan} /><KhuVucChiNhanh khiDatBan={khiDatBan} /><BoSuuTapMonAn /><CamNhanKhachHang /><KeuGoiDatBan khiDatBan={khiDatBan} khiTraCuu={khiTraCuu} /><ChanTrang /></div>;
}
export default TrangChu;
