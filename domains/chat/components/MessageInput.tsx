import UpArrow from "@/assets/icons/uparrow.svg";
import { TextInput } from "@/shared/components";
import { Layout, Typography } from "@/shared/constants";
import { Pressable, StyleSheet, View } from "react-native";

interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder: string;
  maxLength: number;
  backgroundColor: string;
  textColor: string;
  placeholderColor: string;
}

export const MessageInput = ({
  value,
  onChangeText,
  onSend,
  placeholder,
  maxLength,
  backgroundColor,
  textColor,
  placeholderColor,
}: MessageInputProps) => (
  <View style={[styles.container, { backgroundColor }]}>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={`${placeholderColor}80`}
      fontSize={Typography.INPUT_TEXT}
      maxLength={maxLength}
    />
    <Pressable onPress={onSend} style={styles.sendButton}>
      <UpArrow />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Layout.INPUT_HORIZONTAL,
    paddingVertical: Layout.INPUT_VERTICAL,
    borderRadius: Layout.INPUT_RADIUS,
    marginBottom: Layout.INPUT_MARGIN_BOTTOM,
  },
  sendButton: {
    padding: 8,
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
});
