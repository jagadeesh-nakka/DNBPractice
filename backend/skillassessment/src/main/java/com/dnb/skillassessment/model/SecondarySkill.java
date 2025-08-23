// src/main/java/com/dnb/skillassessment/model/SecondarySkill.java
package com.dnb.skillassessment.model;

import jakarta.persistence.*;  
import jakarta.validation.constraints.NotBlank;  
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "secondary_skills")
public class SecondarySkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "primary_skill_id", nullable = false)
    private PrimarySkill primarySkill;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    private LocalDateTime createdAt;
}
