import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'; // You need to create a User model interface
// import { PasswordResetRequest } from './password-reset-request.model'; // You need to create this interface

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:1111/users';  // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  // Fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Fetch user by ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Update user
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // Delete user by ID
  deleteUser(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }

  // Reset password
  // resetPassword(request: PasswordResetRequest): Observable<string> {
  //   return this.http.post<string>(`${this.apiUrl}/reset-password`, request);
  // }
}
