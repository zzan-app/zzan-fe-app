import { Stack } from 'expo-router';

export default function FeedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="detail" />
      <Stack.Screen name="post" />
      <Stack.Screen name="add" />
      <Stack.Screen name="rate" />
    </Stack>
  );
}
