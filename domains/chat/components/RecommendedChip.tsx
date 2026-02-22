import { Layout, Typography } from '@/shared/constants';
import { Pressable, StyleSheet, Text } from 'react-native';

interface RecommendedChipProps {
  text: string;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
}

export const RecommendedChip = ({ text, onPress, backgroundColor, textColor }: RecommendedChipProps) => (
  <Pressable
    style={[styles.chip, { backgroundColor }]}
    onPress={onPress}
  >
    <Text style={[styles.text, { color: textColor }]}>{text}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Layout.CHIP_HORIZONTAL,
    paddingVertical: Layout.CHIP_VERTICAL,
    marginRight: Layout.ITEM_SPACING,
    marginBottom: Layout.ITEM_SPACING,
  },
  text: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: Typography.CHIP_TEXT,
    letterSpacing: Typography.CHIP_LETTER_SPACING,
  },
});
