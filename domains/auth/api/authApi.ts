import { apiClient, API_ENDPOINTS } from '@/shared/api';
import type { ApiResponse } from '@/shared/types';
import type { AuthTokens, LoginUrl, SocialProvider } from '../model/authModel';

export const authApi = {
  async getLoginUrl(provider: SocialProvider = 'kakao'): Promise<string> {
    const endpoint = API_ENDPOINTS.AUTH.LOGIN_URL.replace(':provider', provider);
    const response = await apiClient<ApiResponse<LoginUrl>>(
      endpoint,
      { method: 'GET' }
    );
    return response.data.url;
  },

  async handleCallback(provider: SocialProvider, code: string): Promise<AuthTokens> {
    const endpoint = API_ENDPOINTS.AUTH.CALLBACK.replace(':provider', provider);
    const response = await apiClient<ApiResponse<AuthTokens>>(
      `${endpoint}?code=${encodeURIComponent(code)}`,
      { method: 'GET' }
    );
    return response.data;
  },

  async loginWithSocialToken(provider: SocialProvider, accessToken: string): Promise<AuthTokens> {
    const endpoint = API_ENDPOINTS.AUTH.SOCIAL_LOGIN.replace(':provider', provider);
    const response = await apiClient<ApiResponse<AuthTokens>>(
      endpoint,
      {
        method: 'POST',
        body: { accessToken },
      }
    );
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await apiClient<ApiResponse<AuthTokens>>(
      API_ENDPOINTS.AUTH.TOKEN_REFRESH,
      {
        method: 'POST',
        body: refreshToken,
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient(
      API_ENDPOINTS.AUTH.LOGOUT,
      {
        method: 'DELETE',
        requireAuth: true,
      }
    );
  },
};
