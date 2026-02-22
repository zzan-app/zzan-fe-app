import { Stack } from 'expo-router';

export default function UserLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="mypage" />
      <Stack.Screen name="myprofile" />
    </Stack>
  );
}
