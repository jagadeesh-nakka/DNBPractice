// src/main/java/com/dnb/skillassessment/payload/request/UserSkillRequest.java
package com.dnb.skillassessment.payload.request;

import com.dnb.skillassessment.model.UserSkill;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public class UserSkillRequest {
    
    @NotNull
    private Long primarySkillId;
    
    @NotNull
    private List<SecondarySkillRequest> secondarySkills;

    // Getters and setters
    public Long getPrimarySkillId() {
        return primarySkillId;
    }

    public void setPrimarySkillId(Long primarySkillId) {
        this.primarySkillId = primarySkillId;
    }

    public List<SecondarySkillRequest> getSecondarySkills() {
        return secondarySkills;
    }

    public void setSecondarySkills(List<SecondarySkillRequest> secondarySkills) {
        this.secondarySkills = secondarySkills;
    }

    public static class SecondarySkillRequest {
        @NotNull
        private Long secondarySkillId;
        
        @NotNull
        private UserSkill.ExpertiseLevel expertiseLevel;
        
        @NotNull
        private Integer yearsOfExperience;

        // Getters and setters
        public Long getSecondarySkillId() {
            return secondarySkillId;
        }

        public void setSecondarySkillId(Long secondarySkillId) {
            this.secondarySkillId = secondarySkillId;
        }

        public UserSkill.ExpertiseLevel getExpertiseLevel() {
            return expertiseLevel;
        }

        public void setExpertiseLevel(UserSkill.ExpertiseLevel expertiseLevel) {
            this.expertiseLevel = expertiseLevel;
        }

        public Integer getYearsOfExperience() {
            return yearsOfExperience;
        }

        public void setYearsOfExperience(Integer yearsOfExperience) {
            this.yearsOfExperience = yearsOfExperience;
        }
    }
}