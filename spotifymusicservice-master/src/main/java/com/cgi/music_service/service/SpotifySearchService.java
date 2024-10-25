package com.cgi.music_service.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.cgi.music_service.exception.MusicNotFoundException;
import com.cgi.music_service.exception.SpotifySearchException;

import org.springframework.http.*;

import java.util.Map;

@Service
public class SpotifySearchService {

    @Value("${spotify.search-url}")
    private String searchUrl;

    private final SpotifyAuthService spotifyAuthService;

    public SpotifySearchService(SpotifyAuthService spotifyAuthService) {
        this.spotifyAuthService = spotifyAuthService;
    }

    public Map<String, Object> searchTracks(String query) {
    	 String accessToken = spotifyAuthService.getSpotifyAccessToken();

         RestTemplate restTemplate = new RestTemplate();
         HttpHeaders headers = new HttpHeaders();
         headers.set("Authorization", "Bearer " + accessToken);

         HttpEntity<String> entity = new HttpEntity<>(headers);
         try {
             ResponseEntity<Map> response = restTemplate.exchange(
                     searchUrl + "?q=" + query + "&type=track&limit=10",
                     HttpMethod.GET,
                     entity,
                     Map.class
             );

             if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                 Map<String, Object> responseBody = response.getBody();

                 // Check if the result contains any tracks
                 if (responseBody.isEmpty()) {
                     throw new MusicNotFoundException("No tracks found for query: " + query);
                 }

                 return responseBody;
             } else {
                 throw new RuntimeException("Failed to search tracks from Spotify");
             }
         } catch (HttpClientErrorException e) {
             throw new SpotifySearchException("Error fetching tracks from Spotify: " + e.getMessage(), e);
         }
     }
    
}  