import { useAuthStore } from "@/domains/auth/store";
import { useAuthViewModel } from "@/domains/auth/viewmodel";
import { KakaoStartButton } from "@/domains/user/components";
import { CommonButton, Toast } from "@/shared/components";
import { Colors, Layout, Typography } from "@/shared/constants";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type WebViewType from "react-native-webview";
import { WebView, type WebViewNavigation } from "react-native-webview";
import InitialIcon from "../assets/logo/initial.svg";
import LogoIcon from "../assets/logo/logo_big.svg";

const isMockEnabled = (): boolean => {
  return Constants.expoConfig?.extra?.useMockData === true;
};

const injectedJavaScript = `
  (function() {
    function checkForToken() {
      try {
        const bodyText = document.body.innerText || document.body.textContent;
        const jsonData = JSON.parse(bodyText);

        if (jsonData.success && jsonData.data && jsonData.data.accessToken) {
          window.ReactNativeWebView.postMessage(JSON.stringify(jsonData));
        }
      } catch (error) {
        // Not a JSON page
      }
    }

    checkForToken();

    const observer = new MutationObserver(checkForToken);
    observer.observe(document.body, { childList: true, subtree: true });
  })();
  true;
`;

export default function LoginScreen() {
  const router = useRouter();
  const { loginWithMock, getKakaoLoginUrl, isLoading, error } =
    useAuthViewModel();
  const [showToast, setShowToast] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);
  const webViewRef = useRef<WebViewType>(null);

  useEffect(() => {
    if (error) {
      setShowToast(true);
    }
  }, [error]);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.success && data.data?.accessToken && data.data?.refreshToken) {
        const { accessToken, refreshToken } = data.data;

        const { setTokens } = useAuthStore.getState();
        setTokens(accessToken, refreshToken);

        setShowWebView(false);
        router.push("/map");
      } else {
        setShowWebView(false);
      }
    } catch (error) {
      // TODO: Not implemented yet
    }
  };

  const handleWebViewNavigationStateChange = (navState: WebViewNavigation) => {
    if (navState.url.includes("/callback") && !navState.loading) {
      webViewRef.current?.injectJavaScript(injectedJavaScript);
    }
  };

  const handleKakaoLogin = async () => {
    if (isMockEnabled()) {
      loginWithMock();
      router.push("/map");
      return;
    }

    const loginUrl = await getKakaoLoginUrl();

    if (!loginUrl) {
      return;
    }

    setWebViewUrl(loginUrl);
    setShowWebView(true);
  };

  const handleGuestLogin = () => {
    router.push("/map");
  };

  return (
    <View style={styles.container}>
      <Toast
        message={error}
        visible={showToast}
        onHide={() => setShowToast(false)}
      />
      <View style={styles.logoContainer}>
        <InitialIcon width={150} height={150} style={styles.logo} />
        <LogoIcon style={styles.logoMargin} />

        <View style={styles.textGroup}>
          <Text style={styles.initialText}>여행지에서 만난 전통주</Text>
          <Text style={styles.initialText}>모두 다같이 짠!</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.loginButton}
          onPress={handleKakaoLogin}
          disabled={isLoading}
        >
          <KakaoStartButton />
        </TouchableOpacity>

        <View style={styles.loginButton}>
          <CommonButton
            title="로그인 없이 시작하기"
            textColor={Colors.black}
            backColor={Colors.gray}
            onPress={handleGuestLogin}
          />
        </View>
      </View>

      <Modal visible={showWebView} animationType="slide">
        <View style={styles.webViewContainer}>
          <View style={styles.webViewHeader}>
            <Text style={styles.webViewTitle}>카카오 로그인</Text>
            <TouchableOpacity
              onPress={() => setShowWebView(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
          {webViewUrl && (
            <WebView
              ref={webViewRef}
              source={{ uri: webViewUrl }}
              onNavigationStateChange={handleWebViewNavigationStateChange}
              onMessage={handleWebViewMessage}
              injectedJavaScript={injectedJavaScript}
              style={styles.webView}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.yellow,
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
  },
  logo: {
    marginBottom: 10,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  logoMargin: {
    marginVertical: 20,
  },
  textGroup: {
    alignItems: "center",
    marginTop: Layout.SECTION_SPACING,
    gap: 5,
  },
  initialText: {
    fontFamily: Typography.KAKAO_BIG_SANS_EXTRABOLD,
    fontSize: 18,
    color: Colors.black,
    lineHeight: 26,
  },
  bottomContainer: {
    marginBottom: 80,
    alignItems: "center",
    width: "100%",
    gap: 15,
  },
  loginButton: {
    width: "80%",
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  webViewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.yellow,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  webViewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.black,
  },
  webView: {
    flex: 1,
  },
});
