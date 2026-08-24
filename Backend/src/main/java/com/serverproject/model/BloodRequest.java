package com.serverproject.model;

import com.serverproject.enums.RequestStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bloodGroup;
    private String location;
    private String urgency;
    private String patientName;
    private String contactNumber;
    private int unitsNeeded;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "requested_by_id")
    private User requestedBy;

    @ManyToOne
    @JoinColumn(name = "accepted_by_id")
    private User acceptedBy;

    public BloodRequest() {}

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

    public User getRequestedBy() { return requestedBy; }
    public void setRequestedBy(User requestedBy) { this.requestedBy = requestedBy; }

    public User getAcceptedBy() { return acceptedBy; }
    public void setAcceptedBy(User acceptedBy) { this.acceptedBy = acceptedBy; }
}