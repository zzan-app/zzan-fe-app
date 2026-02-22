import { mapUserFeedApiToDomain } from "@/domains/user/mapper";
import { mockUserFeeds, type UserFeed } from "@/domains/user/model";
import { isMockEnabled } from "@/shared/utils";
import { useEffect, useState } from "react";
import { userApi } from "../api";

export const useMyFeedsViewModel = () => {
  const [feeds, setFeeds] = useState<UserFeed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFeeds = async () => {
    if (isMockEnabled()) {
      setFeeds(mockUserFeeds);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await userApi.getMyFeeds({ size: 20 });
      const mappedFeeds = response.items.map(mapUserFeedApiToDomain);
      setFeeds(mappedFeeds);
    } catch (err) {
      setError("피드를 불러오는데 실패했습니다");
      console.error("[My Feeds Error]", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeeds();
  }, []);

  return {
    feeds,
    isLoading,
    error,
  };
};
