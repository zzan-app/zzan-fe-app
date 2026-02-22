import { Alcohol } from "@/domains/feed/model";
import { Rate } from "@/shared/components";
import { Colors, Typography } from "@/shared/constants";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AlcoholCardProps {
  alcohol: Alcohol;
  isFocused: boolean;
  rating?: number;
  onPress?: () => void;
}

export const AlcoholCard = ({
  alcohol,
  isFocused,
  rating,
  onPress,
}: AlcoholCardProps) => {
  const hasRating = rating !== undefined;

  const content = (
    <View
      style={[
        styles.card,
        isFocused && styles.focusedCard,
        !hasRating && styles.cardCompact,
      ]}
    >
      <View style={styles.topInfo}>
        <Image source={alcohol.imageUrl} style={styles.image} />
        <View
          style={[styles.cardContent, !hasRating && styles.cardContentCompact]}
        >
          <Text style={styles.name} numberOfLines={1}>
            {alcohol.name}
          </Text>
          <Text style={styles.type}>#{alcohol.type}</Text>
        </View>
      </View>

      {hasRating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>평점</Text>
          <Rate rating={rating} size={22} />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: Colors.takju,
    borderRadius: 6,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardCompact: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  focusedCard: {
    borderColor: Colors.black,
  },
  topInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 2,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardContentCompact: {
    justifyContent: "space-between",
  },
  name: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.36,
  },
  type: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 10,
    color: Colors.black,
    letterSpacing: -0.24,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ratingLabel: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.24,
  },
});
