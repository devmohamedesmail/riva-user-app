import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import Text from '@/components/ui/text'

export default function NoReviews() {
    const { t } = useTranslation();
    return (
        <View className="items-center justify-center py-16">
            <Ionicons name="chatbox-outline" size={64} color="#D1D5DB" />
            <Text className="text-xl font-semibold text-black mt-4">
                {t('reviews.noReviews')}
            </Text>
            <Text className="text-black mt-2 text-center">
                {t('reviews.noReviewsMessage')}
            </Text>
        </View>
    )
}
