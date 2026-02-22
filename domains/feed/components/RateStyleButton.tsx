import { CommonButton, RateButton } from '@/shared/components';
import { Colors, Layout, Typography } from '@/shared/constants';
import { StyleSheet, Text, View } from 'react-native';

interface RateStyleButtonProps {
  title: string;
  rating: number;
  onRatingChange: (rating: number) => void;
  onSave: () => void;
}

export const RateStyleButton = ({
  title,
  rating,
  onRatingChange,
  onSave,
}: RateStyleButtonProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rateButtonWrapper}>
        <RateButton rating={rating} onRatingChange={onRatingChange} size={42} />
      </View>
      <View style={styles.buttonWrapper}>
        <CommonButton
          title="저장하기"
          textColor={Colors.yellow}
          backColor={Colors.black}
          onPress={onSave}
          size="L"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.takju,
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
    alignItems: 'stretch', 
    width: '100%',
  },
  title: {
    fontSize: 14,
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    textAlign: 'center',
    color: Colors.black,
  },
  rateButtonWrapper: {
    alignItems: 'center',
    marginBottom: Layout.ITEM_SPACING,
  },
  buttonWrapper: {
    width: '100%',
  },
});