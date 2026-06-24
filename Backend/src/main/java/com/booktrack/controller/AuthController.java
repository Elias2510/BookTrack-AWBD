package com.booktrack.controller;

import com.booktrack.dto.LoginRequest;
import com.booktrack.dto.RegisterRequest;
import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.Role;
import com.booktrack.model.User;
import com.booktrack.repository.RoleRepository;
import com.booktrack.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private static final String ADMIN_REGISTRATION_CODE = "BOOKTRACK_ADMIN_2026";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public User register(@Valid @RequestBody RegisterRequest request) {

        String requestedRole = request.getRole().toUpperCase();

        if (requestedRole.equals("ADMIN")) {
            if (request.getAdminCode() == null ||
                    !request.getAdminCode().equals(ADMIN_REGISTRATION_CODE)) {
                throw new RuntimeException("Codul de administrator este invalid.");
            }
        }

        Role role = roleRepository.findByName(requestedRole)
                .orElseThrow(() -> new ResourceNotFoundException("Rolul nu există în baza de date."));

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email sau parolă incorectă."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Email sau parolă incorectă.");
        }

        return user;
    }
}