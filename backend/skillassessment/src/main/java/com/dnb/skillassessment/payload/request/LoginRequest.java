// src/main/java/com/dnb/skillassessment/payload/request/LoginRequest.java
package com.dnb.skillassessment.payload.request;
import jakarta.validation.constraints.NotBlank;
 
import jakarta.validation.constraints.NotBlank;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Data
@Getter
@Setter


public class LoginRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;

    // Getters and setters
}