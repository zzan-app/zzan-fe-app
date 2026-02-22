import { placeApi } from "@/domains/map/api";
import { usePlacesQuery } from "@/domains/map/hooks";
import { searchResultToMapMarker } from "@/domains/map/mapper";
import {
  type MapMarker,
  type MapRegion,
  type PlaceBounds,
  mockPlacesWithCoordinates,
} from "@/domains/map/model";
import { useDebounce } from "@/shared/hooks";
import { isMockEnabled } from "@/shared/utils";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const initialRegion: MapRegion = {
  latitude: 37.5665,
  longitude: 126.978,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

export const useMapViewModel = () => {
  const [region, setRegion] = useState<MapRegion>(initialRegion);
  const [bounds, setBounds] = useState<PlaceBounds | null>(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<MapMarker[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [focusedMarkerId, setFocusedMarkerId] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<MapMarker | null>(null);
  const [searchPage, setSearchPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeLocation = async () => {
      const location = await getCurrentLocation();
      if (location) {
        updateRegionToLocation(location);
      }
    };
    initializeLocation();
  }, []);

  const debouncedBounds = useDebounce(bounds, 500);

  const {
    data: markers = [],
    isLoading: isLoadingPlaces,
    error: placesError,
  } = usePlacesQuery(debouncedBounds);

  const handleIdleRegion = (newBounds: PlaceBounds) => {
    setBounds(newBounds);
  };

  const handleMarkerPress = (markerId: string) => {
    if (focusedMarkerId === markerId) {
      setSelectedPlace(null);
      setFocusedMarkerId(null);
      return;
    }

    const place = findPlaceById(markerId);
    if (!place) return;

    setSelectedPlace(place);
    setFocusedMarkerId(markerId);
  };

  const searchPlaces = async (keyword: string, page: number = 1) => {
    if (!keyword.trim()) return;

    setError(null);

    if (isMockEnabled()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const normalizedKeyword = keyword
          .trim()
          .toLowerCase()
          .replace(/\s/g, "");
        const filtered = mockPlacesWithCoordinates.filter((place) => {
          const name = place.name.toLowerCase().replace(/\s/g, "");
          const address = place.address.toLowerCase().replace(/\s/g, "");
          return (
            name.includes(normalizedKeyword) ||
            address.includes(normalizedKeyword)
          );
        });
        setSearchResults(filtered);
        setSearchPage(1);
      } catch (err) {
        setError("검색 중 오류가 발생했습니다.");
      }
      return;
    }

    try {
      const result = await placeApi.searchPlaces({ keyword, page, size: 15 });
      const newMarkers = result.map(searchResultToMapMarker);
      setSearchResults(newMarkers);
      setSearchPage(page);
    } catch (err) {
      setError("장소 검색 중 오류가 발생했습니다.");
    }
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleSearchSubmit = () => {
    if (!searchText.trim()) return;
    searchPlaces(searchText, 1);
    setShowSearchResults(true);
  };

  const handleSearchResultPress = (placeId: string) => {
    const place = searchResults.find((marker) => marker.id === placeId);
    if (!place) return;

    moveToPlace(place);

    setShowSearchResults(false);
    setSearchText("");
    setSearchResults([]);
  };

  const findPlaceById = (placeId: string) => {
    return (
      markers.find((marker) => marker.id === placeId) ||
      searchResults.find((marker) => marker.id === placeId)
    );
  };

  const moveToPlace = (place: MapMarker) => {
    setRegion((prev) => ({
      ...prev,
      latitude: place.latitude,
      longitude: place.longitude,
      timestamp: Date.now(),
    }));
  };

  const handleCurrentPositionPress = async () => {
    const location = await getCurrentLocation();
    if (location) updateRegionToLocation(location);
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return null;
      return await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
    } catch (error) {
      return null;
    }
  };

  const updateRegionToLocation = (location: Location.LocationObject) => {
    setRegion((prev) => ({
      ...prev,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: Date.now(),
    }));
  };

  const handleMapPress = () => {
    setSelectedPlace(null);
    setFocusedMarkerId(null);
    setShowSearchResults(false);
    setSearchText("");
    setSearchResults([]);
  };

  return {
    region,
    markers,
    searchText,
    searchResults,
    showSearchResults,
    focusedMarkerId,
    selectedPlace,
    isLoadingPlaces,
    error: placesError?.message || error,
    searchPage,
    handleMarkerPress,
    handleSearchTextChange,
    handleSearchSubmit,
    handleSearchResultPress,
    handleCurrentPositionPress,
    handleMapPress,
    handleIdleRegion,
  };
};
