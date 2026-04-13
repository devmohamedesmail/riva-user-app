import React from 'react'
import { View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import Text from '@/components/ui/text'
import { Store } from '@/@types/stores'
import { isStoreOpen } from '@/helper/isStoreOpen'


export default function StoreImage({ store }: { store: Store }) {
    const { t } = useTranslation()
    const storeOpen = isStoreOpen(store.start_time, store.end_time)
    return (
        <View className='w-full h-48  ' >
            <Image source={{ uri: store.logo }} className='w-full h-full rounded-2xl' resizeMode='cover' />
            <View className="absolute top-3 left-3">
                <View
                    className="px-3 py-1.5 bg-primary flex-row items-center rounded-xl"
                >
                    <Ionicons name="star" size={12} color="white" />
                    <Text className="text-white text-xs  ml-1">
                        {t("home.featured")}
                    </Text>
                </View>
            </View>

            {/* Verified Badge */}
            {store?.is_verified && (
                <View className="absolute top-3 right-3 bg-primary rounded-full p-1.5">
                    <Ionicons name="checkmark-circle" size={16} color="white" />
                </View>
            )}

            {/* Store Status */}
            <View className="absolute bottom-3 right-3">
                <View className={`px-3 py-1 rounded-full ${storeOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                    <Text className="text-white text-xs font-semibold">
                        {storeOpen ? t("home.open_now") : t("home.closed")}
                    </Text>
                </View>
            </View>

        </View>
    )
}
