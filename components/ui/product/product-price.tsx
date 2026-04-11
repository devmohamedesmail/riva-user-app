import React from 'react'
import { View } from 'react-native'
import Text from '@/components/ui/text'
import { Product } from '@/@types/stores'
import { useTranslation } from 'react-i18next'
import { getPriceRange } from '@/helper/getPriceRange'

export default function ProductPrice({ item }: { item: Product }) {
    const { t } = useTranslation()
    const priceRange = getPriceRange(item);
    return (
        <View className="flex-row justify-center items-center mt-1">



            {item.product_type === "simple" ? (
                <>
                    {item.on_sale && item.sale_price ? (
                        <>
                            <Text className="text-primary font-cairo text-md">
                                {item.sale_price} {t("common.currency")}
                            </Text>
                            <Text className="text-gray-400 line-through font-cairo text-xs ml-2">
                                {item.price} {t("common.currency")}
                            </Text>
                        </>
                    ) : (
                        <Text className="text-primary font-cairo text-sm">
                            {item.price} {t("common.currency")}
                        </Text>
                    )}


                </>) : (<Text>
                    <Text className="text-primary font-cairo text-sm">
                        {priceRange?.min} - {priceRange?.max} {t("common.currency")}
                    </Text>
                </Text>)}







        </View>
    )
}
