import { Component, Input, OnInit, OnChanges, SimpleChanges, inject, ChangeDetectorRef } from '@angular/core';
import { ReviewService } from '../../../../core/services/review.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './review-list.html',
  styleUrls: ['./review-list.css']
})
export class ReviewListComponent implements OnInit, OnChanges {
  @Input() hotelId!: number; 
  reviews: any[] = [];
  
  private reviewService = inject(ReviewService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Nếu chưa có hotelId từ Input, mới lấy từ URL
    if (!this.hotelId) {
      const idFromUrl = this.route.snapshot.paramMap.get('hotelId');
      if (idFromUrl) this.hotelId = +idFromUrl;
    }
    
    if (this.hotelId) {
      this.loadReviews();
    }
  }

  // BỎ COMMENT ĐOẠN NÀY
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hotelId'] && !changes['hotelId'].firstChange) {
      this.loadReviews();
    }
  }

  loadReviews(): void {
  this.reviewService.getReviewsByHotel(this.hotelId).subscribe({
    next: (data) => {
      this.reviews = data;
      console.log("Dữ liệu đã nhận:", data);
      
      // THÊM 2 DÒNG NÀY ĐỂ ÉP GIAO DIỆN CẬP NHẬT
      this.cdr.markForCheck(); 
      // Hoặc nếu markForCheck không ăn thua, hãy thử:
      // this.cdr.detectChanges(); 
    },
    error: (err) => console.error("Lỗi:", err)
  });
}
}