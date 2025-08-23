// src/main/java/com/dnb/skillassessment/service/PrimarySkillService.java
package com.dnb.skillassessment.service;

import com.dnb.skillassessment.model.PrimarySkill;
import com.dnb.skillassessment.repository.PrimarySkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrimarySkillService {
    @Autowired
    private PrimarySkillRepository primarySkillRepository;

    public List<PrimarySkill> findAll() {
        return primarySkillRepository.findAll();
    }

    public Optional<PrimarySkill> findById(Long id) {
        return primarySkillRepository.findById(id);
    }

    public Optional<PrimarySkill> findByName(String name) {
        return primarySkillRepository.findByName(name);
    }

    public List<PrimarySkill> findByCreatedBy(Long userId) {
        return primarySkillRepository.findByCreatedBy_Id(userId);
    }

    public Boolean existsByName(String name) {
        return primarySkillRepository.existsByName(name);
    }

    public PrimarySkill save(PrimarySkill primarySkill) {
        return primarySkillRepository.save(primarySkill);
    }

    public void deleteById(Long id) {
        primarySkillRepository.deleteById(id);
    }
}