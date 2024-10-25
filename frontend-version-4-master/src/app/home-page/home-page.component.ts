import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service'; // Import the Spotify service
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WishlistService } from '../wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  topTracks: any[] = [];
  recommendedTracks: any[] = [];
  customPlaylist: any[] = [];
  artists:any[]=[];
  tracks:any[]=[];
  releases:any[]=[];
  wishlist: Set<string> = new Set();
  userId: any;

  constructor(private spotifyService: SpotifyService,
    private router:Router,private http: HttpClient,
    private wishlistService: WishlistService,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

    ngOnInit(): void {
      // Fetch userId from token
      this.userService.getUserByToken().subscribe(
        (user) => {
          this.userId = user.id;  // Assuming user object contains an 'id' field
          console.log('User ID:', this.userId);
  
          this.fetchTopTracks();
          this.fetchCustomPlaylist();
          this.fetchTracks();
          this.fetchLatest();
        },
        (error) => {
          console.error('Error fetching user ID:', error);
        }
      );
    }

  // Fetch Top Tracks from the Spotify service
  fetchTopTracks(): void {
    this.spotifyService.getTopTracks().subscribe(
      (data) => {
        this.topTracks = data.items;
        this.fetchRecommendedTracks(); // Fetch recommended tracks after top tracks are loaded
      },
      (error) => {
        console.error('Error fetching top tracks:', error);
      }
    );
  }
 
  playTrack(url: string): void {
    console.log(url)
    window.open(url, '_blank'); // Opens the Spotify URL in a new tab
  }

  // Fetch Recommended Tracks from the Spotify service
  fetchRecommendedTracks(): void {
    this.spotifyService.getLatestReleases().subscribe(
      (data) => {
        this.recommendedTracks= data.items.slice(18,24);
        // console.log(this.releases)
      // Fetch recommended tracks after top tracks are loaded
      },
      (error) => {
        console.error('Error fetching top tracks:', error);
      }
    );
    
  }

  // // Fetch Custom Playlist from the Spotify service
  fetchCustomPlaylist(): void {
    this.spotifyService.getLatestReleases().subscribe(
      (data) => {
        this.customPlaylist= data.items.slice(12,18);
        console.log(this.customPlaylist)
      // Fetch recommended tracks after top tracks are loaded
      },
      (error) => {
        console.error('Error fetching top tracks:', error);
      }
    );
  
  }

  // Add song to wishlist
  addToWishlist(song: any): void {
    if (!this.userId) {
      console.error('User ID is missing');
      this.snackBar.open('Failed to add song to wishlist: Missing User ID', 'Close', { duration: 2000 });
      return;
    }

    const wishlistItem = {
      trackId: song.id,
      trackName: song.name,
      artistName: song.artists[0].name,
      albumName: song.album.name,
      imageUrl: song.album.images[0].url,  // Assuming image URL from Spotify
      userId: this.userId // Now dynamically using the fetched userId
    };

    console.log('Adding song to wishlist:', wishlistItem); // Debugging log

    this.wishlistService.addToWishlist(wishlistItem).subscribe(
      response => {
        this.wishlist.add(song.id);  // Add the song to the wishlist set

        // Display snackbar notification
        this.snackBar.open('Song added to your wishlist!', 'Close', {
          duration: 2000
        });

        // Optionally, refresh or reload the wishlist after adding the song
        this.refreshWishlist();
      },
      error => {
        console.error('Error adding song to wishlist', error);
        this.snackBar.open('Failed to add song to wishlist', 'Close', {
          duration: 2000
        });
      }
    );
  }

  // Fetch all wishlist items for the specific user by userId (you can call this after adding the song)
  refreshWishlist(): void {
    if (!this.userId) {
      console.error('User ID not available');
      return;
    }

    // Fetch wishlist items using the userId
    this.wishlistService.getUserWishlist(this.userId).subscribe(
      (data) => {
        this.wishlist.clear();
        data.forEach((item: any) => this.wishlist.add(item.trackId));
        console.log('Refreshed wishlist for user:', this.userId, data);
      },
      (error) => {
        console.error('Error refreshing wishlist:', error);
      }
    );
  }
  isSongInWishlist(trackId: string): boolean {
    return this.wishlist.has(trackId);
  }
  goToTrackDetail(trackId: string) {
    this.router.navigate(['/track', trackId]); // Navigate to the track detail page
  }
 
  fetchLatest():void{
    this.spotifyService.getLatestReleases().subscribe(
      (data) => {
        this.releases= data.items.slice(6,12);
      // Fetch recommended tracks after top tracks are loaded
      },
      (error) => {
        console.error('Error fetching top tracks:', error);
      }
    );
  }
  fetchTracks(): void {
    const trackIds = '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'; // Replace with actual track IDs
    this.spotifyService.getTrackDetails(trackIds).subscribe(
      (data: any) => {
        this.tracks = data.tracks;
        console.log(this.tracks);
      },
      (error) => {
        console.error('Error fetching tracks:', error);
      }
    );
  }
}
