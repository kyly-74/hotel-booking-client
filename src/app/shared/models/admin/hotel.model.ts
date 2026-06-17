export interface HotelDto {
  id: number;
  name: string;
  imageUrl?: string;
  address: string;
  city: string;
  description?: string;

  managerId: number;
  managerName: string;
  managerEmail: string;

  status: string;
  isActive: boolean;

  starRating?: number;
  createdAt: string;

  totalBookings: number;
  totalReviews: number;
  totalRooms: number;
}