// src/main/java/com/dnb/skillassessment/payload/request/RegisterRequest.java
package com.dnb.skillassessment.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.*;


@Data

@Getter
@Setter

public class RegisterRequest {
    @NotBlank
    private String employeeId;

    @NotBlank
    @Size(min = 2, max = 50)
    private String name;

    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    @Pattern(regexp = "^[a-zA-Z0-9._-]+@dnb\\.com$", 
             message = "Email must be a valid DNB email address")
    private String email;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    // Getters and setters
}