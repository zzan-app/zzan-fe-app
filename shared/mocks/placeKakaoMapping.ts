const generateMapping = (): Record<string, string> => {
  const mapping: Record<string, string> = {};

  for (let i = 1; i <= 100; i++) {
    const placeId = String(i);
    const kakaoPlaceId = `${12345000 + i}`;
    mapping[placeId] = kakaoPlaceId;
  }

  return mapping;
};

export const PLACE_KAKAO_MAP: Record<string, string> = generateMapping();

export const KAKAO_PLACE_MAP: Record<string, string> = Object.entries(
  PLACE_KAKAO_MAP,
).reduce(
  (acc, [placeId, kakaoPlaceId]) => {
    acc[kakaoPlaceId] = placeId;
    return acc;
  },
  {} as Record<string, string>,
);

export const getKakaoPlaceId = (placeId: string): string => {
  return PLACE_KAKAO_MAP[placeId] || placeId;
};

export const getPlaceId = (kakaoPlaceId: string): string => {
  return KAKAO_PLACE_MAP[kakaoPlaceId] || kakaoPlaceId;
};
