import {
  Alcohol,
  FeedImage,
  FeedWithUser,
  Place,
  PlaceWithRating,
} from "./feedModel";
import { PLACE_KAKAO_MAP, PLACE_DATA } from "@/shared/mocks";

const KOREAN_NAMES = [
  "김민준", "이서윤", "박지우", "최서준", "정예은",
  "강도윤", "조시우", "윤하은", "장은우", "임서연",
  "한지후", "오서준", "신서우", "배서연", "송지안",
  "류하준", "전민서", "홍준서", "황지유", "노지훈",
  "안유진", "곽시우", "방유빈", "염예준", "문수아",
  "표지호", "성하윤", "탁민재", "변채원", "도지안",
  "남준혁", "지서현", "석예린", "채민서", "진시온",
  "마하늘", "피우진", "감하린", "선민지", "유재원",
  "코코몽", "김철수", "이영희", "박민수", "최지은",
  "정수현", "윤서연", "강동욱", "한지민", "오태양",
];

const LIQUOR_DATA = [
  { name: "연천 율무 동동주", type: "탁주(고도)" },
  { name: "가평 잣막걸리", type: "탁주" },
  { name: "오곡 진상주", type: "약주" },
  { name: "안동소주", type: "증류주" },
  { name: "문배주", type: "증류주" },
  { name: "복분자주", type: "과실주" },
  { name: "이강주", type: "약주" },
  { name: "백세주", type: "약주" },
  { name: "송순주", type: "약주" },
  { name: "청주", type: "약주" },
  { name: "진도홍주", type: "과실주" },
  { name: "과하주", type: "약주" },
  { name: "감홍로", type: "증류주" },
  { name: "경주법주", type: "약주" },
  { name: "산사춘", type: "과실주" },
  { name: "한산소곡주", type: "약주" },
  { name: "느린마을 막걸리", type: "탁주" },
  { name: "제주 오메기술", type: "탁주(고도)" },
  { name: "삼해소주", type: "증류주" },
  { name: "고소리술", type: "약주" },
  { name: "국순당 1000억 유산균", type: "탁주" },
  { name: "죽력고", type: "약주" },
  { name: "두견주", type: "약주" },
  { name: "홍천 찰옥수수막걸리", type: "탁주" },
  { name: "장수 사과와인", type: "과실주" },
  { name: "강화섬쌀막걸리", type: "탁주" },
  { name: "막걸리S", type: "탁주" },
  { name: "배꽃필무렵 배술", type: "약주" },
  { name: "복분자 리큐르", type: "과실주" },
  { name: "매취순", type: "약주" },
  { name: "문경주", type: "약주" },
  { name: "옥선 청주", type: "청주" },
  { name: "송화백일주", type: "약주" },
  { name: "아카시아꽃술", type: "약주" },
  { name: "천연송이막걸리", type: "탁주" },
  { name: "호산춘", type: "약주" },
  { name: "쌀 생 막걸리", type: "탁주" },
  { name: "청명주", type: "청주" },
  { name: "금산 인삼주", type: "과실주" },
  { name: "대대포 사과술", type: "과실주" },
  { name: "이화주", type: "약주" },
  { name: "해창막걸리", type: "탁주" },
  { name: "자소엽주", type: "약주" },
  { name: "귀멸주", type: "과실주" },
  { name: "연산 오계미 막걸리", type: "탁주" },
  { name: "양촌양조 누룩 막걸리", type: "탁주(고도)" },
  { name: "한라산 소주", type: "증류주" },
  { name: "여산송화주", type: "약주" },
  { name: "괴산 상쾌한 막걸리", type: "탁주" },
  { name: "보성 보향 녹차주", type: "과실주" },
];

