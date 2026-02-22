import { generateMapHtml } from "./MapHtmlTemplate";
import { useWebViewMessage } from "@/domains/map/hooks";
import type { MapMarker, MapRegion, PlaceBounds } from "@/domains/map/model";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";

interface KakaoMapWebViewProps {
  region: MapRegion;
  markers: MapMarker[];
  onMarkerPress: (markerId: string) => void;
  onMapPress?: () => void;
  onCurrentRegion?: (region: MapRegion) => void;
  onIdleRegion?: (bounds: PlaceBounds) => void;
  apiKey: string;
  focusedMarkerId?: string | null;
}

export interface KakaoMapWebViewRef {
  requestCurrentRegion: () => void;
}

export const KakaoMapWebView = forwardRef<
  KakaoMapWebViewRef,
  KakaoMapWebViewProps
>(
  (
    {
      region,
      markers,
      onMarkerPress,
      onMapPress,
      onCurrentRegion,
      onIdleRegion,
      apiKey,
      focusedMarkerId,
    },
    ref,
  ) => {
    const webViewRef = useRef<WebView>(null);
    const { handleMessage } = useWebViewMessage(
      onMarkerPress,
      onMapPress,
      onCurrentRegion,
      onIdleRegion,
    );

    useImperativeHandle(ref, () => ({
      requestCurrentRegion: () => {
        if (webViewRef.current) {
          const message = JSON.stringify({ type: "getCurrentRegion" });
          webViewRef.current.postMessage(message);
        }
      },
    }));

    const prevTimestampRef = useRef<number | undefined>(region.timestamp);
    const prevFocusedMarkerIdRef = useRef<string | null | undefined>(
      focusedMarkerId,
    );
    const prevMarkersRef = useRef<MapMarker[]>(markers);

    const htmlContent = useMemo(() => {
      return generateMapHtml(region, markers, apiKey);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [region.latitude, region.longitude, apiKey]);

    useEffect(() => {
      if (region.timestamp !== prevTimestampRef.current) {
        if (webViewRef.current) {
          webViewRef.current.postMessage(
            JSON.stringify({
              type: "moveCenter",
              latitude: region.latitude,
              longitude: region.longitude,
            }),
          );

          if (focusedMarkerId) {
            setTimeout(() => {
              webViewRef.current?.postMessage(
                JSON.stringify({
                  type: "focusMarker",
                  markerId: focusedMarkerId,
                }),
              );
            }, 100);
          }
        }
        prevTimestampRef.current = region.timestamp;
      }
    }, [region, focusedMarkerId]);

    useEffect(() => {
      if (focusedMarkerId !== prevFocusedMarkerIdRef.current) {
        if (webViewRef.current && focusedMarkerId) {
          webViewRef.current.postMessage(
            JSON.stringify({
              type: "focusMarker",
              markerId: focusedMarkerId,
            }),
          );
        }
        prevFocusedMarkerIdRef.current = focusedMarkerId;
      }
    }, [focusedMarkerId]);

    useEffect(() => {
      if (markers !== prevMarkersRef.current) {
        if (webViewRef.current) {
          const webViewMarkers = markers.map((m) => ({
            id: m.id,
            name: m.name,
            latitude: m.latitude,
            longitude: m.longitude,
          }));

          webViewRef.current.postMessage(
            JSON.stringify({
              type: "updateMarkers",
              markers: webViewMarkers,
            }),
          );
        }
        prevMarkersRef.current = markers;
      }
    }, [markers]);

    return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{
            html: htmlContent,
            baseUrl: "https://zzan-kakao-map.netlify.app",
          }}
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={handleMessage}
          style={styles.webview}
        />
      </View>
    );
  },
);

KakaoMapWebView.displayName = "KakaoMapWebView";

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});
