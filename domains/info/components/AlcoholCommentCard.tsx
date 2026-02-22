import EditIcon from "@/assets/icons/edit.svg";
import StarIcon from "@/assets/icons/start_black.svg";
import { Colors, Layout, Typography } from "@/shared/constants";
import { Image } from "expo-image";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AlcoholCommentCardProps {
  username: string;
  userProfileImage: ImageSourcePropType;
  rating: number;
  comment: string;
  date: string;
  isOwner?: boolean;
  onEditPress?: () => void;
}

const UserProfile = ({
  image,
  name,
}: {
  image: ImageSourcePropType;
  name: string;
}) => (
  <View style={styles.profileContainer}>
    <Image source={image} style={styles.profileImage} />
    <Text style={styles.username}>{name}</Text>
  </View>
);

const RatingBadge = ({ rating }: { rating: number }) => (
  <View style={styles.ratingBadge}>
    <StarIcon />
    <Text style={styles.ratingText}>{rating}</Text>
  </View>
);

const CommentText = ({ text }: { text: string }) => (
  <Text style={styles.commentText}>{text}</Text>
);

const DateAndEdit = ({
  date,
  showEdit,
  onEdit,
}: {
  date: string;
  showEdit: boolean;
  onEdit?: () => void;
}) => (
  <View style={styles.footer}>
    <Text style={styles.dateText}>{date}</Text>
    {showEdit && onEdit && (
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <EditIcon width={20} height={20} />
      </TouchableOpacity>
    )}
  </View>
);

export const AlcoholCommentCard = ({
  username,
  userProfileImage,
  rating,
  comment,
  date,
  isOwner = false,
  onEditPress,
}: AlcoholCommentCardProps) => {
  const cardStyle = isOwner ? [styles.card, styles.cardOwner] : styles.card;

  return (
    <View style={cardStyle}>
      <View style={styles.header}>
        <UserProfile image={userProfileImage} name={username} />
        <RatingBadge rating={rating} />
      </View>
      <CommentText text={comment} />
      <DateAndEdit date={date} showEdit={isOwner} onEdit={onEditPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    backgroundColor: Colors.takju,
    borderRadius: 6,
    padding: 14,
    gap: 12,
  },
  cardOwner: {
    borderWidth: 1,
    borderColor: Colors.black,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
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
    color: Colors.black,
    letterSpacing: -0.24,
  },
  ratingBadge: {
    backgroundColor: Colors.yellow,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.24,
  },
  commentText: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 10,
    color: Colors.black,
    letterSpacing: -0.2,
    lineHeight: 14,
  },
  editButton: {
    width: 20,
    height: 20,
  },
});
