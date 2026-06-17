export interface HotelRegistrationDto {
  id: number;

  userName: string;
  userEmail: string;

  name: string;
  address: string;

  contactEmail: string;
  contactPhone: string;

  description?: string;
  imageUrl?: string;

  businessLicenseUrl: string;

  status: string;

  submittedAt: string;

  reviewedAt?: string;
  reviewedBy?: string;
  rejectReason?: string;
}