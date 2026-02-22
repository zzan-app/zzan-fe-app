import { AlcoholCard } from "./AlcoholCard";
import { Alcohol } from "@/domains/feed/model";
import { Colors, Typography } from "@/shared/constants";
import { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface ReferredAlcoholWithRateProps {
  alcohols: Alcohol[];
  alcoholRatings: { [alcoholId: string]: number };
  focusedAlcoholId?: string;
  onAlcoholPress: (alcoholId: string) => void;
}

const scrollToAlcohol = (
  scrollViewRef: React.RefObject<ScrollView | null>,
  alcohols: Alcohol[],
  alcoholId: string,
) => {
  const alcoholIndex = alcohols.findIndex((a) => a.id === alcoholId);
  if (alcoholIndex === -1) return;

  const CARD_WIDTH = 180;
  const GAP = 12;
  const xPosition = alcoholIndex * (CARD_WIDTH + GAP);

  scrollViewRef.current?.scrollTo({
    x: xPosition,
    animated: true,
  });
};

export const ReferredAlcoholWithRate = ({
  alcohols,
  alcoholRatings,
  focusedAlcoholId,
  onAlcoholPress,
}: ReferredAlcoholWithRateProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!focusedAlcoholId) return;
    scrollToAlcohol(scrollViewRef, alcohols, focusedAlcoholId);
  }, [focusedAlcoholId, alcohols]);

  if (alcohols.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        언급된 전통주 ({alcohols.length}개)
      </Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {alcohols.map((alcohol) => (
          <AlcoholCard
            key={alcohol.id}
            alcohol={alcohol}
            rating={alcoholRatings[alcohol.id] || 0}
            isFocused={alcohol.id === focusedAlcoholId}
            onPress={() => onAlcoholPress(alcohol.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: 0,
  },
  scrollContent: {
    gap: 12,
  },
});
