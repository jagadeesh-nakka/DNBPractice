// src/main/java/com/dnb/skillassessment/repository/PrimarySkillRepository.java
package com.dnb.skillassessment.repository;

import com.dnb.skillassessment.model.PrimarySkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrimarySkillRepository extends JpaRepository<PrimarySkill, Long> {
    Optional<PrimarySkill> findByName(String name);
    List<PrimarySkill> findByCreatedBy_Id(Long userId);
    Boolean existsByName(String name);
}