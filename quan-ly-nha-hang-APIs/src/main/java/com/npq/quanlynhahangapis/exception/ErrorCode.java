package com.npq.quanlynhahangapis.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    USER_EXISTED(400, "Tài khoản này đã được sử dụng!"),
    EMAIL_EXISTED(400, "Email này đã được sử dụng!"),
    PHONE_EXISTED(400, "Số điện thọại này đã được sử dụng!"),

    SOURCE_NOT_FOUND(404, "Không tìm thấy "),
    USER_NOT_FOUND(404, "Không tìm thấy người dùng!"),
    ROLE_NOT_FOUND(404, "Người dùng hiện tại chưa được cấp vai trò!"),

    INVALID_CREDENTIALS(400, "Tài khoản hoặc mật khẩu không chính xác!"),
    UNAUTHORIZED(401, "Bạn chưa đăng nhập, vui lòng đăng nhập để sử dụng các tính năng!"),
    TOKEN_EXPIRATION(401, "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!"),
    INVALID_TOKEN(401, "Token không hợp lệ!"),
    FORBIDDEN(403, "Bạn không có quyền thực hiện thao tác này!"),
    INTERNAL_SERVER_ERROR(500, "Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!"),

    BRANCH_NOT_FOUND(404, "Không tìm thấy chi nhánh"),
    CLOSED_DAY(400, "Chi nhánh không hoạt động vào ngày này"),
    CAPACITY_EXCEEDED(400, "Chi nhánh không đủ chỗ cho khung giờ này"),
    INVALID_BOOKING_TIME(400, "Thời gian đặt lịch hoặc kết thúc vượt quá giờ hoạt động"),
    FILE_MUST_BE_IMAGE(400, "File tải lên phải là hình ảnh"),
    FAIL_TO_UPLOAD(400, "Tải ảnh lên thất bại");

    private final int status;
    private final String message;

    ErrorCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
