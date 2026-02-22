import {
  MessageBubble,
  MessageInput,
  MessageList,
  RecommendedAnswers,
} from "@/domains/chat/components";
import { CHAT_CONSTANTS, type Message } from "@/domains/chat/model";
import { useChatViewModel } from "@/domains/chat/viewmodel";
import { Header } from "@/shared/components";
import { Colors, Layout } from "@/shared/constants";
import { useFormatTime } from "@/shared/hooks";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const shouldShowIcon = (messages: Message[], index: number): boolean => {
  const currentMessage = messages[index];

  if (currentMessage.role !== "bot") {
    return false;
  }

  if (index === 0) {
    return true;
  }

  const previousMessage = messages[index - 1];
  return previousMessage.role !== "bot";
};

export default function ChatTab() {
  const vm = useChatViewModel();
  const { formatTime } = useFormatTime();
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <View style={{ flex: 1, backgroundColor: Colors.takju }}>
        <Header title="AI 챗봇" onBackPress={() => router.back()} />
        <MessageList
          messages={vm.messages}
          isLoading={vm.isLoading}
          renderMessage={(msg, index) => (
            <MessageBubble
              key={msg.id}
              content={msg.content}
              role={msg.role}
              backgroundColor={msg.role === "user" ? Colors.gray : Colors.white}
              textColor={Colors.black}
              timeText={formatTime(msg.timestamp)}
              showIcon={shouldShowIcon(vm.messages, index)}
              sources={msg.sources}
            />
          )}
        />
        <View style={styles.inputContainer}>
          <View style={styles.horizontalPadding}>
            <RecommendedAnswers
              answers={vm.recommendedAnswers}
              onSelectAnswer={vm.handleRecommendedAnswer}
              labelColor={Colors.black}
              chipBackgroundColor={Colors.yellow}
              chipTextColor={Colors.black}
            />
          </View>
          <View style={styles.inputWrapper}>
            <MessageInput
              value={vm.inputValue}
              onChangeText={vm.setInputValue}
              onSend={vm.handleSendMessage}
              placeholder={CHAT_CONSTANTS.INPUT_PLACEHOLDER}
              maxLength={CHAT_CONSTANTS.MAX_MESSAGE_LENGTH}
              backgroundColor={Colors.takju}
              textColor={Colors.black}
              placeholderColor={Colors.black}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: Colors.white,
  },
  horizontalPadding: {
    paddingHorizontal: 10,
  },
  inputWrapper: {
    marginHorizontal: Layout.SCREEN_HORIZONTAL,
  },
});
