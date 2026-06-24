package com.serverproject.controller;

import com.serverproject.model.Donor;
import com.serverproject.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;


    @PostMapping("/add")
    public String addDonor(@RequestParam Long userId, @RequestBody Donor donor) {
        Donor savedDonor = donorService.addDonor(userId, donor);
        return savedDonor != null ? "Donor added successfully!" : "User not found!";
    }

    @PutMapping("/update-availability")
    public String updateAvailability(@RequestParam Long donorId, @RequestParam boolean available) {
        Donor updatedDonor = donorService.updateAvailability(donorId, available);
        return updatedDonor != null ? "Availability updated!" : "Donor not found!";
    }


    @GetMapping("/search")
    public List<Donor> searchDonors(@RequestParam String bloodGroup, @RequestParam String city) {
        return donorService.searchDonors(bloodGroup, city);
    }

    @GetMapping("/search/bloodgroup")
    public List<Donor> searchDonorsByBloodGroup(@RequestParam String bloodGroup) {
        return donorService.searchDonors(bloodGroup);
    }

    @GetMapping("/search/city")
    public List<Donor> searchDonorsByCity(@RequestParam String city) {
        return donorService.searchByCity(city);
    }

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }


}