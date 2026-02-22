import type { UserRole } from "./userModel";

export interface UserApiResponse {
  id: string;
  profileImageUrl: string | null;
  name: string | null;
  role: UserRole;
  birth: string | null;
  email: string | null;
  phone: string | null;
}

export interface UpdateProfileRequest {
  name?: string;
  profileImageUrl?: string;
  birth?: string;
  email?: string;
  phone?: string;
}

export interface UserFeedSummary {
  id: string;
  imageUrl: string;
  score: number;
  liquorCount: number;
  kakaoPlaceId?: string;
  placeName?: string;
  placeAddress?: string;
}

export interface UserFeedsResponse {
  items: UserFeedSummary[];
  nextCursor: string | null;
  hasNext: boolean;
}
