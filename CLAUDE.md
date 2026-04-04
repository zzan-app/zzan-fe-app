# Project Context for Claude Code

**This file provides project-specific context for Claude Code and its agents.**

---

## Agent System

**Scope:** Project-scoped agents (in `.claude/agents/`)

**Available Agents:** 7 production-ready agents for Expo/React Native

- **Grand Architect** - Meta-orchestrator for complex features
- **Design Token Guardian** - Enforces design system consistency
- **A11y Enforcer** - WCAG 2.2 compliance validation
- **Test Generator** - Auto-generates tests with ROI prioritization
- **Performance Enforcer** - Tracks performance budgets
- **Performance Prophet** - Predictive performance analysis
- **Security Specialist** - Security audits & penetration testing

**Updating Agents:**

```bash
# From this project root
/path/to/claude-code-expo-system/scripts/install-agents.ps1 -Scope project
```

**Team Sync:** Agents are version controlled in `.claude/` - team members get them automatically via git.

---

## Project Overview

**Project Name:** ZZAN (짠)
**Description:** 여행지에서 만난 한국 전통주를 기록·발견·공유하는 Expo 기반 커뮤니티 앱. 카카오 지도로 주변 전통주 장소를 탐색하고, 피드를 작성하며, AI 챗봇으로 전통주를 추천받을 수 있다.
**Target Platforms:** iOS, Android (React Native/Expo)

---

## Tech Stack

### Core

- **Expo SDK:** ~54.0.33
- **React Native:** 0.81.5
- **TypeScript:** ~5.9.2
- **Node:** 22.13.1 (`.nvmrc` 기준)

### State Management

- **Zustand** `^5.0.10` — 로컬/전역 상태 (`authStore`, `postStore`)
- **TanStack Query** `^5.90.19` — 서버 상태 (지도 장소 데이터)

### Navigation

- **Expo Router** `~6.0.23` — 파일 기반 라우팅, typed routes 활성화

### Styling

- React Native **StyleSheet** + `shared/constants/` 디자인 토큰 (TailwindCSS 미사용)

### Key Libraries

- `expo-notifications` — 푸시 알림
- `react-native-webview` — 카카오 지도, Kakao OAuth
- `react-native-keyboard-controller` — 키보드 처리
- `expo-location` — 현재 위치
- `expo-image-picker` — 이미지 선택/업로드
- `expo-secure-store` — push token 저장
- `react-native-reanimated` — 애니메이션
- `react-native-svg` + `react-native-svg-transformer` — SVG 아이콘
- `react-native-edge-to-edge` — Android edge-to-edge
- `react-native-reanimated-carousel` — 이미지 캐러셀

---

## Architecture

### Folder Structure

```
app/                        # Expo Router 파일 기반 라우팅
├── _layout.tsx             # Root layout (providers, 폰트, 알림 초기화)
├── index.tsx               # 인증 상태에 따른 리다이렉트
├── login.tsx               # Kakao OAuth (WebView) + 비로그인 진입
├── (tabs)/                 # 하단 탭 네비게이터
│   ├── map.tsx             # 홈 - 카카오 지도
│   ├── feed.tsx            # 최신 피드
│   └── post.tsx            # 피드 작성 진입점 (re-export)
├── (feed)/                 # 피드 스택
│   ├── post.tsx            # 피드 작성 Step 1 (이미지, 장소, 후기)
│   ├── rate.tsx            # 피드 작성 Step 2 (전통주 평가)
│   ├── add.tsx             # 전통주/장소 검색 및 추가
│   └── detail.tsx          # 피드 상세
├── (info)/                 # 정보 스택
│   ├── alcohol.tsx         # 전통주 상세 + 리뷰
│   ├── place.tsx           # DB 장소 상세
│   └── placeTemporal.tsx   # 카카오 장소 상세 (지도 연동)
├── (chat)/
│   └── chat.tsx            # AI 챗봇
└── (user)/
    ├── mypage.tsx          # 내 프로필 (스크랩/내 피드 탭)
    └── myprofile.tsx       # 프로필 수정

domains/                    # 도메인별 MVVM 구조 (api → model → mapper → store/viewmodel)
├── auth/                   # Kakao OAuth, JWT 토큰, authStore
├── feed/                   # 피드 CRUD, 이미지 업로드(S3), postStore
├── info/                   # 전통주/장소 정보, 리뷰
├── map/                    # 카카오 지도 WebView, 장소 검색
├── chat/                   # AI 챗봇 메시지
└── user/                   # 프로필, 스크랩, 내 피드

shared/
├── api/                    # apiClient, endpoints, scrapApi, tokenRefreshInterceptor
├── components/             # 공통 UI (Button, Header, TabBar, Toast, BookMark 등)
├── constants/              # Colors, Layout, Typography
├── hooks/                  # useDebounce, useDistance, useFormatTime, useModal 등
├── mocks/                  # placeData, placeKakaoMapping
├── notifications/          # 푸시 알림 서비스
├── providers/              # QueryProvider (TanStack Query)
├── types/                  # ApiResponse 공통 타입
└── utils/                  # env.ts (isMockEnabled, getApiUrl)
```

