// src/main/java/com/dnb/skillassessment/model/UserSkill.java
package com.dnb.skillassessment.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_skills")
public class UserSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "primary_skill_id", nullable = false)
    private PrimarySkill primarySkill;

    @ManyToOne
    @JoinColumn(name = "secondary_skill_id", nullable = false)
    private SecondarySkill secondarySkill;

    @Enumerated(EnumType.STRING)
    private ExpertiseLevel expertiseLevel;

    private Integer yearsOfExperience;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum ExpertiseLevel {
        BEGINNER, INTERMEDIATE, EXPERT
    }
}
