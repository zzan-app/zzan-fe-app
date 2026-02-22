import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import type { ApiResponse } from '../types';
import type {
  FeedScrapApiResponse,
  LiquorScrapApiResponse,
  ScrapCheckResponse,
  ScrapListResponse,
} from '@/domains/user/model';

export const scrapApi = {
  feed: {
    getList: async (size = 20, cursor?: string) => {
      const params = new URLSearchParams({ size: size.toString() });
      if (cursor) {
        params.append('cursor', cursor);
      }

      const endpoint = `${API_ENDPOINTS.FEED.GET_SCRAPS}?${params}`;
      return apiClient<ApiResponse<ScrapListResponse<FeedScrapApiResponse>>>(
        endpoint,
        { requireAuth: true }
      );
    },

    check: async (feedId: string) => {
      const endpoint = API_ENDPOINTS.FEED.CHECK_SCRAP.replace(
        ':feedId',
        feedId
      );
      return apiClient<ApiResponse<ScrapCheckResponse>>(endpoint, {
        requireAuth: true,
      });
    },

    add: async (feedId: string) => {
      const endpoint = API_ENDPOINTS.FEED.ADD_SCRAP.replace(':feedId', feedId);
      return apiClient<ApiResponse<null>>(endpoint, {
        method: 'POST',
        requireAuth: true,
      });
    },

    delete: async (feedId: string) => {
      const endpoint = API_ENDPOINTS.FEED.DELETE_SCRAP.replace(
        ':feedId',
        feedId
      );
      return apiClient<ApiResponse<null>>(endpoint, {
        method: 'DELETE',
        requireAuth: true,
      });
    },
  },

  liquor: {
    getList: async (size = 20, cursor?: string) => {
      const params = new URLSearchParams({ size: size.toString() });
      if (cursor) {
        params.append('cursor', cursor);
      }

      const endpoint = `${API_ENDPOINTS.LIQUOR.GET_SCRAPS}?${params}`;
      return apiClient<ApiResponse<ScrapListResponse<LiquorScrapApiResponse>>>(
        endpoint,
        { requireAuth: true }
      );
    },

    check: async (liquorId: string) => {
      const endpoint = API_ENDPOINTS.LIQUOR.CHECK_SCRAP.replace(
        ':liquorId',
        liquorId
      );
      return apiClient<ApiResponse<ScrapCheckResponse>>(endpoint, {
        requireAuth: true,
      });
    },

    add: async (liquorId: string) => {
      const endpoint = API_ENDPOINTS.LIQUOR.ADD_SCRAP.replace(
        ':liquorId',
        liquorId
      );
      return apiClient<ApiResponse<null>>(endpoint, {
        method: 'POST',
        requireAuth: true,
      });
    },

    delete: async (liquorId: string) => {
      const endpoint = API_ENDPOINTS.LIQUOR.DELETE_SCRAP.replace(
        ':liquorId',
        liquorId
      );
      return apiClient<ApiResponse<null>>(endpoint, {
        method: 'DELETE',
        requireAuth: true,
      });
    },
  },
};
