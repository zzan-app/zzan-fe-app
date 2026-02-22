import { ImageSourcePropType } from 'react-native';

export interface FeedImage {
  uri: ImageSourcePropType;
  id: string;
}

export interface FeedPost {
  images: FeedImage[];
  alcoholIds: string[];
  placeId?: string;
  review: string;
}

export interface Alcohol {
  id: string;
  imageUrl: ImageSourcePropType | string;
  name: string;
  type: string;
  score?: number;
}

export interface Place {
  id: string;
  name: string;
  address: string;
}

export type AddType = 'alcohol' | 'place';

export interface PlaceWithRating extends Place {
  feedCount: number;
  rating: number;
}

export interface TagPosition {
  x: number;
  y: number;
}

export interface AlcoholTagInfo {
  alcoholId: string;
  imageIndex: number;
  tagPosition: TagPosition;
}

export interface FeedWithUser {
  id: string;
  userId: string;
  username: string;
  userProfileImage: ImageSourcePropType;
  imageUrl: ImageSourcePropType;
  placeName: string;
  address: string;
  alcoholCount: number;
}
