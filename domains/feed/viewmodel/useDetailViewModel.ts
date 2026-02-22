import { useAuthStore } from "@/domains/auth/store";
import { feedApi } from "@/domains/feed/api";
import {
  Alcohol,
  AlcoholTagInfo,
  FeedDetailApiResponse,
  FeedDetailImage,
  mockAlcohols,
  mockFeedDetails,
  type MockFeedDetail,
} from "@/domains/feed/model";
import { scrapApi } from "@/shared/api";
import { isMockEnabled } from "@/shared/utils";
import { useCallback, useEffect, useState } from "react";

const EMPTY_STATE = {
  user: null,
  images: [],
  alcohols: [],
  alcoholRatings: {},
  alcoholTagMappings: [],
  place: null,
  placeRating: 0,
  review: "",
} as const;

const mapImageTagsToAlcoholTagMappings = (
  images: FeedDetailImage[],
): AlcoholTagInfo[] =>
  images.flatMap((img, imageIndex) =>
    img.tags.map((tag) => ({
      alcoholId: tag.liquorId,
      imageIndex,
      tagPosition: { x: tag.x, y: tag.y },
    })),
  );

export const useDetailViewModel = (feedId?: string) => {
  const { isAuthenticated } = useAuthStore();
  const [focusedAlcoholId, setFocusedAlcoholId] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedData, setFeedData] = useState<
    FeedDetailApiResponse | MockFeedDetail | null
  >(null);

  useEffect(() => {
    if (!feedId) {
      return;
    }

    if (isMockEnabled()) {
      const mockData = mockFeedDetails.find((f) => f.id === feedId);
      if (mockData) {
        setFeedData(mockData);
      } else {
        setError("피드를 찾을 수 없습니다.");
      }
      return;
    }

    const fetchFeedDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await feedApi.getFeedDetail(feedId);
        setFeedData(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load feed";
        setError(errorMessage);
        console.error("[Feed Detail Error]", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedDetail();
  }, [feedId]);

  const handleTagPress = (alcoholId: string) => {
    setFocusedAlcoholId(alcoholId);
  };

  const handleAlcoholPress = (alcoholId: string) => {
    console.log("Navigate to alcohol detail:", alcoholId);
  };

  const handlePlacePress = () => {
    const kakaoPlaceId = feedData?.kakaoPlaceId;
    if (kakaoPlaceId) {
      console.log("Navigate to place detail:", kakaoPlaceId);
    }
  };

  const handleShare = () => {
    console.log("Share feed");
  };

  const checkBookmarkStatus = useCallback(async () => {
    if (isMockEnabled() || !feedId) {
      return;
    }

    try {
      const response = await scrapApi.feed.check(feedId);
      setIsBookmarked(response.data.exist);
    } catch (error) {
      console.error("[DetailViewModel] Failed to check bookmark:", error);
    }
  }, [feedId]);

  const handleBookmark = useCallback(async (): Promise<boolean> => {
    if (!isAuthenticated) {
      return false;
    }

    if (isMockEnabled()) {
      setIsBookmarked((prev) => !prev);
      return true;
    }

    if (!feedId) {
      return false;
    }

    try {
      if (isBookmarked) {
        await scrapApi.feed.delete(feedId);
      } else {
        await scrapApi.feed.add(feedId);
      }
      setIsBookmarked((prev) => !prev);
      return true;
    } catch (error) {
      console.error("[DetailViewModel] Failed to toggle bookmark:", error);
      setIsBookmarked((prev) => !prev);
      return false;
    }
  }, [feedId, isBookmarked, isAuthenticated]);

  useEffect(() => {
    checkBookmarkStatus();
  }, [checkBookmarkStatus]);

  const handlers = {
    handleTagPress,
    handleAlcoholPress,
    handlePlacePress,
    handleShare,
    handleBookmark,
  };

  if (isMockEnabled()) {
    const mockData = feedData as MockFeedDetail | null;

    if (!mockData) {
      return {
        ...EMPTY_STATE,
        focusedAlcoholId,
        isBookmarked,
        isLoading: false,
        error: error || "피드를 찾을 수 없습니다.",
        ...handlers,
      };
    }

    const alcoholTagMappings = mapImageTagsToAlcoholTagMappings(
      mockData.images,
    );
    const uniqueLiquorIds = [
      ...new Set(alcoholTagMappings.map((m) => m.alcoholId)),
    ];

    const selectedAlcohols = uniqueLiquorIds
      .map((id) => mockAlcohols.find((a) => a.id === id))
      .filter(Boolean) as Alcohol[];

    const alcoholRatings: Record<string, number> = Object.fromEntries(
      selectedAlcohols.map((a) => [a.id, a.score || 4.0]),
    );

    return {
      user: {
        id: mockData.userId,
        username: mockData.userName,
        imageUrl: mockData.userProfileImage,
      },
      images: mockData.images.map((img) => ({
        uri: img.imageUrl,
        id: img.id,
      })),
      alcohols: selectedAlcohols,
      alcoholRatings,
      alcoholTagMappings,
      place: mockData.kakaoPlaceId
        ? {
            id: mockData.kakaoPlaceId,
            name: mockData.placeName || "",
            address: mockData.placeAddress || "",
            imageUrl: require("@/assets/images/example_image.png"),
            feedCount: mockData.liquorCount,
            rating: mockData.score,
          }
        : null,
      placeRating: mockData.score,
      review: mockData.text,
      focusedAlcoholId,
      isBookmarked,
      isLoading: false,
      error: null,
      ...handlers,
    };
  }

  if (isLoading || !feedData) {
    return {
      ...EMPTY_STATE,
      focusedAlcoholId,
      isBookmarked,
      isLoading,
      error,
      ...handlers,
    };
  }

  const alcoholTagMappings = mapImageTagsToAlcoholTagMappings(feedData.images);
  const uniqueLiquorIds = [
    ...new Set(alcoholTagMappings.map((m) => m.alcoholId)),
  ];

  const alcohols: Alcohol[] = uniqueLiquorIds.map((liquorId) => {
    const tag = feedData.images
      .flatMap((img) => img.tags)
      .find((t) => t.liquorId === liquorId);
    return {
      id: liquorId,
      name: tag?.liquorName || "",
      imageUrl: "",
      type: "",
    };
  });

  return {
    user: {
      id: feedData.userId,
      username: feedData.userName,
      imageUrl: { uri: feedData.userProfileImage },
    },
    images: feedData.images.map((img) => ({
      uri: { uri: img.imageUrl },
      id: img.id,
    })),
    alcohols,
    alcoholRatings: {} as Record<string, number>,
    alcoholTagMappings,
    place: {
      id: feedData.kakaoPlaceId || "",
      name: feedData.placeName || "",
      address: feedData.placeAddress || "",
      imageUrl: "",
      feedCount: feedData.liquorCount,
      rating: feedData.score,
    },
    placeRating: feedData.score,
    review: feedData.text,
    focusedAlcoholId,
    isBookmarked,
    isLoading,
    error,
    ...handlers,
  };
};
