import { Search, SearchResult, SectionTitle } from "@/domains/feed/components";
import type { AddType } from "@/domains/feed/model";
import { useAddViewModel } from "@/domains/feed/viewmodel";
import { CommonButton, Header } from "@/shared/components";
import { Colors, Layout } from "@/shared/constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const getHeaderTitle = (addType: AddType) => {
  if (addType === "place") return "장소 추가하기";
  return "전통주 추가하기";
};

const getButtonColors = (isSelected: boolean) => {
  if (isSelected) return { textColor: Colors.yellow, backColor: Colors.black };
  return { textColor: Colors.black, backColor: Colors.gray };
};

export default function AddTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK;
  const params = useLocalSearchParams<{ type?: string }>();
  const addType: AddType = (params.type as AddType) ?? "alcohol";

  const {
    searchQuery,
    setSearchQuery,
    alcoholResults,
    placeResults,
    selectedId,
    handleSearch,
    handleSelect,
    isItemSelected,
    handleAdd,
  } = useAddViewModel({ addType });

  const buttonColors = getButtonColors(isItemSelected);
  const results = addType === "alcohol" ? alcoholResults : placeResults;

  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
      <Header
        title={getHeaderTitle(addType)}
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        <SectionTitle title="이름으로 검색하기" />

        <Search
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
          placeholder="검색어를 입력하세요"
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator
        >
          {results.map((item) => (
            <SearchResult
              key={item.id}
              imageUri={"imageUrl" in item ? item.imageUrl : undefined}
              name={item.name}
              subText={"type" in item ? `#${item.type}` : item.address}
              isSelected={selectedId === item.id}
              onPress={() => handleSelect(item.id)}
            />
          ))}
        </ScrollView>

        <CommonButton
          title="추가하기"
          textColor={buttonColors.textColor}
          backColor={buttonColors.backColor}
          onPress={handleAdd}
          disabled={!isItemSelected}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    gap: Layout.ITEM_SPACING,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: Layout.ITEM_SPACING,
    paddingVertical: Layout.ITEM_SPACING,
  },
});
