import {
  AlcoholComments,
  AlcoholDescription,
  InfoImages,
  InfoRate,
  InfoRateWithProfile,
  InfoSummary,
} from "@/domains/info/components";
import { useAlcoholViewModel } from "@/domains/info/viewmodel";
import { Header } from "@/shared/components";
import { Colors, Layout } from "@/shared/constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
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

export default function AlcoholTab() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const liquorId = params.liquorId as string | undefined;
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  const {
    alcoholInfo,
    isBookmarked,
    infoBoxes,
    isLoading,
    error,
    toggleBookmark,
    handleShare,
    reviews,
    myReview,
    reviewCount,
    avgRating,
    currentUserId,
    createOrUpdateReview,
    liquorFeeds,
  } = useAlcoholViewModel(liquorId);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="전통주" onBackPress={() => router.back()} />
        {renderLoadingState()}
      </View>
    );
  }

  if (error || !alcoholInfo) {
    return (
      <View style={styles.container}>
        <Header title="전통주" onBackPress={() => router.back()} />
        {renderErrorState(error || "주류 정보를 찾을 수 없습니다")}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <Header title="전통주" onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: safeBottom }}
      >
        <InfoImages images={alcoholInfo.images.map((img) => img.image)} />

        <InfoSummary
          title={alcoholInfo.name}
          category={alcoholInfo.category}
          infoBoxes={infoBoxes}
          isBookmarked={isBookmarked}
          onSharePress={handleShare}
          onBookmarkPress={toggleBookmark}
        />

        <AlcoholDescription
          recommendTitle={alcoholInfo.recommendTitle}
          recommendDescription={alcoholInfo.recommendDescription}
          images={alcoholInfo.galleryImages || alcoholInfo.images}
        />

        <View style={styles.line} />

        <InfoRate rating={avgRating} reviewCount={reviewCount} />

        <ScrollView
          horizontal
          contentContainerStyle={styles.reviewList}
          showsHorizontalScrollIndicator={false}
        >
          {liquorFeeds.map((feed) => (
            <View key={feed.id}>
              <InfoRateWithProfile
                username={feed.username}
                userProfileImage={feed.userProfileImage}
                imageUrl={feed.feedImage}
                placeName={feed.liquorName}
                address={feed.reviewText}
                alcoholCount={feed.score}
                onPress={() => {}}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.line} />

        <AlcoholComments
          comments={reviews}
          myReview={myReview}
          currentUserId={currentUserId || undefined}
          onAddCommentPress={() => console.log("Add comment pressed")}
          onEditPress={(commentId) => console.log("Edit comment:", commentId)}
          onSaveComment={createOrUpdateReview}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
  line: {
    backgroundColor: Colors.black,
    marginHorizontal: Layout.SCREEN_HORIZONTAL,
    marginVertical: Layout.SECTION_SPACING,
    height: 4,
  },
  reviewList: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    gap: 12,
    paddingBottom: 20,
  },
  commentContainer: {},
});
