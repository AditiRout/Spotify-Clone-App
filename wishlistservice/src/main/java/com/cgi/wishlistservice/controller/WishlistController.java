package com.cgi.wishlistservice.controller;

import com.cgi.wishlistservice.exception.WishlistItemNotFoundException;
import com.cgi.wishlistservice.exception.WishlistServiceException;
import com.cgi.wishlistservice.model.WishlistItem;
import com.cgi.wishlistservice.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    // Directory where images will be stored
    private static final String UPLOAD_DIR = "uploads/";
    
    
    @PostMapping("/add")
    public ResponseEntity<?> addToWishlist(@RequestBody WishlistItem wishlistItem) {
    	 try {
             WishlistItem addedItem = wishlistService.addToWishlist(wishlistItem);
             return ResponseEntity.ok(addedItem);
         } catch (WishlistServiceException e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
         }
    }
    // Get user's wishlist
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserWishlist(@PathVariable String userId) {
    	 try {
             List<WishlistItem> wishlist = wishlistService.getUserWishlist(userId);
             return ResponseEntity.ok(wishlist);
         } catch (WishlistServiceException e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
         }
    }
    // Get wishlist items by song name
    @GetMapping("/song/{trackName}")
    public ResponseEntity<?> getWishlistByTrackName(@PathVariable String trackName) {
    	 try {
             List<WishlistItem> wishlist = wishlistService.getWishlistByTrackName(trackName);
             return ResponseEntity.ok(wishlist);
         } catch (WishlistServiceException e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
         }
    }

    // Remove track from wishlist
    @DeleteMapping("/remove/{Id}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable String Id) {
    	 try {
             wishlistService.removeFromWishlist(Id);
             return ResponseEntity.ok(Collections.singletonMap("message", "Item removed from wishlist"));
         } catch (WishlistItemNotFoundException e) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
         } catch (WishlistServiceException e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
         }
    }

    
    

    // Save the image to the file system and return its URL
    private String saveImage(MultipartFile image) throws IOException {
    	if (image.isEmpty()) {
            return null;
        }

        String imageName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
        Path imagePath = Paths.get(UPLOAD_DIR, imageName);
        Files.createDirectories(imagePath.getParent());
        Files.write(imagePath, image.getBytes());

        return "/images/" + imageName;
    }
}
