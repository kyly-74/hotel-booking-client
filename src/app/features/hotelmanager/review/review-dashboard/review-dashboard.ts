import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService }  from '../../../../core/services/review.service';
import { ReviewRead } from '../../../../shared/models/review.model';





@Component({
  selector: 'app-review-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-dashboard.html',
  styleUrls: ['./review-dashboard.css']
})
export class ReviewDashboardComponent implements OnInit {
  // Inject các dependencies cần thiết
  private reviewService = inject(ReviewService);
  private cdr = inject(ChangeDetectorRef);

  reviews: ReviewRead[] = [];
  hotelId: number = 1; // ID này có thể lấy từ route hoặc input

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviewsByHotel(this.hotelId).subscribe({
      next: (data) => {
        this.reviews = data;
        // Báo cho Angular biết dữ liệu đã thay đổi để cập nhật giao diện
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Lỗi khi tải đánh giá:', err)
    });
  }

  submitReply(review: ReviewRead, replyText: string): void {
    if (!replyText.trim()) return;

    this.reviewService.replyToReview(review.id, { reply: replyText }).subscribe({
      next: () => {
        alert('Phản hồi thành công!');
        this.loadReviews(); // Tải lại danh sách sau khi reply
      },
      error: (err) => alert('Lỗi khi gửi phản hồi: ' + err.message)
    });
  }
}