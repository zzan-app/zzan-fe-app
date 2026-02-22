import { Colors, Typography } from "@/shared/constants";
import { StyleSheet, Text, View } from "react-native";

interface MapSearchResultBlockProps {
  name: string;
  address: string;
}

export const MapSearchResultBlock = ({ name, address }: MapSearchResultBlockProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.takju,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    height: 68,
  },
  name: {
    color: Colors.black,
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 4,
  },
  address: {
    color: Colors.black,
    opacity: 0.7,
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    fontSize: 12,
    textAlign: 'left'
  }
});