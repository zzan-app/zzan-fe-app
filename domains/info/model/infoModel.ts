import type { ImageSourcePropType } from 'react-native';

export interface LiquorComment {
  id: string;
  userId: string;
  username: string;
  userProfileImage: ImageSourcePropType;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}

export interface PlaceTemporalInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  feedCount: number;
  kakaoPlaceId: string;
  latitude: number;
  longitude: number;
}

export interface PlaceFeedWithProfile {
  id: string;
  imageUrl: string;
  userId: string;
  userName: string;
  userProfileImage: string;
  placeName: string;
  placeAddress: string;
  alcoholCount: number;
  score: number;
}

export interface ImageWithDescription {
  image: ImageSourcePropType;
  descriptionTitle: string;
  descriptionCategory: string;
}

export interface PlaceInfo {
  id: string;
  name: string;
  category: string;
  images: ImageSourcePropType[];
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  isBookmarked: boolean;
  rating: number;
  reviews: PlaceReview[];
  description: string;
  kakaoPlaceId?: string;
}

export interface PlaceReview {
  id: string;
  userName: string;
  rating: number;
  content: string;
  imageUrl?: ImageSourcePropType;
  createdAt: string;
}

export interface InfoBox {
  label: string;
  value: string;
}

export interface AlcoholInfo {
  id: string;
  name: string;
  category: string;
  images: ImageWithDescription[];
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  isBookmarked: boolean;
  rating: number;
  reviews: PlaceReview[];
  recommendTitle: string;
  recommendDescription: string;
  galleryImages?: ImageWithDescription[];
}
