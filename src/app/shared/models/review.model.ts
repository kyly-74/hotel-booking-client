export interface ReviewRead {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: Date;
  customerName: string;
  reply: string | null;
  repliedAt: Date | null;
}

export interface ReviewCreate {
  bookingId: number;
  rating: number;
  comment: string | null;
}

export interface ReviewReply {
  reply: string;
}