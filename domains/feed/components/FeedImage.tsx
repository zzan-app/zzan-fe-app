import CameraIcon from "@/assets/icons/camera.svg";
import { ImageProgressBar } from "./ImageProgressBar";
import { TagIcon } from "./TagIcon";
import { TagPosition } from "@/domains/feed/model";
import { usePostStore } from "@/domains/feed/store";
import { Colors, SCREEN_WIDTH, Typography } from "@/shared/constants";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  GestureResponderEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

const DescriptionBlock = () => {
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>
        사진을 꾹 눌러 전통주 정보를 추가하세요
      </Text>
    </View>
  );
};

const pickImages = async (onSuccess: (uris: string[]) => void) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsMultipleSelection: true,
    quality: 1,
  });

  if (result.canceled) return;

  const uris = result.assets.map((asset) => asset.uri);
  onSuccess(uris);
};

const renderInitialUploadButton = (onPress: () => void) => (
  <TouchableOpacity style={styles.uploadButton} onPress={onPress}>
    <CameraIcon width={40} height={40} fill={Colors.gray} />
  </TouchableOpacity>
);

export const FeedImage = () => {
  const router = useRouter();
  const {
    selectedAlcohols,
    removeSelectedAlcohol,
    setEditingTagIndex,
    setUploadedImages,
    imageTags,
    addImageTag,
    currentImageIndex,
    setCurrentImageIndex,
    addAlcoholTagMapping,
  } = usePostStore();

  const [images, setImages] = useState<string[]>([]);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (images.length === 0) return;

    const targetPercentage = ((currentImageIndex + 1) / images.length) * 100;
    Animated.timing(animatedWidth, {
      toValue: targetPercentage,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [currentImageIndex, images.length, animatedWidth]);

  const handleInitialUpload = () => {
    pickImages((uris) => {
      setImages(uris);
      setUploadedImages(uris);
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentImageIndex(index);
  };

  const handleImageLongPress = (
    index: number,
    event: GestureResponderEvent,
  ) => {
    const { locationX, locationY } = event.nativeEvent;

    const normalizedX = locationX / SCREEN_WIDTH;
    const normalizedY = locationY / SCREEN_WIDTH;

    const newTag: TagPosition = { x: normalizedX, y: normalizedY };

    addImageTag(index, newTag);

    const currentTags = imageTags.get(index) || [];
    setEditingTagIndex(currentTags.length);

    router.push("/add?type=alcohol");
  };

  useEffect(() => {
    if (selectedAlcohols.length === 0) return;

    const lastAlcohol = selectedAlcohols[selectedAlcohols.length - 1];
    const currentTags = imageTags.get(currentImageIndex) || [];

    if (currentTags.length > 0) {
      const lastTagIndex = currentTags.length - 1;
      const tagPosition = currentTags[lastTagIndex];
      addAlcoholTagMapping(lastAlcohol.id, currentImageIndex, tagPosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAlcohols.length]);

  const handleTagPress = (tagIndex: number) => {
    const alcohol = selectedAlcohols[tagIndex];
    if (alcohol) removeSelectedAlcohol(alcohol.id);

    setEditingTagIndex(tagIndex);
    router.push("/add?type=alcohol");
  };

  const renderImageWithTags = (uri: string, index: number) => {
    const currentImageTags = imageTags.get(index) || [];

    return (
      <Pressable
        key={index}
        style={styles.imageContainer}
        onLongPress={(e) => handleImageLongPress(index, e)}
        delayLongPress={500}
      >
        <Image source={{ uri }} style={styles.image} />
        {currentImageTags.map((tag, tagIndex) => (
          <TagIcon
            key={tagIndex}
            pixelX={tag.x * SCREEN_WIDTH}
            pixelY={tag.y * SCREEN_WIDTH}
            onPress={() => handleTagPress(tagIndex)}
          />
        ))}
      </Pressable>
    );
  };

  if (images.length === 0) {
    return (
      <View style={styles.wrapper}>
        {renderInitialUploadButton(handleInitialUpload)}
        <DescriptionBlock />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((uri, index) => renderImageWithTags(uri, index))}
      </ScrollView>
      <DescriptionBlock />
      <ImageProgressBar
        totalImages={images.length}
        animatedWidth={animatedWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  container: {
    width: "100%",
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
  descriptionContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: Colors.black,
    position: "absolute",
    top: 20,
    left: 12,
    zIndex: 999,
    elevation: 5,
  },
  descriptionText: {
    color: Colors.white,
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 10,
  },
  uploadButton: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: Colors.takju,
    justifyContent: "center",
    alignItems: "center",
  },
});
