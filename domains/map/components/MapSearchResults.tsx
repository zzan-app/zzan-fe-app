import { MapSearchResultBlock } from "./MapSearchResultBlock";
import { MapMarker } from "@/domains/map/model";
import { Colors, Layout } from "@/shared/constants";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface MapSearchResultProps {
  searchResults: MapMarker[];
  onResultPress?: (placeId: string) => void;
}

export const MapSearchResult = ({
  searchResults,
  onResultPress,
}: MapSearchResultProps) => {
  const displayPlaces = searchResults;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {displayPlaces.map((place) =>
          renderSearchResultItem(
            place.id,
            place.name,
            place.address,
            onResultPress,
          ),
        )}
      </ScrollView>
    </View>
  );
};

const renderSearchResultItem = (
  id: string,
  name: string,
  address: string,
  onPress?: (placeId: string) => void,
) => {
  return (
    <TouchableOpacity
      key={id}
      onPress={() => onPress?.(id)}
      style={styles.resultItem}
    >
      <MapSearchResultBlock name={name} address={address} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    maxHeight: 320,
    paddingBottom: 12,
  },
  scrollContainer: {
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    gap: 12,
  },
  resultItem: {
    borderRadius: 6,
    overflow: "hidden",
  },
});
