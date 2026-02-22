import { apiClient, API_ENDPOINTS } from '@/shared/api';
import type { ApiResponse } from '@/shared/types';
import type {
  LiquorSearchParams,
  LiquorSearchResponse,
  PresignedUrlRequest,
  PresignedUrlResponse,
  CreateFeedRequest,
  CreateFeedResponse,
  CreateLiquorReviewRequest,
  CreateLiquorReviewResponse,
  FeedDetailApiResponse,
  PlaceFeedApiResponse,
  RecentFeedApiResponse,
} from '../model/feedApiModel';
import type { ScrapListResponse } from '@/domains/user/model';

export const feedApi = {
  async searchLiquors(params: LiquorSearchParams): Promise<LiquorSearchResponse> {
    const { keyword, page = 1, size = 15 } = params;
    const queryString = new URLSearchParams({
      keyword,
      page: page.toString(),
      size: size.toString(),
    }).toString();

    const response = await apiClient<ApiResponse<LiquorSearchResponse>>(
      `${API_ENDPOINTS.LIQUOR.SEARCH}?${queryString}`,
      { method: 'GET' }
    );

    return response.data;
  },

  async getPresignedUrl(
    request: PresignedUrlRequest,
    prefix: 'liquor-images' | 'feed-images' | 'user-profile-images' = 'feed-images'
  ): Promise<PresignedUrlResponse> {
    const endpoint = API_ENDPOINTS.STORAGE.PRESIGNED_URL.replace(':prefix', prefix);
    const response = await apiClient<ApiResponse<PresignedUrlResponse>>(
      endpoint,
      {
        method: 'POST',
        body: request,
        requireAuth: true,
      }
    );

    return response.data;
  },

  async uploadImageToS3(presignedUrl: string, imageBlob: Blob): Promise<void> {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: imageBlob,
      headers: {
        'Content-Type': imageBlob.type,
      },
    });

    if (!response.ok) {
      throw new Error('S3 업로드 실패');
    }
  },

  async createFeed(request: CreateFeedRequest): Promise<CreateFeedResponse> {
    const response = await apiClient<ApiResponse<CreateFeedResponse>>(
      API_ENDPOINTS.FEED.CREATE,
      {
        method: 'POST',
        body: request,
        requireAuth: true,
      }
    );

    return response.data;
  },

  async createLiquorReview(
    liquorId: string,
    request: CreateLiquorReviewRequest
  ): Promise<CreateLiquorReviewResponse> {
    const endpoint = API_ENDPOINTS.LIQUOR.CREATE_REVIEW.replace(':liquorId', liquorId);
    const response = await apiClient<ApiResponse<CreateLiquorReviewResponse>>(
      endpoint,
      {
        method: 'POST',
        body: request,
        requireAuth: true,
      }
    );

    return response.data;
  },

  async getFeedDetail(feedId: string): Promise<FeedDetailApiResponse> {
    const endpoint = API_ENDPOINTS.FEED.DETAIL.replace(':feedId', feedId);
    const response = await apiClient<ApiResponse<FeedDetailApiResponse>>(
      endpoint,
      { method: 'GET' }
    );

    return response.data;
  },

  async getPlaceFeeds(
    kakaoPlaceId: string,
    size = 20,
    cursor?: string
  ): Promise<ScrapListResponse<PlaceFeedApiResponse>> {
    const params = new URLSearchParams({ size: size.toString() });
    if (cursor) {
      params.append('cursor', cursor);
    }

    const endpoint = API_ENDPOINTS.FEED.GET_PLACE_FEEDS.replace(
      ':kakaoPlaceId',
      kakaoPlaceId
    );

    const response = await apiClient<
      ApiResponse<ScrapListResponse<PlaceFeedApiResponse>>
    >(`${endpoint}?${params}`);

    return response.data;
  },

  async deleteFeed(feedId: string): Promise<void> {
    const endpoint = API_ENDPOINTS.FEED.DELETE.replace(':feedId', feedId);
    await apiClient<ApiResponse<null>>(endpoint, {
      method: 'DELETE',
      requireAuth: true,
    });
  },

  async getRecentFeeds(
    size = 20,
    cursor?: string
  ): Promise<ScrapListResponse<RecentFeedApiResponse>> {
    const params = new URLSearchParams({ size: size.toString() });
    if (cursor) {
      params.append('cursor', cursor);
    }

    const response = await apiClient<
      ApiResponse<ScrapListResponse<RecentFeedApiResponse>>
    >(`${API_ENDPOINTS.FEED.RECENT_FEEDS}?${params}`);

    return response.data;
  },
};
