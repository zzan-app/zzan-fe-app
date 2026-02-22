import type {
  CreateLiquorReviewRequest,
  LiquorReviewApiResponse,
  LiquorReviewsListResponse,
  UpdateLiquorReviewRequest,
} from "@/domains/info/model";
import { API_ENDPOINTS, apiClient } from "@/shared/api";
import type { ApiResponse } from "@/shared/types";

export const liquorApi = {
  async getMyReview(liquorId: string): Promise<LiquorReviewApiResponse | null> {
    const endpoint = API_ENDPOINTS.LIQUOR.GET_MY_REVIEW.replace(
      ":liquorId",
      liquorId,
    );
    const response = await apiClient<
      ApiResponse<LiquorReviewApiResponse | null>
    >(endpoint, { requireAuth: true });
    return response.data;
  },

  async getReviews(
    liquorId: string,
    size = 10,
    cursor?: string,
  ): Promise<LiquorReviewsListResponse> {
    const params = new URLSearchParams({ size: size.toString() });
    if (cursor) {
      params.append("cursor", cursor);
    }

    const endpoint = API_ENDPOINTS.LIQUOR.GET_REVIEWS.replace(
      ":liquorId",
      liquorId,
    );
    const response = await apiClient<ApiResponse<LiquorReviewsListResponse>>(
      `${endpoint}?${params}`,
    );
    return response.data;
  },

  async createReview(
    liquorId: string,
    request: CreateLiquorReviewRequest,
  ): Promise<void> {
    const endpoint = API_ENDPOINTS.LIQUOR.CREATE_REVIEW.replace(
      ":liquorId",
      liquorId,
    );
    await apiClient<ApiResponse<null>>(endpoint, {
      method: "POST",
      body: request,
      requireAuth: true,
    });
  },

  async updateReview(
    liquorId: string,
    request: UpdateLiquorReviewRequest,
  ): Promise<void> {
    const endpoint = API_ENDPOINTS.LIQUOR.UPDATE_REVIEW.replace(
      ":liquorId",
      liquorId,
    );
    await apiClient<ApiResponse<null>>(endpoint, {
      method: "PUT",
      body: request,
      requireAuth: true,
    });
  },

  async deleteReview(liquorId: string): Promise<void> {
    const endpoint = API_ENDPOINTS.LIQUOR.DELETE_REVIEW.replace(
      ":liquorId",
      liquorId,
    );
    await apiClient<ApiResponse<null>>(endpoint, {
      method: "DELETE",
      requireAuth: true,
    });
  },
};