### Design Pattern

**Domain-driven MVVM**

각 도메인의 데이터 흐름:
```
API (api/) → 타입 (model/) → 변환 (mapper/) → 상태 (store/viewmodel/) → 화면 (app/)
```

**Mock 시스템:** `isMockEnabled()` (`shared/utils/env.ts`) 로 API 호출 vs mock 데이터를 분기. 모든 주요 뷰모델에 mock 경로가 구현되어 있어 백엔드 없이 개발 가능.

---

## Coding Conventions

### React Components

```typescript
// ✅ Functional components only
export default function ComponentName() {}

// ✅ Hooks at the top
const [state, setState] = useState();
const router = useRouter();

// ❌ No class components
```

### TypeScript

```typescript
// ✅ Explicit types for props
interface Props {
  userId: string;
  onPress: () => void;
}

// ✅ No 'any' type (use 'unknown' if needed)
```

### Naming Conventions

- **Components:** PascalCase (`FeedBlock.tsx`)
- **Hooks/ViewModels:** camelCase with 'use' prefix (`useAuthViewModel.ts`)
- **Utilities:** camelCase (`formatDate.ts`)
- **Constants:** UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **Path alias:** `@/` → 프로젝트 루트 (`tsconfig.json`)

---

## Design System

### Theme Location

```
shared/constants/Colors.ts      # 컬러 토큰
shared/constants/Layout.ts      # 간격/크기/radius 토큰
shared/constants/Typography.ts  # 폰트 패밀리/크기 토큰
```

### Token Usage

```typescript
// ✅ Always use design tokens
import { Colors, Layout, Typography } from '@/shared/constants';

<View style={{
  backgroundColor: Colors.white,
  paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  borderRadius: Layout.MESSAGE_RADIUS,
}} />
<Text style={{
  fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
  fontSize: Typography.MESSAGE_TEXT,
  color: Colors.black,
}} />

// ❌ Never hardcode values
<View style={{ backgroundColor: '#FFFFFF', padding: 16 }} />
<Text style={{ fontFamily: 'KakaoSmallSans-Regular', fontSize: 14 }} />
```

### Color Tokens

| 토큰 | 값 | 용도 |
|---|---|---|
| `Colors.black` | `#1F1F1F` | 주 텍스트, 강조 배경 |
| `Colors.yellow` | `#FFD800` | 브랜드 색상, CTA 버튼, 탭바 |
| `Colors.gray` | `#DEDCD8` | 비활성 상태, 서브 배경 |
| `Colors.takju` | `#F7F5F0` | 섹션 구분 배경 (탁주 색감) |
| `Colors.white` | `#FFFFFF` | 기본 화면 배경 |
| `Colors.purple` | `#8A38F5` | 로딩 인디케이터 |
| `Colors.red` | `#FF0000` | 에러 텍스트 |
| `Colors.time` | `#999` | 시간 표시용 서브 텍스트 |
| `Colors.detail` | `#666` | 보조 설명 텍스트 |

### Spacing / Layout Tokens

| 토큰 | 값(px) | 용도 |
|---|---|---|
| `Layout.SCREEN_HORIZONTAL` | `16` | 화면 좌우 패딩 |
| `Layout.SECTION_SPACING` | `16` | 섹션 간 수직 여백 |
| `Layout.ITEM_SPACING` | `8` | 항목 간 여백 |
| `Layout.MESSAGE_SPACING` | `12` | 채팅 메시지 간 여백 |
| `Layout.CHIP_HORIZONTAL` | `22` | 칩 좌우 패딩 |
| `Layout.CHIP_VERTICAL` | `10` | 칩 상하 패딩 |
| `Layout.BOTTOM_SAFE_AREA_FALLBACK` | `24` | SafeArea 없을 때 하단 여백 |
| `Layout.CHIP_RADIUS` | `20` | 칩 border-radius |
| `Layout.MESSAGE_RADIUS` | `16` | 말풍선 border-radius |
| `Layout.INPUT_RADIUS` | `8` | 입력창 border-radius |

### Typography Tokens

