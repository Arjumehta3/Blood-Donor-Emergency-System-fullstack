package com.serverproject.DTO;

import jakarta.validation.constraints.NotBlank;

public class DonorRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Blood group is required")
    private String bloodGroup;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String email;
    private String address;
    private String lastDonationDate;
    private int age;


    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getLastDonationDate() { return lastDonationDate; }
    public void setLastDonationDate(String lastDonationDate) { this.lastDonationDate = lastDonationDate; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}