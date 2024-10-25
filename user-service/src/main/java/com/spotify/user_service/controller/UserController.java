package com.spotify.user_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PutExchange;

import com.spotify.user_service.model.PasswordResetRequest;
import com.spotify.user_service.model.User;
import com.spotify.user_service.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController

@RequestMapping("users")
public class UserController {
	
	@Autowired 
	UserService userService;
	
	// Endpoint to get user ID by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Long> getUserIdByEmail(@PathVariable String email) {
        User user = userService.getByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(Long.parseLong(user.getId()));  // Assuming ID is String in MongoDB
        }
        return ResponseEntity.notFound().build();
    }
	
	@GetMapping
	public ResponseEntity<List<User>> getUsers() {
		return new ResponseEntity<List<User>>(userService.getUsers(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable String id) {
		return new ResponseEntity<User>(userService.getUserById(id),HttpStatus.OK);
	}
	


	
	
	
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser( @PathVariable String id,@RequestBody User user) {
		return new ResponseEntity<User>(userService.updateUser(id, user),HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable String id) {
		return new ResponseEntity<String>(userService.deleteUser(id), HttpStatus.OK);
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest request) {
	    try {
	        User user = userService.getByEmail(request.getEmail());

	        // Check if user is null
	        if (user == null) {
	            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	        }

	        // Compare the email case-insensitively (in case of case mismatch)
	        if (!user.getEmail().equalsIgnoreCase(request.getEmail())) {
	            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	        }
	        if (!user.getSecurityQuestion().equals(request.getSecurityQuestion())) {
	            return new ResponseEntity<>("Security Question is incorrect", HttpStatus.FORBIDDEN);
	        }
	        // Validate security answers
	        if (!user.getSecurityAnswer().equals(request.getSecurityAnswer())) {
	            return new ResponseEntity<>("Security answer is incorrect", HttpStatus.FORBIDDEN);
	        }

	        // Hash the new password
	        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        String hashedPassword = passwordEncoder.encode(request.getPassword());
	        user.setPassword(hashedPassword);

	        userService.addUser(user); // Save the updated user

	        return new ResponseEntity<>("Password successfully reset", HttpStatus.OK);
	    } catch (Exception e) {
	        // Catch all exceptions and return a meaningful message
	        return new ResponseEntity<>("Internal Server Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	
	
	
	

}
