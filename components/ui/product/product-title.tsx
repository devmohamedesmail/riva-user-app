import React from 'react'
import { View } from 'react-native'
import Text from '@/components/ui/text'
import { Product } from '@/@types/stores'

export default function ProductTitle({ item }: { item: Product }) {
    return (
        <View className="my-2 px-2">
            <Text className="text-black dark:text-white text-center font-cairo mt-2">
                {item.name}
            </Text>

            <Text className="text-gray-500 dark:text-gray-400 text-xs mb-2" numberOfLines={1}>
                {item.store?.name}
            </Text>
        </View>
    )
}
