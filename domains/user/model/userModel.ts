import { ImageSourcePropType } from 'react-native';

export type UserRole = 'USER' | 'PREMIUM' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  profileImage: ImageSourcePropType;
  profileImageUrl: string | null;
  emptyAlcoholCount: number;
  birthDate: string;
  birth: string | null;
  phone: string;
  email: string;
  role: UserRole;
}

export interface UserFeed {
  id: string;
  imageUrl: ImageSourcePropType;
  placeName: string;
  address: string;
  alcoholCount: number;
}

export interface UserScrapAlcohol {
  id: string;
  imageUrl: ImageSourcePropType;
  name: string;
  type: string;
  rating: number;
  reviewCount: number;
}
