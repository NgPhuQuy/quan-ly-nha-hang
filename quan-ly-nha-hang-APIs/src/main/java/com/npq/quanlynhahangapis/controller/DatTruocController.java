package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.DatTruocRequest;
import com.npq.quanlynhahangapis.entity.DatTruoc;
import com.npq.quanlynhahangapis.service.DatTruocService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.EntityResponse;

@Getter
@Setter
@RestController
@RequestMapping
@RequiredArgsConstructor
public class DatTruocController {
    private final DatTruocService datTruocService;

    @PostMapping("/dat-truoc")
    ResponseEntity<?> datTruocMonAn(@RequestBody DatTruocRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(datTruocService.datTruocMonAn(request));
    }
}
