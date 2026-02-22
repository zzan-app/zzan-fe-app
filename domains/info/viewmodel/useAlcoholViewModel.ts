import { infoApi, liquorApi } from "@/domains/info/api";
import { mapLiquorApiToAlcoholInfo } from "@/domains/info/mapper";
import {
  type AlcoholInfo,
  type InfoBox,
  type LiquorComment,
  type LiquorReviewApiResponse,
  MOCK_ALCOHOL_INFO,
  MOCK_LIQUOR_COMMENTS,
  MOCK_MY_REVIEW,
} from "@/domains/info/model";
import { userApi } from "@/domains/user/api";
import { scrapApi } from "@/shared/api";
import { isMockEnabled } from "@/shared/utils";
import { useCallback, useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";

interface LiquorFeed {
  id: string;
  userId: string;
  username: string;
  userProfileImage: ImageSourcePropType;
  feedImage: ImageSourcePropType;
  liquorName: string;
  reviewText: string;
  score: number;
}

const createAlcoholInfoBoxes = (alcoholInfo: AlcoholInfo): InfoBox[] => {
  return [
    { label: "용량", value: alcoholInfo.option1 },
    { label: "도수", value: alcoholInfo.option2 },
    { label: "양조장", value: alcoholInfo.option3 },
    { label: "기타정보", value: alcoholInfo.option4 },
  ];
};

const mapApiReviewToComment = (
  review: LiquorReviewApiResponse,
): LiquorComment => {
  return {
    id: review.id,
    userId: review.userId,
    username: review.username,
    userProfileImage: review.userProfileImageUrl
      ? { uri: review.userProfileImageUrl }
      : require("@/assets/images/example_image.png"),
    rating: Math.round(review.score),
    comment: review.text || "",
    date: new Date(review.createdAt).toLocaleDateString("ko-KR"),
    likes: 0,
  };
};

const calculateAvgRating = (reviews: LiquorComment[]): number => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return Math.round(total / reviews.length);
};

