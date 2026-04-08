import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'

export default function CheckoutHeader() {
    const {t, i18n } = useTranslation();
    const router = useRouter();
    return (
        <View className="px-4 pt-14 pb-4 bg-primary dark:bg-background-dark flex-row items-center justify-between shadow-sm">
            <Pressable
                onPress={() => router.back()}
                className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            >
                <Ionicons name="arrow-back" size={22} color="white" />
            </Pressable>

            <Text className="text-white text-xl font-bold flex-1 text-center">
                {t('checkout.title')}
            </Text>

            {/* <TouchableOpacity
                onPress={toggleModal}
                className={`w-10 h-10 rounded-full items-center justify-center ${cartItems.length > 0 ? 'bg-white/20' : 'opacity-50'}`}
                disabled={cartItems.length === 0}
            >
                <Ionicons name="trash-outline" size={22} color="white" />
            </TouchableOpacity> */}
        </View>
    )
}
