// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import  data from '../../assets/db.json'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topTracks: any = [];

  constructor(private spotifyService: SpotifyService,private router:Router) {}

  ngOnInit(): void {
    if(!!localStorage.getItem('token')){
      this.router.navigate(['/home-page']);
    }
    // this.spotifyService.getTopTracks().subscribe(data => {
    //   this.topTracks = data;
    //   console.log(this.topTracks)
    // },error => {
    //   console.error('Failed to fetch top tracks:', error);
    // });
    this.topTracks=data.playlists
  }
  
  onClick(selected:String) {
    // this.router.navigate([`/spotify/${this.selected}`]);
    this.router.navigate([`/login`]);

  }
}
