package com.npq.quanlynhahangapis.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    USER_EXISTED(400, "Tài khoản này đã được sử dụng!"),
    EMAIL_EXISTED(400, "Email này đã được sử dụng!"),
    PHONE_EXISTED(400, "Số điện thọại này đã được sử dụng!"),

    USER_NOT_FOUND(404, "Không tìm thấy người dùng!"),
    ROLE_NOT_FOUND(404, "Người dùng hiện tại chưa được cấp vai trò!"),

    INVALID_CREDENTIALS(400, "Tài khoản hoặc mật khẩu không chính xác!"),
    UNAUTHORIZED(401, "Bạn chưa đăng nhập, vui lòng đăng nhập để sử dụng các tính năng!"),
    TOKEN_EXPIRATION(401, "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");

    private final int status;
    private final String message;

    ErrorCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
