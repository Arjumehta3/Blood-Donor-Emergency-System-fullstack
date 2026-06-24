package com.serverproject.service;

import com.serverproject.model.Donor;
import com.serverproject.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    public Donor addDonor(Long userId, Donor donor) {
        return donorRepository.save(donor);
    }

    public Donor updateAvailability(Long donorId, boolean available) {

        Donor donor = donorRepository.findById(donorId).orElse(null);

        if (donor != null) {
            donor.setAvailable(available);
            donorRepository.save(donor);
        }

        return donor;
    }

    public List<Donor> searchDonors(String bloodGroup, String city) {
        return donorRepository.findByBloodGroupAndCity(bloodGroup, city);
    }

    public List<Donor> searchDonors(String bloodGroup) {
        return donorRepository.findByBloodGroup(bloodGroup);
    }

    public List<Donor> searchByCity(String city) {
        return donorRepository.findByCity(city);
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

}