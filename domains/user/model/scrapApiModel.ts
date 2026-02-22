export interface FeedScrapApiResponse {
  id: string;
  imageUrl: string;
  score: number;
  liquorCount: number;
  kakaoPlaceId: string;
  placeName: string;
  placeAddress: string;
}

export interface LiquorScrapApiResponse {
  id: string;
  liquorName: string;
  liquorScore: number;
  liquorImageUrl: string;
  liquorType: string;
}

export interface ScrapCheckResponse {
  exist: boolean;
}

export interface ScrapListResponse<T> {
  items: T[];
  nextCursor: string;
  hasNext: boolean;
}
