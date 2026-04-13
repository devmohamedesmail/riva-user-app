import React from 'react'
import { Image, View } from 'react-native'
import { Product } from '@/@types/stores'
import Text from '@/components/ui/text'     

export default function ProductStoreInfo({ item }: { item: Product }) {
    return (
        <View className="flex-row items-center mb-2">
            {item.store?.logo ? (
                <Image
                    source={{ uri: item.store.logo }}
                    className="w-4 h-4 rounded-full mr-1.5"
                    resizeMode="cover"
                />
            ) : null}
            <Text className="text-xs text-gray-500 dark:text-gray-400" numberOfLines={1}>
                {item.store.name}
            </Text>
        </View>
    )
}
