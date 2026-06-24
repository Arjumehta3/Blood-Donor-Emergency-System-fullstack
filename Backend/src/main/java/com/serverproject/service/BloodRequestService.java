package com.serverproject.service;

import com.serverproject.DTO.BloodRequestDTO;
import com.serverproject.model.BloodRequest;
import com.serverproject.repository.BloodRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BloodRequestService {

    @Autowired
    private BloodRequestRepository repository;

    public BloodRequest createRequest(BloodRequestDTO dto) {
        BloodRequest request = new BloodRequest();

        request.setBloodGroup(dto.getBloodGroup());
        request.setLocation(dto.getLocation());
        request.setUrgency(dto.getUrgency());

        return repository.save(request);
    }
}