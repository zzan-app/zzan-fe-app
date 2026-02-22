import { useAuthStore } from "@/domains/auth/store";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Defs, Path, RadialGradient, Stop } from "react-native-svg";
import { Colors, Typography } from "../constants";
import { KakaoLoginModal } from "./KakaoLoginModal";

import HomeEmptyIcon from "@/assets/icons/home_empty.svg";
import HomeGrayIcon from "@/assets/icons/home_gray.svg";
import FeedEmptyIcon from "@/assets/icons/menu_empty.svg";
import FeedGrayIcon from "@/assets/icons/menu_gray.svg";
import PlusIcon from "@/assets/icons/plus.svg";

const getIconByRouteName = (routeName: string, isFocused: boolean) => {
  const color = isFocused ? Colors.black : Colors.gray;
  const props = { width: 24, height: 24, fill: color };

  if (routeName === "map") {
    return isFocused ? (
      <HomeEmptyIcon {...props} />
    ) : (
      <HomeGrayIcon {...props} />
    );
  }
  if (routeName === "feed") {
    return isFocused ? (
      <FeedEmptyIcon {...props} />
    ) : (
      <FeedGrayIcon {...props} />
    );
  }
  if (routeName === "post") {
    return <PlusIcon width={24} height={24} fill={Colors.white} />;
  }
  return <View />;
};

const getLabelByRouteName = (routeName: string) => {
  if (routeName === "map") return "홈";
  if (routeName === "feed") return "피드";
  return null;
};

const PlusButton = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Pressable onPress={onPress} style={styles.plusButtonContainer}>
      <View
        style={{
          width: 80,
          height: 40,
          position: "absolute",
          top: -10,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Svg width={80} height={80} viewBox="0 0 100 100">
          <Defs>
            <RadialGradient
              id="shadowGradient"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
            >
              <Stop
                offset="20%"
                stopColor="rgba(0, 0, 0, 0.02)"
                stopOpacity="1"
              />
              <Stop
                offset="85%"
                stopColor="rgba(0, 0, 0, 0.02)"
                stopOpacity="0"
              />
            </RadialGradient>
          </Defs>
          <Path
            d="M 10 50 A 40 40 0 0 1 90 50 L 50 50 Z"
            fill="url(#shadowGradient)"
          />
        </Svg>
      </View>
      <View style={styles.plusButtonOuterCircle}>
        <View style={styles.plusButtonInnerCircle}>{children}</View>
      </View>
    </Pressable>
  );
};

export const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const currentRouteName = state.routes[state.index].name;
  const isPostTab = currentRouteName === "post";
  const { accessToken } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (isPostTab) {
    return <View style={{ height: 0 }} />;
  }

  const routeOrder = ["map", "post", "feed"];
  const orderedRoutes = [...state.routes]
    .filter((route) => routeOrder.includes(route.name))
    .sort((a, b) => routeOrder.indexOf(a.name) - routeOrder.indexOf(b.name));

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {orderedRoutes.map((route) => {
          const isFocused = state.routes[state.index].name === route.name;
          const isPost = route.name === "post";
          const isFeed = route.name === "feed";
          const label = getLabelByRouteName(route.name);
          const textColor = isFocused ? Colors.black : Colors.gray;

          const onPress = () => {
            if ((isFeed || isPost) && !accessToken) {
              setShowLoginModal(true);
              return;
            }

            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return isPost ? (
            <PlusButton key={route.key} onPress={onPress}>
              {getIconByRouteName(route.name, isFocused)}
            </PlusButton>
          ) : (
            <Pressable key={route.key} onPress={onPress} style={styles.tabItem}>
              {getIconByRouteName(route.name, isFocused)}
              {label && (
                <Text style={[styles.label, { color: textColor }]}>
                  {label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
      <KakaoLoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    borderTopWidth: 1.5,
    borderTopColor: "rgba(0, 0, 0, 0.03)",
  },
  contentWrapper: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    marginTop: 4,
  },
  plusButtonContainer: {
    top: -25,
    alignItems: "center",
    justifyContent: "center",
  },
  plusButtonOuterCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  plusButtonInnerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.yellow,
    justifyContent: "center",
    alignItems: "center",
  },
});
