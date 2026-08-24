package com.serverproject.DTO;

import com.serverproject.enums.RequestStatus;

import java.time.LocalDateTime;

public class BloodRequestResponseDTO {

    private Long id;
    private String bloodGroup;
    private String location;
    private String urgency;
    private String patientName;
    private String contactNumber;
    private int unitsNeeded;
    private RequestStatus status;
    private LocalDateTime createdAt;
    private Long requestedById;
    private Long acceptedById;

    public BloodRequestResponseDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public int getUnitsNeeded() { return unitsNeeded; }
    public void setUnitsNeeded(int unitsNeeded) { this.unitsNeeded = unitsNeeded; }

    public RequestStatus getStatus() { return status; }
    public void setStatus(RequestStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Long getRequestedById() { return requestedById; }
    public void setRequestedById(Long requestedById) { this.requestedById = requestedById; }

    public Long getAcceptedById() { return acceptedById; }
    public void setAcceptedById(Long acceptedById) { this.acceptedById = acceptedById; }
}