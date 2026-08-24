package com.serverproject.mapper;

import com.serverproject.DTO.BloodRequestDTO;
import com.serverproject.DTO.BloodRequestResponseDTO;
import com.serverproject.model.BloodRequest;

public class BloodRequestMapper {


    public static BloodRequest toEntity(BloodRequestDTO dto) {
        BloodRequest request = new BloodRequest();

        request.setBloodGroup(dto.getBloodGroup());
        request.setLocation(dto.getLocation());
        request.setUrgency(dto.getUrgency());
        request.setPatientName(dto.getPatientName());
        request.setContactNumber(dto.getContactNumber());
        request.setUnitsNeeded(dto.getUnitsNeeded());

        return request;
    }


    public static BloodRequestResponseDTO toResponseDTO(BloodRequest request) {
        BloodRequestResponseDTO dto = new BloodRequestResponseDTO();

        dto.setId(request.getId());
        dto.setBloodGroup(request.getBloodGroup());
        dto.setLocation(request.getLocation());
        dto.setUrgency(request.getUrgency());
        dto.setPatientName(request.getPatientName());
        dto.setContactNumber(request.getContactNumber());
        dto.setUnitsNeeded(request.getUnitsNeeded());
        dto.setStatus(request.getStatus());
        dto.setCreatedAt(request.getCreatedAt());

        dto.setRequestedById(
                request.getRequestedBy() != null ? request.getRequestedBy().getId() : null
        );

        dto.setAcceptedById(
                request.getAcceptedBy() != null ? request.getAcceptedBy().getId() : null
        );

        return dto;
    }
}