| 토큰 | 값 |
|---|---|
| `Typography.KAKAO_BIG_SANS_BOLD` | `'KakaoBigSans-Bold'` |
| `Typography.KAKAO_BIG_SANS_EXTRABOLD` | `'KakaoBigSans-ExtraBold'` |
| `Typography.KAKAO_BIG_SANS_REGULAR` | `'KakaoBigSans-Regular'` |
| `Typography.KAKAO_SMALL_SANS_BOLD` | `'KakaoSmallSans-Bold'` |
| `Typography.KAKAO_SMALL_SANS_LIGHT` | `'KakaoSmallSans-Light'` |
| `Typography.KAKAO_SMALL_SANS_REGULAR` | `'KakaoSmallSans-Regular'` |
| `Typography.MESSAGE_TEXT` | `14` |
| `Typography.CHIP_TEXT` | `12` |
| `Typography.INPUT_TEXT` | `12` |

---

## Testing Requirements

### Coverage Targets

- **Critical paths** (auth, feed 작성/제출): 90%+
- **Core features:** 80%+
- **UI components:** 60%+

### Test Location

- Unit tests: `ComponentName.test.tsx` (same folder as component)
- E2E tests: `e2e/` folder

### Running Tests

```bash
npm test                  # Unit & integration tests
npm run test:e2e         # Detox E2E tests
npm run test:coverage    # Coverage report
```

---

## Code Quality Standards

### Before Committing

1. ✅ Run linter: `npm run lint`
2. ✅ Check types: `npm run type-check`
3. ✅ Run `/review` command for changed files

### Pre-commit Hooks

- ESLint auto-fix
- Prettier formatting

---

## API Integration

### Base URL

환경별 `.env` 파일의 `EXPO_PUBLIC_API_URL`로 관리 (개발/스테이징/운영 분리).

### Authentication

- **Method:** Kakao OAuth (WebView 기반) → JWT (accessToken + refreshToken)
- **Storage:** Zustand **인메모리** (`domains/auth/store/authStore.ts`) — 앱 재시작 시 재로그인 필요. `expo-secure-store`는 push token 저장에만 사용.
- **Token refresh:** 401 응답 시 `shared/api/interceptors/tokenRefreshInterceptor.ts`가 자동 재발급 후 원본 요청 재시도. 재발급 실패 시 `clearTokens()` 호출 후 로그인 화면으로 유도.

### API Client

**Location:** `shared/api/client.ts`

```typescript
// Example usage
import { apiClient } from "@/shared/api";

// 인증 불필요
const data = await apiClient<ApiResponse<FeedDetail>>('/feeds/123', { method: 'GET' });

// 인증 필요 (requireAuth: true → Authorization 헤더 자동 추가)
await apiClient('/feeds', { method: 'POST', body: feedRequest, requireAuth: true });
```

---

## Platform-Specific Notes

### iOS

- Minimum version: iOS 13+
- `NSLocationWhenInUseUsageDescription` 위치 권한 (카카오 지도 현재 위치)
- Bundle ID: `com.leekangryong.zzanfe`

### Android

- Minimum SDK: 23 (Android 6.0)
- 권한: `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`, `RECEIVE_BOOT_COMPLETED`, `VIBRATE`
- `edgeToEdgeEnabled: true`, `softInputMode: adjustPan`
- Package: `com.leekangryong.zzanfe`

---

## Environment Variables

**Location:** `.env` (로컬), CI/CD 환경변수

**Required:**

```
EXPO_PUBLIC_API_URL                   # 백엔드 REST API 기본 URL
EXPO_PUBLIC_USE_MOCK_DATA             # mock 데이터 사용 여부 ("true"/"false")
EXPO_PUBLIC_KAKAO_MAP_API_KEY         # 카카오 REST API 키 (장소 검색)
EXPO_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY  # 카카오 지도 JS 키 (WebView 렌더링)
EXPO_PUBLIC_CHATBOT_URL               # AI 챗봇 API URL
GOOGLE_SERVICES_JSON                  # Android Firebase 설정 파일 경로 (CI 환경)
```

**Never commit:** Secrets, API keys, tokens

---

## Deployment

### Build Process

```bash
# Development build
eas build --profile development --platform all

# Production build
eas build --profile production --platform all
```

### App Store Info

- **iOS Bundle ID:** `com.leekangryong.zzanfe`
- **Android Package:** `com.leekangryong.zzanfe`
- **EAS Project ID:** `6262c554-b3eb-48a6-ac4e-95fe2acdf09f`

---

## Common Patterns

### Navigation

```typescript
// ✅ Expo Router 기반 이동
import { router, useRouter, useLocalSearchParams } from 'expo-router';

const router = useRouter();
router.push('/map');
router.push({ pathname: '/alcohol', params: { liquorId: id } });
router.replace('/login');
router.back();

// 파라미터 읽기
const params = useLocalSearchParams<{ feedId?: string; placeId?: string }>();
```

