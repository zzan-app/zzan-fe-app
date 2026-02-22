import { useFeedTabViewModel } from "@/domains/feed/viewmodel";
import { FeedBlockWithProfile } from "@/domains/user/components";
import { Colors, Layout, Typography } from "@/shared/constants";
import { router } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = ({ currentTime }: { currentTime: string }) => (
  <View style={styles.header}>
    <Text style={styles.title}>최신 피드</Text>
    <Text style={styles.currentTime}>{currentTime} 기준</Text>
  </View>
);

export default function FeedTab() {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top;

  const TAB_BAR_HEIGHT = 60;
  const bottomSpace =
    (insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK) + TAB_BAR_HEIGHT;

  const { currentTime, recentFeeds, isLoading, error, hasNext, loadMore } =
    useFeedTabViewModel();

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header currentTime={currentTime} />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomSpace + 24 },
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          const isCloseToBottom =
            nativeEvent.layoutMeasurement.height +
              nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - 50;

          if (isCloseToBottom && hasNext && !isLoading) {
            loadMore();
          }
        }}
        scrollEventThrottle={400}
      >
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={styles.feedGrid}>
          {recentFeeds.map((feed) => (
            <FeedBlockWithProfile
              key={feed.id}
              userId={feed.userId}
              username={feed.userName}
              userProfileImage={feed.userProfileImage}
              imageUrl={feed.imageUrl}
              placeName={feed.placeName}
              address={feed.placeAddress}
              alcoholCount={feed.liquorCount}
              onPress={() => router.push(`/detail?feedId=${feed.id}` as any)}
            />
          ))}
        </View>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.yellow} />
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
  header: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingTop: 12,
    paddingBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 20,
    color: Colors.black,
    letterSpacing: -0.4,
  },
  currentTime: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.gray,
    letterSpacing: -0.28,
  },
  scrollContent: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  feedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  errorContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.red,
    textAlign: "center",
  },
});
