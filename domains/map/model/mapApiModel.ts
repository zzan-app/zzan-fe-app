export interface PlaceResponse {
  id: string;
  name: string;
  feedCount: number;
  score: number;
  address: string;
  phone: string;
  longitude: number;
  latitude: number;
}
export interface PlaceSearchResponse {
  id: string;
  placeName: string;
  categoryName: string;
  phone: string;
  addressName: string;
  roadAddressName: string;
  longitude: number;
  latitude: number;
}
