import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-login',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css']
})
export class NavbarLoginComponent {
  selected: string = 'home-page';
  searchQuery: string = '';
  userAvatar: string = 'path-to-user-avatar-image'; // Replace this with dynamic avatar source
  userName:string='A';
  // Labels for the buttons
  libraryLabel: string = 'Library';
  homeLabel: string = 'Home';
  constructor(private router:Router){}

  // Function for handling menu click
  onClick(menu: string): void {
    this.selected = menu;
    if (menu === 'logout') {
      this.logout();
    } else if (menu === 'userProfile') {
      this.router.navigate(['/user-profile']);
    }
    else if (menu === 'wishlist') {
      this.router.navigate(['/wishlist']);
    }
    else if(menu==='search-page'){
      this.router.navigate([`/search-page`],{ queryParams: { query: this.searchQuery } });
    }else if(menu==='home-page'){
      this.router.navigate([`/home-page`]);
    }
    // Add logic for other menus (library, home, search)
  }

  // Function to handle logout
  logout(): void {
    console.log('User logged out');
    localStorage.removeItem('token');
    this.router.navigate([`/home`]);
    // Implement your logout logic here
  }

  ngOnInit(){
    this.userName='A'

  }

  // Function to navigate to user profile
  navigateToUserProfile(): void {
    console.log('Navigating to user profile');
    // Implement navigation to user profile page here
  }

  // Function to handle search action
  onSearch(): void {
    console.log('Search initiated:', this.searchQuery);
    // Implement search functionality here
  }
}
