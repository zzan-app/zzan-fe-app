export type SocialProvider = 'kakao' | 'google' | 'apple';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginUrl {
  url: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
}
