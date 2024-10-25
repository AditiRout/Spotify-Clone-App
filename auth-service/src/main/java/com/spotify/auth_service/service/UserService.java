package com.spotify.auth_service.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.spotify.auth_service.model.AuthRequest;
import com.spotify.auth_service.model.User;

@Service
public interface UserService {
//	 AuthRequest getUserByEmail(String email);
	User addUser(User user);
	User findUserByEmail(String email);

}
