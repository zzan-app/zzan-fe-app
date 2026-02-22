import {
  type ImageWithDescription,
} from "@/domains/info/model";
import { Colors, Layout, Typography } from "@/shared/constants";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { interpolate } from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CENTER_IMAGE_WIDTH = SCREEN_WIDTH * 0.6;
const IMAGE_HEIGHT = 200;

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const PairingSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <View style={styles.pairingSection}>
    <SectionTitle title={title} />
    <Text style={styles.pairingDescription}>{description}</Text>
  </View>
);

const ImageGallery = ({
  images,
  onIndexChange,
}: {
  images: ImageWithDescription[];
  onIndexChange: (index: number) => void;
}) => {
  return (
    <View style={styles.galleryWrapper}>
      <Carousel
        loop={false}
        width={SCREEN_WIDTH}
        height={IMAGE_HEIGHT}
        style={{
          width: SCREEN_WIDTH,
        }}
        data={images}
        pagingEnabled={true}
        snapEnabled={true}
        scrollAnimationDuration={600}
        onProgressChange={(_offsetProgress, absoluteProgress) => {
          const index = Math.round(absoluteProgress);
          onIndexChange(index);
        }}
        customAnimation={(value: number) => {
          "worklet";
          const opacity = interpolate(value, [-1, 0, 1], [0.5, 1, 0.5]);

          const translateX = interpolate(
            value,
            [-1, 0, 1],
            [-SCREEN_WIDTH * 0.5, 0, SCREEN_WIDTH * 0.5],
          );

          const scale = interpolate(value, [-1, 0, 1], [0.85, 1, 0.85]);

          const zIndex = interpolate(value, [-1, 0, 1], [1, 10, 1]);

          return {
            opacity,
            zIndex,
            transform: [{ translateX }, { scale }],
          };
        }}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image
              source={item.image}
              style={styles.galleryImage}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
};

const ImageDescriptionText = ({
  title,
  category,
}: {
  title: string;
  category: string;
}) => (
  <View style={styles.imageDescriptionContainer}>
    <Text style={styles.descriptionTitle}>{title}</Text>
    <Text style={styles.descriptionCategory}>{category}</Text>
  </View>
);

interface AlcoholDescriptionProps {
  recommendTitle: string;
  recommendDescription: string;
  images: ImageWithDescription[];
}

export const AlcoholDescription = ({
  recommendTitle,
  recommendDescription,
  images,
}: AlcoholDescriptionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <PairingSection
        title={recommendTitle}
        description={recommendDescription}
      />
      <Text style={styles.basicInfo}>기본 정보</Text>
      <ImageGallery images={images} onIndexChange={setCurrentIndex} />
      <ImageDescriptionText
        title={images[currentIndex].descriptionTitle}
        category={images[currentIndex].descriptionCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    marginBottom: 12,
  },
  pairingSection: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  pairingDescription: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    lineHeight: 18,
  },
  basicInfo: {
    marginTop: 20,
    color: Colors.black,
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 12,
    textAlign: "center",
  },
  galleryWrapper: {
    marginVertical: 20,
    alignItems: "center",
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  galleryImage: {
    width: CENTER_IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 12,
  },
  imageDescriptionContainer: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingTop: 6,
    alignItems: "center",
  },
  descriptionTitle: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 16,
    color: Colors.black,
    marginBottom: Layout.ITEM_SPACING,
    textAlign: "center",
  },
  descriptionCategory: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    opacity: 0.5,
    textAlign: "center",
  },
});
