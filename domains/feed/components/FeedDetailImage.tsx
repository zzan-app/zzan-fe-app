import { AlcoholCounts } from "./AlcoholCounts";
import { ImageProgressBar } from "./ImageProgressBar";
import { TagIcon } from "./TagIcon";
import { AlcoholTagInfo, FeedImage } from "@/domains/feed/model";
import { SCREEN_WIDTH } from "@/shared/constants";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  ImageSourcePropType,
  Animated as RNAnimated,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

interface FeedDetailImageProps {
  images: FeedImage[];
  alcoholTagMappings: AlcoholTagInfo[];
  onTagPress: (alcoholId: string) => void;
}

const renderImageWithTags = (
  imageSource: ImageSourcePropType,
  index: number,
  tagsForImage: AlcoholTagInfo[],
  onTagPress: (alcoholId: string) => void,
) => (
  <View key={index} style={styles.imageContainer}>
    <Image source={imageSource} style={styles.image} />
    {tagsForImage.map((tag, tagIndex) => (
      <TagIcon
        key={`${tag.alcoholId}-${tag.imageIndex}-${tagIndex}`}
        pixelX={tag.tagPosition.x * SCREEN_WIDTH}
        pixelY={tag.tagPosition.y * SCREEN_WIDTH}
        onPress={() => onTagPress(tag.alcoholId)}
      />
    ))}
  </View>
);

export const FeedDetailImage = ({
  images,
  alcoholTagMappings,
  onTagPress,
}: FeedDetailImageProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const animatedWidth = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    if (images.length === 0) return;

    const targetPercentage = ((currentImageIndex + 1) / images.length) * 100;
    RNAnimated.timing(animatedWidth, {
      toValue: targetPercentage,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [currentImageIndex, images.length, animatedWidth]);

  const handleScroll = (event: {
    nativeEvent: { contentOffset: { x: number } };
  }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentImageIndex(newIndex);
  };

  if (images.length === 0) return null;

  const alcoholCount = alcoholTagMappings.length;

  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => {
          const tagsForImage = alcoholTagMappings.filter(
            (tag) => tag.imageIndex === index,
          );
          return renderImageWithTags(
            image.uri,
            index,
            tagsForImage,
            onTagPress,
          );
        })}
      </ScrollView>
      <ImageProgressBar
        totalImages={images.length}
        animatedWidth={animatedWidth}
      />
      <AlcoholCounts count={alcoholCount} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    position: "relative",
  },
  image: {
    width: "100%",
    height: SCREEN_WIDTH,
    resizeMode: "cover",
  },
});
