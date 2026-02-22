import { useMyFeedsViewModel } from "@/domains/user/viewmodel";
import { FeedBlock } from "@/shared/components";
import { Colors, Layout } from "@/shared/constants";
import { router } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const MyFeeds = () => {
  const { feeds, isLoading, error } = useMyFeedsViewModel();

  if (isLoading && feeds.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.purple} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>오류: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.feedGrid}>
        {feeds.map((feed) => (
          <FeedBlock
            key={feed.id}
            imageUrl={feed.imageUrl}
            placeName={feed.placeName}
            address={feed.address}
            alcoholCount={feed.alcoholCount}
            onPress={() => router.push(`/detail?feedId=${feed.id}` as any)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    gap: Layout.SECTION_SPACING,
  },
  feedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: Colors.gray,
  },
});
