import { useEffect, useState } from "react";
import { CHI_NHANH_MAU } from "../../data/chiNhanh";
import { layDanhSachChiNhanh } from "../../services/chiNhanh.service";
import { nenThe, kem, kemMo, vienVangNhat } from "../../themes";
import ChiaCatVang from "../chung/ChiaCatVang";

function KhuVucChiNhanh({ khiDatBan }) {
    const [chiNhanhs, setChiNhanhs] = useState(CHI_NHANH_MAU);
    useEffect(() => { layDanhSachChiNhanh().then((duLieu) => { if (!Array.isArray(duLieu) || !duLieu.length) return; setChiNhanhs(duLieu.map((chiNhanh, viTri) => ({ id: chiNhanh.id ?? viTri, ten: chiNhanh.tenChiNhanh ?? chiNhanh.ten ?? `Chi nhánh ${viTri + 1}`, diaChi: chiNhanh.diaChi ?? "Đang cập nhật địa chỉ", soDienThoai: chiNhanh.soDienThoai ?? "Đang cập nhật số điện thoại", soCho: chiNhanh.soCho ?? 0, anh: CHI_NHANH_MAU[viTri % CHI_NHANH_MAU.length].anh }))); }).catch(() => {}); }, []);
    return <section id="branches" className="px-4 py-20 sm:px-10" style={{ background: "linear-gradient(180deg,#160d06,#100a04)" }}><div className="mx-auto max-w-5xl"><div className="mb-12 text-center"><p className="mb-3 text-xs uppercase tracking-widest" style={{ color: "rgba(200,136,42,.6)" }}>Hệ thống chi nhánh</p><h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.65rem,4vw,2.5rem)", color: kem }}>Gặp nhau tại không gian của bạn</h2><ChiaCatVang /></div><div className="grid gap-4 sm:grid-cols-3">{chiNhanhs.map((chiNhanh) => <article key={chiNhanh.id} className="branch-card overflow-hidden rounded-2xl" style={{ background: nenThe, border: `1px solid ${vienVangNhat}` }}><div className="h-[175px] overflow-hidden"><img src={chiNhanh.anh} alt={chiNhanh.ten} className="branch-image h-full w-full object-cover" /></div><div className="p-4"><h3 className="font-serif" style={{ color: kem }}>{chiNhanh.ten}</h3><p className="mt-1 text-xs" style={{ color: kemMo }}>{chiNhanh.diaChi}</p><p className="mt-1 text-xs" style={{ color: "rgba(200,136,42,.5)" }}>{chiNhanh.soDienThoai}</p><div className="mt-3 flex items-center justify-between"><button onClick={khiDatBan} className="btn-primary rounded-full px-4 py-1.5 text-xs">Đặt bàn</button><span className="text-xs" style={{ color: "rgba(240,216,144,.26)" }}>{chiNhanh.soCho} chỗ</span></div></div></article>)}</div></div></section>;
}
export default KhuVucChiNhanh;
