import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeData } from '../../models/home.model'; 

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:5099/api/Home/featured-hotels';

  private cache: HomeData | null = null;

 getHomeData(): Observable<HomeData> {
  return this.http.get<any>(this.apiUrl).pipe(
    map(data => {

      console.log('RAW API RESPONSE:', data);

      return {
        popularCities: data.PopularCities || data.popularCities || [],
        featuredHotels: data.FeaturedHotels || data.featuredHotels || [],
        hotRooms: data.HotRooms || data.hotRooms || []
      };
    })
  );
}

  // Luôn lưu cache (kể cả rỗng) để component có thể hiển thị fallback
  setCache(data: HomeData) {
    this.cache = data;
  }

  getCache(): HomeData | null {
    return this.cache;
  }

  clearCache(): void {
    this.cache = null;
  }
}
