import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  createPayment(bookingId: number, amount: number) {
    return this.http.post<{ paymentUrl: string }>('/api/payment/create', {
      bookingId,
      amount
    });
  }
}