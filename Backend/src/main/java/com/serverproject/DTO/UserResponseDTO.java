package com.serverproject.DTO;

import com.serverproject.enums.Role;

public class UserResponseDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private boolean verified;

    public UserResponseDTO() {}

    public UserResponseDTO(Long id, String name, String email, String phone, Role role, boolean verified) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.verified = verified;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }
}