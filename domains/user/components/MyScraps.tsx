import type { UserScrapAlcohol } from "@/domains/user/model";
import { useMyScrapViewModel } from "@/domains/user/viewmodel";
import { FeedBlock, Rate } from "@/shared/components";
import { Colors, Layout, Typography } from "@/shared/constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type FilterType = "피드" | "전통주";

const FilterToggle = ({
  selected,
  onSelect,
}: {
  selected: FilterType;
  onSelect: (filter: FilterType) => void;
}) => {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        onPress={() => onSelect("피드")}
        style={[
          styles.filterButton,
          selected === "피드" && styles.filterButtonActive,
        ]}
      >
        <Text
          style={[
            styles.filterText,
            selected === "피드" && styles.filterTextActive,
          ]}
        >
          피드
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect("전통주")}
        style={[
          styles.filterButton,
          selected === "전통주" && styles.filterButtonActive,
        ]}
      >
        <Text
          style={[
            styles.filterText,
            selected === "전통주" && styles.filterTextActive,
          ]}
        >
          전통주
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const AlcoholScrapCard = ({
  alcohol,
  onPress,
}: {
  alcohol: UserScrapAlcohol;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.alcoholCard}
    >
      <View style={styles.alcoholTopSection}>
        <Image
          source={alcohol.imageUrl}
          style={styles.alcoholImage}
          contentFit="cover"
        />
        <View style={styles.alcoholInfo}>
          <Text style={styles.alcoholName} numberOfLines={1}>
            {alcohol.name}
          </Text>
          <Text style={styles.alcoholType}>#{alcohol.type}</Text>
        </View>
      </View>
      <View style={styles.ratingSection}>
        <Text style={styles.ratingLabel}>평점</Text>
        <Rate rating={alcohol.rating} size={22} />
        <Text style={styles.ratingText}>
          {alcohol.rating}/5점 ({alcohol.reviewCount}개)
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const MyScraps = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("피드");
  const { feeds, alcohols, isLoading, error } = useMyScrapViewModel();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.purple} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FilterToggle selected={selectedFilter} onSelect={setSelectedFilter} />
      {selectedFilter === "피드" ? (
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
      ) : (
        <ScrollView
          contentContainerStyle={styles.alcoholList}
          showsVerticalScrollIndicator={false}
        >
          {alcohols.map((alcohol) => (
            <AlcoholScrapCard
              key={alcohol.id}
              alcohol={alcohol}
              onPress={() =>
                router.push({
                  pathname: "/alcohol",
                  params: { liquorId: alcohol.id },
                })
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    gap: Layout.SECTION_SPACING,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 12,
  },
  filterButton: {
    height: 37,
    paddingHorizontal: 20,
    backgroundColor: Colors.takju,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonActive: {
    backgroundColor: Colors.black,
  },
  filterText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
  filterTextActive: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    color: Colors.white,
  },
  feedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  alcoholList: {
    gap: 12,
  },
  alcoholCard: {
    backgroundColor: Colors.takju,
    borderRadius: 6,
    padding: 14,
    gap: 12,
  },
  alcoholTopSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  alcoholImage: {
    width: 40,
    height: 40,
    borderRadius: 2,
  },
  alcoholInfo: {
    flex: 1,
    gap: 4,
  },
  alcoholName: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    color: Colors.black,
    letterSpacing: -0.36,
  },
  alcoholType: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.24,
  },
  ratingSection: {
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
  ratingText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 10,
    color: Colors.black,
    letterSpacing: -0.2,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
});
