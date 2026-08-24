package com.serverproject.mapper;

import com.serverproject.DTO.DonorRequestDTO;
import com.serverproject.DTO.DonorResponseDTO;
import com.serverproject.model.Donor;

public class DonorMapper {


    public static Donor toEntity(DonorRequestDTO dto) {
        Donor donor = new Donor();
        donor.setName(dto.getName());
        donor.setBloodGroup(dto.getBloodGroup());
        donor.setCity(dto.getCity());
        donor.setPhone(dto.getPhone());
        donor.setEmail(dto.getEmail());
        donor.setAddress(dto.getAddress());
        donor.setLastDonationDate(dto.getLastDonationDate());
        donor.setAge(dto.getAge());
        return donor;
    }

    public static DonorResponseDTO toResponseDTO(Donor donor) {
        return new DonorResponseDTO(
                donor.getId(),
                donor.getName(),
                donor.getBloodGroup(),
                donor.getCity(),
                donor.getPhone(),
                donor.getEmail(),
                donor.getAddress(),
                donor.getLastDonationDate(),
                donor.getAge(),
                donor.getLatitude(),
                donor.getLongitude(),
                donor.isAvailable(),
                donor.getUser() != null ? donor.getUser().getId() : null
        );
    }
}