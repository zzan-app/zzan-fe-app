import UserIcon from "@/assets/icons/user.svg";
import LogoSmall from "@/assets/logo/logo_small.svg";
import { MapSearch } from "./MapSearch";
import { MapSearchResult } from "./MapSearchResults";
import { MapMarker } from "@/domains/map/model";
import { Colors, Layout } from "@/shared/constants";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MapHeaderProps {
  onProfilePress: () => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearchSubmit?: () => void;
  showSearchResults: boolean;
  searchResults: MapMarker[];
  onSearchResultPress?: (placeId: string) => void;
}

export const MapHeader = ({
  onProfilePress,
  searchText,
  onSearchTextChange,
  onSearchSubmit,
  showSearchResults,
  searchResults,
  onSearchResultPress,
}: MapHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View>
      {renderHeaderBar(
        insets.top,
        onProfilePress,
        searchText,
        onSearchTextChange,
        onSearchSubmit,
      )}
      {showSearchResults && (
        <MapSearchResult
          searchResults={searchResults}
          onResultPress={onSearchResultPress}
        />
      )}
    </View>
  );
};

const renderHeaderBar = (
  topInset: number,
  onPress: () => void,
  searchText: string,
  onSearchTextChange: (text: string) => void,
  onSearchSubmit?: () => void,
) => {
  return (
    <View style={[styles.container, { paddingTop: topInset + 12 }]}>
      <LogoSmall width={60} height={13} />
      <MapSearch
        value={searchText}
        onChangeText={onSearchTextChange}
        onSubmit={onSearchSubmit}
      />
      <TouchableOpacity onPress={onPress}>
        <UserIcon width={30} height={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingBottom: 12,
    backgroundColor: Colors.white,
  },
});
