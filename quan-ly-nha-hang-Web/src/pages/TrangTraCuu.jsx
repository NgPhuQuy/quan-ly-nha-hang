import { useState } from "react";
import { traCuuDatLich } from "../services/datLich.service";

function TrangTraCuu({ khiQuayLai }) {
  const [maDatBan, setMaDatBan] = useState("");
  const [dangTai, setDangTai] = useState(false);
  const [ketQua, setKetQua] = useState(null);
  const [khongTimThay, setKhongTimThay] = useState(false);

  const traCuu = async () => {
    if (!maDatBan.trim()) return;
    setDangTai(true);
    setKetQua(null);
    setKhongTimThay(false);
    try {
      const duLieu = await traCuuDatLich(maDatBan.trim());
      setKetQua(duLieu);
    } catch (error) {
      console.error("Không tra cứu được đặt bàn:", error);
      setKhongTimThay(true);
    } finally {
      setDangTai(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-warm-black)]">
      <header className="border-b border-[rgba(200,136,42,.18)] bg-[rgba(10,7,4,.96)] px-4 py-4">
        <div className="mx-auto flex max-w-4xl justify-between">
          <button
            onClick={khiQuayLai}
            style={{ color: "rgba(200,136,42,.65)" }}
          >
            ← 5S Dining
          </button>
          <span
            className="font-serif"
            style={{ color: "rgba(240,216,144,.62)" }}
          >
            Tra cứu đặt bàn
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-md px-4 py-16">
        <h1
          className="text-center font-serif text-3xl"
          style={{ color: "rgba(240,216,144,.88)" }}
        >
          Tra cứu đặt bàn
        </h1>
        <p
          className="mt-2 text-center text-sm"
          style={{ color: "rgba(240,216,144,.42)" }}
        >
          Nhập mã đặt bàn để xem trạng thái.
        </p>
        <div className="mt-8 flex gap-2">
          <input
            className="input-warm px-4 py-3"
            value={maDatBan}
            onChange={(event) => setMaDatBan(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && traCuu()}
            placeholder="Ví dụ: 5S-2026-1234"
          />
          <button
            onClick={traCuu}
            disabled={dangTai || !maDatBan.trim()}
            className="btn-primary rounded-xl px-5 disabled:opacity-50"
          >
            {dangTai ? "..." : "Tìm"}
          </button>
        </div>

        {khongTimThay && (
          <div
            className="mt-6 rounded-2xl p-5 text-center text-sm"
            style={{
              background: "rgba(160,55,55,.1)",
              border: "1px solid rgba(160,55,55,.35)",
              color: "rgba(240,180,180,.85)",
            }}
          >
            Không tìm thấy đặt bàn với mã này. Kiểm tra lại mã hoặc liên hệ nhà
            hàng.
          </div>
        )}

        {ketQua && (
          <div className="card-warm mt-6 rounded-2xl p-5">
            <div className="flex justify-between">
              <span className="opacity-50">Mã đặt bàn</span>
              <span>{ketQua.maDatLich || maDatBan}</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="opacity-50">Trạng thái</span>
              <span style={{ color: "#7ecb96" }}>{ketQua.trangThai}</span>
            </div>
            {ketQua.tenChiNhanh && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Chi nhánh</span>
                <span>{ketQua.tenChiNhanh}</span>
              </div>
            )}
            {ketQua.ngay && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Ngày</span>
                <span>{ketQua.ngay}</span>
              </div>
            )}
            {ketQua.gio && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Giờ</span>
                <span>{ketQua.gio}</span>
              </div>
            )}
            {ketQua.soKhach !== "" && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Số khách</span>
                <span>{ketQua.soKhach} người</span>
              </div>
            )}
            {ketQua.hoTen && (
              <div className="mt-3 flex justify-between">
                <span className="opacity-50">Người đặt</span>
                <span>{ketQua.hoTen}</span>
              </div>
            )}
            {ketQua.ghiChu && (
              <div
                className="mt-4 border-t pt-4 text-xs opacity-60"
                style={{ borderColor: "rgba(200,136,42,.1)" }}
              >
                Ghi chú: {ketQua.ghiChu}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
export default TrangTraCuu;
