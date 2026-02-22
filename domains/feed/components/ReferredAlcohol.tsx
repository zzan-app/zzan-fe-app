import { AlcoholCard } from "./AlcoholCard";
import { Alcohol } from "@/domains/feed/model";
import { ScrollView, StyleSheet } from "react-native";

interface ReferredAlcoholProps {
  alcohols: Alcohol[];
  focusedAlcoholId?: string;
}

export const ReferredAlcohol = ({
  alcohols,
  focusedAlcoholId,
}: ReferredAlcoholProps) => {
  if (alcohols.length === 0) return null;

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
