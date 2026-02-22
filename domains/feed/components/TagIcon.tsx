import PlusIcon from '@/assets/icons/plus.svg';
import { Colors } from '@/shared/constants';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface TagIconProps {
  pixelX: number;
  pixelY: number;
  onPress?: () => void;
}

export const TagIcon = ({ pixelX, pixelY, onPress }: TagIconProps) => {
  const positionStyle = { left: pixelX - 12, top: pixelY - 12 };

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.tagIcon, positionStyle]}
        onPress={onPress}
      >
        <PlusIcon width={12} height={12} fill={Colors.black} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.tagIcon, positionStyle]}>
      <PlusIcon width={12} height={12} fill={Colors.black} />
    </View>
  );
};

const styles = StyleSheet.create({
  tagIcon: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: Colors.takju,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
