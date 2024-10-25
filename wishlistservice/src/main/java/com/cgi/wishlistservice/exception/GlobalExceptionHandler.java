package com.cgi.wishlistservice.exception;

import com.cgi.wishlistservice.exception.WishlistItemNotFoundException;
import com.cgi.wishlistservice.exception.WishlistServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle WishlistItemNotFoundException
    @ExceptionHandler(WishlistItemNotFoundException.class)
    public ResponseEntity<?> handleWishlistItemNotFoundException(WishlistItemNotFoundException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    

    // Handle WishlistServiceException
    @ExceptionHandler(WishlistServiceException.class)
    public ResponseEntity<?> handleWishlistServiceException(WishlistServiceException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handle all other exceptions (fallback)
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request) {
//        return new ResponseEntity<>("An unexpected error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//    }
}
