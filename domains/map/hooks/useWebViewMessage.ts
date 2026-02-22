import type { MapRegion, PlaceBounds } from "@/domains/map/model";
import { WebViewMessageEvent } from "react-native-webview";

type WebViewMessage =
  | { type: "markerPress"; markerId: string }
  | { type: "mapPress" }
  | {
      type: "currentRegion";
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    }
  | { type: "log"; message: string }
  | { type: "error"; message: string }
  | { type: "idleRegion"; region: PlaceBounds };

type MessageHandler = (markerId: string) => void;
type MapPressHandler = () => void;
type CurrentRegionHandler = (region: MapRegion) => void;
type IdleRegionHandler = (bounds: PlaceBounds) => void;

const parseMessage = (data: string): WebViewMessage | null => {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

const handleMarkerPress = (
  data: WebViewMessage,
  onMarkerPress: MessageHandler,
) => {
  if (data.type === "markerPress") {
    onMarkerPress(data.markerId);
  }
};

const handleMapPress = (data: WebViewMessage, onMapPress?: MapPressHandler) => {
  if (data.type === "mapPress" && onMapPress) {
    onMapPress();
  }
};

const handleCurrentRegion = (
  data: WebViewMessage,
  onCurrentRegion?: CurrentRegionHandler,
) => {
  if (data.type === "currentRegion" && onCurrentRegion) {
    const currentRegion: MapRegion = {
      latitude: data.latitude,
      longitude: data.longitude,
      latitudeDelta: data.latitudeDelta,
      longitudeDelta: data.longitudeDelta,
      timestamp: Date.now(),
    };
    onCurrentRegion(currentRegion);
  }
};

const handleLog = (data: WebViewMessage) => {
  if (data.type === "log") {
    console.log("[WebView Log]", data.message);
  }
};

const handleError = (data: WebViewMessage) => {
  if (data.type === "error") {
    console.error("[WebView Error]", data.message);
  }
};

const handleIdleRegion = (
  data: WebViewMessage,
  onIdleRegion?: IdleRegionHandler,
) => {
  if (data.type === "idleRegion" && onIdleRegion && data.region) {
    onIdleRegion(data.region);
  }
};

export const useWebViewMessage = (
  onMarkerPress: MessageHandler,
  onMapPress?: MapPressHandler,
  onCurrentRegion?: CurrentRegionHandler,
  onIdleRegion?: IdleRegionHandler,
) => {
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = parseMessage(event.nativeEvent.data);
    if (!data) {
      console.log("[WebView Message]", event.nativeEvent.data);
      return;
    }

    handleMarkerPress(data, onMarkerPress);
    handleMapPress(data, onMapPress);
    handleCurrentRegion(data, onCurrentRegion);
    handleIdleRegion(data, onIdleRegion);
    handleLog(data);
    handleError(data);
  };

  return { handleMessage };
};
