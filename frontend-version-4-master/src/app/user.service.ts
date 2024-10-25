import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';  // Import the User model

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
 
  private userUrl = 'http://localhost:1111/users';
  private apiUrl = 'http://localhost:1111/auth';
 
  // Fetch the user using token
  getUserByToken(): Observable<User> {
    // Get the token from localStorage (or any other storage)
    const token = localStorage.getItem('token');  // Assuming the token is stored here

    if (!token) {
      console.error('No token found');
      throw new Error('No token found');  // Ensure token exists
    }

    // Set the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make the request to fetch the user details from token
    return this.http.get<User>(`${this.apiUrl}/get-user`, { headers });
  }

 
  // Update an existing user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.userUrl, user);
  }

  
 
  // Login method to authenticate users
  login(email: string, password: string): Observable<any> {
    let body = {
      email: email,
      password: password
    };
    return this.http.post(`${this.apiUrl}/login`, body);
  }
 
  // Register a new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }
  
  resetPassword(email:any,question:any,answer:any,password:any ): Observable<any> {
    let forget={
      "email": email,
      "securityQuestion":question,
      "securityAnswer": answer,
      "password": password
    }
    return this.http.post(`${this.userUrl}/reset-password`, forget,{responseType: 'text'});
  }

}
