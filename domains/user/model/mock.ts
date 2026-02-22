import { User, UserFeed, UserScrapAlcohol } from "@/domains/user/model";

const PLACE_DATA = [
  { name: "울산 문화의거리", address: "울산광역시 중구 성남동 329-5" },
  { name: "서울 종로 전통주 거리", address: "서울특별시 종로구 종로3가 112" },
  { name: "전주 한옥마을", address: "전라북도 전주시 완산구 기린대로 99" },
  { name: "경주 교동법주마을", address: "경상북도 경주시 교동 69" },
  { name: "부산 광안리 해변", address: "부산광역시 수영구 광안해변로 219" },
  { name: "대전 으능정이 거리", address: "대전광역시 중구 은행동 145" },
  { name: "강릉 경포대", address: "강원도 강릉시 경포로 365" },
  { name: "인천 차이나타운", address: "인천광역시 중구 차이나타운로 12" },
  { name: "대구 동성로", address: "대구광역시 중구 동성로2가 82" },
  { name: "광주 양동시장", address: "광주광역시 동구 금남로 245" },
  { name: "평창 올림픽 타운", address: "강원도 평창군 대관령면 올림픽로 715" },
  { name: "여수 엑스포", address: "전라남도 여수시 박람회길 1" },
  { name: "인사동 전통주점", address: "서울특별시 종로구 인사동길 62" },
  { name: "남산골 한옥마을", address: "서울특별시 중구 퇴계로34길 28" },
  {
    name: "제주 성읍민속마을",
    address: "제주특별자치도 서귀포시 표선면 성읍정의현로 19",
  },
  { name: "수원 화성행궁", address: "경기도 수원시 팔달구 정조로 825" },
  { name: "춘천 막국수 거리", address: "강원도 춘천시 신북읍 신북로 1446" },
  { name: "안동 하회마을", address: "경상북도 안동시 풍천면 하회종가길 2-1" },
  { name: "청주 문화의 거리", address: "충청북도 청주시 상당구 북문로1가 55" },
  { name: "목포 근대역사문화공간", address: "전라남도 목포시 번화로 18" },
];

const LIQUOR_DATA = [
  { name: "연천 율무 동동주", type: "탁주" },
  { name: "가평 잣막걸리", type: "탁주" },
  { name: "오곡 진상주", type: "약주" },
  { name: "안동소주", type: "증류주" },
  { name: "문배주", type: "증류주" },
  { name: "복분자주", type: "과실주" },
  { name: "이강주", type: "증류주" },
  { name: "한산소곡주", type: "약주" },
  { name: "경주법주", type: "약주" },
  { name: "막걸리 1931", type: "탁주" },
  { name: "서울장수 막걸리", type: "탁주" },
  { name: "느린마을 막걸리", type: "탁주" },
  { name: "국순당 쌀막걸리", type: "탁주" },
  { name: "배상면주가 산사춘", type: "약주" },
  { name: "복순도가 송화백일주", type: "약주" },
  { name: "제주 오메기술", type: "탁주" },
  { name: "진도홍주", type: "증류주" },
  { name: "금산인삼주", type: "약주" },
  { name: "담양 대나무술", type: "약주" },
  { name: "전주 이강주", type: "증류주" },
  { name: "청명주", type: "청주" },
  { name: "국화주", type: "약주" },
  { name: "송순주", type: "약주" },
  { name: "계룡백일주", type: "약주" },
  { name: "송화백일주", type: "약주" },
];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomRating = (): number => {
  const rating = 3.5 + Math.random() * 1.5;
  return Math.round(rating * 10) / 10;
};

const generateRandomReviewCount = (): number => {
  return Math.floor(Math.random() * 200) + 50;
};

const generateRandomAlcoholCount = (): number => {
  return Math.floor(Math.random() * 5) + 1;
};

export const mockUser: User = {
  id: "01HQ1234567890ABCDEF",
  name: "홍길동",
  profileImage: require("@/assets/images/example_profile_girl.jpg"),
  profileImageUrl: null,
  emptyAlcoholCount: 3,
  birthDate: "2007.12.12",
  birth: "2007-12-12",
  phone: "010-1111-1111",
  email: "hello@gmail.com",
  role: "USER",
};

export const mockUserFeeds: UserFeed[] = Array.from({ length: 20 }, (_, i) => {
  const place = getRandomElement(PLACE_DATA);
  return {
    id: `feed${i + 1}`,
    imageUrl: require("@/assets/images/example_feed.jpg"),
    placeName: place.name,
    address: place.address,
    alcoholCount: generateRandomAlcoholCount(),
  };
});

export const mockUserScrapFeeds: UserFeed[] = Array.from(
  { length: 15 },
  (_, i) => {
    const place = getRandomElement(PLACE_DATA);
    return {
      id: `scrapfeed${i + 1}`,
      imageUrl: require("@/assets/images/example_feed.jpg"),
      placeName: place.name,
      address: place.address,
      alcoholCount: generateRandomAlcoholCount(),
    };
  },
);

export const mockUserScrapAlcohols: UserScrapAlcohol[] = Array.from(
  { length: 25 },
  (_, i) => {
    const liquor = getRandomElement(LIQUOR_DATA);
    return {
      id: `alcohol${i + 1}`,
      imageUrl: require("@/assets/images/example_image.png"),
      name: liquor.name,
      type: liquor.type,
      rating: generateRandomRating(),
      reviewCount: generateRandomReviewCount(),
    };
  },
);
