import { ImageSourcePropType } from "react-native";

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MapRegion extends Coordinate {
  latitudeDelta: number;
  longitudeDelta: number;
  timestamp?: number;
}

export interface MapMarker extends Coordinate {
  id: string;
  name: string;
  address: string;
  kakaoPlaceId: string;
  imageUrl?: ImageSourcePropType;
  feedCount: number;
  rating: number;
}

export interface PlaceBounds {
  minLatitude: number;
  maxLatitude: number;
  minLongitude: number;
  maxLongitude: number;
}
