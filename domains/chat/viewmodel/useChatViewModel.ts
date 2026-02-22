import { useEffect, useState } from "react";
import { chatApi } from "../api";
import {
  CHAT_CONSTANTS,
  DEFAULT_RECOMMENDED_ANSWERS,
  getMockChatResponse,
  type ChatHistoryItem,
  type LiquorSource,
  type Message,
  type RecommendedAnswer,
} from "../model";
import { isMockEnabled } from "@/shared/utils";

const createMessage = (
  role: "user" | "bot",
  content: string,
  sources?: LiquorSource[]
): Message => ({
  id: `${Date.now()}-${Math.random()}`,
  role,
  content,
  timestamp: Date.now(),
  sources,
});

const buildChatHistory = (messages: Message[]): ChatHistoryItem[] => {
  return messages.map((msg) => ({
    role: msg.role === "user" ? "user" : "assistant",
    content: msg.content,
  }));
};

const fetchBotResponse = async (
  userMessage: string,
  messageHistory: Message[],
): Promise<{
  answer: string;
  source: LiquorSource[];
  suggestedQuestions: string[];
}> => {
  if (isMockEnabled()) {
    const mockResponse = getMockChatResponse(userMessage);
    return { answer: mockResponse.message, source: [], suggestedQuestions: [] };
  }

  try {
    const history = buildChatHistory(messageHistory);
    const response = await chatApi.sendMessage({
      query: userMessage,
      history,
    });

    return {
      answer: response.answer,
      source: response.sources,
      suggestedQuestions: response.suggested_questions,
    };
  } catch (error) {
    console.error("Chat API error:", error);
    return { answer: CHAT_CONSTANTS.DEFAULT_RESPONSE, source: [], suggestedQuestions: [] };
  }
};

export const useChatViewModel = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [recommendedAnswers, setRecommendedAnswers] = useState<
    RecommendedAnswer[]
  >([]);

  useEffect(() => {
    setRecommendedAnswers(DEFAULT_RECOMMENDED_ANSWERS);

    const initialMessages = CHAT_CONSTANTS.INITIAL_GREETING_MESSAGES.map(
      (content, index) => createMessage("bot", content),
    );
    setMessages(initialMessages);
  }, []);

  const addUserMessage = (text: string) => {
    const newMessage = createMessage("user", text);
    setMessages((prev) => [...prev, newMessage]);
  };

  const addBotMessage = (
    text: string,
    sources?: LiquorSource[],
    newSuggestedQuestions?: string[]
  ) => {
    const newMessage = createMessage("bot", text, sources);
    setMessages((prev) => [...prev, newMessage]);

    if (newSuggestedQuestions && newSuggestedQuestions.length > 0) {
      setRecommendedAnswers(
        newSuggestedQuestions.map((q, index) => ({
          id: `${Date.now()}-${index}`,
          text: q,
        })),
      );
    }

    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageText = inputValue;
    addUserMessage(messageText);
    setInputValue("");
    setIsLoading(true);

    const response = await fetchBotResponse(messageText, messages);
    addBotMessage(response.answer, response.source, response.suggestedQuestions);
  };

  const handleRecommendedAnswer = async (text: string) => {
    addUserMessage(text);
    setIsLoading(true);

    const response = await fetchBotResponse(text, messages);
    addBotMessage(response.answer, response.source, response.suggestedQuestions);
  };

  return {
    messages,
    isLoading,
    inputValue,
    setInputValue,
    recommendedAnswers,
    handleSendMessage,
    handleRecommendedAnswer,
  };
};
