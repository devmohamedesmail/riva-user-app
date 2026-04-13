import React from 'react'
import { Store } from '@/@types/stores'
import { useTranslation } from 'react-i18next'
import Text from '@/components/ui/text'
import { View } from 'react-native'

export default function StoreReview({ store }: { store: Store }) {
    const { t } = useTranslation()
    return (
        <View className='flex flex-row items-center '>
            <Text className='text-xs text-black dark:text-white'>

                ( {store.total_reviews} )
            </Text>
            <Text className='ml-1 text-black dark:text-white text-xs'>
                {t('stores.reviews')}
            </Text>
        </View>
    )
}
