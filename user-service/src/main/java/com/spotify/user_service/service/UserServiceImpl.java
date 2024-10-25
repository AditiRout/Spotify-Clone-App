package com.spotify.user_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spotify.user_service.exception.UserNotFoundException;
import com.spotify.user_service.model.User;
import com.spotify.user_service.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	@Override
	public User getUserById(String id) {
		Optional<User> foundUser=userRepository.findById(id);
		if(foundUser!=null)
			return foundUser.get();
		return null;
	}
	

	@Override
	public User addUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public User updateUser(String id, User user) {
	    User foundUser = getUserById(id);
	    if (foundUser == null) {
	    	
	    	throw new UserNotFoundException("User with id " + id + " not found");
	    	
	    }
	        // Update only non-null fields from the incoming user object
	        if (user.getUserName() != null) foundUser.setUserName(user.getUserName());
	        if (user.getUserName() != null) foundUser.setGender(user.getGender());
	        if (user.getUserName() != null) foundUser.setDob(user.getDob());
	       // if (user.getFirstName() != null) foundUser.setFirstName(user.getFirstName());
	        //if (user.getLastName() != null) foundUser.setLastName(user.getLastName());
	        //if (user.getPhoneNo() != null) foundUser.setPhoneNo(user.getPhoneNo());

	        // Save the found user with the updated fields
	        return userRepository.save(foundUser);
	    //return null;
	}

	@Override
	public String deleteUser(String id) {
//		userRepository.deleteById(id);
//		return "User Deleted";
		
		User deleteUser = getUserById(id);
		if (deleteUser != null) {
	        userRepository.delete(deleteUser);
	        return "User deleted";
	    }
 
	    throw new UserNotFoundException("User with id " + id + " does not exist.");
	}

	@Override
	public User getByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepository.findByEmail(email);
	}

	@Override
	public Boolean emailPresent(String email) {
		// TODO Auto-generated method stub
		if (userRepository.findByEmail(email)!= null) {
			return true;
			}
		return false;
	}

}
