export interface LiquorDescriptionItem {
  header: string;
  content: string;
}

export interface LiquorDetailApiResponse {
  id: string;
  name: string;
  type: string | null;
  imageUrl: string | null;
  score: number | null;
  description: LiquorDescriptionItem[] | null;
  foodPairing: string | null;
  volume: string | null;
  content: string | null;
  awards: string | null;
  etc: string | null;
  brewery: string | null;
}

export interface PlaceDetailApiResponse {
  id: string;
  name: string;
  averageScore: number;
  feedCount: number;
  kakaoPlaceId: string;
  address: string;
  phone: string;
  longitude: number;
  latitude: number;
}

export interface LiquorReviewApiResponse {
  id: string;
  userId: string;
  username: string;
  userProfileImageUrl: string | null;
  liquorId: string;
  liquorName: string;
  score: number;
  text: string | null;
  createdAt: string;
}

export interface LiquorReviewsListResponse {
  items: LiquorReviewApiResponse[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface CreateLiquorReviewRequest {
  score: number;
  text?: string;
}

export interface UpdateLiquorReviewRequest {
  score: number;
  text?: string;
}
