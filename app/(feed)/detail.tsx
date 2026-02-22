import { useAuthStore } from "@/domains/auth/store";
import {
  FeedDetailComments,
  FeedDetailImage,
  FeedDetailPlace,
  FeedUser,
  ReferredAlcoholWithRate,
} from "@/domains/feed/components";
import { useDetailViewModel } from "@/domains/feed/viewmodel";
import { BookMark, Header, KakaoLoginModal, Share } from "@/shared/components";
import { Colors, Layout } from "@/shared/constants";
import { useModal } from "@/shared/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface UserSectionProps {
  userImageUrl: ImageSourcePropType;
  username: string;
  isBookmarked: boolean;
  onShare: () => void;
  onBookmark: () => void;
}

const UserSection = ({
  userImageUrl,
  username,
  isBookmarked,
  onShare,
  onBookmark,
}: UserSectionProps) => (
  <View style={styles.userSection}>
    <FeedUser userImageUrl={userImageUrl} username={username} />
    <View style={styles.actionButtons}>
      <Share onPress={onShare} />
      <BookMark isBookmarked={isBookmarked} onPress={onBookmark} />
    </View>
  </View>
);

export default function DetailTab() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const feedId = params.feedId as string | undefined;
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;

  const {
    user,
    images,
    alcohols,
    alcoholRatings,
    alcoholTagMappings,
    place,
    placeRating,
    review,
    focusedAlcoholId,
    isBookmarked,
    isLoading,
    error,
    handleTagPress,
    handleAlcoholPress,
    handlePlacePress,
    handleShare,
    handleBookmark,
  } = useDetailViewModel(feedId);

  const { isAuthenticated } = useAuthStore();
  const { visible, openModal, closeModal } = useModal();

  const handleBookmarkWithAuth = async () => {
    const success = await handleBookmark();

    if (!success && !isAuthenticated) {
      openModal();
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.purple} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>피드를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
      <Header title="피드" onBackPress={() => router.back()} />

      <ScrollView contentContainerStyle={styles.content}>
        <FeedDetailImage
          images={images}
          alcoholTagMappings={alcoholTagMappings}
          onTagPress={handleTagPress}
        />

        <View style={styles.paddedContent}>
          <UserSection
            userImageUrl={user.imageUrl}
            username={user.username}
            isBookmarked={isBookmarked}
            onShare={handleShare}
            onBookmark={handleBookmarkWithAuth}
          />

          <ReferredAlcoholWithRate
            alcohols={alcohols}
            alcoholRatings={alcoholRatings}
            focusedAlcoholId={focusedAlcoholId ?? undefined}
            onAlcoholPress={(id) => {
              handleAlcoholPress(id);
              router.push({
                pathname: "/alcohol",
                params: { liquorId: id },
              });
            }}
          />

          {place && (
            <FeedDetailPlace
              place={place}
              placeRating={placeRating}
              onPlacePress={() => {
                handlePlacePress();
                router.push({
                  pathname: "/placeTemporal",
                  params: { kakaoPlaceId: place.id },
                });
              }}
            />
          )}

          <FeedDetailComments review={review} />
        </View>
      </ScrollView>

      <KakaoLoginModal visible={visible} onClose={closeModal} />
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
  paddedContent: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    gap: 24,
    paddingTop: Layout.SECTION_SPACING,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButtons: {
    flexDirection: "row",
    gap: Layout.ITEM_SPACING,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: Colors.gray,
  },
});
