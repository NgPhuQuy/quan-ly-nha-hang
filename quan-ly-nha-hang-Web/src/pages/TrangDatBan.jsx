import { useEffect, useMemo, useState } from "react";
import BuocChon from "../components/datBan/BuocChon";
import BuocChonGio from "../components/datBan/BuocChonGio";
import BuocMonAn from "../components/datBan/BuocMonAn";
import BuocThongTin from "../components/datBan/BuocThongTin";
import TomTatDatBan from "../components/datBan/TomTatDatBan";
import { CHI_NHANH_MAU } from "../data/chiNhanh";
import { DIP_DAT_BAN, DICH_VU_BO_SUNG, MON_AN } from "../data/datBan";
import { layDanhSachChiNhanh } from "../services/chiNhanh.service";

const CAC_BUOC = ["Chọn bàn", "Chọn giờ", "Món ăn", "Thông tin", "Hoàn tất"];

function TrangDatBan({ khiQuayLai }) {
    const [buoc, setBuoc] = useState(1);
    const [chiNhanh, setChiNhanh] = useState("");
    const [ngay, setNgay] = useState("");
    const [soKhach, setSoKhach] = useState(2);
    const [gioDaChon, setGioDaChon] = useState("");
    const [monAn, setMonAn] = useState([]);
    const [thongTin, setThongTin] = useState({ hoTen: "", soDienThoai: "", email: "", ghiChu: "", dip: "khong" });
    const [dichVuBoSung, setDichVuBoSung] = useState([]);
    const [maDatBan, setMaDatBan] = useState("");
    const [chiNhanhs, setChiNhanhs] = useState(CHI_NHANH_MAU);
    useEffect(() => { layDanhSachChiNhanh().then((duLieu) => { if (duLieu.length) setChiNhanhs(duLieu); }).catch(() => {}); }, []);
    const thongTinChiNhanh = useMemo(() => chiNhanhs.find((mau) => String(mau.id) === String(chiNhanh)), [chiNhanhs, chiNhanh]);
    const tongTien = monAn.reduce((tong, mon) => tong + (MON_AN.find((m) => m.id === mon.monAnId)?.gia || 0) * mon.soLuong, 0) + dichVuBoSung.reduce((tong, id) => tong + (DICH_VU_BO_SUNG.find((m) => m.id === id)?.gia || 0), 0);
    const xacNhan = () => { setMaDatBan(`5S-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`); setBuoc(5); };
    const datLai = () => { setBuoc(1); setChiNhanh(""); setNgay(""); setSoKhach(2); setGioDaChon(""); setMonAn([]); setThongTin({ hoTen: "", soDienThoai: "", email: "", ghiChu: "", dip: "khong" }); setDichVuBoSung([]); setMaDatBan(""); };

    return <div className="min-h-screen bg-[var(--color-warm-black)]"><header className="sticky top-0 z-50 border-b border-[rgba(200,136,42,.18)] bg-[rgba(10,7,4,.96)]"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"><button onClick={khiQuayLai} style={{ color: "rgba(200,136,42,.65)" }}>← 5S Dining</button><span className="font-serif" style={{ color: "rgba(240,216,144,.62)" }}>Đặt bàn trực tuyến</span></div></header><main className="mx-auto max-w-6xl px-4 py-8 sm:px-6"><div className="mb-8 flex items-center justify-center gap-2 overflow-x-auto">{CAC_BUOC.map((tenBuoc, index) => { const soBuoc = index + 1; return <div key={tenBuoc} className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full text-xs" style={{ background: soBuoc <= buoc ? "rgba(200,136,42,.9)" : "rgba(200,136,42,.08)", color: soBuoc <= buoc ? "#1a120a" : "rgba(240,216,144,.4)" }}>{soBuoc}</div><span className="hidden text-xs sm:inline">{tenBuoc}</span>{soBuoc < CAC_BUOC.length && <div className="h-px w-6 bg-[rgba(200,136,42,.18)]" />}</div>; })}</div>{buoc < 5 ? <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]"><div>{buoc === 1 && <BuocChon chiNhanh={chiNhanh} setChiNhanh={setChiNhanh} ngay={ngay} setNgay={setNgay} soKhach={soKhach} setSoKhach={setSoKhach} khiTiepTuc={() => setBuoc(2)} />}{buoc === 2 && <BuocChonGio gioDaChon={gioDaChon} setGioDaChon={setGioDaChon} khiTiepTuc={() => setBuoc(3)} khiQuayLai={() => setBuoc(1)} />}{buoc === 3 && <BuocMonAn monAn={monAn} setMonAn={setMonAn} khiTiepTuc={() => setBuoc(4)} khiQuayLai={() => setBuoc(2)} />}{buoc === 4 && <BuocThongTin thongTin={thongTin} setThongTin={setThongTin} dichVuBoSung={dichVuBoSung} setDichVuBoSung={setDichVuBoSung} khiXacNhan={xacNhan} khiQuayLai={() => setBuoc(3)} />}</div><TomTatDatBan chiNhanh={chiNhanh} ngay={ngay} gio={gioDaChon} soKhach={soKhach} monAn={monAn} dichVuBoSung={dichVuBoSung} /></div> : <div className="mx-auto max-w-2xl"><div className="mb-6 text-center"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "rgba(74,140,92,.12)", border: "2px solid rgba(74,140,92,.4)" }}>✓</div><h1 className="mt-5 font-serif text-3xl" style={{ color: "rgba(240,216,144,.9)" }}>Đặt bàn thành công!</h1><p className="mt-2 text-sm" style={{ color: "rgba(240,216,144,.42)" }}>Mã đặt bàn: <b style={{ color: "rgba(232,184,75,.95)" }}>{maDatBan}</b></p></div><div className="card-warm rounded-2xl p-5 sm:p-7"><div className="grid grid-cols-2 gap-5 text-sm"><div><span className="block text-xs opacity-40">Chi nhánh</span>{thongTinChiNhanh?.ten}</div><div><span className="block text-xs opacity-40">Giờ</span>{gioDaChon}</div><div><span className="block text-xs opacity-40">Ngày</span>{ngay}</div><div><span className="block text-xs opacity-40">Số khách</span>{soKhach}</div><div><span className="block text-xs opacity-40">Người đặt</span>{thongTin.hoTen}</div><div><span className="block text-xs opacity-40">Điện thoại</span>{thongTin.soDienThoai}</div></div><div className="mt-6 border-t pt-5" style={{ borderColor: "rgba(200,136,42,.1)" }}><div className="flex justify-between"><span className="text-sm opacity-50">Món và dịch vụ</span><span>{tongTien.toLocaleString("vi-VN")}₫</span></div>{thongTin.dip !== "khong" && <p className="mt-2 text-xs opacity-50">Dịp: {DIP_DAT_BAN.find((dip) => dip.id === thongTin.dip)?.ten}</p>}</div></div><div className="mt-5 flex gap-3"><button onClick={datLai} className="btn-ghost flex-1 rounded-xl py-3">Đặt bàn khác</button><button onClick={khiQuayLai} className="btn-primary flex-1 rounded-xl py-3">Về trang chủ</button></div></div>}</main></div>;
}
export default TrangDatBan;
