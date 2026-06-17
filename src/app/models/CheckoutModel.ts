export interface BookingRequest {
  roomId: number;

  customerName: string;
  email: string;
  phone: string;
  cccd: string;
  address: string;

  checkInDate: string;
  checkOutDate: string;

  guestCount: number;
  quantity: number;
}