import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HomeService } from '../../core/services/home.service';
import { HomeData } from '../../models/home.model';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  private homeService = inject(HomeService);
  private router = inject(Router);

  homeData: HomeData | null = null;
  loading = true;

  destination = '';
  checkIn = '';
  checkOut = '';
  guests = 1;

 constructor() {
  console.log('CONSTRUCTOR HOME');
}

ngOnInit(): void {
  console.log('ONINIT HOME');
  this.loadHomeData();
}

ngOnDestroy(): void {
  console.log('DESTROY HOME');
}

  private loadHomeData(): void {
    console.log('CALL API HOME');
    this.loading = true;

    this.homeService.getHomeData().subscribe({
      next: (data: HomeData) => {
  console.log('DATA FROM API:', data);

  this.homeData = data;

  console.log('HOME DATA AFTER ASSIGN:', this.homeData);

  this.loading = false;
}
    });
  }

  search(): void {
    console.log('SEARCH CLICK');
    this.router.navigate(['/search'], {
      queryParams: {
        destination: this.destination,
        checkIn: this.checkIn,
        checkOut: this.checkOut,
        guests: this.guests
      }
    });
  }
  
}

