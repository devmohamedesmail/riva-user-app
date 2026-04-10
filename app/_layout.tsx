import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import '../global.css'
import AppProviders from '@/providers'
import '../i18n/i18n'
import IntroModal from '@/components/ui/intro-modal'
import Splash from '@/components/ui/splash'
import { useFonts, Cairo_400Regular, Cairo_700Bold } from '@expo-google-fonts/cairo'
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";



export default function RootLayout() {
    // const [showSplash, setShowSplash] = useState(true)
    const [fontsLoaded] = useFonts({
        Cairo_400Regular,
        Cairo_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold
    })

    //   if (!fontsLoaded) return null

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowSplash(false)
    //     }, 3000) // 1 second

    //     return () => clearTimeout(timer)
    // }, [])

    // if (showSplash) {
    //     return <Splash />
    // }

    if (!fontsLoaded) {
        return null
    }
    return (
        <AppProviders>
            <Stack screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="(tabs)/index" /> */}
            </Stack>
            {/* <IntroModal /> */}
        </AppProviders>
    )
}
