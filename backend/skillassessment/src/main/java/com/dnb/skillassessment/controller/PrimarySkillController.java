// src/main/java/com/dnb/skillassessment/controller/PrimarySkillController.java
package com.dnb.skillassessment.controller;

import com.dnb.skillassessment.model.PrimarySkill;
import com.dnb.skillassessment.model.User;
import com.dnb.skillassessment.payload.request.SkillRequest;
import com.dnb.skillassessment.security.UserPrincipal;
import com.dnb.skillassessment.service.PrimarySkillService;
import com.dnb.skillassessment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/primary-skills")
public class PrimarySkillController {
    @Autowired
    private PrimarySkillService primarySkillService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<PrimarySkill>> getAllPrimarySkills() {
        List<PrimarySkill> primarySkills = primarySkillService.findAll();
        return ResponseEntity.ok(primarySkills);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PrimarySkill> getPrimarySkillById(@PathVariable Long id) {
        Optional<PrimarySkill> primarySkill = primarySkillService.findById(id);
        return primarySkill.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createPrimarySkill(@Valid @RequestBody SkillRequest skillRequest, 
                                               Authentication authentication) {
        if (primarySkillService.existsByName(skillRequest.getName())) {
            return ResponseEntity.badRequest()
                    .body("Error: Primary skill with this name already exists!");
        }

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<User> user = userService.findByUsername(userPrincipal.getUsername());

        if (user.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("Error: User not found!");
        }

        PrimarySkill primarySkill = new PrimarySkill();
        primarySkill.setName(skillRequest.getName());
        primarySkill.setDescription(skillRequest.getDescription());
        primarySkill.setCreatedBy(user.get());

        PrimarySkill savedSkill = primarySkillService.save(primarySkill);
        return ResponseEntity.ok(savedSkill);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePrimarySkill(@PathVariable Long id) {
        if (!primarySkillService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        primarySkillService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}