import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchUrl: string = 'http://localhost:1111/music/search';

  constructor(private http: HttpClient) { }

  searchTracks(query: string): Observable<any> {
    return this.http.get<any>(`${this.searchUrl}?query=${query}`);
  }
  getAllTracks(): Observable<any[]> {
    return this.http.get<any[]>(this.searchUrl);
  }
}
