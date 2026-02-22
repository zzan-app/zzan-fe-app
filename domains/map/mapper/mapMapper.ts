import type {
  MapMarker,
  MapRegion,
  PlaceResponse,
  PlaceSearchResponse,
} from "@/domains/map/model";

export const toMapMarker = (place: PlaceResponse): MapMarker => ({
  id: place.id,
  name: place.name,
  address: place.address,
  kakaoPlaceId: place.id,
  imageUrl: undefined,
  latitude: place.latitude,
  longitude: place.longitude,
  feedCount: place.feedCount,
  rating: place.score,
});

export const searchResultToMapMarker = (
  place: PlaceSearchResponse,
): MapMarker => ({
  id: place.id,
  name: place.placeName,
  address: place.roadAddressName,
  kakaoPlaceId: place.id,
  imageUrl: undefined,
  latitude: place.latitude,
  longitude: place.longitude,
  feedCount: 0,
  rating: 0,
});

export const filterMarkersInRegion = (
  markers: MapMarker[],
  region: MapRegion,
): MapMarker[] => {
  const minLatitude = region.latitude - region.latitudeDelta / 2;
  const maxLatitude = region.latitude + region.latitudeDelta / 2;
  const minLongitude = region.longitude - region.longitudeDelta / 2;
  const maxLongitude = region.longitude + region.longitudeDelta / 2;

  return markers.filter(
    (marker) =>
      marker.latitude >= minLatitude &&
      marker.latitude <= maxLatitude &&
      marker.longitude >= minLongitude &&
      marker.longitude <= maxLongitude,
  );
};
