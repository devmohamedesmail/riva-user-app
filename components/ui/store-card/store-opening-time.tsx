import React from 'react'
import { Store } from '@/@types/stores'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { isStoreOpen } from '@/helper/isStoreOpen'

export default function StoreOpeningTime({ store }: { store: Store }) {
    const { t } = useTranslation()
    const storeOpen = isStoreOpen(store.start_time, store.end_time)
    return (
        <View>
            {!storeOpen && (
                <View className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Text className="text-xs text-gray-500 dark:text-gray-400">
                        {t("home.opens_at")} {store.start_time}
                    </Text>
                </View>
            )}
        </View>
    )
}
