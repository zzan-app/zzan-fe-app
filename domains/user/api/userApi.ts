import type { UserApiResponse, UserFeedsResponse } from "@/domains/user/model";
import { API_ENDPOINTS, apiClient } from "@/shared/api";
import type { ApiResponse } from "@/shared/types";

export const userApi = {
  async getCurrentUser(): Promise<UserApiResponse> {
    const response = await apiClient<ApiResponse<UserApiResponse>>(
      API_ENDPOINTS.USER.ME,
      { requireAuth: true },
    );
    return response.data;
  },

  async updateProfile(data: Partial<UserApiResponse>): Promise<void> {
    await apiClient(API_ENDPOINTS.USER.UPDATE, {
      method: "PUT",
      body: data,
      requireAuth: true,
    });
  },

  async getMyFeeds(params: {
    size?: number;
    cursor?: string | null;
  }): Promise<UserFeedsResponse> {
    const { size = 10, cursor } = params;
    const queryParams = new URLSearchParams({
      size: size.toString(),
      ...(cursor && { cursor }),
    }).toString();

    const response = await apiClient<ApiResponse<UserFeedsResponse>>(
      `${API_ENDPOINTS.USER.MY_FEEDS}?${queryParams}`,
      {
        method: "GET",
        requireAuth: true,
      },
    );

    return response.data;
  },
};
