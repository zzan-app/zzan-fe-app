import { Colors } from '@/shared/constants';
import { Animated, StyleSheet, View } from 'react-native';

interface ImageProgressBarProps {
  totalImages: number;
  animatedWidth: Animated.Value;
}

export const ImageProgressBar = ({ totalImages, animatedWidth }: ImageProgressBarProps) => {
  if (totalImages <= 1) return null;

  const animatedWidthStyle = {
    width: animatedWidth.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    }),
  };

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBarFill, animatedWidthStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    position: 'absolute',
    bottom: 16,
    width: '50%',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.white,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.black,
  },
});
