import type {
  AlcoholInfo,
  LiquorComment,
  PlaceInfo,
  PlaceReview,
} from "./infoModel";

const exampleImage = require("@/assets/images/example_image.png");
const breweryImage = require("@/assets/basic_mock_images/brewery.png");
const ingredientsImage = require("@/assets/basic_mock_images/ingredients.png");
const lookingImage = require("@/assets/basic_mock_images/looking.png");
const smellImage = require("@/assets/basic_mock_images/smell.png");
const tasteImage = require("@/assets/basic_mock_images/taste.png");
const featureImage = require("@/assets/basic_mock_images/feature.png");

const KOREAN_REVIEWER_NAMES = [
  "홍길동",
  "김철수",
  "이영희",
  "박민수",
  "최지은",
  "정수현",
  "윤서연",
  "강동욱",
  "한지민",
  "오태양",
  "전통주애호가",
  "막걸리러버",
  "김소믈리에",
  "전통주마니아",
  "한식러버",
  "술고래",
  "혼술족",
  "와인덕후",
  "전통주입문자",
  "쌀술사랑",
  "막걸리천국",
  "전통주헌터",
  "전주술집이",
  "양조장순례",
  "술여행러",
];

const PLACE_REVIEW_TEMPLATES = [
  "전통주 종류가 다양하고 분위기가 좋아요!",
  "안주도 맛있고 직원분들이 친절해요.",
  "데이트 코스로 추천합니다.",
  "전통주 초보자도 이해하기 쉽게 설명해주셔서 좋았어요.",
  "분위기 있게 술 마시기 딱 좋은 곳이에요.",
  "가격 대비 퀄리티가 훌륭합니다.",
  "재방문 의사 있어요!",
  "다양한 지역 전통주를 한 곳에서 맛볼 수 있어요.",
  "조용하고 아늑한 분위기가 좋았습니다.",
  "외국인 친구 데려와도 좋을 것 같아요.",
  "전통주 페어링 메뉴가 훌륭했어요.",
  "주차하기 편해서 좋았습니다.",
  "대중교통 접근성도 좋아요.",
  "어른들 모시고 오기 좋은 곳입니다.",
  "단체 모임 하기에도 좋아요.",
  "전통주 입문하기 좋은 장소네요.",
  "사장님이 전통주에 대해 잘 설명해주세요.",
  "혼술하기에도 부담 없어요.",
  "음악도 좋고 인테리어도 예뻐요.",
  "사진 찍기 좋은 곳입니다.",
];

const ALCOHOL_REVIEW_TEMPLATES = [
  "부드럽고 깔끔한 맛이 일품이에요!",
  "탄산이 적당하고 목넘김이 좋습니다.",
  "전통 방식 그대로의 깊은 풍미가 느껴져요.",
  "달콤하면서도 은은한 향이 좋았습니다.",
  "처음 마셔봤는데 생각보다 훨씬 맛있어요.",
  "약간 쌉싸름한 맛이 있지만 그게 매력이네요.",
  "여운이 길게 남는 술이에요.",
  "파전이랑 같이 먹으니 천국이에요.",
  "보쌈과 함께 먹으니 더욱 맛있었어요.",
  "해물 요리와 페어링이 완벽했습니다.",
  "순하고 부드러워서 술 못 마시는 분들도 괜찮을 것 같아요.",
  "전통주 처음 마셔보는 분들에게 추천합니다.",
  "얼음 넣어서 온더락으로 마셔도 좋아요.",
  "따뜻하게 덥혀 먹으니 더 맛있네요.",
  "겨울에 마시기 딱 좋은 술입니다.",
  "여름에 시원하게 마시기 최고예요.",
  "향이 정말 독특하고 기억에 남네요.",
  "색깔부터 예뻐서 사진 찍기 좋았어요.",
  "재구매 의사 100%입니다!",
  "이제 단골 전통주가 될 것 같아요.",
  "막걸리 중에서 제일 맛있는 것 같아요.",
  "청주 특유의 깔끔함이 살아있네요.",
  "증류주인데도 부담스럽지 않아요.",
  "과실주라서 달달하고 먹기 편해요.",
  "약주의 진수를 맛본 기분입니다.",
  "이 지역 특산주답게 정말 맛있어요.",
  "우리 쌀로 만들었다니 뿌듯해요.",
  "전통을 지키는 양조장 응원합니다!",
  "가격 대비 퀄리티가 훌륭해요.",
  "프리미엄 전통주의 매력을 알게 됐어요.",
];

