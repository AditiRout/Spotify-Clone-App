// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { SearchService } from '../search.service';
// import { WishlistService } from '../wishlist.service';

// @Component({
//   selector: 'app-search-page',
//   templateUrl: './search-page.component.html',
//   styleUrls: ['./search-page.component.css']
// })
// export class SearchPageComponent implements OnInit {
//   results: any=[];
//   topresult:any;
//   loading: boolean = true;

//   constructor(private spotifyService: SearchService, private wishlistService: WishlistService,private route: ActivatedRoute) { }

//   ngOnInit() {
//     this.route.queryParams.subscribe(params => {
//       if (params['query']) {
//         this.spotifyService.searchTracks(params['query']).subscribe(data => {
//           this.results = data.tracks.items;
//           this.topresult=data;
//           this.loading = false;
//         });
//       }
//     });
//   }
// // Add song to wishlist
// addToWishlist(song: any): void {
//   const wishlistItem = {
//     trackId: song.id,
//     trackName: song.name,
//     artistName: song.artists[0].name,
//     albumName: song.album.name,
//     imageUrl: song.album.images[0].url,  // Assuming image URL from Spotify
//     userId: 1  // Replace this with actual userId from authentication
//   };

//   this.wishlistService.addToWishlist(wishlistItem).subscribe(
//     response => {
//       console.log('Song added to wishlist', response);
//       alert('Song added to your wishlist!');

//       // Store the track name to session storage to retrieve it in WishlistComponent
//       sessionStorage.setItem('lastAddedTrack', song.name);

//       // Fetch updated wishlist after adding the song
//       this.loadUpdatedWishlist(song.name);
//     },
//     error => {
//       console.error('Error adding song to wishlist', error);
//       alert('Failed to add song to wishlist');
//     }
//   );
// }

// // Load updated wishlist by track name
// loadUpdatedWishlist(trackName: string): void {
//   this.wishlistService.getWishlistByTrackName(trackName).subscribe(
//     data => {
//       console.log('Updated wishlist data:', data);
//       // Optionally, navigate to wishlist page or refresh the UI
//     },
//     error => {
//       console.error('Error fetching updated wishlist', error);
//     }
//   );
// }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { WishlistService } from '../wishlist.service';
import { UserService } from '../user.service';  // Import UserService
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  results: any = [];
  topresult: any;
  loading: boolean = true;
  userId: any;  // Dynamically set userId

  constructor(
    private spotifyService: SearchService,
    private wishlistService: WishlistService,
    private userService: UserService,  // Inject UserService
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar 
  ) {}

  ngOnInit() {
    // Fetch user details on initialization
    this.userService.getUserByToken().subscribe(
      user => {
        this.userId = user.id;  // Set the userId dynamically
      },
      error => {
        console.error('Error fetching user by token:', error);
      }
    );

    // Perform search query if available
    this.route.queryParams.subscribe(params => {
      if (params['query']) {
        this.spotifyService.searchTracks(params['query']).subscribe(data => {
          this.results = data.tracks.items;
          this.topresult = data;
          this.loading = false;
        });
      }
    });
  }

  // Add song to wishlist
  addToWishlist(song: any): void {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }

    const wishlistItem = {
      trackId: song.id,
      trackName: song.name,
      artistName: song.artists[0].name,
      albumName: song.album.name,
      imageUrl: song.album.images[0].url,
      userId: this.userId  // Dynamically set userId
    };

    this.wishlistService.addToWishlist(wishlistItem).subscribe(
      response => {
        console.log('Song added to wishlist', response);
        // alert('Song added to your wishlist!');
        this._snackBar.open('Song added to wishlist!', 'Close', {
          duration: 3000,  // The notification will close after 3 seconds
        });

        // Store the track name to session storage to retrieve it in WishlistComponent
        sessionStorage.setItem('lastAddedTrack', song.name);

        // Fetch updated wishlist after adding the song
        this.loadUpdatedWishlist(song.name);
      },
      error => {
        console.error('Error adding song to wishlist', error);
        alert('Failed to add song to wishlist');
      }
    );
  }

  // Load updated wishlist by track name
  loadUpdatedWishlist(trackName: string): void {
    this.wishlistService.getWishlistByTrackName(trackName).subscribe(
      data => {
        console.log('Updated wishlist data:', data);
        // Optionally, navigate to wishlist page or refresh the UI
      },
      error => {
        console.error('Error fetching updated wishlist', error);
      }
    );
  }
}
