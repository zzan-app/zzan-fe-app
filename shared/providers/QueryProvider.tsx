import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5분간 fresh 상태 유지
      gcTime: 10 * 60 * 1000,        // 10분간 캐시 보관 (formerly cacheTime)
      retry: 1,                       // 실패 시 1회 재시도
      refetchOnWindowFocus: false,   // 화면 포커스 시 자동 refetch 방지
    },
  },
});

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
