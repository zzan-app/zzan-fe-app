import Alcohol from "@/assets/icons/alcohol.svg";
import { Colors, Layout, Typography } from "@/shared/constants";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export const LoadingBubble = () => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => {
        if (prev >= 6) {
          return 1;
        }
        return prev + 1;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, styles.botContainer]}>
      <View style={styles.bubbleContainer}>
        <View style={styles.iconWrapper}>
          <Alcohol width={24} height={24} />
        </View>
        <View style={styles.contentWrapper}>
          <View style={[styles.leftTail, { borderRightColor: Colors.white }]} />
          <View style={[styles.bubble, { backgroundColor: Colors.white }]}>
            <Text style={[styles.text, { color: Colors.black }]}>
              {".".repeat(dotCount)}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.timeText}> </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: Layout.MESSAGE_SPACING,
    paddingHorizontal: 10,
  },
  botContainer: {
    alignSelf: "flex-start",
  },
  bubbleContainer: {
    maxWidth: "85%",
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
  },
  bubble: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingVertical: Layout.INPUT_VERTICAL,
    borderRadius: 6,
    minWidth: 45,
    justifyContent: "center",
  },
  text: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    letterSpacing: 1,
  },
  timeText: {
    fontSize: 10,
    color: Colors.time,
    marginHorizontal: 8,
  },
  leftTail: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderTopColor: "transparent",
    marginRight: -2,
  },
});
