import { useCallback, useState } from 'react';
import { useAuthStore } from '../store';
import { mockAuthTokens } from '../model/mock';
import { authApi } from '../api';
import { isMockEnabled } from '@/shared/utils';

export const useAuthViewModel = () => {
  const { setTokens, clearTokens, setLoading, isAuthenticated, isLoading } =
    useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const getKakaoLoginUrl = useCallback(async (): Promise<string | null> => {
    if (isMockEnabled()) {
      return 'mock://kakao-login';
    }

    try {
      const url = await authApi.getLoginUrl('kakao');
      return url;
    } catch (err) {
      setError('카카오 로그인 URL을 가져올 수 없습니다');
      return null;
    }
  }, []);

  const handleKakaoCallback = useCallback(async (code: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const tokens = await authApi.handleCallback('kakao', code);
      setTokens(tokens.accessToken, tokens.refreshToken);
      return true;
    } catch (err) {
      setError('카카오 로그인에 실패했습니다');
      return false;
    } finally {
      setLoading(false);
    }
  }, [setTokens, setLoading]);

  const refreshToken = useCallback(async (): Promise<boolean> => {
    const { refreshToken: currentRefreshToken } = useAuthStore.getState();
    if (!currentRefreshToken) return false;

    try {
      const tokens = await authApi.refreshToken(currentRefreshToken);
      setTokens(tokens.accessToken, tokens.refreshToken);
      return true;
    } catch (err) {
      clearTokens();
      return false;
    }
  }, [setTokens, clearTokens]);

  const logout = useCallback(async (): Promise<void> => {
    if (isMockEnabled()) {
      clearTokens();
      return;
    }

    try {
      await authApi.logout();
    } finally {
      clearTokens();
    }
  }, [clearTokens]);

  const loginWithMock = useCallback((): void => {
    if (isMockEnabled()) {
      setTokens(mockAuthTokens.accessToken, mockAuthTokens.refreshToken);
    }
  }, [setTokens]);

  return {
    isAuthenticated,
    isLoading,
    error,
    getKakaoLoginUrl,
    handleKakaoCallback,
    refreshToken,
    logout,
    loginWithMock,
  };
};
