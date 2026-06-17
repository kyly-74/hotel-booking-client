import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { HomeData } from '../../models/home.model'; // Đảm bảo import đúng đường dẫn

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'] 
})
export class HomeComponent implements OnInit { 
  private homeService = inject(HomeService);

  // Biến hứng dữ liệu từ API
  homeData: HomeData | null = null;

  // Các biến cho form search
  destination = '';
  checkIn = '';
  checkOut = '';
  guests = 1;

  ngOnInit(): void {
    // Gọi service để lấy dữ liệu trang chủ
    this.homeService.getHomeData().subscribe({
      next: (res: HomeData) => {
        this.homeData = res;
        console.log("Dữ liệu trang chủ đã nhận:", this.homeData);
      },
      error: (err) => {
        console.error("Lỗi khi tải dữ liệu trang chủ:", err);
      }
    });
  }

  search() {
    console.log({
      destination: this.destination,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      guests: this.guests
    });
  }
}