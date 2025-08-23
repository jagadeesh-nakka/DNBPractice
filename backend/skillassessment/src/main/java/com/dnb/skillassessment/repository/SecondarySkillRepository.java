// src/main/java/com/dnb/skillassessment/repository/SecondarySkillRepository.java
package com.dnb.skillassessment.repository;

import com.dnb.skillassessment.model.SecondarySkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SecondarySkillRepository extends JpaRepository<SecondarySkill, Long> {
    Optional<SecondarySkill> findByName(String name);
    List<SecondarySkill> findByPrimarySkill_Id(Long primarySkillId);
    List<SecondarySkill> findByCreatedBy_Id(Long userId);
    Boolean existsByName(String name);
}