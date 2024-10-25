package com.cgi.music_service.exception;

public class SpotifySearchException extends RuntimeException {
    public SpotifySearchException(String message, Throwable cause) {
        super(message, cause);
    }
}