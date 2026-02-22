import { ProfileEditIcon } from "./ProfileEditIcon";
import { ProfileEmptyAlcohol } from "./ProfileEmptyAlcohol";
import { Colors, Typography } from "@/shared/constants";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { User } from "../model";

interface ProfileInfoProps {
  user: User;
  isEditMode: boolean;
  onImagePress?: () => void;
}

export const ProfileInfo = ({
  user,
  isEditMode,
  onImagePress,
}: ProfileInfoProps) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={onImagePress} disabled={!isEditMode}>
          <Image
            source={user.profileImage}
            style={styles.profileImage}
            contentFit="cover"
          />
        </TouchableOpacity>
        {isEditMode && <ProfileEditIcon />}
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <ProfileEmptyAlcohol count={user.emptyAlcoholCount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 18,
  },
  profileImage: {
    width: 84,
    height: 84,
    borderRadius: 2,
  },
  name: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 24,
    color: Colors.black,
    letterSpacing: -0.48,
  },
});
