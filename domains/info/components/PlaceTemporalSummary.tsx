import { BookMark } from "@/shared/components";
import { Colors, Layout, Typography } from "@/shared/constants";
import { StyleSheet, Text, View } from "react-native";

interface PlaceTemporalSummaryProps {
  name: string;
  address: string;
  phone: string;
  distance: string | null;
  isBookmarked: boolean;
  onBookmarkPress: () => void;
}

const InfoBoxItem = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => (
  <View style={styles.infoBox}>
    <View style={styles.infoBoxCategory}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value || "거리 계산 중..."}</Text>
  </View>
);

export const PlaceTemporalSummary = ({
  name,
  address,
  phone,
  distance,
  isBookmarked,
  onBookmarkPress,
}: PlaceTemporalSummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <BookMark isBookmarked={isBookmarked} onPress={onBookmarkPress} />
        </View>
        <Text style={styles.address}>{address}</Text>
      </View>
      <View style={styles.infoBoxContainer}>
        <InfoBoxItem label="전화번호" value={phone} />
        <InfoBoxItem label="거리" value={distance} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingVertical: Layout.SECTION_SPACING,
  },
  headerContainer: {
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 22,
    color: Colors.black,
    letterSpacing: -0.44,
    flex: 1,
  },
  address: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
  infoBoxContainer: {
    marginTop: 12,
    gap: 10,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  infoBoxCategory: {
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  label: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.white,
    paddingVertical: 6,
    width: 84,
    textAlign: "center",
  },
  value: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    flex: 1,
    textAlign: "right",
    letterSpacing: -0.28,
  },
});
