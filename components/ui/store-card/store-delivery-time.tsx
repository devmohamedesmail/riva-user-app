import React from 'react'
import { Store } from '@/@types/stores'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

export default function StoreDeliveryTime({ store }: { store: Store }) {
    const { t } = useTranslation()
    return (
        <View>
            {store.devlivery_time ? (
                <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={14} color="#6B7280" />
                    <Text className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                        {store.devlivery_time} {t("home.min_delivery")}
                    </Text>
                </View>
            ) : (<View className="flex-row items-center">
                <Ionicons name="time-outline" size={14} color="#6B7280" />
                <Text className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                    30 {t("home.min_delivery")}
                </Text>
            </View>)}
        </View>
    )
}
