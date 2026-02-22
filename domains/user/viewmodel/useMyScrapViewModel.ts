import {
  mapFeedScrapApiToUserFeed,
  mapLiquorScrapApiToUserScrapAlcohol,
} from "@/domains/user/mapper";
import {
  mockUserScrapAlcohols,
  mockUserScrapFeeds,
  type UserFeed,
  type UserScrapAlcohol,
} from "@/domains/user/model";
import { scrapApi } from "@/shared/api";
import { isMockEnabled } from "@/shared/utils";
import { useCallback, useEffect, useState } from "react";

export const useMyScrapViewModel = () => {
  const [feeds, setFeeds] = useState<UserFeed[]>([]);
  const [alcohols, setAlcohols] = useState<UserScrapAlcohol[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMockScraps = useCallback(() => {
    setFeeds(mockUserScrapFeeds);
    setAlcohols(mockUserScrapAlcohols);
  }, []);

  const fetchScraps = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (isMockEnabled()) {
      loadMockScraps();
      setIsLoading(false);
      return;
    }

    try {
      const [feedResponse, liquorResponse] = await Promise.all([
        scrapApi.feed.getList(),
        scrapApi.liquor.getList(),
      ]);

      const mappedFeeds = feedResponse.data.items.map(
        mapFeedScrapApiToUserFeed,
      );
      const mappedLiquors = liquorResponse.data.items.map(
        mapLiquorScrapApiToUserScrapAlcohol,
      );

      setFeeds(mappedFeeds);
      setAlcohols(mappedLiquors);
    } catch (err) {
      console.error("[MyScrapViewModel] Failed to load scraps:", err);
      setError("스크랩 목록을 불러오는데 실패했습니다");
      loadMockScraps();
    } finally {
      setIsLoading(false);
    }
  }, [loadMockScraps]);

  useEffect(() => {
    fetchScraps();
  }, [fetchScraps]);

  return {
    feeds,
    alcohols,
    isLoading,
    error,
    refetch: fetchScraps,
  };
};
