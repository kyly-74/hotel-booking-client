export interface UserDto {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  isLocked: boolean;
  createdAt: string;

  totalBookings: number;
  totalReviews: number;
  totalManagedHotels: number;
}