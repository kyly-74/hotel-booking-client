import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeData } from '../models/home.model'; // Import interface chuẩn
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http = inject(HttpClient);
  // Đảm bảo URL này khớp 100% với dòng "Now listening on" trong terminal C#
  private apiUrl = 'http://localhost:5099/api/Home'; 

  getHomeData(): Observable<HomeData> {
    return this.http.get<HomeData>(this.apiUrl);
  }
}
