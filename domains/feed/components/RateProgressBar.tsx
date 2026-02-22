import { Colors } from '@/shared/constants';
import { StyleSheet, View } from 'react-native';

interface RateProgressBarProps {
  current: number;
  total: number;
}

export const RateProgressBar = ({ current, total }: RateProgressBarProps) => {
  const segments = Array.from({ length: total }, (_, index) => index);

  return (
    <View style={styles.progressBarContainer}>
      {segments.map((index) => (
        <View
          key={index}
          style={[
            styles.progressSegment,
            index <= current && styles.progressSegmentActive,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 24,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.white,
  },
  progressSegmentActive: {
    backgroundColor: Colors.black,
  },
});
