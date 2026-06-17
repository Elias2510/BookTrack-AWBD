package com.booktrack.service;

import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.User;
import com.booktrack.model.UserProfile;
import com.booktrack.repository.UserProfileRepository;
import com.booktrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    public Page<UserProfile> findAll(Pageable pageable) {
        return userProfileRepository.findAll(pageable);
    }

    public UserProfile findById(Long id) {
        return userProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profilul nu a fost găsit."));
    }

    public UserProfile create(UserProfile profile, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilizatorul nu a fost găsit."));

        profile.setUser(user);
        return userProfileRepository.save(profile);
    }

    public UserProfile update(Long id, UserProfile profileDetails, Long userId) {
        UserProfile profile = findById(id);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilizatorul nu a fost găsit."));

        profile.setFavoriteGenre(profileDetails.getFavoriteGenre());
        profile.setBio(profileDetails.getBio());
        profile.setUser(user);

        return userProfileRepository.save(profile);
    }

    public void delete(Long id) {
        UserProfile profile = findById(id);
        userProfileRepository.delete(profile);
    }
}