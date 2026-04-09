import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView edges={["right", "left", "bottom"]} className={`flex-1 bg-background dark:bg-background-dark`}>
      <StatusBar style="auto" />
      {children}
    </SafeAreaView>
  )
}
