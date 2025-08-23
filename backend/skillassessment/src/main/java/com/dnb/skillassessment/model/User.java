// src/main/java/com/dnb/skillassessment/model/User.java
package com.dnb.skillassessment.model;

import jakarta.persistence.*;  // JPA annotations
import jakarta.validation.constraints.*; // Validation annotations
import lombok.*; // Lombok annotations
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Employee ID is required")
    @Column(unique = true, nullable = false, length = 50)
    private String employeeId;

    @NotBlank(message = "Username is required")
    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2–100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Pattern(
        regexp = "^[a-zA-Z0-9._-]+@dnb\\.com$",
        message = "Email must be a valid DNB email address"
    )
    @Column(unique = true, nullable = false)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Role role = Role.USER;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum Role {
        USER, ADMIN
    }
}
