import Alcohol from "@/assets/icons/alcohol.svg";
import { Colors, Layout, Typography } from "@/shared/constants";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { LiquorSource, MessageRole } from "../model";
import { parseMessageText } from "../utils";
import { SourceCard } from "./SourceCard";

interface MessageBubbleProps {
  content: string;
  role: MessageRole;
  backgroundColor: string;
  textColor: string;
  timeText: string;
  showIcon?: boolean;
  sources?: LiquorSource[];
}

export const MessageBubble = ({
  content,
  role,
  backgroundColor,
  textColor,
  timeText,
  showIcon = true,
  sources,
}: MessageBubbleProps) => (
  <View
    style={[
      styles.container,
      role === "user" ? styles.userContainer : styles.botContainer,
    ]}
  >
    {role === "user" && <Text style={styles.timeText}>{timeText}</Text>}
    <View style={styles.bubbleContainer}>
      {showIcon && role === "bot" && (
        <View style={styles.iconWrapper}>
          <Alcohol width={24} height={24} />
        </View>
      )}
      <View style={styles.contentWrapper}>
        {role === "bot" && (
          <View
            style={[styles.leftTail, { borderRightColor: backgroundColor }]}
          />
        )}
        <View style={[styles.bubble, { backgroundColor }]}>
          <Text style={[styles.text, { color: textColor }]}>
            {parseMessageText(content).map((segment, index) => (
              <Text
                key={index}
                style={segment.isBold ? styles.boldText : undefined}
              >
                {segment.text}
              </Text>
            ))}
          </Text>
        </View>
        {role === "user" && (
          <View
            style={[styles.rightTail, { borderLeftColor: backgroundColor }]}
          />
        )}
      </View>
      {sources && sources.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.sourcesScrollView}
          contentContainerStyle={styles.sourcesContainer}
        >
          {sources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </ScrollView>
      )}
    </View>
    {role === "bot" && <Text style={styles.timeText}>{timeText}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: Layout.MESSAGE_SPACING,
    paddingHorizontal: 10,
  },
  userContainer: {
    alignSelf: "flex-end",
  },
  botContainer: {
    alignSelf: "flex-start",
  },
  bubbleContainer: {
    flexShrink: 1,
    maxWidth: "80%",
  },
  iconWrapper: {
    zIndex: 1,
    backgroundColor: Colors.yellow,
    width: 30,
    height: 30,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
    paddingHorizontal: 8,
  },
  bubble: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingVertical: Layout.INPUT_VERTICAL,
    borderRadius: 6,
  },
  text: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
  },
  timeText: {
    fontSize: 10,
    color: Colors.time,
  },
  leftTail: {
    position: "absolute",
    left: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderTopColor: "transparent",
    marginRight: -2,
  },
  rightTail: {
    position: "absolute",
    right: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderTopWidth: 10,
    borderTopColor: "transparent",
    marginLeft: -2,
  },
  boldText: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontWeight: "900",
  },
  sourcesScrollView: {
    marginTop: 8,
    marginHorizontal: 8,
  },
  sourcesContainer: {
    paddingRight: 10,
  },
});
