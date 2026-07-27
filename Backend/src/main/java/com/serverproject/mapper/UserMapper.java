package com.serverproject.mapper;

import com.serverproject.DTO.UserResponseDTO;
import com.serverproject.DTO.UserSignupDTO;
import com.serverproject.model.User;

public class UserMapper {


    public static User toEntity(UserSignupDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setPassword(dto.getPassword());
        user.setGender(dto.getGender());
        user.setProfession(dto.getProfession());
        user.setLocation(dto.getLocation());
        user.setRole(dto.getRole());
        return user;
    }

    public static UserResponseDTO toResponseDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.isVerified()
        );
    }
}