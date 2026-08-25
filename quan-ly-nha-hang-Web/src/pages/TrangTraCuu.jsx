import { useState } from "react";

function TrangTraCuu({ khiQuayLai }) {
    const [maDatBan, setMaDatBan] = useState("");
    const [hienKetQua, setHienKetQua] = useState(false);
    const traCuu = () => { if (maDatBan.trim()) setHienKetQua(true); };
    return <div className="min-h-screen bg-[var(--color-warm-black)]"><header className="border-b border-[rgba(200,136,42,.18)] bg-[rgba(10,7,4,.96)] px-4 py-4"><div className="mx-auto flex max-w-4xl justify-between"><button onClick={khiQuayLai} style={{ color: "rgba(200,136,42,.65)" }}>← 5S Dining</button><span className="font-serif" style={{ color: "rgba(240,216,144,.62)" }}>Tra cứu đặt bàn</span></div></header><main className="mx-auto max-w-md px-4 py-16"><h1 className="text-center font-serif text-3xl" style={{ color: "rgba(240,216,144,.88)" }}>Tra cứu đặt bàn</h1><p className="mt-2 text-center text-sm" style={{ color: "rgba(240,216,144,.42)" }}>Nhập mã đặt bàn để xem trạng thái.</p><div className="mt-8 flex gap-2"><input className="input-warm px-4 py-3" value={maDatBan} onChange={(event) => setMaDatBan(event.target.value)} onKeyDown={(event) => event.key === "Enter" && traCuu()} placeholder="Ví dụ: 5S-2026-1234" /><button onClick={traCuu} className="btn-primary rounded-xl px-5">Tìm</button></div>{hienKetQua && <div className="card-warm mt-6 rounded-2xl p-5"><div className="flex justify-between"><span className="opacity-50">Mã đặt bàn</span><span>{maDatBan}</span></div><div className="mt-3 flex justify-between"><span className="opacity-50">Trạng thái</span><span style={{ color: "#7ecb96" }}>Đã xác nhận</span></div></div>}</main></div>;
}
export default TrangTraCuu;
