export const useDistance = () => {
  /**
   * 두 지점 간의 거리를 km 단위로 계산합니다. (Haversine 공식 사용)
   * @param lat1 첫 번째 지점의 위도
   * @param lon1 첫 번째 지점의 경도
   * @param lat2 두 번째 지점의 위도
   * @param lon2 두 번째 지점의 경도
   * @returns 두 지점 간의 거리 (km)
   */
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const EARTH_RADIUS_KM = 6371;

    const toRadians = (degrees: number): number => {
      return degrees * (Math.PI / 180);
    };

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c;
  };

  /**
   * 거리를 포맷팅하여 반환합니다.
   * 1km 미만이면 'm' 단위로, 1km 이상이면 'km' 단위로 표시합니다.
   * @param distanceKm km 단위 거리
   * @returns 포맷팅된 거리 문자열
   */
  const formatDistance = (distanceKm: number): string => {
    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)}m`;
    }
    return `${distanceKm.toFixed(1)}km`;
  };

  return { calculateDistance, formatDistance };
};
