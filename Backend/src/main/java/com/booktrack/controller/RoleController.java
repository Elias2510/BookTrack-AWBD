package com.booktrack.controller;

import com.booktrack.dto.RoleRequest;
import com.booktrack.model.Role;
import com.booktrack.service.RoleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public Page<Role> getAll(Pageable pageable) {
        return roleService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Role getById(@PathVariable Long id) {
        return roleService.findById(id);
    }

    @PostMapping
    public Role create(@Valid @RequestBody RoleRequest request) {
        Role role = Role.builder()
                .name(request.getName())
                .build();

        return roleService.create(role);
    }

    @PutMapping("/{id}")
    public Role update(@PathVariable Long id, @Valid @RequestBody RoleRequest request) {
        Role role = Role.builder()
                .name(request.getName())
                .build();

        return roleService.update(id, role);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        roleService.delete(id);
    }
}