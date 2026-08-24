package com.serverproject.repository;

import com.serverproject.enums.RequestStatus;
import com.serverproject.model.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {

    List<BloodRequest> findByStatusIn(List<RequestStatus> statuses);
}