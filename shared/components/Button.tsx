import { Pressable, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  paddingHorizontal: number;
  paddingVertical: number;
  children: string;
}

export const Button = ({
  onPress,
  backgroundColor,
  textColor,
  fontSize,
  paddingHorizontal,
  paddingVertical,
  children,
}: ButtonProps) => (
  <Pressable
    style={[styles.button, { backgroundColor, paddingHorizontal, paddingVertical }]}
    onPress={onPress}
  >
    <Text style={[styles.text, { color: textColor, fontSize }]}>{children}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
