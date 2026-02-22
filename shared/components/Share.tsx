import { StyleSheet, TouchableOpacity } from 'react-native';
import ShareIcon from '@/assets/icons/share.svg';

interface ShareProps {
  onPress: () => void;
  size?: number;
}

export const Share = ({ onPress, size = 24 }: ShareProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ShareIcon width={size} height={size} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
