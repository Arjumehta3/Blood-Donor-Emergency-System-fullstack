package com.serverproject.DTO;

import jakarta.validation.constraints.NotBlank;

public class BloodRequestDTO {

    @NotBlank(message = "Blood group is required")
    private String bloodGroup;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Urgency is required")
    private String urgency;

    public BloodRequestDTO() {}

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }
}