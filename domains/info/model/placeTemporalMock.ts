import { mockNearbyFeeds } from "@/domains/feed/model/mock";
import type { PlaceTemporalInfo } from "./infoModel";
import { PLACE_DATA, PLACE_KAKAO_MAP } from "@/shared/mocks";

// ===== HELPER FUNCTIONS =====

const generateRandomRating = (): number => {
  const rating = 3.5 + Math.random() * 1.5;
  return Math.round(rating * 10) / 10;
};

const generateRandomFeedCount = (): number => {
  return Math.floor(Math.random() * 50) + 10;
};

const generatePhoneNumber = (index: number): string => {
  const baseNumber = 1000 + index;
  const randomSuffix = String(Math.floor(Math.random() * 10000)).padStart(
    4,
    "0",
  );
  return `02-${baseNumber}-${randomSuffix}`;
};

// ===== MOCK DATA =====

export const MOCK_PLACE_TEMPORAL_INFOS: PlaceTemporalInfo[] = Array.from(
  { length: 100 },
  (_, i) => {
    const placeId = String(i + 1);
    const kakaoPlaceId = PLACE_KAKAO_MAP[placeId];
    const place = PLACE_DATA[i % PLACE_DATA.length];

    return {
      id: placeId,
      name: place.name,
      address: place.address,
      phone: generatePhoneNumber(i),
      rating: generateRandomRating(),
      feedCount: generateRandomFeedCount(),
      kakaoPlaceId,
      latitude: place.lat,
      longitude: place.lng,
    };
  },
);

export const MOCK_PLACE_FEEDS = mockNearbyFeeds;
