import { feedApi } from "@/domains/feed/api";
import { infoApi } from "@/domains/info/api";
import type {
  PlaceDetailApiResponse,
  PlaceFeedWithProfile,
  PlaceTemporalInfo,
} from "@/domains/info/model";
import { useDistance } from "@/shared/hooks";
import { isMockEnabled } from "@/shared/utils";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

interface UsePlaceTemporalViewModelParams {
  placeId?: string;
  kakaoPlaceIdParam?: string;
  userLatitude?: number;
  userLongitude?: number;
}

const mapApiToPlaceTemporalInfo = (
  api: PlaceDetailApiResponse,
): PlaceTemporalInfo => ({
  id: api.id,
  name: api.name,
  address: api.address,
  phone: api.phone || "",
  rating: api.averageScore || 0,
  feedCount: api.feedCount || 0,
  kakaoPlaceId: api.kakaoPlaceId,
  latitude: api.latitude,
  longitude: api.longitude,
});

export const usePlaceTemporalViewModel = ({
  placeId,
  kakaoPlaceIdParam,
  userLatitude,
  userLongitude,
}: UsePlaceTemporalViewModelParams) => {
  const router = useRouter();
  const { calculateDistance, formatDistance } = useDistance();

  const [placeInfo, setPlaceInfo] = useState<PlaceTemporalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [kakaoPlaceId, setKakaoPlaceId] = useState<string | null>(null);

  const [distance, setDistance] = useState<string | null>(null);
  const [isDistanceLoading, setIsDistanceLoading] = useState(true);

  const [placeFeeds, setPlaceFeeds] = useState<PlaceFeedWithProfile[]>([]);
  const [isFeedsLoading, setIsFeedsLoading] = useState(true);

  const loadMockData = useCallback(() => {
    const { MOCK_PLACE_TEMPORAL_INFOS } =
      require("@/domains/info/model/placeTemporalMock") as {
        MOCK_PLACE_TEMPORAL_INFOS: PlaceTemporalInfo[];
      };

    const foundPlace = MOCK_PLACE_TEMPORAL_INFOS.find((p) => p.id === placeId);

    if (!foundPlace) {
      setError("장소를 찾을 수 없습니다.");
      setIsLoading(false);
      return;
    }

    setPlaceInfo(foundPlace);
    setKakaoPlaceId(foundPlace.kakaoPlaceId);
    setIsLoading(false);
  }, [placeId]);

  const fetchPlaceInfo = useCallback(async () => {
    if (!placeId && !kakaoPlaceIdParam) return;

    setIsLoading(true);
    setError(null);

    if (isMockEnabled()) {
      loadMockData();
      return;
    }

    try {
      let response;
      if (kakaoPlaceIdParam) {
        response = await infoApi.getPlaceByKakaoId(kakaoPlaceIdParam);
      } else if (placeId) {
        response = await infoApi.getPlaceDetail(placeId);
      }

      if (response?.data) {
        setPlaceInfo(mapApiToPlaceTemporalInfo(response.data));
        setKakaoPlaceId(response.data.kakaoPlaceId);
      } else {
        setError("장소 정보를 찾을 수 없습니다");
      }
    } catch (err) {
      console.error("[PlaceTemporalViewModel] Failed to load place:", err);
      setError("장소 정보를 불러오는데 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  }, [placeId, kakaoPlaceIdParam, loadMockData]);

  const computeDistance = useCallback(async () => {
    setIsDistanceLoading(true);

    try {
      let userLat = userLatitude;
      let userLng = userLongitude;

      if (!userLat || !userLng) {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setDistance(null);
          setIsDistanceLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        userLat = location.coords.latitude;
        userLng = location.coords.longitude;
      }

      if (!placeInfo) {
        setIsDistanceLoading(false);
        return;
      }

      const distanceKm = calculateDistance(
        userLat,
        userLng,
        placeInfo.latitude,
        placeInfo.longitude,
      );

      setDistance(formatDistance(distanceKm));
    } catch (err) {
      console.error(
        "[PlaceTemporalViewModel] Failed to calculate distance:",
        err,
      );
      setDistance(null);
    } finally {
      setIsDistanceLoading(false);
    }
  }, [
    userLatitude,
    userLongitude,
    placeInfo,
    calculateDistance,
    formatDistance,
  ]);

  const fetchPlaceFeeds = useCallback(async () => {
    if (!kakaoPlaceId) return;

    setIsFeedsLoading(true);

    if (isMockEnabled()) {
      const { mockFeedDetails } = require("@/domains/feed/model/mock") as {
        mockFeedDetails: import("@/domains/feed/model/mock").MockFeedDetail[];
      };

      const feedsForPlace = mockFeedDetails
        .filter((feed) => feed.kakaoPlaceId === kakaoPlaceId)
        .map((feed) => ({
          id: feed.id,
          userId: feed.userId,
          userName: feed.userName,
          userProfileImage: feed.userProfileImage ?? "",
          imageUrl: feed.imageUrl ?? "",
          placeName: feed.placeName ?? "",
          placeAddress: feed.placeAddress ?? "",
          alcoholCount: feed.liquorCount,
          score: feed.score,
        }));

      setPlaceFeeds(feedsForPlace);
      setIsFeedsLoading(false);
      return;
    }

    try {
      const response = await feedApi.getPlaceFeeds(kakaoPlaceId);
      const mapped = response.items.map((item) => ({
        id: item.id,
        imageUrl: item.imageUrl,
        userId: "",
        userName: "",
        userProfileImage: "",
        placeName: item.placeName,
        placeAddress: item.placeAddress,
        alcoholCount: item.liquorCount,
        score: item.score,
      }));
      setPlaceFeeds(mapped);
    } catch (err) {
      console.error("[PlaceTemporalViewModel] Failed to load feeds:", err);
      setPlaceFeeds([]);
    } finally {
      setIsFeedsLoading(false);
    }
  }, [kakaoPlaceId]);

  useEffect(() => {
    fetchPlaceInfo();
  }, [fetchPlaceInfo]);

  useEffect(() => {
    if (kakaoPlaceId) {
      fetchPlaceFeeds();
    }
  }, [kakaoPlaceId, fetchPlaceFeeds]);

  useEffect(() => {
    if (placeInfo) {
      computeDistance();
    }
  }, [placeInfo, computeDistance]);

  const toggleBookmark = useCallback(() => {
    setIsBookmarked((prev) => !prev);
  }, []);

  const handleShare = useCallback(() => {
    console.log("Share pressed");
  }, []);

  const handleAlcoholButtonPress = useCallback(() => {
    router.push({
      pathname: "/post",
      params: { kakaoPlaceId },
    });
  }, [router, kakaoPlaceId]);

  return {
    placeInfo,
    isLoading,
    error,
    isBookmarked,
    distance,
    isDistanceLoading,
    placeFeeds,
    isFeedsLoading,
    toggleBookmark,
    handleShare,
    handleAlcoholButtonPress,
  };
};
