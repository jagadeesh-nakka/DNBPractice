// src/main/java/com/dnb/skillassessment/controller/AuthController.java
package com.dnb.skillassessment.controller;

import com.dnb.skillassessment.model.User;
import com.dnb.skillassessment.payload.request.LoginRequest;
import com.dnb.skillassessment.payload.request.RegisterRequest;
import com.dnb.skillassessment.payload.response.JwtResponse;
import com.dnb.skillassessment.payload.response.MessageResponse;
import com.dnb.skillassessment.repository.UserRepository;
import com.dnb.skillassessment.security.JwtUtils;
import com.dnb.skillassessment.security.UserPrincipal;
import com.dnb.skillassessment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        
        UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();        

        return ResponseEntity.ok(new JwtResponse(jwt, 
                                                 userDetails.getId(),
                                                 userDetails.getUsername(), 
                                                 userDetails.getEmail(),
                                                 userDetails.getAuthorities()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userService.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userService.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        if (userService.existsByEmployeeId(registerRequest.getEmployeeId())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Employee ID is already in use!"));
        }

        // Validate DNB email
        if (!registerRequest.getEmail().endsWith("@dnb.com")) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Only DNB email addresses are allowed!"));
        }

        // Create new user's account
        User user = new User();
        user.setEmployeeId(registerRequest.getEmployeeId());
        user.setUsername(registerRequest.getUsername());
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setRole(User.Role.USER);

        userService.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}