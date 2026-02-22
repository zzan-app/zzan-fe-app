import EditIcon from '@/assets/icons/edit.svg';
import { Colors, Layout, Typography } from '@/shared/constants';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ProfileBasicInfoBlockProps {
  label: string;
  value: string;
  isFieldEditing: boolean;
  onValueChange?: (text: string) => void;
  onEditIconClick?: () => void;
  showEditIcon?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

const ValueDisplay = ({
  value,
  isFieldEditing,
  onValueChange,
  keyboardType,
  showEditIcon,
  onEditIconClick
}: Omit<ProfileBasicInfoBlockProps, 'label'>) => (
  <View style={styles.valueContainer}>
    {isFieldEditing ? (
      <TextInput
        style={styles.valueInput}
        value={value}
        onChangeText={onValueChange}
        keyboardType={keyboardType}
        autoFocus
      />
    ) : (
      <Text style={styles.valueText}>{value}</Text>
    )}
    {showEditIcon && (
      <TouchableOpacity onPress={onEditIconClick}>
        <EditIcon width={16} height={16} />
      </TouchableOpacity>
    )}
  </View>
);

export const ProfileBasicInfoBlock = ({
  label,
  value,
  isFieldEditing,
  onValueChange,
  onEditIconClick,
  showEditIcon,
  keyboardType
}: ProfileBasicInfoBlockProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <ValueDisplay
        value={value}
        isFieldEditing={isFieldEditing}
        onValueChange={onValueChange}
        onEditIconClick={onEditIconClick}
        keyboardType={keyboardType}
        showEditIcon={showEditIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 28,
  },
  labelContainer: {
    width: 84,
    height: 25,
    backgroundColor: Colors.black,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 12,
    color: Colors.white,
    letterSpacing: -0.24,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.ITEM_SPACING,
  },
  valueText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
  },
  valueInput: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.28,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    paddingVertical: 0,
  },
});
