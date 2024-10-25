package com.spotify.auth_service.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class User {
	@Id
	private String id;
	private String userName;
	private String gender;
	private String email;
	private Date dob;
	private String password;
	
	private String securityQuestion;
    private String securityAnswer;

}


