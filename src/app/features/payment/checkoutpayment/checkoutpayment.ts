import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-checkoutpayment',
  imports: [CommonModule],
  templateUrl: './checkoutpayment.html',
  styleUrl: './checkoutpayment.css',
})
export class Checkoutpayment implements OnInit {
  bookingId = 0;
  totalAmount = 0;
  loading = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.bookingId = 5;
    this.totalAmount = 2500000;
    // this.bookingId = +this.route.snapshot.params['bookingId'];

    
    // this.http.get<any>(`${environment.apiUrl}/booking/${this.bookingId}`).subscribe(res => {
    //   this.totalAmount = res.totalAmount;
    // });
  }
  

  pay() {
    this.loading = true;
    
    // Gọi API tạo payment, trả về URL thanh toán của VnPay rồi chuyển hướng người dùng sang đó 
    this.http.post<any>(`${environment.apiUrl}/payment/create`, { bookingId: this.bookingId })
      .subscribe({
        next: (res) => window.location.href = res.paymentUrl, // Đưa người dùng sang trang VnPay/Momo...
        error: () => {
          this.loading = false;
          alert('Không thể tạo thanh toán, thử lại!');
        }
      });
  }
}