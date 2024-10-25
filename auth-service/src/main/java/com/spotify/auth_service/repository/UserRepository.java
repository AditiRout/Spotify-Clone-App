package com.spotify.auth_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.spotify.auth_service.model.AuthRequest;
import com.spotify.auth_service.model.User;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends MongoRepository<User, String> {
//	Optional<AuthRequest> findByEmail(String email);
	User findByEmail(String email);

}
