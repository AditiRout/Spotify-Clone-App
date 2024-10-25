import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  selected: string = 'home';
  homeLabel: string = 'Home';
  searchLabel: string = 'Search';
  libraryLabel: string = 'Library';
  searchQuery: string = ''; // To hold the search input

  // Function to handle navigation when a menu item is clicked
  onClick(selectedMenu: string) {
    this.selected = selectedMenu;
    // this.router.navigate([`/spotify/${this.selected}`]);
    this.router.navigate([`/${this.selected}`]);

  }

  // Function to handle the search
  onSearch() {
    if (this.searchQuery) {
      console.log(this.searchQuery)
      this.router.navigate(['/login']);
    // } else {
    //   this.router.navigate(['/spotify/search']);
    // }
  }}
}
