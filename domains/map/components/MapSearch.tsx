import SearchIcon from '@/assets/icons/search_small.svg';
import { Colors, Typography } from '@/shared/constants';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface MapSearchProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
}

export const MapSearch = ({
  value,
  onChangeText,
  onSubmit,
}: MapSearchProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="전통주를 즐길 장소를 검색해주세요!"
        placeholderTextColor={Colors.black}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={onSubmit}>
        <SearchIcon width={22} height={22} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    height: 38,
    backgroundColor: Colors.white,
    borderBottomWidth: 2,
    borderColor: Colors.black,
  },
  input: {
    flex: 1,
    fontSize: 10,
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    color: Colors.black,
    opacity: 0.7,
  },
});
