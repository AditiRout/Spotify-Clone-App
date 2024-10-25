
package com.spotify.auth_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;


@ControllerAdvice
@Component
public class GlobalExceptionHandler {

	@ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        String message = "User with email " + ex.getMessage() + " not found";
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

	 @ExceptionHandler(UserAlreadyExistsException.class)
	    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
	        String message = "User with email " + ex.getMessage() + " already exists";
	        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
	    }
	 @ExceptionHandler(InvalidCredentials.class)
	    public ResponseEntity<String> InvalidCredentials(InvalidCredentials ex) {
	        String message = "Invalid Username/password";
	        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
	    }

//    // Handle generic exceptions
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handleGlobalException(Exception ex, WebRequest request) {
//        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//    }
}
