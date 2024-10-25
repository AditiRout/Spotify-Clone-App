import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { UserService } from '../user.service';  // Assuming you are using a UserService to get user details
import { MatSnackBar } from '@angular/material/snack-bar'; 
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];  // To store wishlist items
  userId: any;  // Store userId dynamically

  constructor(
    private wishlistService: WishlistService,
    private userService: UserService,
    private _snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    // Fetch the user ID from token or session on component initialization
    this.userService.getUserByToken().subscribe(
      (user) => {
        this.userId = user.id;  // Assuming the user object contains an ID
        this.loadAllWishlistItems();  // Load wishlist items for the user
      },
      (error) => {
        console.error('Error fetching user ID:', error);
      }
    );
  }

  // Fetch all wishlist items for the specific user by userId
  loadAllWishlistItems(): void {
    if (!this.userId) {
      console.error('User ID not available');
      return;
    }

    // Fetch wishlist items using the userId
    this.wishlistService.getUserWishlist(this.userId).subscribe(
      (data) => {
        this.wishlist = data;  // Store fetched items in the wishlist array
        console.log('Fetched all wishlist items for user:', this.userId, data);
      },
      (error) => {
        console.error('Error fetching wishlist:', error);
      }
    );
  }

  // Method to remove a song from the wishlist by track ID
  deleteSong(trackId: string): void {
    if (!this.userId) {
      console.error('User ID not available');
      return;
    }

    this.wishlistService.removeFromWishlist(trackId).subscribe(
      () => {
        // After deletion, update the wishlist array by filtering out the deleted track
        this.wishlist = this.wishlist.filter(item => item.trackId !== trackId);

        // Show MatSnackBar notification
        this._snackBar.open('Song removed from wishlist!', 'Close', {
          duration: 3000,  // The notification will close after 3 seconds
        });

        // Automatically reload the wishlist after deletion
        this.loadAllWishlistItems();  // Refresh the list after deletion
      },
      (error) => {
        console.error('Error removing song from wishlist:', error);
      }
    );
  }
}