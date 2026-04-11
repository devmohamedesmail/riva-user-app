import React from 'react'
import { Image, Pressable, View } from 'react-native'
import { Product, Store } from '@/@types/stores'
import { useRouter } from 'expo-router'
import { calculateDiscount } from '@/helper/getPriceDiscount'
import { useTranslation } from 'react-i18next'
import Text from '@/components/ui/text'

export default function ProductImage({ item, store, containerClass="w-full",imageClass = "w-full h-40"
 }: { item: Product, store: Store, containerClass?: string,imageClass?:string }) {
    const router = useRouter()
    const { t } = useTranslation()
    const discountPercentage = calculateDiscount(item.price, item.sale_price, item.on_sale);
    return (
       
        <Pressable onPress={() => router.push({
            pathname: "/stores/product-details",
            params: { item: JSON.stringify(item) }
        })}
            className={`relative ${containerClass}`}>

            {item?.image ? (
                <Image
                    source={{ uri: item.image }}
                    className={`${imageClass} object-cover`}
                    resizeMode="cover"
                />
            ) : (
                <View className="bg-gray-200 h-44 items-center justify-center">
                    <Text className="text-black dark:text-white text-xl text-center mt-1 font-cairo">
                        {store.name}
                    </Text>
                </View>
            )}

            {/* Discount Badge */}
            {discountPercentage > 0 && (
                <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-lg">
                    <Text className="text-white text-xs font-bold">
                        {discountPercentage}% {t("common.off")}
                    </Text>
                </View>
            )}


            {/* Store Logo Badge (optional) */}
            {item.store?.logo && (
                <View className="absolute bottom-2 right-2 w-8 h-8 rounded-full border border-white dark:border-zinc-800 overflow-hidden bg-white shadow-sm">
                    <Image
                        source={{ uri: item.store.logo }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>
            )}
        </Pressable>
    )
}
