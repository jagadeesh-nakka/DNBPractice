// src/main/java/com/dnb/skillassessment/payload/request/SkillRequest.java
package com.dnb.skillassessment.payload.request;

import jakarta.validation.constraints.NotBlank; // ✅

import jakarta.servlet.http.HttpServletRequest; // ✅

//import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SkillRequest {
    
    @NotBlank
    @Size(min = 2, max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    private Long primarySkillId; // For secondary skills

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPrimarySkillId() {
        return primarySkillId;
    }

    public void setPrimarySkillId(Long primarySkillId) {
        this.primarySkillId = primarySkillId;
    }
}