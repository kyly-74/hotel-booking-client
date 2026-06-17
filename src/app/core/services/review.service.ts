import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ReviewDto, ReviewCreateDto, ReviewReplyDto } from '../../shared/models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/reviews`;

  // Lấy danh sách bình luận của khách sạn
  getReviewsByHotel(hotelId: number): Observable<ReviewDto[]> {
    return this.http.get<ReviewDto[]>(`${this.apiUrl}/hotel/${hotelId}`);
  }

  // Khách gửi đánh giá mới
  createReview(review: ReviewCreateDto): Observable<any> {
    return this.http.post(this.apiUrl, review);
  }

  // Admin phản hồi đánh giá
  replyToReview(reply: ReviewReplyDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/reply`, reply);
  }

  // Admin xóa đánh giá xấu
  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}