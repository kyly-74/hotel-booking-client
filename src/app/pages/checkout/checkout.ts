import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../core/services/checkout.service';
import { BookingService } from '../../core/services/booking.service';
import { BookingRequest } from '../../models/CheckoutModel';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
  standalone: true,
  imports: [CommonModule]

})
export class CheckoutComponent implements OnInit {
  room: any;
  checkIn = '';
  checkOut = '';
  days = 0;
  totalPrice = 0;

  constructor(
    private checkoutService: CheckoutService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {

  const data: any = this.checkoutService.get();

  console.log('CHECKOUT DATA:', data);

  this.room = data?.room;

}

  calculateDays(checkIn: string, checkOut: string): number {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = (outDate.getTime() - inDate.getTime()) / (1000 * 3600 * 24);
    return diff > 0 ? diff : 1;
  }

  submit() {
    // logic gửi booking lên server
    console.log('Booking confirmed');
    this.checkoutService.clear();
  }
}
