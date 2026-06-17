import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminService } from '../../../core/services/admin.service';
import { HotelDto } from '../../../shared/models/admin/hotel.model';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotels.html',
  styleUrl: './hotels.css',
})
export class Hotels implements OnInit{
  hotels: HotelDto[] = [];
  loading = false;


  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(){

    this.loading = true;

    this.adminService.getHotels()
      .subscribe({

        next:(data)=>{

          this.hotels = data;
          this.loading = false;

          console.log(
            "AFTER SET:",
            this.hotels.length,
            this.loading
          );

          this.cdr.detectChanges();
        },

        error:(err)=>{
          console.error(err);
          this.loading=false;

          this.cdr.detectChanges();
        }
      });
  }
}
