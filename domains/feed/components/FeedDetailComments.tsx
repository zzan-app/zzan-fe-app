import { Colors, Layout, Typography } from '@/shared/constants';
import { StyleSheet, Text, View } from 'react-native';

interface FeedDetailCommentsProps {
  review: string;
}

export const FeedDetailComments = ({ review }: FeedDetailCommentsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>후기</Text>
      <Text style={styles.reviewText}>{review}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Layout.ITEM_SPACING,
  },
  title: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: 0,
  },
  reviewText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.28,
    lineHeight: 22,
  },
});
