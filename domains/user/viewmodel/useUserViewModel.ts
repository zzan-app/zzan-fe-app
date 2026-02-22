import { userApi } from "@/domains/user/api";
import { mapApiUserToUser } from "@/domains/user/mapper";
import { mockUser, type User } from "@/domains/user/model";
import { isMockEnabled } from "@/shared/utils";
import { useCallback, useEffect, useState } from "react";

export const useUserViewModel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (isMockEnabled()) {
      setUser(mockUser);
      setIsLoading(false);
      return;
    }

    try {
      const userData = await userApi.getCurrentUser();
      console.log("[UserViewModel] 사용자 데이터:", userData);
      setUser(mapApiUserToUser(userData));
    } catch (err) {
      console.error("[UserViewModel] 사용자 정보 로드 실패:", err);
      setError("사용자 정보를 불러오는데 실패했습니다");
      if (isMockEnabled()) {
        setUser(mockUser);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchCurrentUser,
  };
};
