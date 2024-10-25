import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    // Here, implement your logic to check if the user is authenticated
    // You could check if there is a valid token in localStorage or any other logic
    return !!localStorage.getItem('token'); // Example
  }
}
