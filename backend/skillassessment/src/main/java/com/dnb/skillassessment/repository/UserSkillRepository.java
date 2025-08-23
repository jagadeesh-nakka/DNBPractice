// src/main/java/com/dnb/skillassessment/repository/UserSkillRepository.java
package com.dnb.skillassessment.repository;

import com.dnb.skillassessment.model.UserSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {
    List<UserSkill> findByUser_Id(Long userId);
    List<UserSkill> findByUser_IdAndPrimarySkill_Id(Long userId, Long primarySkillId);
    Optional<UserSkill> findByUser_IdAndSecondarySkill_Id(Long userId, Long secondarySkillId);
    Boolean existsByUser_IdAndSecondarySkill_Id(Long userId, Long secondarySkillId);
}