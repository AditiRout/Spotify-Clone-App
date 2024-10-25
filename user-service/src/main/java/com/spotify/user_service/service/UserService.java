package com.spotify.user_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.spotify.user_service.model.User;

@Service
public interface UserService {
	public List<User> getUsers();
	public User getUserById(String id);
	public User addUser(User user);
	public User updateUser(String id, User user);
	public String deleteUser(String id);
	User getByEmail(String email);
	Boolean emailPresent(String email);

}
