package com.serverproject.model;

import jakarta.persistence.*;

@Entity
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bloodGroup;
    private String location;
    private String urgency;

    public BloodRequest() {}

    public BloodRequest(Long id, String bloodGroup, String location, String urgency) {
        this.id = id;
        this.bloodGroup = bloodGroup;
        this.location = location;
        this.urgency = urgency;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }
}