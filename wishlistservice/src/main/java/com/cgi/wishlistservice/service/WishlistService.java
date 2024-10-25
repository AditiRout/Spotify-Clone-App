package com.cgi.wishlistservice.service;

import com.cgi.wishlistservice.exception.WishlistItemNotFoundException;
import com.cgi.wishlistservice.exception.WishlistServiceException;
import com.cgi.wishlistservice.model.WishlistItem;
import com.cgi.wishlistservice.repository.WishlistRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    public WishlistItem addToWishlist(WishlistItem wishlistItem) {
    	 try {
             return wishlistRepository.save(wishlistItem);
         } catch (Exception e) {
             throw new WishlistServiceException("Failed to add item to wishlist", e);
         }
    }
    public List<WishlistItem> getWishlistByTrackName(String trackName) {
    	  try {
              return wishlistRepository.findByTrackName(trackName);
          } catch (Exception e) {
              throw new WishlistServiceException("Failed to fetch wishlist by track name", e);
          } // Fetch items by song name
    }
    public List<WishlistItem> getUserWishlist(String userId) {
    	  try {
              return wishlistRepository.findByUserId(userId);
          } catch (Exception e) {
              throw new WishlistServiceException("Failed to fetch wishlist for user", e);
          }
    }

    public void removeFromWishlist(String itemId) {
    	 Optional<WishlistItem> item = wishlistRepository.findById(itemId);
         if (!item.isPresent()) {
             throw new WishlistItemNotFoundException("Item with ID " + itemId + " not found in wishlist");
         }
         try {
             wishlistRepository.deleteById(itemId);
         } catch (Exception e) {
             throw new WishlistServiceException("Failed to remove item from wishlist", e);
         }  // Ensure itemId is String
    }
}
