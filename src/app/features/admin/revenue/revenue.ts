import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminService } from '../../../core/services/admin.service';
import { RevenueReport } from '../../../shared/models/admin/revenue.model';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './revenue.html',
  styleUrl: './revenue.css',
})
export class Revenue implements OnInit{
  report?: RevenueReport;
  loading=false;

  constructor(
    private adminService:AdminService,
    private cdr: ChangeDetectorRef
  ){}

    ngOnInit():void{
    this.loadRevenue();
  }

  loadRevenue(){

    this.loading=true;

    this.adminService.getRevenueReport(

      "month",

      "2024-01-01",

      "2025-12-31"

    )
    .subscribe({

      next:(data)=>{

        this.report=data;
        this.loading=false;

        console.log("REVENUE",data);

        this.cdr.detectChanges();
      },


      error:(err)=>{
        console.error(err);
        this.loading=false;

        this.cdr.detectChanges();
      }
    })
  }
}
