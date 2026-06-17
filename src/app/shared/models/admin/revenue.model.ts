export interface RevenueDetailItem {
  label: string;
  revenue: number;
}

export interface HotelRevenueItem {
  hotelName: string;
  revenue: number;
}

export interface RevenueReport {
  periodType: string;
  hotelId?: number;

  fromDate: string;
  toDate: string;

  totalRevenue: number;
  previousTotalRevenue: number;

  growthRate: number;

  revenueDetails: RevenueDetailItem[];
  hotelRevenues: HotelRevenueItem[];
}