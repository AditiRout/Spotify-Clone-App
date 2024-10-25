package com.spotify.auth_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.spotify.auth_service.model.User;
import com.spotify.auth_service.repository.UserRepository;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	 @Autowired
	    private UserRepository repository;
	    
		public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
			
			User user=repository.findByEmail(email);		
	        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), (Collection<? extends GrantedAuthority>) new ArrayList());
		//return new org.springframework.security.core.userdetails.User("user", new BCryptPasswordEncoder().encode("password"), new ArrayList<>());
		}

}
