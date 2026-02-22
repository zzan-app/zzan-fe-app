import RightArrowIcon from "@/assets/icons/right_arrow.svg";
import type { User } from "@/domains/user/model";
import { Colors, Layout, Typography } from "@/shared/constants";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileInfoBlockProps {
  user: User;
}

const EmptyAlcohol = ({ count }: { count: number }) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>비운 전통주 : </Text>
      <Text style={styles.emptyText}>{count}병</Text>
    </View>
  );
};

const ProfileSummary = ({ user }: { user: User }) => {
  return (
    <View style={styles.summaryContainer}>
      <Image
        source={user.profileImage}
        style={styles.profileImage}
        contentFit="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <EmptyAlcohol count={user.emptyAlcoholCount} />
      </View>
    </View>
  );
};

export const ProfileInfoBlock = ({ user }: ProfileInfoBlockProps) => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/myprofile")}
      activeOpacity={0.8}
      style={styles.container}
    >
      <ProfileSummary user={user} />
      <RightArrowIcon style={styles.rightArrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 68,
    backgroundColor: Colors.black,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
  },
  textContainer: {
    gap: 4,
  },
  name: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    color: Colors.white,
    letterSpacing: -0.36,
  },
  emptyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  emptyText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 12,
    color: Colors.gray,
    letterSpacing: -0.24,
  },
  rightArrow: {
    marginRight: 6,
  },
});
