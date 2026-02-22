import { Alcohol } from "@/domains/feed/model";
import { ScrollView, StyleSheet } from "react-native";
import { AlcoholCard } from "./AlcoholCard";

interface AlcoholRateSectionProps {
  alcohols: Alcohol[];
  currentIndex: number;
  ratings: { [alcoholId: string]: number };
}

export const AlcoholRateSection = ({
  alcohols,
  currentIndex,
  ratings,
}: AlcoholRateSectionProps) => {
  if (alcohols.length === 0) return null;

  const focusedAlcoholId = alcohols[currentIndex]?.id;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {alcohols.map((alcohol) => (
        <AlcoholCard
          key={alcohol.id}
          alcohol={alcohol}
          isFocused={alcohol.id === focusedAlcoholId}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    gap: 12,
  },
});
