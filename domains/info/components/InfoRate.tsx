import { Rate } from "@/shared/components";
import { Colors, Layout, Typography } from "@/shared/constants";
import { StyleSheet, Text, View } from "react-native";

interface InfoRateProps {
  rating: number;
  reviewCount: number;
}

const styles = StyleSheet.create({
  container: {},
  header: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    marginBottom: 12,
  },
  title: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    color: Colors.black,
    marginBottom: Layout.ITEM_SPACING,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Layout.ITEM_SPACING,
  },
  ratingText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 10,
    color: Colors.black,
  },
  ratingCountsContainer: {
    paddingTop: Layout.SECTION_SPACING,
    marginBottom: -4,
  },
  ratingCounts: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
  },
  emptyContainer: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingVertical: 20,
  },
  emptyText: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
  },
});

export const InfoRate = ({ rating, reviewCount }: InfoRateProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>후기 평점</Text>
        <View style={styles.ratingContainer}>
          <Rate rating={reviewCount > 0 ? rating : 0} />
          <Text style={styles.ratingText}>{rating.toFixed(1)} / 5점</Text>
        </View>
        <View style={styles.ratingCountsContainer}>
          <Text style={styles.ratingCounts}>사용자 후기 ({reviewCount}개)</Text>
        </View>
      </View>
      {reviewCount === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>피드가 없습니다.</Text>
        </View>
      )}
    </View>
  );
};
