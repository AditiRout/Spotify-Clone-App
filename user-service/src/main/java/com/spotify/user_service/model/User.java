package com.spotify.user_service.model;

import java.util.Date;
import java.util.List;

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
	private Date dob;
	private String email;
	private String gender;
	private String password;
	//added below two
	private String securityQuestion;
    private String securityAnswer;

	
}
