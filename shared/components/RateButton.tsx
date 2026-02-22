import StarEmpty from '@/assets/icons/star_empty.svg';
import StarFull from '@/assets/icons/star_full.svg';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface RateButtonProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
}

const MAX_STARS = 5;

export const RateButton = ({ rating, onRatingChange, size = 32 }: RateButtonProps) => {
  const handleStarPress = (index: number) => {
    onRatingChange(index + 1);
  };

  const renderStar = (index: number) => {
    const isFilled = index < rating;

    if (isFilled) {
      return (
        <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
          <StarFull width={size} height={size} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
        <StarEmpty width={size} height={size} />
      </TouchableOpacity>
    );
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
