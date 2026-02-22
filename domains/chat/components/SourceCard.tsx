import { useAuthStore } from "@/domains/auth/store";
import { KakaoLoginModal, Rate } from "@/shared/components";
import { Colors, Typography } from "@/shared/constants";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { LiquorSource } from "../model";
import { fetchLiquorScore } from "../utils";

interface SourceCardProps {
  source: LiquorSource;
}

export const SourceCard = ({ source }: SourceCardProps) => {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScore = async () => {
      const fetchedScore = await fetchLiquorScore(source.id);
      setScore(fetchedScore);
      setLoading(false);
    };

    loadScore();
  }, [source.id]);

  const handlePress = () => {
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }
    router.push({
      pathname: "/alcohol",
      params: { liquorId: source.id },
    });
  };

  const renderStars = () => {
    if (loading) {
      return <Text style={styles.ratingText}>로딩 중...</Text>;
    }

    if (score === null) {
      return <Text style={styles.ratingText}>아직 평점이 없습니다</Text>;
    }

    return (
      <View style={styles.starsContainer}>
        <Text style={styles.ratingLabel}>평점</Text>
        <Rate rating={score} size={16} />
      </View>
    );
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <View style={styles.card}>
          <Image source={{ uri: source.image_url }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {source.name}
            </Text>
            <Text style={styles.details} numberOfLines={1}>
              #{source.type}
            </Text>
            <View style={styles.ratingContainer}>{renderStars()}</View>
          </View>
        </View>
      </TouchableOpacity>
      <KakaoLoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 198,
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 0,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 2,
    resizeMode: "cover",
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 16,
    color: Colors.black,
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: Colors.detail,
    marginBottom: 4,
  },
  ratingContainer: {
    minHeight: 20,
    justifyContent: "center",
  },
  starsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingLabel: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    marginRight: 6,
  },
  ratingText: {
    fontSize: 10,
    color: Colors.time,
  },
});
