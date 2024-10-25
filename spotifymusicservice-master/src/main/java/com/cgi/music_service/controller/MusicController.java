package com.cgi.music_service.controller;


import com.cgi.music_service.exception.MusicNotFoundException;
import com.cgi.music_service.exception.SpotifySearchException;
import com.cgi.music_service.service.SpotifySearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.Map;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("music")
public class MusicController {

    @Autowired
    private SpotifySearchService spotifySearchService;

    @GetMapping("/search")
    public ResponseEntity<?> searchMusic(@RequestParam("query") String query) {
    	 try {
             Map<String, Object> searchResults = spotifySearchService.searchTracks(query);
             return ResponseEntity.ok(searchResults);
         } catch (MusicNotFoundException e) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
         } catch (SpotifySearchException e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
         }
    }
}