export const useAlcoholViewModel = (liquorId?: string) => {
  const [alcoholInfo, setAlcoholInfo] = useState<AlcoholInfo | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [infoBoxes, setInfoBoxes] = useState<InfoBox[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<LiquorComment[]>([]);
  const [myReview, setMyReview] = useState<LiquorComment | null>(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [liquorFeeds, setLiquorFeeds] = useState<LiquorFeed[]>([]);

  const loadMockAlcoholInfo = useCallback(() => {
    setAlcoholInfo(MOCK_ALCOHOL_INFO);
    setIsBookmarked(MOCK_ALCOHOL_INFO.isBookmarked);
    setInfoBoxes(createAlcoholInfoBoxes(MOCK_ALCOHOL_INFO));
    setIsLoading(false);
  }, []);

  const fetchAlcoholInfo = useCallback(async () => {
    if (!liquorId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    if (isMockEnabled()) {
      loadMockAlcoholInfo();
      return;
    }

    try {
      const response = await infoApi.getLiquorDetail(liquorId);
      if (!response.data) {
        throw new Error("No liquor data received");
      }
      const mappedAlcohol = mapLiquorApiToAlcoholInfo(response.data);
      setAlcoholInfo(mappedAlcohol);
      setIsBookmarked(mappedAlcohol.isBookmarked);
      setInfoBoxes(createAlcoholInfoBoxes(mappedAlcohol));
    } catch (err) {
      console.error("[InfoViewModel] Failed to load liquor:", err);
      setError("주류 정보를 불러오는데 실패했습니다");
      loadMockAlcoholInfo();
    } finally {
      setIsLoading(false);
    }
  }, [liquorId, loadMockAlcoholInfo]);

  useEffect(() => {
    fetchAlcoholInfo();
  }, [fetchAlcoholInfo]);

  const checkLiquorBookmarkStatus = useCallback(async () => {
    if (isMockEnabled() || !liquorId) {
      return;
    }

    try {
      const response = await scrapApi.liquor.check(liquorId);
      setIsBookmarked(response.data.exist);
    } catch (error) {
      console.error("[InfoViewModel] Failed to check liquor bookmark:", error);
    }
  }, [liquorId]);

  const toggleBookmark = useCallback(async (): Promise<boolean> => {
    if (isMockEnabled()) {
      setIsBookmarked((prev) => !prev);
      return true;
    }

    if (!liquorId) {
      return false;
    }

    try {
      if (isBookmarked) {
        await scrapApi.liquor.delete(liquorId);
      } else {
        await scrapApi.liquor.add(liquorId);
      }
      setIsBookmarked((prev) => !prev);
      return true;
    } catch (error) {
      console.error("[InfoViewModel] Failed to toggle liquor bookmark:", error);
      setIsBookmarked((prev) => !prev);
      return false;
    }
  }, [liquorId, isBookmarked]);

  useEffect(() => {
    checkLiquorBookmarkStatus();
  }, [checkLiquorBookmarkStatus]);

  const fetchCurrentUser = useCallback(async () => {
    if (isMockEnabled()) {
      setCurrentUserId("user1");
      return;
    }

    try {
      const user = await userApi.getCurrentUser();
      setCurrentUserId(user.id);
    } catch (error) {
      console.error("[InfoViewModel] Failed to fetch user:", error);
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    if (!liquorId) return;

    if (isMockEnabled()) {
      setReviews(MOCK_LIQUOR_COMMENTS);
      setMyReview(MOCK_MY_REVIEW);
      setReviewCount(MOCK_LIQUOR_COMMENTS.length);
      setAvgRating(calculateAvgRating(MOCK_LIQUOR_COMMENTS));
      return;
    }

    try {
      const [reviewsData, myReviewData] = await Promise.all([
        liquorApi.getReviews(liquorId, 20),
        liquorApi.getMyReview(liquorId).catch(() => null),
      ]);

      const mappedReviews = reviewsData.items.map(mapApiReviewToComment);
      setReviews(mappedReviews);
      setReviewCount(mappedReviews.length);
      setAvgRating(calculateAvgRating(mappedReviews));

      if (myReviewData) {
        setMyReview(mapApiReviewToComment(myReviewData));
      }
    } catch (error) {
      console.error("[InfoViewModel] Failed to load reviews:", error);
      setReviews(MOCK_LIQUOR_COMMENTS);
      setReviewCount(MOCK_LIQUOR_COMMENTS.length);
    }
  }, [liquorId]);

  const createOrUpdateReview = useCallback(
    async (rating: number, comment: string): Promise<boolean> => {
      if (!liquorId) {
        return false;
      }

      if (isMockEnabled()) {
        console.log("[InfoViewModel] Mock: Save review", { rating, comment });
        await fetchReviews();
        return true;
      }

      try {
        if (myReview) {
          await liquorApi.updateReview(liquorId, {
            score: rating,
            text: comment,
          });
        } else {
          await liquorApi.createReview(liquorId, {
            score: rating,
            text: comment,
          });
        }
        await fetchReviews();
        return true;
      } catch (error) {
        console.error("[InfoViewModel] Failed to save review:", error);
        return false;
      }
    },
    [liquorId, myReview, fetchReviews],
  );

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const fetchLiquorFeeds = useCallback(() => {
    if (isMockEnabled()) {
      const mockFeeds: LiquorFeed[] = [
        {
          id: "review1",
          userId: "user1",
          username: "이정훈",
          userProfileImage: require("@/assets/images/example_image.png"),
          feedImage: require("@/assets/images/example_image.png"),
          liquorName: "울산 문화의 거리",
          reviewText: "울산광역시 중구 성남동 329-5",
          score: 5,
        },
        {
          id: "review2",
          userId: "user2",
          username: "김정현",
          userProfileImage: require("@/assets/images/example_image.png"),
          feedImage: require("@/assets/images/example_image.png"),
          liquorName: "서울 종로 전통주 거리",
          reviewText: "서울특별시 종로구 종로3가 112",
          score: 2,
        },
        {
          id: "review3",
          userId: "user3",
          username: "황인수",
          userProfileImage: require("@/assets/images/example_image.png"),
          feedImage: require("@/assets/images/example_image.png"),
          liquorName: "전주 한옥마을",
          reviewText: "전라북도 전주시 완산구 기린대로 99",
          score: 4,
        },
      ];
      setLiquorFeeds(mockFeeds);
    } else {
      setLiquorFeeds([]);
    }
  }, []);

  useEffect(() => {
    fetchLiquorFeeds();
  }, [fetchLiquorFeeds]);

  const handleShare = () => {
    console.log("Share alcohol pressed");
  };

  return {
    alcoholInfo,
    isBookmarked,
    infoBoxes,
    isLoading,
    error,
    toggleBookmark,
    handleShare,
    reviews,
    myReview,
    reviewCount,
    avgRating,
    currentUserId,
    createOrUpdateReview,
    liquorFeeds,
  };
};
