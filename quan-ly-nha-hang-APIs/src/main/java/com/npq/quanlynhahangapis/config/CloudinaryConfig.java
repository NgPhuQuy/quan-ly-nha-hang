package com.npq.quanlynhahangapis.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dtvg4cpoq",
                "api_key", "211564137488191",
                "api_secret", "otiD0T9BFzzg9UyKGcTb6MHi3Ow"
        ));
    }
}