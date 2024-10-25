package com.cgi.wishlistservice.repository;

import com.cgi.wishlistservice.model.WishlistItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends MongoRepository<WishlistItem, String> {
    List<WishlistItem> findByUserId(String userId);
    List<WishlistItem> findByTrackName(String trackName);
}
