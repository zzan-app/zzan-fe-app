import type {
  Alcohol,
  LiquorApiResponse,
  RecentFeedApiResponse,
} from "@/domains/feed/model";
import type { MockFeedDetail } from "../model/mock";

export const mapLiquorApiToAlcohol = (liquor: LiquorApiResponse): Alcohol => ({
  id: liquor.id,
  imageUrl: liquor.liquorImageUrl || "",
  name: liquor.liquorName,
  type: liquor.liquorType,
  score: liquor.liquorScore,
});

export const mapMockFeedDetailToRecentFeed = (
  mockFeed: MockFeedDetail,
): RecentFeedApiResponse => ({
  id: mockFeed.id,
  imageUrl: mockFeed.imageUrl,
  score: mockFeed.score,
  liquorCount: mockFeed.liquorCount,
  userId: mockFeed.userId,
  userName: mockFeed.userName,
  userProfileImage: mockFeed.userProfileImage,
  kakaoPlaceId: mockFeed.kakaoPlaceId || "",
  placeName: mockFeed.placeName || "",
  placeAddress: mockFeed.placeAddress || "",
});
