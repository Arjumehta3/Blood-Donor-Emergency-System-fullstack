package com.serverproject.controller;

import com.serverproject.DTO.BloodRequestDTO;
import com.serverproject.DTO.BloodRequestResponseDTO;
import com.serverproject.mapper.BloodRequestMapper;
import com.serverproject.model.BloodRequest;
import com.serverproject.service.BloodRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/request")
public class BloodRequestController {

    @Autowired
    private BloodRequestService service;

    @PostMapping
    public ResponseEntity<?> createRequest(@RequestParam Long userId, @Valid @RequestBody BloodRequestDTO dto) {

        BloodRequest savedRequest = service.createRequest(userId, dto);

        if (savedRequest == null) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        return ResponseEntity.ok(BloodRequestMapper.toResponseDTO(savedRequest));
    }

    @GetMapping
    public List<BloodRequestResponseDTO> getAllRequests() {
        return service.getAllRequests()
                .stream()
                .map(BloodRequestMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/active")
    public List<BloodRequestResponseDTO> getActiveRequests() {
        return service.getActiveRequests()
                .stream()
                .map(BloodRequestMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<?> acceptRequest(@PathVariable Long id, @RequestParam Long accepterId) {

        BloodRequest updatedRequest = service.acceptRequest(id, accepterId);

        if (updatedRequest == null) {
            return ResponseEntity.badRequest().body("Request or User not found!");
        }

        return ResponseEntity.ok(BloodRequestMapper.toResponseDTO(updatedRequest));
    }
}