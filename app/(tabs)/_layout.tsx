import { TabBar } from '@/shared/components';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="post" /> 
      <Tabs.Screen name="feed" />
    </Tabs>
  );
}