package com.spotify.auth_service.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spotify.auth_service.exception.UserAlreadyExistsException;
import com.spotify.auth_service.model.AuthRequest;
import com.spotify.auth_service.model.User;
import com.spotify.auth_service.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public User addUser(User user) {
		 if (userRepository.findByEmail(user.getEmail()) != null) {
	            throw new UserAlreadyExistsException(user.getEmail());
	       }
		// TODO Auto-generated method stub
		return userRepository.save(user);
	}

	@Override
	public User findUserByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.findByEmail(email);
	}
	
	

}
