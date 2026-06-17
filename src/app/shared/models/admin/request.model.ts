export interface LockUserDto {
  isLocked: boolean;
  reason: string;
}

export interface ReviewRegistrationDto {
  isApproved: boolean;
  rejectReason?: string;
}