const PLACE_CATEGORIES = [
  "전통주점",
  "전통주 카페",
  "한식당",
  "양조장 직영점",
  "전통시장 주점",
  "한옥 주점",
  "전통주 바",
  "지역 특산주점",
];

const LIQUOR_CATEGORIES = [
  "탁주(저도)",
  "탁주(고도)",
  "약주",
  "증류주",
  "과실주",
  "청주",
];

const PLACE_DESCRIPTIONS = [
  "전통주 카페 짠은 우리 술의 깊은 맛과 멋을 현대적인 감각으로 재해석한 특별한 공간입니다. 전국 각지의 양조장에서 엄선해 온 다채로운 전통주 라인업을 갖추고 있어, 평소 접하기 힘들었던 귀한 술들을 한자리에서 만나보실 수 있습니다.",
  "우리 술의 매력에 흠뻑 빠질 수 있는 전통주 전문점입니다. 계절마다 새롭게 선보이는 시즌 한정 전통주와 함께 매번 새로운 즐거움을 경험해 보세요.",
  "전통 한옥의 정취를 느끼며 우리 술을 즐길 수 있는 공간입니다. 따뜻하고 세련된 인테리어가 어우러진 분위기 속에서, 소중한 사람들과 함께 여유로운 시간을 가져보세요.",
  "지역 특산 전통주를 맛볼 수 있는 명소입니다. 친절한 큐레이션 서비스로 전통주 초보자도 쉽게 즐길 수 있도록 도와드립니다.",
  "전국 각지의 숨은 명주들을 한자리에 모았습니다. 각 전통주와 완벽한 조화를 이루는 수제 안주 페어링도 함께 즐기실 수 있습니다.",
];

const ALCOHOL_RECOMMEND_DESCRIPTIONS = [
  "알콜 도수가 14%로 일반 막걸리의 2배가 넘는 만큼 한여름에는 얼음을 넣어 온더록스로 한잔해도 충분히 제 역할을 하는 제품입니다.",
  "파전, 김치전, 보쌈과 함께 드시면 더욱 풍미가 살아납니다. 전통주의 깊은 맛을 느껴보세요.",
  "활어회, 치즈, 육회와 잘 어울리며, 그 자체로도 충분히 즐기기 좋습니다.",
  "겨울철 따뜻하게 데워 마시면 더욱 좋으며, 견과류 안주와 잘 어울립니다.",
  "시원하게 냉장 보관하여 마시면 청량감이 배가 되며, 해물 요리와 환상의 궁합을 자랑합니다.",
];

const BREWERY_NAMES = [
  "서울양조장",
  "배상면주가",
  "느린마을",
  "국순당",
  "복순도가",
  "산사원",
  "지평주조",
  "명인안동소주",
  "문배주양조원",
  "한산소곡주전수관",
  "이강주양조장",
  "제주한라산",
  "금산인삼주",
  "담양주조",
  "전주전통주",
];

const generateRandomDate = (startYear = 2024, endYear = 2025): string => {
  const start = new Date(`${startYear}-01-01`);
  const end = new Date(`${endYear}-02-28`);
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return date.toISOString().split("T")[0];
};

const generateRandomRating = (): number => {
  const random = Math.random();
  const rating = 3.0 + random * 2.0;
  return Math.round(rating);
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generatePlaceReviews = (
  count: number,
  templates: string[],
): PlaceReview[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `review${i + 1}`,
    userName: getRandomElement(KOREAN_REVIEWER_NAMES),
    rating: generateRandomRating(),
    content: getRandomElement(templates),
    imageUrl: i % 2 === 0 ? exampleImage : undefined,
    createdAt: generateRandomDate(),
  }));
};

export const MOCK_PLACE_INFOS: PlaceInfo[] = Array.from(
  { length: 30 },
  (_, i) => ({
    id: `place${i + 1}`,
    name: `${getRandomElement(["전통주 카페", "한옥 주점", "전통주 바", "양조장"])} ${i + 1}호점`,
    category: getRandomElement(PLACE_CATEGORIES),
    images: [exampleImage, exampleImage, exampleImage],
    option1: `서울시 ${getRandomElement(["강남구", "종로구", "중구", "마포구"])} ${i + 1}번지`,
    option2: generateRandomRating() < 4 ? "월요일 휴무" : "연중무휴",
    option3: `${10 + (i % 3)}:00 - ${21 + (i % 3)}:00`,
    option4: i % 2 === 0 ? "가능" : "불가",
    isBookmarked: i % 3 === 0,
    rating: 3.0 + Math.random() * 2.0,
    reviews: generatePlaceReviews(3, PLACE_REVIEW_TEMPLATES),
    description: getRandomElement(PLACE_DESCRIPTIONS),
    kakaoPlaceId: String(i + 1),
  }),
);

