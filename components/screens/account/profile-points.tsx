import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
export default function ProfilePoints({ userData }: { userData: any }) {
    const { t } = useTranslation();
    return (
        <View className="flex-1 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-2xl p-4 flex-row items-center border border-yellow-500/20">
            <View className="bg-yellow-500/20 rounded-full p-2 mr-3">
                <Ionicons name="star" size={24} color="#eab308" />
            </View>
            <View className="flex-1">
                <Text className="text-xs text-yellow-700 dark:text-yellow-400 mb-1 font-medium">
                    {t('account.points')}
                </Text>
                <Text className="text-lg text-yellow-800 dark:text-yellow-300 font-bold">
                    {userData?.points ?? 0}
                </Text>
            </View>
        </View>
    )
}
