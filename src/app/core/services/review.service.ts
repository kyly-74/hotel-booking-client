import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {ReviewRead, ReviewCreate, ReviewReply} from '../../shared/models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);
  // Đảm bảo apiUrl trỏ đúng đến controller /api/reviews
  private apiUrl = `${environment.apiUrl}/reviews`;

  /**
   * Lấy danh sách đánh giá theo HotelId
   * GET /api/reviews/hotel/{hotelId}
   */
 getReviewsByHotel(hotelId: number): Observable<any> {
  // Thay trực tiếp URL này vào xem nó có chạy không
  return this.http.get(`http://localhost:5099/api/reviews/hotel/${hotelId}`); 
}
  /**
   * Khách hàng gửi đánh giá mới
   * POST /api/reviews
   */
  createReview(review: ReviewCreate): Observable<any> {
    return this.http.post(this.apiUrl, review);
  }

  /**
   * Admin phản hồi đánh giá
   * PATCH /api/reviews/{id}/reply
   */
  replyToReview(reviewId: number, reply: ReviewReply): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${reviewId}/reply`, reply);
  }

  /**
   * Xóa đánh giá (nếu cần)
   * DELETE /api/reviews/{id}
   */
  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

 

}