import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { SpotifyService } from '../spotify.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WishlistService } from '../wishlist.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let spotifyService: SpotifyService;
  let wishlistService: WishlistService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule, RouterTestingModule],
      providers: [SpotifyService, WishlistService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    spotifyService = TestBed.inject(SpotifyService);
    wishlistService = TestBed.inject(WishlistService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch top tracks', () => {
    const mockTracks = { items: [{ id: '1', name: 'Track 1' }] };
    spyOn(spotifyService, 'getTopTracks').and.returnValue(of(mockTracks));

    component.fetchTopTracks();
    expect(component.topTracks.length).toBe(1);
  });

  it('should add a track to wishlist', () => {
    const mockSong = {
      id: '1',
      name: 'Test Track',
      artists: [{ name: 'Artist' }],
      album: { name: 'Album', images: [{ url: 'image_url' }] },
    };
    spyOn(wishlistService, 'addToWishlist').and.returnValue(of({}));
    spyOn(component['snackBar'], 'open');

    component.addToWishlist(mockSong);
    expect(wishlistService.addToWishlist).toHaveBeenCalled();
    expect(component.wishlist.has('1')).toBeTrue();
    expect(component['snackBar'].open).toHaveBeenCalledWith('Song added to your wishlist!', 'Close', { duration: 2000 });
  });
});
