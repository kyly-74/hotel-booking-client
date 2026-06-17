import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserDto } from '../../shared/models/admin/user.model';
import { HotelDto } from '../../shared/models/admin/hotel.model';
import { RevenueReport } from '../../shared/models/admin/revenue.model';
import { LockUserDto, ReviewRegistrationDto } from '../../shared/models/admin/request.model';
import { ServiceResult } from '../../shared/models/admin/response.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // =========================
  // USER MANAGEMENT
  // =========================

  getUsers(
    search?: string,
    role?: string,
    status?: string,
    fromDate?: string,
    toDate?: string
  ): Observable<UserDto[]> {

    let params = new HttpParams();

    if (search) params = params.set('search', search);
    if (role) params = params.set('role', role);
    if (status) params = params.set('status', status);
    if (fromDate) params = params.set('fromDate', fromDate);
    if (toDate) params = params.set('toDate', toDate);

    return this.http.get<UserDto[]>(
      `${this.apiUrl}/users`,
      { params }
    );
  }

  lockUser(
    userId: number,
    data: LockUserDto
  ): Observable<ServiceResult> {

    return this.http.post<ServiceResult>(
      `${this.apiUrl}/users/${userId}/toggle-lock`,
      data
    );
  }

  // =========================
  // HOTEL MANAGEMENT
  // =========================

  getHotels(): Observable<HotelDto[]> {

    return this.http.get<HotelDto[]>(
      `${this.apiUrl}/hotels`
    );

  }

  // =========================
  // HOTEL REGISTRATIONS
  // =========================
  // getRegistrations(
  //   search?: string,
  //   status?: string,
  //   fromDate?: string,
  //   toDate?: string
  // ): Observable<HotelRegistrationDto[]> {

  //   let params = new HttpParams();

  //   if (search) params = params.set('search', search);
  //   if (status) params = params.set('status', status);
  //   if (fromDate) params = params.set('fromDate', fromDate);
  //   if (toDate) params = params.set('toDate', toDate);

  //   return this.http.get<HotelRegistrationDto[]>(
  //     `${this.apiUrl}/registrations`,
  //     { params }
  //   );
  // }

  // reviewRegistration(
  //   registrationId: number,
  //   data: ReviewRegistrationDto
  // ): Observable<ServiceResult> {

  //   return this.http.post<ServiceResult>(
  //     `${this.apiUrl}/registrations/${registrationId}/review`,
  //     data
  //   );
  // }


  // =========================
  // REVENUE REPORT
  // =========================

  getRevenueReport(
    periodType: string,
    fromDate: string,
    toDate: string,
    hotelId?: number
  ): Observable<RevenueReport> {

    let params = new HttpParams()
      .set('periodType', periodType)
      .set('fromDate', fromDate)
      .set('toDate', toDate);

    if (hotelId !== undefined && hotelId !== null) {
      params = params.set('hotelId', hotelId.toString());
    }

    return this.http.get<RevenueReport>(
      `${this.apiUrl}/revenue`,
      { params }
    );
  }
}