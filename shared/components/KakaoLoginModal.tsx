import KakaoIcon from "@/assets/icons/kakao_black.svg";
import { useRouter } from "expo-router";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors, Layout, Typography } from "../constants";
import { isMockEnabled } from "../utils/env";

interface KakaoLoginModalProps {
  visible: boolean;
  onClose: () => void;
}

const KaKaoButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.kakaoContainer}
      onPress={() => router.push("/login")}
    >
      <KakaoIcon width={24} height={24} />
      <Text style={styles.kakaoText}>카카오로 3초 만에 시작하기</Text>
    </TouchableOpacity>
  );
};

export const KakaoLoginModal = ({ visible, onClose }: KakaoLoginModalProps) => {
  if (isMockEnabled()) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>로그인 후 이용해주세요</Text>
                <Text style={styles.subText}>
                  해당 기능은 로그인 후 이용 가능합니다
                </Text>
              </View>
              <KaKaoButton />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 316,
    backgroundColor: Colors.black,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  textContainer: {
    marginBottom: 20,
    gap: 12,
  },
  mainText: {
    fontFamily: Typography.KAKAO_BIG_SANS_BOLD,
    color: Colors.white,
    fontSize: 18,
    letterSpacing: -0.36,
    lineHeight: 18,
  },
  subText: {
    fontFamily: Typography.KAKAO_SMALL_SANS_REGULAR,
    color: Colors.white,
    fontSize: 12,
    letterSpacing: -0.24,
    lineHeight: 14,
  },
  kakaoContainer: {
    backgroundColor: Colors.yellow,
    width: "100%",
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Layout.ITEM_SPACING,
  },
  kakaoText: {
    color: Colors.black,
    fontFamily: Typography.KAKAO_SMALL_SANS_BOLD,
    fontSize: 14,
  },
});
