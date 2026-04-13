import React from 'react'
import { Stack } from 'expo-router'
import '../global.css'
import AppProviders from '@/providers'
import '../i18n/i18n'
import { useFonts, Cairo_400Regular, Cairo_700Bold } from '@expo-google-fonts/cairo'
import { Poppins_400Regular, Poppins_600SemiBold } from "@expo-google-fonts/poppins";



export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Cairo_400Regular,
        Cairo_700Bold,
        Poppins_400Regular,
        Poppins_600SemiBold
    })



    if (!fontsLoaded) {
        return null
    }
    return (
        <AppProviders>
            <Stack screenOptions={{ headerShown: false }}>
            </Stack>
            {/* <IntroModal /> */}
        </AppProviders>
    )
}
