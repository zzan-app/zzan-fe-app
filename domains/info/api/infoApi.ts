import type {
  LiquorDetailApiResponse,
  PlaceDetailApiResponse,
} from "@/domains/info/model";
import { API_ENDPOINTS, apiClient } from "@/shared/api";
import type { ApiResponse } from "@/shared/types";

export const infoApi = {
  getLiquorDetail: async (liquorId: string) => {
    const endpoint = API_ENDPOINTS.LIQUOR.DETAIL.replace(":liquorId", liquorId);
    return apiClient<ApiResponse<LiquorDetailApiResponse>>(endpoint);
  },

  getPlaceDetail: async (placeId: string) => {
    const endpoint = API_ENDPOINTS.PLACE.GET_PLACE_BY_ID.replace(
      ":placeId",
      placeId,
    );
    return apiClient<ApiResponse<PlaceDetailApiResponse>>(endpoint);
  },

  getPlaceByKakaoId: async (kakaoPlaceId: string) => {
    const endpoint = API_ENDPOINTS.PLACE.GET_KAKAO_PLACE.replace(
      ":kakaoPlaceId",
      kakaoPlaceId,
    );
    return apiClient<ApiResponse<PlaceDetailApiResponse | null>>(endpoint);
  },
};
