package com.serverproject.controller;

import com.serverproject.model.User;
import com.serverproject.repository.UserRepository;
import com.serverproject.security.JwtUtil;
import com.serverproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
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
    public User signup(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {

        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();

            if (passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {

                String token = jwtUtil.generateToken(existingUser.getEmail());
                return ResponseEntity.ok(token);
            }
        }

        return ResponseEntity.status(401).body("Invalid Credentials");
    }
}