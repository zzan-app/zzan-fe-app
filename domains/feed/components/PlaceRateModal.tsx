import { PlaceSummary } from "./PlaceSummary";
import { RateStyleButton } from "./RateStyleButton";
import { PlaceWithRating } from "@/domains/feed/model";
import { Colors, Layout, Typography } from "@/shared/constants";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface PlaceRateModalProps {
  visible: boolean;
  selectedPlace: PlaceWithRating | null;
  tempRating: number;
  onClose: () => void;
  onRatingChange: (rating: number) => void;
  onSave: () => void;
}

const ANIMATION_DURATION_IN = 300;
const ANIMATION_DURATION_OUT = 200;
const BORDER_RADIUS_TOP = 8;

export const PlaceRateModal = ({
  visible,
  selectedPlace,
  tempRating,
  onClose,
  onRatingChange,
  onSave,
}: PlaceRateModalProps) => {
  const screenHeight = Dimensions.get("window").height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIMATION_DURATION_IN,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: ANIMATION_DURATION_OUT,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }).start();
    }
  }, [visible, translateY, screenHeight]);

  if (!visible || !selectedPlace) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.background} />
      <Animated.View
        style={[
          styles.modalContent,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.title}>짠-플레이스에서의 경험은 어떠셨나요?</Text>

        <PlaceSummary
          name={selectedPlace.name}
          address={selectedPlace.address}
          feedCount={selectedPlace.feedCount}
        />

        <View style={styles.rateSection}>
          <RateStyleButton
            title="취향에 얼마나 맞았나요?"
            rating={tempRating}
            onRatingChange={onRatingChange}
            onSave={onSave}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BORDER_RADIUS_TOP,
    borderTopRightRadius: BORDER_RADIUS_TOP,
    padding: 20,
    paddingBottom: 40,
    width: "100%",
    zIndex: 1001,
  },
  title: {
    fontSize: 16,
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    textAlign: "center",
    color: Colors.black,
    marginBottom: 20,
    marginTop: 10,
  },
  rateSection: {
    marginTop: Layout.SECTION_SPACING,
  },
});
