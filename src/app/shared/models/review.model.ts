export interface ReviewDto {
  id: number;
  bookingId: number;
  customerId: number;
  customerName: string;
  hotelId: number;
  rating: number;
  comment?: string;
  reply?: string;
  createdAt: string; // Trong TS, DateTime từ Backend về sẽ thành chuỗi string
}

export interface ReviewCreateDto {
  bookingId: number;
  hotelId: number;
  rating: number;
  comment?: string;
}

export interface ReviewReplyDto {
  reviewId: number;
  reply: string;
}