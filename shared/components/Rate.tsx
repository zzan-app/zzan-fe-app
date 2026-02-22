import { StyleSheet, View } from 'react-native';
import StarEmpty from '@/assets/icons/star_empty.svg';
import StarFull from '@/assets/icons/star_full.svg';

interface RateProps {
  rating: number;
  size?: number;
}

const MAX_STARS = 5;

export const Rate = ({ rating, size = 20 }: RateProps) => {
  const filledStars = Math.floor(rating);

  const renderStar = (index: number) => {
    const isFilled = index < filledStars;

    if (isFilled) {
      return <StarFull key={index} width={size} height={size} />;
    }
    return <StarEmpty key={index} width={size} height={size} />;
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: MAX_STARS }, (_, index) => renderStar(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 2,
  },
});
