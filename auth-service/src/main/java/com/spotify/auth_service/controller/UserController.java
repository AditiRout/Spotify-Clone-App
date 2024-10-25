package com.spotify.auth_service.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.spotify.auth_service.model.AuthRequest;
import com.spotify.auth_service.model.User;
import com.spotify.auth_service.service.UserService;
import com.spotify.auth_service.util.old.JwtUtil;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("auth")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/check")
    public ResponseEntity<String> check(){
        return new ResponseEntity<>("working", HttpStatus.OK);
    }
    @GetMapping("/extract-username")
    public ResponseEntity<String> extractUsername(@RequestHeader("Authorization") String token) {
        // Remove "Bearer " from the token if it's prefixed
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        
        try {
            String username = jwtUtil.extractUsername(token);
            return ResponseEntity.ok(username);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> generateToken(@RequestBody AuthRequest authRequest) throws Exception {
    	Map<String, Object> response = new HashMap<>();
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            logger.error("Error during authentication: {}", ex.getMessage());
            throw new Exception("Invalid username/password");
        }
        // Generate JWT token
        String token = jwtUtil.generateToken(authRequest.getEmail());
        
        // Fetch user by email
        User user = userService.findUserByEmail(authRequest.getEmail());
        
        // Create response payload
        response.put("token", token);
        response.put("userId", user.getId());  // Add userId in the response
        return  new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> addUser(@RequestBody User user) {
//        try {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            
            User savedUser = userService.addUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
//        } catch (Exception e) {
//            logger.error("Error during user registration: {}", e.getMessage());
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
    }
    
    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestBody User user){
        return new ResponseEntity<>(user.toString(), HttpStatus.OK);
    }
    
    @GetMapping("get-user")
    public ResponseEntity<?> getUserFromToken(@RequestHeader("Authorization") String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        String email = jwtUtil.extractUsername(token);
        if (email != null) {
            return ResponseEntity.ok(userService.findUserByEmail(email));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }
    
}
