import { Colors, Layout, Typography } from "../constants";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface AlcoholButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const AlcoholButton = ({
  title,
  onPress,
  disabled,
}: AlcoholButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.black,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    gap: Layout.ITEM_SPACING,
  },
  title: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.yellow,
  },
});
