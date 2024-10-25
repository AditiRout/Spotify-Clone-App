package com.spotify.user_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spotify.user_service.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	User findByEmail(String email);

}
