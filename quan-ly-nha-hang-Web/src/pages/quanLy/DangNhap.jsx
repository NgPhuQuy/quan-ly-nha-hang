import TrangXacThuc from "../landing/TrangXacThuc";

function DangNhap({ onDangNhapThanhCong, onQuayVeTrangChu }) {
  return (
    <TrangXacThuc
      defaultTab="login"
      onDangNhapThanhCong={onDangNhapThanhCong}
      onQuayVeTrangChu={onQuayVeTrangChu}
    />
  );
}

export default DangNhap;
