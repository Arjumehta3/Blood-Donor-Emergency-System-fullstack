package com.serverproject.DTO;

import jakarta.validation.constraints.NotBlank;

public class DonorDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Blood group is required")
    private String bloodGroup;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Contact is required")
    private String contact;

    // Getters & Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }
}