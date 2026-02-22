import { TextInput as RNTextInput, StyleSheet } from 'react-native';

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  placeholderTextColor: string;
  fontSize: number;
  maxLength?: number;
}

export const TextInput = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  fontSize,
  maxLength,
}: TextInputProps) => (
  <RNTextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={placeholderTextColor}
    style={[styles.input, { fontSize }]}
    maxLength={maxLength}
  />
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
});
