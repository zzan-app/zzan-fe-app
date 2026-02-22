import { getApiUrl } from '../utils/env';
import { attemptTokenRefresh } from './interceptors/tokenRefreshInterceptor';
import { API_ENDPOINTS } from './endpoints';

export class ApiClientError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  requireAuth?: boolean;
}

type GetAuthToken = () => string | null;

let getAuthTokenFn: GetAuthToken = () => null;
let isAuthTokenGetterInitialized = false;

export const setAuthTokenGetter = (fn: GetAuthToken): void => {
  getAuthTokenFn = fn;
  isAuthTokenGetterInitialized = true;
};

const ensureAuthTokenGetterInitialized = (): void => {
  if (!isAuthTokenGetterInitialized) {
    // Lazy import to avoid circular dependency at module load time
    const { useAuthStore } = require('@/domains/auth/store/authStore');
    getAuthTokenFn = () => useAuthStore.getState().accessToken;
    isAuthTokenGetterInitialized = true;
  }
};

const buildAuthHeaders = (): Record<string, string> => {
  ensureAuthTokenGetterInitialized();
  const token = getAuthTokenFn();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

const isRefreshEndpoint = (endpoint: string): boolean => {
  return endpoint.includes(API_ENDPOINTS.AUTH.TOKEN_REFRESH);
};

const buildRequestBody = (body: unknown): string | undefined => {
  if (!body) return undefined;
  if (typeof body === 'string') return body;
  return JSON.stringify(body);
};

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { method = 'GET', body, headers = {}, requireAuth = false } = options;

  const baseUrl = getApiUrl();
  const url = `${baseUrl}${endpoint}`;
  const authHeaders = requireAuth ? buildAuthHeaders() : {};

  console.log('[ApiClient] 요청 시작');
  console.log('[ApiClient] Base URL:', baseUrl);
  console.log('[ApiClient] Endpoint:', endpoint);
  console.log('[ApiClient] Full URL:', url);
  console.log('[ApiClient] Method:', method);

  const requestBody = buildRequestBody(body);
  const isPlainText = typeof body === 'string';

  const allHeaders: Record<string, string> = {
    ...authHeaders,
    ...headers,
  };

  if (body && !isPlainText) {
    allHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    method,
    headers: allHeaders,
    body: requestBody,
  });

  console.log('[ApiClient] 응답 상태:', response.status);
  console.log('[ApiClient] 응답 OK:', response.ok);

  if (!response.ok && response.status === 401) {
    if (isRefreshEndpoint(endpoint)) {
      await response.text();
      console.error('[ApiClient] Refresh token expired');
      throw new ApiClientError(401, 'Refresh token expired');
    }

    console.log('[ApiClient] 401 detected, attempting token refresh');
    const refreshed = await attemptTokenRefresh();

    if (refreshed) {
      console.log('[ApiClient] Token refreshed, retrying original request');
      return apiClient<T>(endpoint, options);
    }

    console.error('[ApiClient] Token refresh failed');
    throw new ApiClientError(401, 'Authentication failed');
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[ApiClient] 에러 응답:', errorText);
    throw new ApiClientError(response.status, errorText);
  }

  const jsonData = await response.json();
  console.log('[ApiClient] 응답 데이터:', jsonData);
  return jsonData;
};
