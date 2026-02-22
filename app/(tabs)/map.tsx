import {
  ChatBot,
  CurrentPosition,
  KakaoMapWebView,
  MapHeader,
  PlaceDetail,
} from "@/domains/map/components";
import type { KakaoMapWebViewRef } from "@/domains/map/components";
import { useMapViewModel } from "@/domains/map/viewmodel";
import { useAuthStore } from "@/domains/auth/store";
import { KakaoLoginModal } from "@/shared/components";
import { Colors, Layout } from "@/shared/constants";
import Constants from "expo-constants";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  StyleSheet,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function MapTab() {
  const insets = useSafeAreaInsets();
  const mapWebViewRef = useRef<KakaoMapWebViewRef>(null);
  const { accessToken } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const TAB_BAR_HEIGHT = 10;
  const bottomSpace =
    (insets.bottom || Layout.BOTTOM_SAFE_AREA_FALLBACK) + TAB_BAR_HEIGHT;

  const {
    region,
    markers,
    searchText,
    searchResults,
    showSearchResults,
    focusedMarkerId,
    selectedPlace,
    handleMarkerPress,
    handleSearchTextChange,
    handleSearchSubmit,
    handleSearchResultPress,
    handleCurrentPositionPress,
    handleMapPress,
    handleIdleRegion,
  } = useMapViewModel();
  const apiKey = Constants.expoConfig?.extra?.kakaoJavascriptKey ?? "";

  const handleProfilePress = () => {
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }
    router.push("/mypage");
  };

  const handlePlaceDetailPress = () => {
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }
    if (selectedPlace) {
      router.push({
        pathname: "/placeTemporal",
        params: {
          placeId: selectedPlace.id,
          userLatitude: region.latitude.toString(),
          userLongitude: region.longitude.toString(),
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapHeader
        onProfilePress={handleProfilePress}
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
        onSearchSubmit={handleSearchSubmit}
        showSearchResults={showSearchResults}
        searchResults={searchResults}
        onSearchResultPress={handleSearchResultPress}
      />

      <View style={styles.mapWrapper}>
        <KakaoMapWebView
          ref={mapWebViewRef}
          region={region}
          markers={markers}
          onMarkerPress={handleMarkerPress}
          onMapPress={handleMapPress}
          onIdleRegion={handleIdleRegion}
          apiKey={apiKey}
          focusedMarkerId={focusedMarkerId}
        />

        <View style={[styles.floatingButtons, { paddingBottom: bottomSpace }]}>
          <View style={styles.rightTop}>
            <CurrentPosition onPress={handleCurrentPositionPress} />
          </View>
          <View style={styles.rightBottom}>
            <ChatBot />
          </View>
        </View>

        {selectedPlace && (
          <View style={[styles.placeDetailContainer, { bottom: bottomSpace }]}>
            <PlaceDetail
              place={selectedPlace}
              onPlacePress={handlePlaceDetailPress}
            />
          </View>
        )}
      </View>

      <KakaoLoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mapWrapper: {
    flex: 1,
  },
  floatingButtons: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "space-between",
    paddingVertical: Layout.SECTION_SPACING,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  rightTop: {
    alignItems: "flex-end",
  },
  rightBottom: {
    alignItems: "flex-end",
  },
  placeDetailContainer: {
    position: "absolute",
    left: Layout.SCREEN_HORIZONTAL,
    right: Layout.SCREEN_HORIZONTAL,
  },
});
