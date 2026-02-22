import { useEffect } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Layout, Typography } from "../constants";

interface ToastProps {
  message: string | null;
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  visible,
  onHide,
  duration = 3000,
}: ToastProps) => {
  const insets = useSafeAreaInsets();
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (!visible) return;

    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onHide());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible || !message) return null;

  return (
    <Animated.View
      style={[styles.container, { top: insets.top + 16, opacity }]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: Layout.SCREEN_HORIZONTAL,
    right: Layout.SCREEN_HORIZONTAL,
    backgroundColor: Colors.black,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingVertical: 12,
    borderRadius: 8,
    zIndex: 9999,
  },
  message: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.white,
    textAlign: "center",
  },
});
