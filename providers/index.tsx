import AuthProvider from '@/context/auth-provider'
import { NetworkProvider } from '@/context/network-provider'
import PlaceProvider from '@/context/place-provider'
import SettingProvider from '@/context/setting-provider'
import { ThemeProvider } from '@/context/theme-provider'
import { ReduxProvider } from '@/store/ReduxProvider'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export const queryClient = new QueryClient();
export default function AppProviders({ children }: { children: React.ReactNode }) {
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                <AuthProvider>
                    <PlaceProvider>
                        <SettingProvider>
                            <ReduxProvider>
                                <NetworkProvider>
                                    {children}
                                    <Toast />
                                </NetworkProvider>
                            </ReduxProvider>
                        </SettingProvider>
                    </PlaceProvider>
                </AuthProvider>
            </ThemeProvider>
            </QueryClientProvider>
            
        </GestureHandlerRootView>

    )
}
