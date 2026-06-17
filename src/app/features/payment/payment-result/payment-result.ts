import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-payment-result',
  imports: [CommonModule],
  templateUrl: './payment-result.html',
  styleUrl: './payment-result.css',
})
export class PaymentResult implements OnInit {
   success = false;
  bookingId = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.bookingId = params['bookingId'];
    
    // Kiểm tra xem trong toàn bộ đường dẫn URL có chứa chữ 'success' hay không
    this.success = this.route.snapshot.url.some(segment => segment.path === 'success');
  });
}

  
}
