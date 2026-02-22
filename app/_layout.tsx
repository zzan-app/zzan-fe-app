import { QueryProvider } from "@/shared/providers";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [loaded, error] = useFonts({
    "KakaoBigSans-Bold": require("../assets/fonts/KakaoBigSans-Bold.ttf"),
    "KakaoBigSans-ExtraBold": require("../assets/fonts/KakaoBigSans-ExtraBold.ttf"),
    "KakaoBigSans-Regular": require("../assets/fonts/KakaoBigSans-Regular.ttf"),
    "KakaoSmallSans-Bold": require("../assets/fonts/KakaoSmallSans-Bold.ttf"),
    "KakaoSmallSans-Light": require("../assets/fonts/KakaoSmallSans-Light.ttf"),
    "KakaoSmallSans-Regular": require("../assets/fonts/KakaoSmallSans-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      setAppIsReady(true);
    }
  }, [loaded, error]);

  useEffect(() => {
    if (appIsReady) {
      const timer = setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View style={{ flex: 1, backgroundColor: "#ffffff" }} />;
  }

  return (
    <QueryProvider>
      <SafeAreaProvider>
        <KeyboardProvider>
          <ThemeProvider value={DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="login" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(feed)" />
              <Stack.Screen name="(chat)" />
              <Stack.Screen name="(info)" />
              <Stack.Screen name="(user)" />
            </Stack>
            <SystemBars style="dark" hidden={{ navigationBar: true }} />
          </ThemeProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </QueryProvider>
  );
}
