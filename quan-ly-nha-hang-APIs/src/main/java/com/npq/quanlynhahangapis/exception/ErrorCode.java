package com.npq.quanlynhahangapis.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    USER_EXISTED(400, "Tài khoản này đã được đăng ký!"),
    USER_NOT_FOUND(404, "Không tìm thấy người dùng!"),//todo cân nhắc thêm
    INVALID_PASSWORD(400, "Mật khẩu không chính xác!"),//todo cân nhắc thêm
    UNAUTHORIZED(401, "Bạn chưa đăng nhập, vui lòng đăng nhập để sử dụng các tính năng!"),
    TOKEN_EXPIRATION(401, "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");

    private final int status;
    private final String message;

    ErrorCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
