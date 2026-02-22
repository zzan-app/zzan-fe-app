import AlcoholRightIcon from '@/assets/icons/alcohol_right.svg';
import { Colors, Layout, Typography } from '@/shared/constants';
import { StyleSheet, Text, View } from 'react-native';

interface ProfileEmptyAlcoholProps {
  count: number;
}

export const ProfileEmptyAlcohol = ({ count }: ProfileEmptyAlcoholProps) => {
  return (
    <View style={styles.container}>
      <AlcoholRightIcon width={20} height={18} />
      <Text style={styles.text}>비운 전통주 : {count}병</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 151,
    height: 34,
    backgroundColor: Colors.yellow,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Layout.ITEM_SPACING,
  },
  text: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
});