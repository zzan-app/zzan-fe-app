import AlcoholIcon from "@/assets/icons/alcohol_right.svg";
import { Colors, Layout, Typography } from "@/shared/constants";
import { Image } from "expo-image";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FeedBlockWithProfileProps {
  userId: string;
  username: string;
  userProfileImage: ImageSourcePropType | string;
  imageUrl: ImageSourcePropType | string;
  placeName: string;
  address: string;
  alcoholCount: number;
  onPress: () => void;
}

const UserProfile = ({
  image,
  name,
}: {
  image: ImageSourcePropType | string;
  name: string;
}) => (
  <View style={styles.userProfile}>
    <Image source={image} style={styles.profileImage} />
    <Text style={styles.username}>{name}</Text>
  </View>
);

const Badge = ({ count }: { count: number }) => (
  <View style={styles.badge}>
    <AlcoholIcon width={20} height={18} />
    <Text style={styles.badgeText}>{count}</Text>
  </View>
);

const PlaceInfo = ({ name, address }: { name: string; address: string }) => (
  <View style={styles.placeInfo}>
    <Text style={styles.placeName} numberOfLines={1}>
      {name}
    </Text>
    <Text style={styles.address} numberOfLines={1}>
      {address}
    </Text>
  </View>
);

export const FeedBlockWithProfile = ({
  username,
  userProfileImage,
  imageUrl,
  placeName,
  address,
  alcoholCount,
  onPress,
}: FeedBlockWithProfileProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} contentFit="cover" />
        <UserProfile image={userProfileImage} name={username} />
        <Badge count={alcoholCount} />
      </View>
      <PlaceInfo name={placeName} address={address} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  userProfile: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: Layout.ITEM_SPACING,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  username: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.white,
    letterSpacing: -0.24,
  },
  badge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: Colors.yellow,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.24,
  },
  placeInfo: {
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
