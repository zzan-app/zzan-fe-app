import { Colors, Typography } from '@/shared/constants';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SearchResultProps {
  imageUri?: ImageSourcePropType | string;
  name: string;
  subText: string;
  isSelected: boolean;
  onPress: () => void;
}

export const SearchResult = ({
  imageUri,
  name,
  subText,
  isSelected,
  onPress,
}: SearchResultProps) => {
  const imageSource = imageUri
    ? typeof imageUri === 'string' ? { uri: imageUri } : imageUri
    : undefined;

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {imageSource && <Image source={imageSource} style={styles.image} />}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subText}>{subText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.takju,
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedContainer: {
    borderColor: Colors.black,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 14,
    color: Colors.black,
    marginBottom: 4,
  },
  subText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 12,
    color: Colors.black,
  },
});