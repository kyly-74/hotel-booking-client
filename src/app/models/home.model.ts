

// src/app/models/home.model.ts
export interface HotelCard {
    id: number;
    name: string;
    city: string;
    imageUrl: string;
    starRating?: number;
}

export interface RoomCard {
    id: number;
    roomName: string;
    image: string;
    price: number;
    hotelId: number;
    hotelName: string;
}

export interface HomeData {
    popularCities: string[];
    featuredHotels: HotelCard[];
    hotRooms: RoomCard[];
}