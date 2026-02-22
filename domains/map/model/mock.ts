import { MapMarker } from './mapModel';
import { PLACE_DATA, PLACE_KAKAO_MAP } from '@/shared/mocks';

const generateRandomRating = (): number => {
  const rating = 3.0 + Math.random() * 2.0;
  return Math.round(rating);
};

const generateRandomFeedCount = (): number => {
  return Math.floor(Math.random() * 50) + 1;
};

export const mockPlacesWithCoordinates: MapMarker[] = Array.from({ length: 100 }, (_, i) => {
  const placeId = String(i + 1);
  const place = PLACE_DATA[i % PLACE_DATA.length];

  return {
    id: placeId,
    kakaoPlaceId: PLACE_KAKAO_MAP[placeId],
    name: place.name,
    address: place.address,
    latitude: place.lat,
    longitude: place.lng,
    feedCount: generateRandomFeedCount(),
    rating: generateRandomRating(),
  };
});
