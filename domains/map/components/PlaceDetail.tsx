import type { MapMarker } from "@/domains/map/model";
import { Rate } from "@/shared/components";
import { Colors, Typography } from "@/shared/constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PlaceDetailProps {
  place: MapMarker;
  onPlacePress: () => void;
}

const PlaceInfo = ({ place }: { place: MapMarker }) => (
  <View style={styles.placeInfoMain}>
    <View style={styles.placeTextContainer}>
      <View style={styles.nameRow}>
        <Text style={styles.placeName}>{place.name}</Text>
        <Text style={styles.feedCountText}>
          이 장소에서{" "}
          <Text style={styles.feedCountHighlight}>{place.feedCount}명</Text>이
          마셨어요!
        </Text>
      </View>
      <Text style={styles.placeAddress}>{place.address}</Text>
    </View>
  </View>
);

const RatingRow = ({ rating }: { rating: number }) => (
  <View style={styles.placeRatingRow}>
    <Text style={styles.ratingLabel}>평점</Text>
    <Rate rating={rating} size={22} />
    <Text style={styles.placeRatingText}>{rating.toFixed(1)}/5점 (123개)</Text>
  </View>
);

export const PlaceDetail = ({ place, onPlacePress }: PlaceDetailProps) => {
  return (
    <TouchableOpacity onPress={onPlacePress} activeOpacity={0.9}>
      <View style={styles.placeCard}>
        <PlaceInfo place={place} />
        <RatingRow rating={place.rating} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeCard: {
    backgroundColor: Colors.black,
    borderRadius: 6,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 14,
  },
  placeInfoMain: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  placeTextContainer: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeName: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    color: Colors.white,
    letterSpacing: -0.36,
  },
  placeAddress: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 12,
    color: Colors.white,
    letterSpacing: -0.24,
  },
  feedCountText: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 12,
    color: Colors.white,
    letterSpacing: -0.24,
  },
  feedCountHighlight: {
    color: Colors.yellow,
  },
  placeRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ratingLabel: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.white,
    textAlign: "center",
    letterSpacing: -0.24,
  },
  placeRatingText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 10,
    color: Colors.white,
    textAlign: "right",
    letterSpacing: -0.2,
  },
});
