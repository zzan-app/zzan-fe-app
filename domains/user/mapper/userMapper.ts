import type {
  FeedScrapApiResponse,
  LiquorScrapApiResponse,
  User,
  UserApiResponse,
  UserFeed,
  UserFeedSummary,
  UserScrapAlcohol,
} from "@/domains/user/model";

const DEFAULT_PROFILE_IMAGE = require("@/assets/images/example_profile_girl.jpg");

export const formatBirthForDisplay = (birth: string | null): string => {
  if (!birth) return "";
  return birth.replace(/-/g, ".");
};

export const toNullIfEmpty = (value: string | null): string | null => {
  if (!value || value.trim() === "") return null;
  return value;
};

export const mapApiUserToUser = (apiUser: UserApiResponse): User => ({
  id: apiUser.id,
  name: apiUser.name || "사용자",
  profileImage: apiUser.profileImageUrl
    ? { uri: apiUser.profileImageUrl }
    : DEFAULT_PROFILE_IMAGE,
  profileImageUrl: apiUser.profileImageUrl,
  emptyAlcoholCount: 0,
  birthDate: formatBirthForDisplay(apiUser.birth),
  birth: apiUser.birth || "정보 없음",
  phone: apiUser.phone || "정보 없음",
  email: apiUser.email || "정보 없음",
  role: apiUser.role,
});

export const mapUserToApiRequest = (user: User): Partial<UserApiResponse> => ({
  name: user.name,
  birth: user.birthDate ? user.birthDate.replace(/\./g, "-") : user.birth,
  phone: toNullIfEmpty(user.phone),
  email: toNullIfEmpty(user.email),
  profileImageUrl: user.profileImageUrl,
});

export const mapUserFeedApiToDomain = (api: UserFeedSummary): UserFeed => ({
  id: api.id,
  imageUrl: { uri: api.imageUrl },
  placeName: api.placeName || "",
  address: api.placeAddress || "",
  alcoholCount: api.liquorCount,
});

export const mapFeedScrapApiToUserFeed = (
  api: FeedScrapApiResponse,
): UserFeed => ({
  id: api.id,
  imageUrl: { uri: api.imageUrl },
  placeName: api.placeName,
  address: api.placeAddress,
  alcoholCount: api.liquorCount,
});

export const mapLiquorScrapApiToUserScrapAlcohol = (
  api: LiquorScrapApiResponse,
): UserScrapAlcohol => ({
  id: api.id,
  imageUrl: { uri: api.liquorImageUrl },
  name: api.liquorName,
  type: api.liquorType,
  rating: api.liquorScore,
  reviewCount: 0,
});
