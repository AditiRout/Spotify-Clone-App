import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent {
  trackId: string | null | undefined;
  trackDetails: any; // Define your track details type

  constructor(private route: ActivatedRoute,private spotifyService:SpotifyService) {}

  ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('id');
    // Fetch track details using trackId from your service
    this.fetchTrackDetails(this.trackId);
  }

  fetchTrackDetails(id: string | null) {
    if (id) {
      this.spotifyService.getTrackDetails(id).subscribe(
        (data) => {
          this.trackDetails = data;
          console.log(this.trackDetails); // Log track details for debugging
        },
        (error) => {
          console.error('Error fetching track details:', error);
        }
      );
    }
  }
}
