-- =========================================================
-- SEED DATABASE - NHÀ HÀNG 5S
-- =========================================================

SET FOREIGN_KEY_CHECKS = 0;

-- =========================================================
-- 0. XÓA DATA CŨ
-- =========================================================

TRUNCATE TABLE chi_tiet_hoa_don;
TRUNCATE TABLE hoa_don;
TRUNCATE TABLE dat_truoc;
TRUNCATE TABLE dat_lich;
TRUNCATE TABLE trang_thai_mat_hang_chi_nhanh;
TRUNCATE TABLE ban;
TRUNCATE TABLE mat_hang;
TRUNCATE TABLE chi_nhanh;
TRUNCATE TABLE nguoi_dung;

SET FOREIGN_KEY_CHECKS = 1;


-- =========================================================
-- 1. NGƯỜI DÙNG
-- =========================================================
-- Mật khẩu của tất cả tài khoản:
-- 123456
--
-- Hash:
-- $2a$10$hefrir2VflakpBO.6H7LIe/L.37d26R9sSBzTi56H3nV9FS33R1Ma
-- =========================================================

INSERT INTO nguoi_dung
(
    tai_khoan,
    mat_khau,
    ho,
    ten,
    email,
    ngay_cap_nhat,
    ngay_tao,
    so_dien_thoai,
    trang_thai,
    vai_tro
)
VALUES

-- ADMIN
(
    'admin',
    '$2a$10$hefrir2VflakpBO.6H7LIe/L.37d26R9sSBzTi56H3nV9FS33R1Ma',
    'Nguyen',
    'Admin',
    'admin@ldelice.vn',
    NOW(),
    NOW(),
    '0900000001',
    TRUE,
    'ADMIN'
),

-- QUẢN LÝ 1
(
    'quanly01',
    '$2a$10$hefrir2VflakpBO.6H7LIe/L.37d26R9sSBzTi56H3nV9FS33R1Ma',
    'Nguyen',
    'Quan Ly 01',
    'quanly01@ldelice.vn',
    NOW(),
    NOW(),
    '0900000002',
    TRUE,
    'QUAN_LY'
),

-- QUẢN LÝ 2
(
    'quanly02',
    '$2a$10$hefrir2VflakpBO.6H7LIe/L.37d26R9sSBzTi56H3nV9FS33R1Ma',
    'Tran',
    'Quan Ly 02',
    'quanly02@ldelice.vn',
    NOW(),
    NOW(),
    '0900000003',
    TRUE,
    'QUAN_LY'
),

-- KHÁCH HÀNG 1
(
    'khachhang01',
    '$2a$10$hefrir2VflakpBO.6H7LIe/L.37d26R9sSBzTi56H3nV9FS33R1Ma',
    'Le',
    'Khach Hang 01',
    'khachhang01@gmail.com',
    NOW(),
    NOW(),
    '0900000004',
    TRUE,
    'KHACH_HANG'
),

-- KHÁCH HÀNG 2
(
    'khachhang02',
    '$2a$10$hefrir2VflakpBO.6H7LIe/L.37d26R9sSBzTi56H3nV9FS33R1Ma',
    'Pham',
    'Khach Hang 02',
    'khachhang02@gmail.com',
    NOW(),
    NOW(),
    '0900000005',
    TRUE,
    'KHACH_HANG'
);


-- =========================================================
-- 2. CHI NHÁNH
-- =========================================================

INSERT INTO chi_nhanh
(
    ten_chi_nhanh,
    so_luong_don,
    gio_hoat_dong,
    gio_dong_cua,
    trang_thai,
    so_dien_thoai,
    dia_chi,
    anh_chi_nhanh
)
VALUES

(
    'L''Délice - Nguyen Hue',
    50,
    '08:00:00',
    '21:00:00',
    TRUE,
    '02838229999',
    '123 Nguyen Hue, Quan 1, TP. Ho Chi Minh',
    NULL
),

(
    'L''Délice - Phu Nhuan',
    40,
    '08:00:00',
    '21:00:00',
    TRUE,
    '02839998888',
    '456 Phan Xich Long, Phu Nhuan, TP. Ho Chi Minh',
    NULL
);


-- =========================================================
-- 3. BÀN
-- 3 BÀN / CHI NHÁNH
-- =========================================================

INSERT INTO ban
(
    suc_chua,
    trang_thai,
    ma_chi_nhanh
)
VALUES

-- Chi nhánh 1
(2, TRUE, 1),
(4, TRUE, 1),
(6, TRUE, 1),

-- Chi nhánh 2
(2, TRUE, 2),
(4, TRUE, 2),
(6, TRUE, 2);


-- =========================================================
-- 4. 7 MÓN ĂN
-- =========================================================