### State Management

```typescript
// ✅ Zustand - 로컬/전역 상태
import { useAuthStore } from '@/domains/auth/store';
const { accessToken, setTokens, clearTokens } = useAuthStore();

// ✅ Zustand 직접 접근 (컴포넌트 외부, 이벤트 핸들러)
const { refreshToken } = useAuthStore.getState();

// ✅ TanStack Query - 서버 상태 캐싱
import { useQuery } from '@tanstack/react-query';
const { data: places } = useQuery({
  queryKey: ['places', bounds],
  queryFn: () => placeApi.getPlacesInRegion(bounds),
});
```

### Error Handling

```typescript
// ✅ Use try-catch with proper error types
try {
  await apiClient('/feeds', { method: 'POST', body: request, requireAuth: true });
} catch (error) {
  if (error instanceof ApiClientError) {
    console.error('[Feed] API error:', error.status, error.message);
  }
}
```

---

## Anti-Patterns to Avoid

❌ **No hardcoded colors/spacing/fonts** → Use `Colors.*`, `Layout.*`, `Typography.*` tokens
❌ **No direct AsyncStorage for sensitive data** → Use `expo-secure-store`
❌ **No console.log in production code** → Remove before shipping (현재 `apiClient`에 잔존)
❌ **No hardcoded Korean strings without context** → 향후 i18n 대비
❌ **No missing accessibility props** → Always add `accessibilityLabel`, `accessibilityRole`
❌ **No prop drilling >3 levels** → Use Context or Zustand store

---

## Performance Guidelines

- ✅ Use `React.memo` for list items (FeedBlock, FeedBlockWithProfile 등)
- ✅ Use `useCallback` for callbacks passed to children
- ✅ Use `useMemo` for expensive calculations
- ✅ Use `useDebounce` (지도 bounds 검색 등 빈번한 API 호출 제어)
- ✅ Lazy load heavy screens
- ✅ `scrollEventThrottle` 설정 (피드 무한 스크롤)
- ❌ Don't import entire lodash library

---

## Security Guidelines

- ✅ HTTPS for all API calls
- ✅ `expo-secure-store` for push tokens
- ✅ Kakao OAuth via WebView (토큰 직접 노출 최소화)
- ✅ `requireAuth: true` 옵션으로 인증 필요 API 명시
- ❌ Never log accessToken/refreshToken (`apiClient` 로그에서 제거 필요)
- ❌ Never commit `.env` files

---

## Accessibility Requirements

- ✅ All `TouchableOpacity` must have `accessibilityLabel` and `accessibilityRole`
- ✅ Minimum touch target: 44x44 points (필요 시 `hitSlop` 활용)
- ✅ Color contrast ratio: 4.5:1 (WCAG AA)
- ✅ Support screen readers
- ✅ Keyboard navigation (where applicable)

---

## Known Issues / Workarounds

- **토큰 비영속성:** `accessToken`/`refreshToken`이 Zustand 인메모리에만 저장 → 앱 재시작 또는 콜드 스타트 시 재로그인 필요. (추후 `expo-secure-store` 연동 고려)
- **LOGOUT 엔드포인트 버그:** `API_ENDPOINTS.AUTH.LOGOUT`이 `TOKEN_REFRESH`와 동일한 경로(`/users/auth/token/refresh`)로 잘못 설정됨 (`shared/api/endpoints.ts:8`). logout은 method: DELETE로 호출하지만 URL 자체가 틀림.
- **apiClient verbose 로그:** `shared/api/client.ts`에 `console.log` 다수 잔존 → 프로덕션 빌드 전 제거 필요.
- **mypage.tsx 테스트 코드:** 알림 테스트 버튼(`handleTestNotification`) 및 `registerPushToken` 호출이 TODO 주석과 함께 하드코딩됨 → BE 작업 완료 후 제거 필요.
- **카카오 지도 WebView:** `baseUrl: "https://zzan-kakao-map.netlify.app"` 고정 → 지도 HTML이 해당 도메인에 배포되어 있어야 동작.

---

## Team Conventions

- 도메인 신규 추가 시 `domains/{name}/` 하위에 `api/`, `model/`, `viewmodel/`, `components/`, `mapper/` 구조 유지
- 모든 뷰모델은 mock/real 분기 (`isMockEnabled()`) 포함
- API 엔드포인트는 반드시 `shared/api/endpoints.ts`에 중앙 관리
- 스크랩 API는 도메인별이 아닌 `shared/api/scrapApi.ts`로 통합 관리

---

**Last Updated:** 2026-04-04
**Maintained By:** ZZAN 개발팀

---

_© 2025 SenaiVerse | Claude Code Agent System v1.0 | Project Context Template_
