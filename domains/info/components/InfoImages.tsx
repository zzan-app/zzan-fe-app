import { Colors } from "@/shared/constants";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

interface InfoImagesProps {
  images: ImageSourcePropType[];
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const InfoImages = ({ images }: InfoImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const targetPercentage = ((currentIndex + 1) / images.length) * 100;
    Animated.timing(animatedWidth, {
      toValue: targetPercentage,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [currentIndex, images.length, animatedWidth]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const renderImage = ({ item }: { item: ImageSourcePropType }) => (
    <Image source={item} style={styles.image} resizeMode="cover" />
  );

  const renderProgressBar = () => {
    if (images.length <= 1) {
      return null;
    }

    const animatedWidthStyle = {
      width: animatedWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
      }),
    };

    return (
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, animatedWidthStyle]} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {renderProgressBar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 360,
  },
  image: {
    width: SCREEN_WIDTH,
    height: 360,
  },
  progressBarContainer: {
    position: "absolute",
    bottom: 16,
    width: "50%",
    paddingHorizontal: 16,
    alignSelf: "center",
  },
  progressBarBackground: {
    width: "100%",
    height: 4,
    backgroundColor: Colors.white,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.black,
  },
});
