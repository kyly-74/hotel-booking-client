import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingRequest } from '../../models/CheckoutModel';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:5099/api/bookings/create';

  constructor(private http: HttpClient) {}

  createBooking(data: BookingRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}