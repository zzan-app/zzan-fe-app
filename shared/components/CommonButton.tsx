import { Layout, Typography } from '../constants';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CommonButtonProps {
  title: string;
  textColor: string;
  backColor: string;
  onPress?: () => void;
  size?: 'S' | 'L';
  disabled?: boolean;
}

const getSizeStyles = (size: 'S' | 'L') => {
  if (size === 'L') {
    return { paddingVertical: 16, fontSize: 14 };
  }
  return { paddingVertical: 12, fontSize: 12 };
};

export const CommonButton = ({
  title,
  textColor,
  backColor,
  onPress,
  size = 'L',
  disabled = false,
}: CommonButtonProps) => {
  const sizeStyles = getSizeStyles(size);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: backColor }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          { color: textColor, fontSize: sizeStyles.fontSize },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    borderRadius: Layout.INPUT_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
  },
});