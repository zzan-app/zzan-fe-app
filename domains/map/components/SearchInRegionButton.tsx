import RotateIcon from "@/assets/icons/rotate.svg";
import { Colors, Layout, Typography } from "@/shared/constants";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
interface SearchInRegionButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

export const SearchInRegionButton = ({
  onPress,
  isLoading,
}: SearchInRegionButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.7}
      accessibilityLabel="현 지도에서 피드 찾기"
      accessibilityRole="button"
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.yellow} size="small" />
      ) : (
        <View style={styles.container}>
          <RotateIcon />
          <Text style={styles.text}>현 지도에서 피드 찾기</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "40%",
    backgroundColor: Colors.black,
    height: 40,
    marginHorizontal: Layout.SCREEN_HORIZONTAL,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    color: Colors.yellow,
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
  },
  container: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
