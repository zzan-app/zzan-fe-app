import "dotenv/config";

export default {
  expo: {
    name: "ZZAN",
    slug: "zzan-fe",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/thumbnail.png",
    scheme: "zzanfe",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "전통주 장소를 찾기 위해 현재 위치가 필요합니다.",
      },
    },
    android: {
      package: "com.leekangryong.zzanfe",
      permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
      adaptiveIcon: {
        backgroundColor: "#FFD800",
        foregroundImage: "./assets/images/thumbnail_padding.png",
      },
      userInterfaceStyle: "light",
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      softInputMode: "adjustPan",
      usesCleartextTraffic: true,
    },
    web: {
      output: "static",
      favicon: "./assets/images/thumbnail.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/thumbnail_splash.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#FFD800",
        },
      ],
      "expo-font",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: false,
    },
    extra: {
      eas: {
        projectId: "6262c554-b3eb-48a6-ac4e-95fe2acdf09f",
      },
      figmaAccessToken:
        process.env.EXPO_PUBLIC_FIGMA_TOKEN || process.env.FIGMA_TOKEN || "",
      useMockData:
        (process.env.EXPO_PUBLIC_USE_MOCK_DATA || process.env.USE_MOCK_DATA) ===
        "true",
      apiUrl: process.env.EXPO_PUBLIC_API_URL || process.env.API_URL || "",
      kakaoRestApiKey:
        process.env.EXPO_PUBLIC_KAKAO_MAP_API_KEY ||
        process.env.KAKAO_MAP_API_KEY ||
        "",
      kakaoJavascriptKey:
        process.env.EXPO_PUBLIC_KAKAO_MAP_JAVASCRIPT_KEY ||
        process.env.KAKAO_MAP_JAVASCRIPT_KEY ||
        "",
      chatApiUrl:
        process.env.EXPO_PUBLIC_CHATBOT_URL || process.env.CHATBOT_URL || "",
    },
  },
};
