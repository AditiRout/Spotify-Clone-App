package com.cgi.wishlistservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "wishlist_items")
public class WishlistItem {
    @Id
    private String id;
    private String trackId;
    private String trackName;
    private String artistName;
    private String albumName;
    private String userId;
    private String imageUrl;  // Field for storing image URL

    // Constructors
    public WishlistItem() {}

    public WishlistItem(String trackId, String trackName, String artistName, String albumName, String userId, String imageUrl) {
        this.trackId = trackId;
        this.trackName = trackName;
        this.artistName = artistName;
        this.albumName = albumName;
        this.userId = userId;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTrackId() {
        return trackId;
    }

    public void setTrackId(String trackId) {
        this.trackId = trackId;
    }

    public String getTrackName() {
        return trackName;
    }

    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}