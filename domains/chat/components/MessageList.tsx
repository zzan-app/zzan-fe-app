import { Layout } from '@/shared/constants';
import { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { Message } from '../model';
import { LoadingBubble } from './LoadingBubble';

interface MessageListProps {
  messages: Message[];
  renderMessage: (message: Message, index: number) => React.ReactNode;
  isLoading?: boolean;
}

export const MessageList = ({ messages, renderMessage, isLoading }: MessageListProps) => {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, isLoading]);

  return (
    <ScrollView ref={scrollRef} style={styles.list} contentContainerStyle={styles.content}>
      {messages.map((message, index) => renderMessage(message, index))}
      {isLoading && <LoadingBubble />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    padding: Layout.SCREEN_HORIZONTAL,
  },
});
