// src/app/spotify.service.ts
import { Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js'; // Spotify Web API JS wrapper
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private spotifyApi: SpotifyWebApi.SpotifyWebApiJs = new SpotifyWebApi();

  // Authorization token that must have been created previously.
  private token: string = 'BQDHXY0yotEygQOG_q9FX4685X0YkuWg2xsEaH9wmK8S9HUhBKrfy5ymQGF84QA8TXrjFUxMM4LkRb9kajP_JGiEz214JVHsMa0FpP2hFzqzUiwpZP41KBE9TuY1i8AR5vGn6cns1pA4t9rNlJbdmCjCTnidwrTJ3cVqplJHMpevqQEOgRDjnauGiNTiEXe673vq4A8HNjoguSgVbmm9hj1c1oJE2v6TfghFTl84rujieZfUaKCBR7TYH6w8zBEkng0CfUdAWdz_rEOqQC2HGqyff0Zc7ZKJ'
  private apiKey = '';
  private rapidApiHost = 'shazam.p.rapidapi.com';
  private rapidApiKey = '';

  constructor(private http: HttpClient) {
    // Set the access token for the Spotify Web API JS wrapper
    this.spotifyApi.setAccessToken(this.token);
  }

  // Function to make HTTP requests using the HttpClient and fetch top tracks
  private fetchWebApi(endpoint: string, method: string, body: any = null): Observable<any> {
    const url = `https://api.spotify.com/${endpoint}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    if (method === 'GET') {
      return this.http.get(url, { headers }).pipe(
        catchError(this.handleError) // Handle errors explicitly
      );
    } else if (method === 'POST') {
      return this.http.post(url, body, { headers }).pipe(
        catchError(this.handleError)
      );
    } else {
      return throwError('Invalid HTTP method'); // Return an error Observable if the method is invalid
    }
  }

  // Function to get the user's top tracks from Spotify
  getTopTracks(): Observable<any> {
    // Endpoint reference: https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return this.fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=6', 'GET');
  }

  getLatestReleases():Observable<any>{
    return this.fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=24', 'GET');
  }

  // Example function to get a playlist by ID from Spotify (for future use)
  getCustomPlaylist(playlistId: string): Observable<any> {
    return this.fetchWebApi(`v1/albums/4aawyAB9vmqN3uQ7FjRGTy`, 'GET');
  }
  // getShazamRecommendations(): Observable<any> {
  //   const url = 'https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US';
  //   const headers = new HttpHeaders({
  //     'x-rapidapi-host': this.rapidApiHost,
  //     'x-rapidapi-key': this.rapidApiKey
  //   });

  //   return this.http.get(url, { headers })
  // }


  // getArtists(artistIds: string): Observable<any> {
  //   return this.fetchWebApi(`v1/artists?ids=${artistIds}`, 'GET');
  // }
  getArtists(artistIds: string): Observable<any> {
    return this.fetchWebApi(`https://api.spotify.com/v1/me/following?type=artist`, 'GET');
  }

  getTrackDetails(trackId: string): Observable<any> {
    return this.fetchWebApi(`v1/tracks/${trackId}`, 'GET');
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  

}
