import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CheckoutService } from '../../../core/services/checkout.service';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-detail.html',
  styleUrls: ['./hotel-detail.css']
})
export class HotelDetailComponent implements OnInit {

  // 🔥 BẮT BUỘC PHẢI CÓ 2 DÒNG NÀY
  loading: boolean = true;
  hotel: any = null;

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router);
  private checkoutService = inject(CheckoutService);

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    console.log('HOTEL ID:', id);

    this.http.get(`http://localhost:5099/api/Hotel/${id}`)
      .subscribe({
        next: (data: any) => {
  console.log('HOTEL DATA:', data);

  this.hotel = data;

  console.log('HOTEL NAME:', this.hotel?.name);
  console.log('ROOMS:', this.hotel?.rooms);

  this.loading = false;
},
      });
  }

  bookRoom(room: any) {

  console.log('BOOK ROOM:', room);

  const bookingData = {
    hotelId: this.hotel?.id,
    hotelName: this.hotel?.name,
    room: room,
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date().toISOString().split('T')[0],
    guestCount: 1,
    totalPrice: room?.price || this.hotel?.price || this.hotel?.minPrice || 0
  };

  console.log('CHECKOUT DATA:', bookingData);

  this.checkoutService.save(bookingData);

  this.router.navigate(['/checkout']);
}
}