import { InfoRate, PlaceTemporalSummary } from "@/domains/info/components";
import { usePlaceTemporalViewModel } from "@/domains/info/viewmodel";
import { FeedBlockWithProfile } from "@/domains/user/components";
import { AlcoholButton, Header } from "@/shared/components";
import { Colors, Layout } from "@/shared/constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const renderLoadingState = () => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color={Colors.purple} />
  </View>
);

const renderErrorState = (message: string) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

export default function PlaceTemporalTab() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const placeId = params.placeId as string | undefined;
  const kakaoPlaceId = params.kakaoPlaceId as string | undefined;
  const userLatitude = params.userLatitude
    ? parseFloat(params.userLatitude as string)
    : undefined;
  const userLongitude = params.userLongitude
    ? parseFloat(params.userLongitude as string)
    : undefined;

  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  const {
    placeInfo,
    isLoading,
    error,
    isBookmarked,
    distance,
    placeFeeds,
    isFeedsLoading,
    toggleBookmark,
    handleAlcoholButtonPress,
  } = usePlaceTemporalViewModel({
    placeId,
    kakaoPlaceIdParam: kakaoPlaceId,
    userLatitude,
    userLongitude,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="짠 플레이스" onBackPress={() => router.back()} />
        {renderLoadingState()}
      </View>
    );
  }

  if (error || !placeInfo) {
    return (
      <View style={styles.container}>
        <Header title="짠 플레이스" onBackPress={() => router.back()} />
        {renderErrorState(error || "장소를 찾을 수 없습니다")}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="짠 플레이스" onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: safeBottom }}
      >
        <PlaceTemporalSummary
          name={placeInfo.name}
          address={placeInfo.address}
          phone={placeInfo.phone}
          distance={distance}
          isBookmarked={isBookmarked}
          onBookmarkPress={toggleBookmark}
        />

        <View style={styles.buttonContainer}>
          <AlcoholButton
            title="이 장소에서 전통주를 먹었어요"
            onPress={handleAlcoholButtonPress}
          />
        </View>

        <View style={styles.line} />

        <InfoRate rating={placeInfo.rating} reviewCount={placeInfo.feedCount} />

        {placeFeeds.length > 0 && (
          <View style={styles.feedsSection}>
            {isFeedsLoading ? (
              <ActivityIndicator size="small" color={Colors.purple} />
            ) : (
              <View style={styles.feedGrid}>
                {placeFeeds.map((feed) => (
                  <FeedBlockWithProfile
                    key={feed.id}
                    userId={feed.userId}
                    username={feed.userName}
                    userProfileImage={feed.userProfileImage || ""}
                    imageUrl={feed.imageUrl || ""}
                    placeName={feed.placeName}
                    address={feed.placeAddress}
                    alcoholCount={feed.alcoholCount}
                    onPress={() =>
                      router.push({
                        pathname: "/detail",
                        params: { feedId: feed.id },
                      })
                    }
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: Colors.black,
  },
  buttonContainer: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingTop: Layout.SECTION_SPACING,
    paddingBottom: 0,
  },
  line: {
    backgroundColor: Colors.black,
    marginHorizontal: Layout.SCREEN_HORIZONTAL,
    marginVertical: Layout.SECTION_SPACING,
    height: 2,
  },
  feedsSection: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingVertical: Layout.SECTION_SPACING,
  },
  feedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
