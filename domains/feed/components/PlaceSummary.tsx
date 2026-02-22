import { Colors, Typography } from '@/shared/constants';
import { StyleSheet, Text, View } from 'react-native';

interface PlaceSummaryProps {
  name: string;
  address: string;
  feedCount: number;
}

export const PlaceSummary = ({
  name,
  address,
  feedCount,
}: PlaceSummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.feedCountText}>
          이 장소에서 <Text style={styles.feedCountHighlight}>{feedCount}명</Text>이 이 술을 마셨어요!
        </Text>
      </View>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.white,
  },
  address: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 12,
    color: Colors.white,
    opacity: 0.7,
    marginTop: 2,
  },
  feedCountText: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 10,
    color: Colors.white,
  },
  feedCountHighlight: {
    color: Colors.yellow,
  },
});