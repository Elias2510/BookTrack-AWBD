package com.booktrack.controller;

import com.booktrack.dto.UserProfileRequest;
import com.booktrack.model.UserProfile;
import com.booktrack.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user-profiles")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping
    public Page<UserProfile> getAll(Pageable pageable) {
        return userProfileService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public UserProfile getById(@PathVariable Long id) {
        return userProfileService.findById(id);
    }

    @PostMapping
    public UserProfile create(@Valid @RequestBody UserProfileRequest request) {
        UserProfile profile = UserProfile.builder()
                .favoriteGenre(request.getFavoriteGenre())
                .bio(request.getBio())
                .build();

        return userProfileService.create(profile, request.getUserId());
    }

    @PutMapping("/{id}")
    public UserProfile update(@PathVariable Long id, @Valid @RequestBody UserProfileRequest request) {
        UserProfile profile = UserProfile.builder()
                .favoriteGenre(request.getFavoriteGenre())
                .bio(request.getBio())
                .build();

        return userProfileService.update(id, profile, request.getUserId());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userProfileService.delete(id);
    }
}