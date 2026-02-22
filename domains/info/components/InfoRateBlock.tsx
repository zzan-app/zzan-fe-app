import { Colors, Layout } from "@/shared/constants";
import {
  Dimensions,
  Image,
  type ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BLOCK_WIDTH =
  (SCREEN_WIDTH - Layout.SCREEN_HORIZONTAL * 2 - Layout.ITEM_SPACING) / 2;

interface InfoRateBlockProps {
  width?: number;
  imageUrl?: ImageSourcePropType;
}

export const InfoRateBlock = ({
  width = BLOCK_WIDTH,
  imageUrl,
}: InfoRateBlockProps) => {
  if (imageUrl) {
    return (
      <Image
        source={imageUrl}
        style={[styles.image, { width, height: width }]}
        resizeMode="cover"
      />
    );
  }

  return <View style={[styles.container, { width, height: width }]} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.yellow,
    borderRadius: 12,
  },
  image: {
    borderRadius: 12,
  },
});
