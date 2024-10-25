import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service'; // Import the UserProfileService
import { User } from '../user.model'; // Import the User model
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | null = null; // Use the User model type
  isEditing = false; // Track editing mode

  constructor(private userService: UserProfileService,private router:Router) {}

  ngOnInit(): void {
    this.getUserProfile();  // Fetch user details when the component loads
  }

  // Fetch user details
  getUserProfile(): void {
    const userId = localStorage.getItem("userId");  // Retrieve user ID from local storage
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }

  // Enable editing mode
  editProfile(): void {
    this.isEditing = true;
  }

  // Save updated profile
  saveProfile(): void {
    if (this.user) {
      console.log("Before")
      console.log(this.user)
      this.userService.updateUser(this.user.id +"", this.user).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.isEditing = false; // Exit editing mode
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    }
  }

  // Optional: Delete user profile
  deleteProfile(): void {
    if (this.user) {
      this.userService.deleteUser(this.user.id+"").subscribe(
        (response) => {
          console.log('Profile deleted successfully:', response);
          this.router.navigate(['/home'])
        },
        (error) => {
          console.error('Error deleting profile:', error);
        }
      );
    }
  }
}
