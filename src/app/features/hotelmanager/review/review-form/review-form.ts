import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from '../../../../core/services/review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-form.html',
  styleUrls: ['./review-form.css']
})
export class ReviewFormComponent {
  @Input() hotelId!: number;
  @Output() reviewSubmitted = new EventEmitter<void>(); // Thông báo cho cha biết đã gửi xong

  reviewForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {
    this.reviewForm = this.fb.group({
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      this.isSubmitting = true;
      const payload = {
        hotelId: this.hotelId,
        ...this.reviewForm.value
      };

      this.reviewService.createReview(payload).subscribe({
        next: () => {
          this.reviewForm.reset({ rating: 5 });
          this.isSubmitting = false;
          this.reviewSubmitted.emit(); // Bắn sự kiện để trang cha load lại danh sách
          alert('Đánh giá của bạn đã được gửi!');
        },
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
        }
      });
    }
  }
}