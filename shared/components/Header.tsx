import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackIcon from "@/assets/icons/back.svg";
import { Colors, Layout } from "../constants";

interface HeaderProps {
  title: string;
  onBackPress: () => void;
}

export const Header = ({ title, onBackPress }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top;

  return (
    <View style={[styles.container, { paddingTop: safeTop + 12 }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <BackIcon width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Layout.SCREEN_HORIZONTAL,
    paddingBottom: 12,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
  },
  placeholder: {
    width: 40,
  },
});