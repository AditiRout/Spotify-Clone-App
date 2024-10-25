import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistUrl: string = 'http://localhost:8084/wishlist';// URL for the Wishlist Microservice


  constructor(private http: HttpClient) { }

  // Method to add a song to the wishlist
  addToWishlist(wishlistItem: any): Observable<any> {
    return this.http.post(`${this.wishlistUrl}/add`, wishlistItem);
  }
  // Function to fetch wishlist items for a given user ID
  // Get the wishlist for a specific song by track name
  getWishlistByTrackName(trackName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.wishlistUrl}/song/${trackName}`);
  }
 // Method to get all wishlist items for a user
 getUserWishlist(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.wishlistUrl}/user/${userId}`);
}
  removeFromWishlist(trackId: string): Observable<any> {
    return this.http.delete(`${this.wishlistUrl}/remove/${trackId}`);
  }
}
