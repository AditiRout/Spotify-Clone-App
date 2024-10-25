package com.spotify.user_service.model;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String email;
    private String securityAnswer;
    private String password;
    private String securityQuestion;
  
}
