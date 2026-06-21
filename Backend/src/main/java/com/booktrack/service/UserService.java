package com.booktrack.service;

import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.Role;
import com.booktrack.model.User;
import com.booktrack.repository.RoleRepository;
import com.booktrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public Page<User> findAll(Pageable pageable) {
        log.debug("Fetching users with pageable: {}", pageable);
        return userRepository.findAll(pageable);
    }

    public User findById(Long id) {
        log.debug("Fetching user with id: {}", id);

        return userRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("User not found with id: {}", id);
                    return new ResourceNotFoundException("Utilizatorul nu a fost găsit.");
                });
    }

    public User create(User user, Long roleId) {
        log.info("Creating user with email: {}", user.getEmail());

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> {
                    log.error("Role not found with id: {}", roleId);
                    return new ResourceNotFoundException("Rolul nu a fost găsit.");
                });

        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);
        log.info("User created with id: {}", savedUser.getId());

        return savedUser;
    }

    public User update(Long id, User userDetails, Long roleId) {
        log.info("Updating user with id: {}", id);

        User user = findById(id);

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> {
                    log.error("Role not found with id: {}", roleId);
                    return new ResourceNotFoundException("Rolul nu a fost găsit.");
                });

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());

        if (userDetails.getPassword() != null && !userDetails.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        user.setRole(role);

        User updatedUser = userRepository.save(user);
        log.info("User updated with id: {}", updatedUser.getId());

        return updatedUser;
    }

    public void delete(Long id) {
        log.info("Deleting user with id: {}", id);

        User user = findById(id);
        userRepository.delete(user);

        log.info("User deleted with id: {}", id);
    }
}