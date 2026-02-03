import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.cardBorder,
          elevation: Platform.OS === 'android' ? 8 : 0,
          shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
          shadowOffset:
            Platform.OS === 'ios' ? { width: 0, height: -2 } : undefined,
          shadowOpacity: Platform.OS === 'ios' ? 0.08 : undefined,
          shadowRadius: Platform.OS === 'ios' ? 8 : undefined,
          height: Platform.select({
            ios: 88,
            android: 70,
            default: 70,
          }),
          paddingBottom: Platform.select({
            ios: 28,
            android: 10,
            default: 10,
          }),
          paddingTop: Platform.select({
            ios: 10,
            android: 10,
            default: 10,
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: Platform.select({
            ios: 0,
            android: 4,
            default: 4,
          }),
        },
        tabBarIconStyle: {
          marginTop: Platform.select({
            ios: 0,
            android: 0,
            default: 0,
          }),
        },
      }}
    >
      <Tabs.Screen
        name="treinos"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="dumbbell.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="loja"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="bag.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.centerButton,
                {
                  backgroundColor: focused ? color : colors.cardBorder,
                  shadowColor: focused ? color : 'transparent',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: focused ? 0.3 : 0,
                  shadowRadius: 8,
                },
              ]}
            >
              <IconSymbol
                size={focused ? 36 : 32}
                name="house.fill"
                color={focused ? '#FFFFFF' : color}
              />
            </View>
          ),
          tabBarButton: (props) => (
            <View style={styles.centerButtonContainer}>
              <HapticTab {...props} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.circle.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rede-social"
        options={{
          title: 'Social',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.2.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButtonContainer: {
    top: Platform.select({
      ios: -20,
      android: -25,
      default: -25,
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: Platform.select({
      ios: 64,
      android: 60,
      default: 60,
    }),
    height: Platform.select({
      ios: 64,
      android: 60,
      default: 60,
    }),
    borderRadius: Platform.select({
      ios: 32,
      android: 30,
      default: 30,
    }),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});