INSERT INTO mat_hang
(
    ten_mat_hang,
    anh_minh_hoa,
    gia_mat_hang,
    loai_mat_hang
)
VALUES

('Bít tết bò sốt tiêu đen', NULL, 189000, 'MON_AN'),
('Mì Ý bò bằm', NULL, 99000, 'MON_AN'),
('Pizza hải sản', NULL, 159000, 'MON_AN'),
('Cơm chiên hải sản', NULL, 89000, 'MON_AN'),
('Gà nướng thảo mộc', NULL, 149000, 'MON_AN'),
('Salad cá ngừ', NULL, 79000, 'MON_AN'),
('Khoai tây chiên', NULL, 49000, 'MON_AN');


-- =========================================================
-- 5. 10 MÓN NƯỚC
-- =========================================================

INSERT INTO mat_hang
(
    ten_mat_hang,
    anh_minh_hoa,
    gia_mat_hang,
    loai_mat_hang
)
VALUES

('Nước lọc', NULL, 15000, 'THUC_UONG'),
('Nước cam ép', NULL, 45000, 'THUC_UONG'),
('Nước táo ép', NULL, 45000, 'THUC_UONG'),
('Nước dứa ép', NULL, 45000, 'THUC_UONG'),
('Nước chanh', NULL, 35000, 'THUC_UONG'),
('Trà đào', NULL, 39000, 'THUC_UONG'),
('Trà chanh', NULL, 35000, 'THUC_UONG'),
('Cà phê đen', NULL, 35000, 'THUC_UONG'),
('Cà phê sữa', NULL, 39000, 'THUC_UONG'),
('Nước ngọt', NULL, 25000, 'THUC_UONG');


-- =========================================================
-- 6. 5 MÓN RƯỢU
-- =========================================================
-- Entity hiện tại chưa có loại RUOU riêng
-- nên tạm để THUC_UONG
-- =========================================================

INSERT INTO mat_hang
(
    ten_mat_hang,
    anh_minh_hoa,
    gia_mat_hang,
    loai_mat_hang
)
VALUES

('Vang đỏ Cabernet Sauvignon', NULL, 450000, 'THUC_UONG'),
('Vang trắng Chardonnay', NULL, 420000, 'THUC_UONG'),
('Vang hồng Rosé', NULL, 400000, 'THUC_UONG'),
('Rượu vang Merlot', NULL, 480000, 'THUC_UONG'),
('Champagne Brut', NULL, 650000, 'THUC_UONG');


-- =========================================================
-- 7. TRẠNG THÁI MÓN HÀNG / CHI NHÁNH
-- 22 MÓN × 2 CHI NHÁNH = 44 DÒNG
-- =========================================================

INSERT INTO trang_thai_mat_hang_chi_nhanh
(
    ma_mat_hang,
    ma_chi_nhanh,
    trang_thai_mat_hang
)
SELECT
    ma_mat_hang,
    1,
    'DANG_BAN'
FROM mat_hang;

INSERT INTO trang_thai_mat_hang_chi_nhanh
(
    ma_mat_hang,
    ma_chi_nhanh,
    trang_thai_mat_hang
)
SELECT
    ma_mat_hang,
    2,
    'DANG_BAN'
FROM mat_hang;


-- =========================================================
-- 8. KHÔNG SEED ĐẶT LỊCH
-- =========================================================
-- Để trống để test API đặt lịch thật.
--
-- DAT_LICH      = 0
-- DAT_TRUOC     = 0
-- HOA_DON       = 0
-- CHI_TIET_HOA_DON = 0
-- =========================================================


-- =========================================================
-- 9. KIỂM TRA KẾT QUẢ
-- =========================================================

SELECT 'NGUOI_DUNG' AS bang, COUNT(*) AS so_luong FROM nguoi_dung
UNION ALL
SELECT 'CHI_NHANH', COUNT(*) FROM chi_nhanh
UNION ALL
SELECT 'BAN', COUNT(*) FROM ban
UNION ALL
SELECT 'MAT_HANG', COUNT(*) FROM mat_hang
UNION ALL
SELECT 'TRANG_THAI_MAT_HANG_CHI_NHANH', COUNT(*) 
FROM trang_thai_mat_hang_chi_nhanh
UNION ALL
SELECT 'DAT_LICH', COUNT(*) FROM dat_lich
UNION ALL
SELECT 'DAT_TRUOC', COUNT(*) FROM dat_truoc
UNION ALL
SELECT 'HOA_DON', COUNT(*) FROM hoa_don
UNION ALL
SELECT 'CHI_TIET_HOA_DON', COUNT(*) FROM chi_tiet_hoa_don;