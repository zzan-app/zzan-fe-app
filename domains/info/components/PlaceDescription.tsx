import { Colors, Layout, Typography } from "@/shared/constants";
import { StyleSheet, Text, View } from "react-native";

interface PlaceDescriptionProps {
  description: string;
}

export const PlaceDescription = ({ description }: PlaceDescriptionProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingBottom: 0,
    backgroundColor: Colors.white,
  },
  description: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    lineHeight: 22,
  },
});
