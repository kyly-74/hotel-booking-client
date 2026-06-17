export interface RoomDto {
  id: number;
  roomTypeId: number;
  roomTypeName: string;
  roomNumber: string;
  status: string; 
  floor: string;
  pricePerNight: number;
  imageUrl?: string;
}

// Giữ nguyên các DTO gửi lên .NET bằng chữ Hoa
export interface RoomCreateDto {
  RoomTypeId: number;
  RoomNumber: string;
  Status: string;
  Floor: string | null;
  PricePerNight: number; // Thêm dòng này
  ImageUrl: string;
}

export interface RoomUpdateDto {
  Id: number;
  RoomTypeId: number;
  RoomNumber: string;
  Status: string;
  Floor: string;
}

export interface RoomStatusUpdateDto {
  Id: number;
  Status: string;
}