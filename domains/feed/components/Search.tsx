import SearchIcon from '@/assets/icons/search_small.svg';
import { Colors, Layout, Typography } from '@/shared/constants';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export const Search = ({
  value,
  onChangeText,
  onSearch,
  placeholder = '검색어를 입력하세요',
}: SearchProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        placeholder={placeholder}
        placeholderTextColor={Colors.black}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.iconButton} onPress={onSearch}>
        <SearchIcon width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomColor: Colors.black,
    borderBottomWidth: 2
  },
  input: {
    flex: 1,
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: Typography.INPUT_TEXT,
    color: Colors.black,
    padding: 0,
  },
  iconButton: {
    marginLeft: Layout.ITEM_SPACING,
  },
});