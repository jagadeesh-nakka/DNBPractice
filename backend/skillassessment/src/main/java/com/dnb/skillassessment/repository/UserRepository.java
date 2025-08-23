// src/main/java/com/dnb/skillassessment/repository/UserRepository.java
package com.dnb.skillassessment.repository;

import com.dnb.skillassessment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByEmployeeId(String employeeId);
    Optional<User> findByEmployeeId(String employeeId);
}