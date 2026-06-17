export interface Hotel {
  id: number;
  name: string;
  city: string;
  imageUrl: string;
  starRating: number;
  minPrice: number;
}

export interface HotRoom {
  id: number;
  roomName: string;
  hotelName: string;
  price: number;
  image: string;
}

export interface HomeData {
  popularCities: string[];
  featuredHotels: Hotel[];
  hotRooms: HotRoom[];
}