export const MOCK_PLACE_INFO: PlaceInfo = MOCK_PLACE_INFOS[0];

export const getMockPlaceInfo = (): PlaceInfo => {
  return MOCK_PLACE_INFO;
};

const generateAlcoholGalleryImages = (name: string) => [
  {
    image: breweryImage,
    descriptionTitle: "양조장",
    descriptionCategory: `${getRandomElement(BREWERY_NAMES)}에서 전통 방식으로 빚었습니다.`,
  },
  {
    image: ingredientsImage,
    descriptionTitle: "원재료",
    descriptionCategory: "유기농 쌀 100%, 누룩, 정제수",
  },
  {
    image: lookingImage,
    descriptionTitle: "외관",
    descriptionCategory: "맑고 투명한 유백색을 띕니다.",
  },
  {
    image: smellImage,
    descriptionTitle: "향",
    descriptionCategory: "은은한 쌀 향과 누룩 향이 어우러집니다.",
  },
  {
    image: tasteImage,
    descriptionTitle: "맛",
    descriptionCategory: "부드럽고 깔끔하며 탄산감이 적당합니다.",
  },
  {
    image: featureImage,
    descriptionTitle: "특징",
    descriptionCategory: `${name}의 고유한 풍미가 살아있는 전통주입니다.`,
  },
];

export const MOCK_ALCOHOL_INFOS: AlcoholInfo[] = Array.from(
  { length: 30 },
  (_, i) => {
    const category = getRandomElement(LIQUOR_CATEGORIES);
    const name = `${i % 2 === 0 ? "전통" : "프리미엄"} ${category} ${i + 1}호`;

    return {
      id: `liquor${i + 1}`,
      name,
      category,
      images: [
        {
          image: exampleImage,
          descriptionTitle: "전통 방식 그대로",
          descriptionCategory:
            i % 3 === 0 ? "유기농 생막걸리" : "프리미엄 전통주",
        },
        {
          image: exampleImage,
          descriptionTitle: "부드러운 감칠맛",
          descriptionCategory: `${category} 특유의 깊은 맛`,
        },
        {
          image: exampleImage,
          descriptionTitle: "건강한 발효주",
          descriptionCategory: "살아있는 유산균이 풍부",
        },
      ],
      option1: `${500 + i * 50}ml`,
      option2: `${6 + (i % 10)}%`,
      option3: getRandomElement(BREWERY_NAMES),
      option4: i % 3 === 0 ? "유기농 쌀 100%" : "전통 누룩 사용",
      isBookmarked: i % 4 === 0,
      rating: 3.5 + Math.random() * 1.5,
      reviews: generatePlaceReviews(3, ALCOHOL_REVIEW_TEMPLATES),
      recommendTitle: "페어링 안주 추천",
      recommendDescription: getRandomElement(ALCOHOL_RECOMMEND_DESCRIPTIONS),
      galleryImages: generateAlcoholGalleryImages(name),
    };
  },
);

export const MOCK_ALCOHOL_INFO: AlcoholInfo = MOCK_ALCOHOL_INFOS[0];

export const getMockAlcoholInfo = (): AlcoholInfo => {
  return MOCK_ALCOHOL_INFO;
};

export const MOCK_CURRENT_USER_ID = "user1";

export const MOCK_MY_REVIEW: LiquorComment = {
  id: "comment1",
  userId: "user1",
  username: "이도훈",
  userProfileImage: exampleImage,
  rating: 4,
  comment: "조금 씁슬한 맛이 조금 불호였지만 그래도 달콤하고 맛있었어요",
  date: "2026/12/12",
  likes: 0,
};

export const MOCK_LIQUOR_COMMENTS: LiquorComment[] = [
  MOCK_MY_REVIEW,
  ...Array.from({ length: 29 }, (_, i) => ({
    id: `comment${i + 2}`,
    userId: `user${i + 2}`,
    username: getRandomElement(KOREAN_REVIEWER_NAMES),
    userProfileImage: exampleImage,
    rating: generateRandomRating(),
    comment: getRandomElement(ALCOHOL_REVIEW_TEMPLATES),
    date: generateRandomDate(),
    likes: Math.floor(Math.random() * 20),
  })),
];
