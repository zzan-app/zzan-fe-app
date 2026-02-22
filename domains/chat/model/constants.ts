import type { RecommendedAnswer } from './chatModel';

export const DEFAULT_RECOMMENDED_ANSWERS: RecommendedAnswer[] = [
  {
    id: "rec1",
    text: "전통주에 대해 소개해줘!",
  },
  {
    id: "rec2",
    text: "달달한 전통주 추천해줘",
  },
  {
    id: "rec3",
    text: "맛이 엄청 깔끔한 전통주 추천해줘",
  },
];

export const CHAT_CONSTANTS = {
  RECOMMENDED_LABEL: '추천 질문',
  INPUT_PLACEHOLDER: '텍스트를 입력해주세요.',
  DEFAULT_RESPONSE: '기본 답변',
  INITIAL_GREETING_MESSAGES: [
    '안녕 만나서 반가워!',
    '오늘은 어떤 것을 도와줄까?',
  ],
  MAX_MESSAGE_LENGTH: 500,
} as const;
