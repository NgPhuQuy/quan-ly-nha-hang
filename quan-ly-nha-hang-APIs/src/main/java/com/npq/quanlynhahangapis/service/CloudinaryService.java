package com.npq.quanlynhahangapis.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public String taiAnhLenCloudinary(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String tenFile = file.getOriginalFilename();
        if (tenFile == null || !tenFile.toLowerCase().matches(".*\\.(jpg|jpeg|png|webp|gif)$")) {
            throw new AppException(ErrorCode.FILE_MUST_BE_IMAGE);
        }

        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "quan-ly-nha-hang",
                            "resource_type", "image"
                    )
            );
            return result.get("secure_url").toString();
        } catch (IOException exception) {
            throw new AppException(ErrorCode.FAIL_TO_UPLOAD);
        }
    }
}