import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Api {
  
  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get(`${environment.apiUrl}/rooms`);
  }

  getRoomDetail(id: number) {
    return this.http.get(`${environment.apiUrl}/rooms/${id}`);
  }

}
