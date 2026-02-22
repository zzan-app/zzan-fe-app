import { ImageSourcePropType } from "react-native";

export interface LiquorSearchParams {
  keyword: string;
  page?: number;
  size?: number;
}

export interface LiquorApiResponse {
  id: string;
  liquorName: string;
  liquorScore: number;
  liquorImageUrl: string;
  liquorType: string;
}

export interface LiquorSearchResponse {
  items: LiquorApiResponse[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export interface PresignedUrlResponse {
  url: string;
  key: string;
}

export interface FeedImageTag {
  liquorId: string;
  liquorName: string;
  x: number;
  y: number;
}

export interface FeedImageRequest {
  imageUrl: string;
  tags: FeedImageTag[];
}

export interface CreateFeedRequest {
  score: number;
  text: string;
  images: FeedImageRequest[];
  kakaoPlaceId?: string;
  placeName?: string;
  placePhone?: string;
  placeAddress?: string;
  longitude?: number;
  latitude?: number;
}

export interface CreateFeedResponse {
  id: string;
}

export interface CreateLiquorReviewRequest {
  score: number;
  text: string;
}

export interface CreateLiquorReviewResponse {
  reviewId: string;
  createdAt: string;
}

export interface FeedDetailTag {
  id: string;
  liquorId: string;
  liquorName: string;
  x: number;
  y: number;
}

export interface FeedDetailImage {
  id: string;
  imageUrl: string;
  tags: FeedDetailTag[];
}

export interface FeedDetailApiResponse {
  id: string;
  userId: string;
  userName: string;
  userProfileImage: string;
  imageUrl: string;
  images: FeedDetailImage[];
  score: number;
  liquorCount: number;
  text: string;
  kakaoPlaceId?: string;
  placeName?: string;
  placeAddress?: string;
  createdAt: string;
}

export interface PlaceFeedApiResponse {
  id: string;
  imageUrl: string;
  score: number;
  liquorCount: number;
  kakaoPlaceId: string;
  placeName: string;
  placeAddress: string;
}

export interface RecentFeedApiResponse {
  id: string;
  imageUrl: string;
  score: number;
  liquorCount: number;
  userId: string;
  userName: string;
  userProfileImage: ImageSourcePropType | string;
  kakaoPlaceId: string;
  placeName: string;
  placeAddress: string;
}