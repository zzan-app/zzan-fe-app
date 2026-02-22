import { InfoImages, InfoRate, InfoSummary, PlaceDescription } from '@/domains/info/components';
import { useInfoViewModel } from '@/domains/info/viewmodel';
import { AlcoholButton, FeedBlock, Header } from '@/shared/components';
import { Colors, Layout, Typography } from '@/shared/constants';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

export default function PlaceTab() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const placeId = params.placeId as string | undefined;
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;
  const {
    placeInfo,
    isBookmarked,
    infoBoxes,
    isLoading,
    error,
    placeFeeds,
    isFeedsLoading,
    toggleBookmark,
    handleShare,
    handleAlcoholButtonPress,
  } = useInfoViewModel(placeId);

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
        {renderErrorState(error || '장소를 찾을 수 없습니다')}
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
        <InfoImages images={placeInfo.images} />

        <InfoSummary
          title={placeInfo.name}
          category={placeInfo.category}
          infoBoxes={infoBoxes}
          isBookmarked={isBookmarked}
          onSharePress={handleShare}
          onBookmarkPress={toggleBookmark}
        />

        <PlaceDescription description={placeInfo.description} />

        <View style={styles.buttonContainer}>
          <AlcoholButton
            title="이 장소에서 전통주를 먹었어요"
            onPress={handleAlcoholButtonPress}
          />
        </View>

        <View style={styles.line} />

        {placeFeeds.length > 0 && (
          <View style={styles.feedsSection}>
            <Text style={styles.sectionTitle}>이 장소의 피드</Text>
            {isFeedsLoading ? (
              <ActivityIndicator size="small" color={Colors.purple} />
            ) : (
              <View style={styles.feedGrid}>
                {placeFeeds.map((feed) => (
                  <FeedBlock
                    key={feed.id}
                    imageUrl={feed.imageUrl!}
                    placeName={feed.placeName || ''}
                    address={feed.address || ''}
                    alcoholCount={feed.alcoholCount || 0}
                    onPress={() =>
                      router.push({
                        pathname: '/detail',
                        params: { feedId: feed.id },
                      })
                    }
                  />
                ))}
              </View>
            )}
          </View>
        )}

        <View style={styles.line} />

        <InfoRate rating={placeInfo.rating} reviewCount={0} />
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
    justifyContent: 'center',
    alignItems: 'center',
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
    gap: Layout.SECTION_SPACING,
  },
  sectionTitle: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    color: Colors.black,
    letterSpacing: -0.36,
  },
  feedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
