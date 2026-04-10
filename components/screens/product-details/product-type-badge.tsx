import React from 'react'
import { View } from 'react-native'
import Text from '@/components/ui/text'
import { MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { Product } from '@/@types/stores'
export default function ProductTypeBadge({ product, cartQty }: { product: Product; cartQty: number }) {
    const { t } = useTranslation()
  return (
    <View className="px-4 pt-4 pb-2">
                            <View className="flex-row gap-2 flex-wrap">
                                <View className="flex-row items-center gap-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/40 px-3 py-1.5 rounded-full">
                                    <MaterialIcons
                                        name={product.product_type === 'variable' ? 'tune' : 'label'}
                                        size={12}
                                        color="#3b82f6"
                                    />
                                    <Text className="text-blue-600 dark:text-blue-400 text-xs font-cairo">
                                        {product.product_type === 'variable' ? 'منتج متغير' : 'منتج ثابت'}
                                    </Text>
                                </View>

                                {product.is_featured && (
                                    <View className="flex-row items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-100 dark:border-yellow-800/40 px-3 py-1.5 rounded-full">
                                        <MaterialIcons name="star" size={12} color="#f59e0b" />
                                        <Text className="text-yellow-600 dark:text-yellow-400 text-xs font-cairo">
                                            مميز
                                        </Text>
                                    </View>
                                )}

                                {cartQty > 0 && (
                                    <View className="flex-row items-center gap-1 bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800/40 px-3 py-1.5 rounded-full">
                                        <MaterialIcons name="shopping-cart" size={12} color="#22c55e" />
                                        <Text className="text-green-600 dark:text-green-400 text-xs font-cairo">
                                            {cartQty} {t('cart.inCart')}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
  )
}
