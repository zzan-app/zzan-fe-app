import { feedApi } from "@/domains/feed/api";
import { type FeedWithUser, mockNearbyFeeds } from "@/domains/feed/model";
import { infoApi } from "@/domains/info/api";
import { mapPlaceApiToPlaceInfo } from "@/domains/info/mapper";
import {
  type InfoBox,
  type PlaceInfo,
  MOCK_PLACE_INFO,
} from "@/domains/info/model";
import { isMockEnabled } from "@/shared/utils";
import { useCallback, useEffect, useState } from "react";

const createInfoBoxes = (placeInfo: PlaceInfo): InfoBox[] => {
  return [
    { label: "문의 및 안내", value: placeInfo.option1 },
    { label: "쉬는날", value: placeInfo.option2 },
    { label: "이용시간", value: placeInfo.option3 },
    { label: "주차시설", value: placeInfo.option4 },
  ];
};

export const useInfoViewModel = (placeId?: string) => {
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [infoBoxes, setInfoBoxes] = useState<InfoBox[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placeFeeds, setPlaceFeeds] = useState<Partial<FeedWithUser>[]>([]);
  const [isFeedsLoading, setIsFeedsLoading] = useState(false);

  const loadMockPlaceInfo = useCallback(() => {
    setPlaceInfo(MOCK_PLACE_INFO);
    setIsBookmarked(MOCK_PLACE_INFO.isBookmarked);
    setInfoBoxes(createInfoBoxes(MOCK_PLACE_INFO));
    setIsLoading(false);
  }, []);

  const fetchPlaceInfo = useCallback(async () => {
    if (!placeId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    if (isMockEnabled()) {
      loadMockPlaceInfo();
      return;
    }

    try {
      const response = await infoApi.getPlaceDetail(placeId);
      const mappedPlace = mapPlaceApiToPlaceInfo(response.data);
      setPlaceInfo(mappedPlace);
      setIsBookmarked(mappedPlace.isBookmarked);
      setInfoBoxes(createInfoBoxes(mappedPlace));
    } catch (err) {
      console.error("[InfoViewModel] Failed to load place:", err);
      setError("장소 정보를 불러오는데 실패했습니다");
      loadMockPlaceInfo();
    } finally {
      setIsLoading(false);
    }
  }, [placeId, loadMockPlaceInfo]);

  useEffect(() => {
    fetchPlaceInfo();
  }, [fetchPlaceInfo]);

  const fetchPlaceFeeds = useCallback(async () => {
    if (!placeInfo?.kakaoPlaceId) {
      return;
    }

    setIsFeedsLoading(true);

    if (isMockEnabled()) {
      setPlaceFeeds(mockNearbyFeeds as Partial<FeedWithUser>[]);
      setIsFeedsLoading(false);
      return;
    }

    try {
      const response = await feedApi.getPlaceFeeds(placeInfo.kakaoPlaceId);
      const mapped = response.items.map((item) => ({
        id: item.id,
        imageUrl: { uri: item.imageUrl },
        placeName: item.placeName,
        address: item.placeAddress,
        alcoholCount: item.liquorCount,
      }));
      setPlaceFeeds(mapped);
    } catch (error) {
      console.error("[InfoViewModel] Failed to load place feeds:", error);
      setPlaceFeeds(mockNearbyFeeds as Partial<FeedWithUser>[]);
    } finally {
      setIsFeedsLoading(false);
    }
  }, [placeInfo?.kakaoPlaceId]);

  useEffect(() => {
    fetchPlaceFeeds();
  }, [fetchPlaceFeeds]);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const handleShare = () => {
    console.log("Share pressed");
  };

  const handleAlcoholButtonPress = useCallback(() => {
    console.log("Alcohol button pressed");
    return true;
  }, []);

  return {
    placeInfo,
    isBookmarked,
    infoBoxes,
    isLoading,
    error,
    placeFeeds,
    isFeedsLoading,
    toggleBookmark,
    handleShare,
    handleAlcoholButtonPress,
  };
};
