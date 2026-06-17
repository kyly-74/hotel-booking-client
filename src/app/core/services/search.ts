import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5099/api/Search';

  search(
    destination: string,
    checkIn: string,
    checkOut: string,
    guests: number
  ) {
    return this.http.get<any[]>(this.apiUrl, {
      params: {
        destination,
        checkIn,
        checkOut,
        guests
      }
    });
  }
}