import StarEmpty from '@/assets/icons/star_empty.svg';
import StarFull from '@/assets/icons/star_full.svg';
import { Colors, Typography } from '@/shared/constants';
import { StyleSheet, Text, View } from 'react-native';

interface PlaceRateProps {
  rating: number;
}

const MAX_STARS = 5;
const STAR_SIZE = 16;

export const PlaceRate = ({ rating }: PlaceRateProps) => {
  const renderStar = (index: number) => {
    const starNumber = index + 1;
    const isFilled = starNumber <= rating;

    return (
      <View key={index}>
        {isFilled ? (
          <StarFull width={STAR_SIZE} height={STAR_SIZE} />
        ) : (
          <StarEmpty width={STAR_SIZE} height={STAR_SIZE} />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>공간 만족도</Text>
      <View style={styles.starsContainer}>
        {Array.from({ length: MAX_STARS }, (_, index) => renderStar(index))}
      </View>
      <Text style={styles.score}>{rating}/{MAX_STARS}점</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.takju,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 6,
    gap: 10,
    width: '60%',
  },
  label: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 10,
    color: Colors.black,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  score: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 8,
    color: Colors.black,
  },
});