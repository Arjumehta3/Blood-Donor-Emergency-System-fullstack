package com.serverproject.controller;

import com.serverproject.DTO.BloodRequestDTO;
import com.serverproject.model.BloodRequest;
import com.serverproject.service.BloodRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/request")
public class BloodRequestController {

    @Autowired
    private BloodRequestService service;

    @PostMapping
    public BloodRequest createRequest(@Valid @RequestBody BloodRequestDTO dto) {
        return service.createRequest(dto);
    }
}