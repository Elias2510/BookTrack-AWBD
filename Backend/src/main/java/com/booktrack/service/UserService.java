package com.booktrack.service;

import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.Role;
import com.booktrack.model.User;
import com.booktrack.repository.RoleRepository;
import com.booktrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilizatorul nu a fost găsit."));
    }

    public User create(User user, Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Rolul nu a fost găsit."));

        user.setRole(role);

        return userRepository.save(user);
    }

    public User update(Long id, User userDetails, Long roleId) {
        User user = findById(id);

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Rolul nu a fost găsit."));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setRole(role);

        return userRepository.save(user);
    }

    public void delete(Long id) {
        User user = findById(id);
        userRepository.delete(user);
    }
}