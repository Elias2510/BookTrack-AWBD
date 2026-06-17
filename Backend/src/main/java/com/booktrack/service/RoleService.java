package com.booktrack.service;

import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.Role;
import com.booktrack.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Page<Role> findAll(Pageable pageable) {
        return roleRepository.findAll(pageable);
    }

    public Role findById(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Rolul nu a fost găsit."));
    }

    public Role create(Role role) {
        return roleRepository.save(role);
    }

    public Role update(Long id, Role roleDetails) {
        Role role = findById(id);
        role.setName(roleDetails.getName());
        return roleRepository.save(role);
    }

    public void delete(Long id) {
        Role role = findById(id);
        roleRepository.delete(role);
    }
}