const REVIEW_TEMPLATES = [
  "부드럽고 깔끔한 맛이 일품이에요!",
  "탄산이 적당하고 목넘김이 좋습니다.",
  "전통 방식 그대로의 깊은 풍미가 느껴져요.",
  "달콤하면서도 은은한 향이 좋았습니다.",
  "처음 마셔봤는데 생각보다 훨씬 맛있어요.",
  "약간 쌉싸름한 맛이 있지만 그게 매력이네요.",
  "여운이 길게 남는 술이에요. 좋았습니다.",
  "가성비 최고! 이 가격에 이런 맛이라니.",
  "친구들이랑 함께 마시기 좋은 술이에요.",
  "혼술하기에도 딱 좋은 도수와 맛입니다.",
  "안주 없이도 그냥 마시기 좋아요.",
  "바다를 보며 마시니 더욱 특별했습니다.",
  "분위기 있는 곳에서 마시기 완벽한 술이네요.",
  "생각보다 도수가 높아서 취하기 좋았어요.",
  "순하고 부드러워서 술 못 마시는 분들도 괜찮을 것 같아요.",
  "전통주 처음 마셔보는 분들에게 추천합니다.",
  "외국인 친구들도 정말 좋아했어요!",
  "어른들 모시고 오기 좋은 전통주네요.",
  "데이트 코스로 최고입니다.",
  "가족 모임에서 마시기 딱 좋았어요.",
  "막걸리 중에서 제일 맛있는 것 같아요.",
  "청주 특유의 깔끔함이 살아있네요.",
  "증류주인데도 부담스럽지 않아요.",
  "과실주라서 달달하고 먹기 편해요.",
  "약주의 진수를 맛본 기분입니다.",
  "이 지역 특산주답게 정말 맛있어요.",
  "향이 정말 독특하고 기억에 남네요.",
  "색깔부터 예뻐서 사진 찍기 좋았어요.",
  "파전이랑 같이 먹으니 천국이네요.",
  "해물 요리와 페어링이 완벽했습니다.",
  "보쌈과 함께 먹으니 더욱 맛있었어요.",
  "삼겹살이랑도 잘 어울려요!",
  "치킨이랑 먹어도 맛있더라고요.",
  "치즈 안주와 의외로 잘 맞아요.",
  "과일 안주와 함께하니 환상의 조합이었어요.",
  "얼음 넣어서 온더락으로 마셔도 좋아요.",
  "따뜻하게 덥혀 먹으니 더 맛있네요.",
  "겨울에 마시기 딱 좋은 술입니다.",
  "여름에 시원하게 마시기 최고예요.",
  "봄날 벚꽃 보며 마시고 싶은 술이에요.",
  "가을 단풍과 함께하면 완벽할 것 같아요.",
  "비 오는 날 마시기 좋은 술이네요.",
  "눈 내리는 날 분위기 있게 마시고 싶어요.",
  "야경 보며 마시니 로맨틱했어요.",
  "일출 보며 한 잔 하기 좋았습니다.",
  "전통 한옥에서 마시니 더욱 특별했어요.",
  "바다가 보이는 곳에서 마시니 환상적이었어요.",
  "산 정상에서 마신 한 잔이 최고였어요.",
  "캠핑할 때 마시기 딱 좋은 술이에요.",
  "등산 후 마시는 막걸리 한 잔, 꿀맛!",
  "낚시하면서 한 잔 하기 좋았어요.",
  "여행 중에 마신 술 중 최고였습니다.",
  "지역 축제에서 맛봤는데 인상 깊었어요.",
  "양조장 직접 방문해서 마시니 의미있었어요.",
  "시음 행사에서 처음 알게 됐는데 찜했어요.",
  "선물용으로도 손색없는 전통주네요.",
  "집들이 선물로 드렸더니 정말 좋아하셨어요.",
  "어버이날 선물로 완벽했습니다.",
  "명절에 어른들 드리기 좋아요.",
  "와인 좋아하는 친구도 만족했어요.",
  "맥주만 마시던 친구가 전통주 입문했어요.",
  "소주 대신 마시기 시작했는데 이게 더 좋네요.",
  "칵테일 베이스로 써도 좋을 것 같아요.",
  "라벨 디자인이 예뻐서 인테리어용으로도 굿!",
  "병이 독특해서 버리기 아까워요.",
  "재구매 의사 100%입니다!",
  "이제 단골 전통주가 될 것 같아요.",
  "온 가족이 좋아하는 술이에요.",
  "직장 회식 때 주문했는데 반응 좋았어요.",
  "동창회에서 마셨는데 추억이 새록새록.",
  "동호회 모임에 가져갔더니 대박 났어요.",
  "혼술 브이로그 찍으면서 마셨어요.",
  "인스타 감성 제대로네요.",
  "유튜브에서 보고 찾아왔는데 실망 안 했어요.",
  "블로그 리뷰 보고 샀는데 정말 맛있네요.",
  "입소문 듣고 왔는데 기대 이상입니다.",
  "재방문 의사 있어요!",
  "다음엔 다른 메뉴도 도전해볼게요.",
  "단골 될 것 같아요.",
  "벌써 세 번째 방문이에요.",
  "전통주 초보자인데 이해하기 쉬웠어요.",
  "알콜 도수가 딱 적당해요.",
  "취하지 않고 분위기만 즐기기 좋아요.",
  "적당히 취해서 기분 좋았어요.",
  "다음날 숙취가 없어서 좋았습니다.",
  "건강한 느낌이 드는 술이에요.",
  "우리 쌀로 만들었다니 뿌듯해요.",
  "전통을 지키는 양조장 응원합니다!",
  "무형문화재 기능보유자가 만드셨다더라고요.",
  "장인정신이 느껴지는 술입니다.",
  "정성이 느껴지는 한 잔이었어요.",
  "가격 대비 퀄리티가 훌륭해요.",
  "프리미엄 전통주의 매력을 알게 됐어요.",
  "생각보다 가격이 착해서 놀랐어요.",
  "고급 레스토랑에서 마셨는데 분위기와 잘 맞았어요.",
  "편의점에서도 살 수 있어서 편해요.",
  "온라인 주문이 편리해서 좋았어요.",
  "배송도 빠르고 포장도 꼼꼼했어요.",
  "세트로 사면 더 저렴하더라고요.",
];

