import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const PUSH_TOKEN_KEY = 'push_token';

/** 알림 표시 방식 초기화 (dev build에서만 호출) */
export const initNotificationHandler = (): void => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
};

/** 푸시 알림 권한 요청 */
export const requestNotificationPermissions = async (): Promise<boolean> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

/** Expo 푸시 토큰 발급 후 SecureStore에 저장 */
export const registerPushToken = async (): Promise<string | null> => {
  const granted = await requestNotificationPermissions();
  if (!granted) {
    console.warn('[Notifications] 권한 거부됨');
    return null;
  }

  // Android는 알림 채널 설정 필요
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FFD800',
    });
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) {
    console.error('[Notifications] EAS projectId를 찾을 수 없습니다');
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync({ projectId });
  await SecureStore.setItemAsync(PUSH_TOKEN_KEY, token.data);
  console.log('[Notifications] 푸시 토큰 발급 완료:', token.data);

  return token.data;
};

/** SecureStore에서 저장된 토큰 조회 */
export const getStoredPushToken = async (): Promise<string | null> => {
  return SecureStore.getItemAsync(PUSH_TOKEN_KEY);
};

/** 로컬 테스트 알림 발송 (서버 없이 즉시 확인용) */
export const sendTestNotification = async (): Promise<void> => {
  const granted = await requestNotificationPermissions();
  if (!granted) {
    console.warn('[Notifications] 권한 없음 - 테스트 알림 발송 불가');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '짠! 🍶',
      body: '푸시 알림이 정상적으로 동작하고 있어요.',
      data: { type: 'test' },
    },
    trigger: null, // 즉시 발송
  });

  console.log('[Notifications] 테스트 알림 발송 완료');
};
