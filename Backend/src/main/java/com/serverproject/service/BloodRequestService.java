package com.serverproject.service;

import com.serverproject.DTO.BloodRequestDTO;
import com.serverproject.enums.RequestStatus;
import com.serverproject.mapper.BloodRequestMapper;
import com.serverproject.model.BloodRequest;
import com.serverproject.model.User;
import com.serverproject.repository.BloodRequestRepository;
import com.serverproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BloodRequestService {

    @Autowired
    private BloodRequestRepository repository;

    @Autowired
    private UserRepository userRepository;

    public BloodRequest createRequest(Long userId, BloodRequestDTO dto) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            return null;
        }

        User user = optionalUser.get();

        BloodRequest request = BloodRequestMapper.toEntity(dto);
        request.setRequestedBy(user);
        request.setStatus(RequestStatus.PENDING);
        request.setCreatedAt(LocalDateTime.now());

        return repository.save(request);
    }

    public List<BloodRequest> getAllRequests() {
        return repository.findAll();
    }

    public List<BloodRequest> getActiveRequests() {
        return repository.findByStatusIn(List.of(RequestStatus.PENDING, RequestStatus.ACCEPTED));
    }

    public BloodRequest acceptRequest(Long requestId, Long accepterId) {

        Optional<BloodRequest> optionalRequest = repository.findById(requestId);
        Optional<User> optionalUser = userRepository.findById(accepterId);

        if (optionalRequest.isEmpty() || optionalUser.isEmpty()) {
            return null;
        }

        BloodRequest request = optionalRequest.get();
        User accepter = optionalUser.get();

        request.setAcceptedBy(accepter);
        request.setStatus(RequestStatus.ACCEPTED);

        return repository.save(request);
    }
}