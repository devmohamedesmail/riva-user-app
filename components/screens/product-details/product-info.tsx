import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Text from '@/components/ui/text'
import { MaterialIcons } from '@expo/vector-icons'


export default function ProductInfo({ product }: { product: any }) {
    const { t } = useTranslation()
    const displayPrice = () => {
        if (product.product_type === 'simple') {
            if (product.on_sale && product.sale_price) {
                return (
                    <View className="flex-row items-center gap-2">
                        <Text className="text-2xl font-cairoBold text-primary">
                            {product.sale_price} {t('common.currency')}
                        </Text>
                        <View className="bg-primary/10 px-2 py-0.5 rounded-md">
                            <Text className="text-primary text-xs font-cairo line-through">
                                {product.price} {t('common.currency')}
                            </Text>
                        </View>
                        <View className="bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-md">
                            <Text className="text-green-600 dark:text-green-400 text-xs font-cairoBold">
                                {t('common.sale')}
                            </Text>
                        </View>
                    </View>
                )
            }
            return (
                <Text className="text-2xl font-cairoBold text-primary">
                    {product.price} {t('common.currency')}
                </Text>
            )
        }

        // variable
        if (priceRange) {
            return (
                <View className="flex-row items-center gap-1">
                    <Text className="text-sm text-gray-500 dark:text-gray-400 font-cairo">
                        {t('common.starts_from')}
                    </Text>
                    <Text className="text-2xl font-cairoBold text-primary">
                        {priceRange.min}
                    </Text>
                    <Text className="text-base font-cairo text-primary">
                        {' - '}{priceRange.max} {t('common.currency')}
                    </Text>
                </View>
            )
        }
        return null
    }

    const getPriceRange = () => {
        if (!product.attributes) return null
        const prices: number[] = []
        product.attributes.forEach((attr: any) =>
            attr.values.forEach((v: any) => {
                if (v.price) prices.push(v.price)
            })
        )
        if (!prices.length) return null
        return { min: Math.min(...prices), max: Math.max(...prices) }
    }

    const priceRange = getPriceRange()
    return (
        <View className="px-4 pt-5 pb-3 ">
            {/* Category chip */}
            <View className="flex-row mb-3">
                <View className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full flex-row items-center gap-1">
                    <MaterialIcons name="category" size={12} color="#fd4a12" />
                    <Text className="text-primary text-xs font-cairo">
                        {product.category?.name}
                    </Text>
                </View>
            </View>

            {/* Product name */}
            <Text className="text-2xl font-cairoBold text-text dark:text-text-dark mb-2 leading-8">
                {product.name}
            </Text>

            {/* Price */}
            <View className="mt-1">{displayPrice()}</View>

            {/* Description */}
            {product.description && (
                <View className="mt-4 bg-card dark:bg-card-dark/60 rounded-xl p-4 border border-border dark:border-border-dark">
                    <Text className="text-sm text-gray-600 dark:text-gray-400 font-cairo leading-6 text-right">
                        {product.description}
                    </Text>
                </View>
            )}
        </View>
    )
}
