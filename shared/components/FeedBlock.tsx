import { Colors, Typography } from '../constants';
import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlcoholIcon from '@/assets/icons/alcohol_right.svg';

interface FeedBlockProps {
  imageUrl: ImageSourcePropType;
  placeName: string;
  address: string;
  alcoholCount: number;
  onPress: () => void;
}

const Badge = ({ count }: { count: number }) => {
  return (
    <View style={styles.badge}>
      <AlcoholIcon width={20} height={18} />
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

export const FeedBlock = ({ imageUrl, placeName, address, alcoholCount, onPress }: FeedBlockProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} contentFit="cover" />
        <Badge count={alcoholCount} />
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.placeName} numberOfLines={1}>{placeName}</Text>
        <Text style={styles.address} numberOfLines={1}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '48%',
    maxWidth: '48%',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  badge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.24,
  },
  infoSection: {
    paddingTop: 10,
    gap: 2,
  },
  placeName: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
  address: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 10,
    color: Colors.black,
    letterSpacing: -0.2,
  },
});
