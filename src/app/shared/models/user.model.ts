// File: src/app/models/room-type.model.ts

export interface RoomImage {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
}

export interface RoomType {
  id: number;
  hotelId: number;
  typeName: string;
  description: string | null;
  maxOccupancy: number;
  pricePerNight: number;
  area: number;
  totalRooms: number;
  images: RoomImage[];
}

// Giúp bạn dễ dàng khởi tạo giá trị mặc định khi làm form
export const createEmptyRoomType = (): RoomType => ({
  id: 0,
  hotelId: 0,
  typeName: '',
  description: null,
  maxOccupancy: 2,
  pricePerNight: 0,
  area: 0,
  totalRooms: 0,
  images: []
});