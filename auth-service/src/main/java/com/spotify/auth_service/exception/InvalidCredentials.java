package com.spotify.auth_service.exception;

public class InvalidCredentials extends RuntimeException{
	 public InvalidCredentials(String message) {
	        super(message);
	    }

}
