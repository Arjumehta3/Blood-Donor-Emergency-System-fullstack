package com.serverproject.service;

import com.serverproject.DTO.DonorRequestDTO;
import com.serverproject.enums.Role;
import com.serverproject.mapper.DonorMapper;
import com.serverproject.model.Donor;
import com.serverproject.model.User;
import com.serverproject.repository.DonorRepository;
import com.serverproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private UserRepository userRepository;

    public Donor addDonor(Long userId, DonorRequestDTO dto) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            return null;
        }

        User user = optionalUser.get();

        if (user.getRole() != Role.DONOR) {
            return null;
        }

        Donor donor = DonorMapper.toEntity(dto);
        donor.setUser(user);
        donor.setAvailable(true);

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