package com.serverproject.controller;

import com.serverproject.DTO.DonorRequestDTO;
import com.serverproject.DTO.DonorResponseDTO;
import com.serverproject.mapper.DonorMapper;
import com.serverproject.model.Donor;
import com.serverproject.service.DonorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @PostMapping("/add")
    public ResponseEntity<?> addDonor(@RequestParam Long userId, @Valid @RequestBody DonorRequestDTO donorDTO) {
        Donor savedDonor = donorService.addDonor(userId, donorDTO);

        if (savedDonor == null) {
            return ResponseEntity.badRequest().body("User not found or role is not DONOR!");
        }
        return ResponseEntity.ok(DonorMapper.toResponseDTO(savedDonor));
    }

    @PutMapping("/update-availability")
    public ResponseEntity<?> updateAvailability(@RequestParam Long donorId, @RequestParam boolean available) {
        Donor updatedDonor = donorService.updateAvailability(donorId, available);

        if (updatedDonor == null) {
            return ResponseEntity.badRequest().body("Donor not found!");
        }
        return ResponseEntity.ok(DonorMapper.toResponseDTO(updatedDonor));
    }

    @GetMapping("/search")
    public List<DonorResponseDTO> searchDonors(@RequestParam String bloodGroup, @RequestParam String city) {
        return donorService.searchDonors(bloodGroup, city)
                .stream().map(DonorMapper::toResponseDTO).collect(Collectors.toList());
    }

    @GetMapping("/search/bloodgroup")
    public List<DonorResponseDTO> searchDonorsByBloodGroup(@RequestParam String bloodGroup) {
        return donorService.searchDonors(bloodGroup)
                .stream().map(DonorMapper::toResponseDTO).collect(Collectors.toList());
    }

    @GetMapping("/search/city")
    public List<DonorResponseDTO> searchDonorsByCity(@RequestParam String city) {
        return donorService.searchByCity(city)
                .stream().map(DonorMapper::toResponseDTO).collect(Collectors.toList());
    }

    @GetMapping
    public List<DonorResponseDTO> getAllDonors() {
        return donorService.getAllDonors()
                .stream().map(DonorMapper::toResponseDTO).collect(Collectors.toList());
    }
}