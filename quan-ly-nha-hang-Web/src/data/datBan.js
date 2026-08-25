import { ANH } from "../assets/anh";

export const DICH_VU_BO_SUNG = [
    { id: "hoa", ten: "Hoa tươi trang trí", gia: 150000, bieuTuong: "🌷" },
    { id: "banh", ten: "Bánh kem theo yêu cầu", gia: 350000, bieuTuong: "🎂" },
    { id: "ruou", ten: "Rượu vang khai vị", gia: 480000, bieuTuong: "🍷" },
    { id: "anh", ten: "Chụp ảnh kỷ niệm", gia: 200000, bieuTuong: "📸" },
];

export const MON_AN = [
    { id: "m1", ten: "Gỏi cuốn tôm thịt", moTa: "Tôm sú, thịt ba chỉ, bún tươi, rau thơm", gia: 95000, anh: ANH.monMenu4, nhom: "Khai vị" },
    { id: "m2", ten: "Chả giò hải sản", moTa: "Tôm, mực, cua chiên giòn", gia: 115000, anh: ANH.monMenu2, nhom: "Khai vị" },
    { id: "m3", ten: "Súp bào ngư vi cá", moTa: "Bào ngư tươi, vi cá, nấm đông cô", gia: 185000, anh: ANH.monMenu3, nhom: "Khai vị" },
    { id: "m4", ten: "Bò Wagyu A5 nướng lava", moTa: "Bò Wagyu A5 Nhật, sốt nấm truffle", gia: 890000, anh: ANH.monAn2, nhom: "Món chính" },
    { id: "m5", ten: "Tôm hùm nướng phô mai", moTa: "Tôm hùm 600g, phô mai Pháp, bơ tỏi", gia: 750000, anh: ANH.monAn1, nhom: "Món chính" },
    { id: "m6", ten: "Lẩu thập cẩm 5S", moTa: "Hải sản, bò Mỹ, nấm tươi", gia: 680000, anh: ANH.monAn3, nhom: "Món chính" },
    { id: "m7", ten: "Cá chẽm hấp Hồng Kông", moTa: "Cá chẽm tươi hấp xì dầu gừng", gia: 420000, anh: ANH.monMenu1, nhom: "Món chính" },
    { id: "m8", ten: "Cơm rang hải sản đặc biệt", moTa: "Tôm, mực, cua, trứng muối", gia: 195000, anh: ANH.monMenu3, nhom: "Món chính" },
    { id: "m9", ten: "Bánh flan caramel cà phê", moTa: "Flan sữa tươi và caramel cà phê", gia: 75000, anh: ANH.monMenu2, nhom: "Tráng miệng" },
    { id: "m10", ten: "Chè thập cẩm cao cấp", moTa: "Sầu riêng, hạt sen, nước dừa", gia: 85000, anh: ANH.monMenu4, nhom: "Tráng miệng" },
    { id: "m11", ten: "Rượu vang đỏ Pháp", moTa: "Bordeaux AOP, năm 2020", gia: 185000, anh: ANH.monMenu6, nhom: "Đồ uống" },
    { id: "m12", ten: "Nước ép trái cây tươi", moTa: "Cam, dứa, dưa hấu hoặc xoài", gia: 65000, anh: ANH.monMenu5, nhom: "Đồ uống" },
];

export const DIP_DAT_BAN = [
    { id: "khong", ten: "Không có dịp đặc biệt" },
    { id: "sinhNhat", ten: "Sinh nhật" },
    { id: "kyNiem", ten: "Kỷ niệm" },
    { id: "cauHon", ten: "Cầu hôn" },
    { id: "tiepKhach", ten: "Tiếp khách" },
    { id: "giaDinh", ten: "Gia đình" },
];

export const KHUNG_GIO = [
    { gio: "11:00", trangThai: "con" }, { gio: "11:30", trangThai: "con" }, { gio: "12:00", trangThai: "it" }, { gio: "12:30", trangThai: "het" },
    { gio: "17:30", trangThai: "con" }, { gio: "18:00", trangThai: "con" }, { gio: "18:30", trangThai: "it" }, { gio: "19:00", trangThai: "con" },
    { gio: "19:30", trangThai: "het" }, { gio: "20:00", trangThai: "con" }, { gio: "20:30", trangThai: "it" }, { gio: "21:00", trangThai: "con" },
];
