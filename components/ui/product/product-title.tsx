import React from 'react'
import { View } from 'react-native'
import Text from '@/components/ui/text'
import { Product } from '@/@types/stores'
import ProductStoreInfo from './product-store-info'

export default function ProductTitle({ item }: { item: Product }) {
    return (
        <View className="my-1 px-2">
            <Text className="text-black dark:text-white px-3  font-cairo ">
                {item.name}
            </Text>
            {item.store?.name && (
                // <Text className="text-gray-500 dark:text-gray-400 text-xs mb-2" numberOfLines={1}>
                //     {item.store?.name}
                // </Text>
                <ProductStoreInfo item={item} />
            )}
        </View>
    )
}
