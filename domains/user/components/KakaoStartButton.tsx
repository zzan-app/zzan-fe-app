import { Colors, Layout, Typography } from '@/shared/constants';
import { StyleSheet, Text, View } from 'react-native';
import KakaoIcon from '@/assets/icons/kakao.svg';

export const KakaoStartButton = () => {
  return (
    <View style={styles.container}>
      <KakaoIcon width={16} height={16} />
      <Text style={styles.text}>카카오로 3초 만에 시작하기</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.black,
    paddingVertical: 16,
    borderRadius: Layout.INPUT_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 14,
    color: Colors.white,
  },
});