package com.serverproject.controller;

import com.serverproject.DTO.LoginResponseDTO;
import com.serverproject.DTO.UserSignupDTO;
import com.serverproject.DTO.UserResponseDTO;
import com.serverproject.enums.Role;
import com.serverproject.mapper.UserMapper;
import com.serverproject.model.User;
import com.serverproject.repository.UserRepository;
import com.serverproject.security.JwtUtil;
import com.serverproject.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody UserSignupDTO signupDTO) {

        if (signupDTO.getRole() == Role.ADMIN) {
            return ResponseEntity.badRequest().body("Admin cannot be created via signup!");
        }

        // Email already exists check
        if (userRepository.findByEmail(signupDTO.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered!");
        }

        User user = UserMapper.toEntity(signupDTO);
        User savedUser = userService.registerUser(user);

        UserResponseDTO responseDTO = UserMapper.toResponseDTO(savedUser);
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();

            if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {

                String token = jwtUtil.generateToken(existingUser.getEmail(), existingUser.getRole());

                LoginResponseDTO response = new LoginResponseDTO(
                        token,
                        existingUser.getId(),
                        existingUser.getName(),
                        existingUser.getEmail(),
                        existingUser.getRole()
                );

                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(401).body("Invalid Credentials");
    }
}