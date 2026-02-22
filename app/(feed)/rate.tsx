import {
  AlcoholRateSection,
  FeedImageRate,
  RateProgressBar,
  RateStyleButton,
} from "@/domains/feed/components";
import { useRateViewModel } from "@/domains/feed/viewmodel";
import { Header } from "@/shared/components";
import { Colors, Layout, Typography } from "@/shared/constants";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function RateTab() {
  const {
    currentAlcohol,
    currentRatingIndex,
    totalAlcohols,
    tempRating,
    setTempRating,
    handleSaveRating,
    alcoholRatings,
    selectedAlcohols,
  } = useRateViewModel();

  const router = useRouter();

  if (!currentAlcohol) {
    return (
      <View style={styles.container}>
        <Header title="전통주 평가하기" onBackPress={() => router.back()} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>전통주를 먼저 추가해주세요</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="전통주 평가하기" onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageSection}>
          <FeedImageRate currentAlcoholId={currentAlcohol?.id ?? null} />
        </View>

        <View style={styles.paddedContent}>
          <Text style={styles.progressText}>
            마신 전통주의 맛을 평가해 주세요! ({currentRatingIndex + 1}/
            {totalAlcohols})
          </Text>

          <RateProgressBar current={currentRatingIndex} total={totalAlcohols} />

          <View style={styles.alcoholSection}>
            <AlcoholRateSection
              alcohols={selectedAlcohols}
              currentIndex={currentRatingIndex}
              ratings={alcoholRatings}
            />
          </View>

          <View style={styles.rateSection}>
            <RateStyleButton
              title="취향에 얼마나 맞았나요?"
              rating={tempRating}
              onRatingChange={setTempRating}
              onSave={handleSaveRating}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingBottom: 20,
  },
  imageSection: {
    marginBottom: Layout.SECTION_SPACING,
  },
  paddedContent: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  progressText: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    color: Colors.black,
    textAlign: "center",
    marginBottom: Layout.SECTION_SPACING,
  },
  alcoholSection: {
    marginBottom: 24,
  },
  rateSection: {
    marginBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.black,
  },
});
