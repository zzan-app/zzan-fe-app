import { StyleSheet, TouchableOpacity } from 'react-native';
import BookmarkEmpty from '@/assets/icons/bookmark_empty.svg';
import BookmarkFull from '@/assets/icons/bookmark_full.svg';

interface BookMarkProps {
  isBookmarked: boolean;
  onPress: () => void;
  size?: number;
}

export const BookMark = ({ isBookmarked, onPress, size = 24 }: BookMarkProps) => {
  if (isBookmarked) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <BookmarkFull width={size} height={size} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <BookmarkEmpty width={size} height={size} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
