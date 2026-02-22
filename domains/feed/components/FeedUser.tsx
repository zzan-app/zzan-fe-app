import { Colors, Typography } from '@/shared/constants';
import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface FeedUserProps {
  userImageUrl: ImageSourcePropType;
  username: string;
}

export const FeedUser = ({ userImageUrl, username }: FeedUserProps) => {
  return (
    <View style={styles.container}>
      <Image source={userImageUrl} style={styles.profileImage} />
      <Text style={styles.username}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
});
