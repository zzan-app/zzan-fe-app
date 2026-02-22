import { Colors, Typography } from '@/shared/constants';
import { StyleSheet, Text } from 'react-native';

interface SectionTitleProps {
  title: string;
  count?: number;
}

export const SectionTitle = ({ title, count }: SectionTitleProps) => {
  const displayTitle = count !== undefined ? `${title} (${count}개)` : title;
  
  return <Text style={styles.title}>{displayTitle}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
  },
});
