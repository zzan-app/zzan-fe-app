import StarEmpty from "@/assets/icons/star_empty.svg";
import StarFull from "@/assets/icons/star_full.svg";
import { PlaceWithRating } from "@/domains/feed/model";
import { Rate } from "@/shared/components";
import { Colors, Typography } from "@/shared/constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FeedDetailPlaceProps {
  place: PlaceWithRating;
  placeRating: number;
  reviewCount?: number;
  onPlacePress: () => void;
}

const MAX_STARS = 5;
const STAR_SIZE = 16;

export const FeedDetailPlace = ({
  place,
  placeRating,
  reviewCount,
  onPlacePress,
}: FeedDetailPlaceProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: MAX_STARS }, (_, index) => {
      const isFilled = index + 1 <= rating;
      return (
        <View key={index}>
          {isFilled ? (
            <StarFull width={STAR_SIZE} height={STAR_SIZE} />
          ) : (
            <StarEmpty width={STAR_SIZE} height={STAR_SIZE} />
          )}
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>짠-플레이스</Text>

      <View style={styles.satisfactionContainer}>
        <Text style={styles.satisfactionLabel}>공간 만족도</Text>
        <View style={styles.starsContainer}>{renderStars(placeRating)}</View>
        <Text style={styles.satisfactionScore}>
          {placeRating}/{MAX_STARS}점
        </Text>
      </View>

      <TouchableOpacity onPress={onPlacePress} activeOpacity={0.9}>
        <View style={styles.placeCard}>
          <View style={styles.placeInfoMain}>
            <View style={styles.placeTextContainer}>
              <View style={styles.nameRow}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.feedCountText}>
                  이 장소에서{" "}
                  <Text style={styles.feedCountHighlight}>
                    {place.feedCount}명
                  </Text>
                  이 마셨어요!
                </Text>
              </View>
              <Text style={styles.placeAddress}>{place.address}</Text>
            </View>
          </View>

          <View style={styles.placeRatingRow}>
            <Text style={styles.ratingLabel}>평점</Text>
            <Rate rating={place.rating} size={22} />
            <Text style={styles.placeRatingText}>
              {place.rating.toFixed(1)}/5점
              {reviewCount !== undefined ? ` (${reviewCount}개)` : ""}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 14,
    color: Colors.black,
  },
  satisfactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.takju,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 10,
    alignSelf: "flex-start",
  },
  satisfactionLabel: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 10,
    color: Colors.black,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  satisfactionScore: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 8,
    color: Colors.black,
  },
  placeCard: {
    backgroundColor: Colors.black,
    borderRadius: 8,
    padding: 12,
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
    fontSize: 14,
    color: Colors.white,
  },
  placeAddress: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 12,
    color: Colors.white,
    opacity: 0.7,
  },
  feedCountText: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 10,
    color: Colors.white,
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
  },
  placeRatingText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 10,
    color: Colors.white,
  },
});