const generateRandomScore = (): number => {
  const random = Math.random();
  const score = 3.0 + random * 2.0;
  return Math.round(score * 10) / 10;
};

const generateRandomDate = (): string => {
  const start = new Date('2024-01-01');
  const end = new Date('2025-02-28');
  const timestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(timestamp).toISOString();
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateRandomCoord = (): number => {
  return Math.round((0.2 + Math.random() * 0.6) * 100) / 100;
};

export const mockFeedImages: FeedImage[] = [
  {
    id: "1",
    uri: require("@/assets/images/example_feed.jpg"),
  },
];

export const mockAlcohols: Alcohol[] = LIQUOR_DATA.map((liquor, index) => ({
  id: String(index + 1),
  imageUrl: require("@/assets/images/example_image.png"),
  name: liquor.name,
  type: liquor.type,
  score: generateRandomScore(),
}));

export const mockPlaces: Place[] = PLACE_DATA.map((place, index) => ({
  id: String(index + 1),
  name: place.name,
  address: place.address,
}));

export const mockSelectedPlace: PlaceWithRating = {
  id: "1",
  name: "울산 문화의 거리",
  address: "울산광역시 중구 성남동 329-5",
  feedCount: 12,
  rating: 4,
};

// mockNearbyFeeds는 mockFeedDetails 생성 후 참조하도록 변경

export interface MockFeedDetail {
  id: string;
  userId: string;
  userName: string;
  userProfileImage: any;
  imageUrl: any;
  images: {
    id: string;
    imageUrl: any;
    tags: {
      id: string;
      liquorId: string;
      liquorName: string;
      x: number;
      y: number;
    }[];
  }[];
  score: number;
  liquorCount: number;
  text: string;
  kakaoPlaceId?: string;
  placeName?: string;
  placeAddress?: string;
  createdAt: string;
}

const generateFeedForPlace = (
  feedId: number,
  placeId: string,
  kakaoPlaceId: string,
  place: typeof PLACE_DATA[0]
): MockFeedDetail => {
  const alcoholCount = Math.floor(Math.random() * 3) + 1;
  const selectedAlcohols = getRandomElements(LIQUOR_DATA, alcoholCount);
  const userName = getRandomElement(KOREAN_NAMES);

  const tags = selectedAlcohols.map((alcohol, tagIndex) => ({
    id: `tag${feedId}_${tagIndex}`,
    liquorId: String(LIQUOR_DATA.indexOf(alcohol) + 1),
    liquorName: alcohol.name,
    x: generateRandomCoord(),
    y: generateRandomCoord(),
  }));

  return {
    id: `feed${feedId}`,
    userId: `user${(feedId % 50) + 1}`,
    userName,
    userProfileImage: require("@/assets/images/example_profile_girl.jpg"),
    imageUrl: require("@/assets/images/example_feed.jpg"),
    images: [
      {
        id: `img${feedId}`,
        imageUrl: require("@/assets/images/example_feed.jpg"),
        tags,
      },
    ],
    score: generateRandomScore(),
    liquorCount: alcoholCount,
    text: getRandomElement(REVIEW_TEMPLATES),
    kakaoPlaceId,
    placeName: place.name,
    placeAddress: place.address,
    createdAt: generateRandomDate(),
  };
};

export const mockFeedDetails: MockFeedDetail[] = (() => {
  const feeds: MockFeedDetail[] = [];
  let feedCounter = 1;

  for (let placeIndex = 0; placeIndex < 100; placeIndex++) {
    const placeId = String(placeIndex + 1);
    const kakaoPlaceId = PLACE_KAKAO_MAP[placeId];
    const place = PLACE_DATA[placeIndex % PLACE_DATA.length];
    const feedsPerPlace = 5 + Math.floor(Math.random() * 11);

    for (let j = 0; j < feedsPerPlace; j++) {
      feeds.push(generateFeedForPlace(feedCounter, placeId, kakaoPlaceId, place));
      feedCounter++;
    }
  }

  return feeds;
})();

export const mockNearbyFeeds: FeedWithUser[] = mockFeedDetails.slice(0, 30).map(feed => ({
  id: feed.id,
  userId: feed.userId,
  username: feed.userName,
  userProfileImage: feed.userProfileImage,
  imageUrl: feed.imageUrl,
  placeName: feed.placeName || "",
  address: feed.placeAddress || "",
  alcoholCount: feed.liquorCount,
}));
