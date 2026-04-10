import React from 'react'
import { View, Pressable } from 'react-native'
import Text from '@/components/ui/text'
import { Product } from '@/@types/stores'
import ProductQuantityControl from './product-quantity-control'
import { MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

export default function ProductCartFooter({
    product,
    selectedAttribute,
    quantity,
    onIncrease,
    onDecrease,
    onAddToCart,
}: {
    product: Product
    selectedAttribute: { name: string; value: string; price: number } | null
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
    onAddToCart: () => void
}) {
    const { t } = useTranslation()
    const isVariable = product.product_type === 'variable'
    const needsAttribute = isVariable && !selectedAttribute
    const isDisabled = needsAttribute || !product.is_available

    const totalPrice = (() => {
        if (isVariable && selectedAttribute) {
            return (selectedAttribute.price * quantity).toFixed(2)
        }
        if (!isVariable) {
            const base =
                product.on_sale && product.sale_price
                    ? product.sale_price
                    : product.price
            return base ? (base * quantity).toFixed(2) : null
        }
        return null
    })()
    return (
        <View className="px-4 py-4 bg-card dark:bg-card-dark border-t border-border dark:border-border-dark">
            <View className="flex-row items-center justify-between">
                {/* Quantity */}
                <ProductQuantityControl
                    quantity={quantity}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />

                {/* Add to cart button */}
                <Pressable
                    onPress={onAddToCart}
                    disabled={isDisabled}
                    className={`flex-1 ml-4 flex-row items-center justify-center py-4 rounded-2xl gap-2 ${isDisabled ? 'bg-gray-300 dark:bg-zinc-700' : 'bg-primary'
                        }`}
                    style={
                        !isDisabled
                            ? {
                                shadowColor: '#fd4a12',
                                shadowOpacity: 0.4,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 4 },
                                elevation: 6,
                            }
                            : {}
                    }
                >
                    <MaterialIcons
                        name="shopping-cart"
                        size={20}
                        color={isDisabled ? '#999' : 'white'}
                    />
                    <View>
                        <Text
                            className={`font-cairoBold text-base ${isDisabled ? 'text-gray-500 dark:text-gray-400' : 'text-white'
                                }`}
                        >
                            {needsAttribute ? t('cart.selectAttribute') : t('cart.addToCart')}
                        </Text>
                        {totalPrice && !isDisabled && (
                            <Text className="text-white/80 text-xs font-cairo text-center">
                                {totalPrice} {t('common.currency')}
                            </Text>
                        )}
                    </View>
                </Pressable>
            </View>
        </View>
    )
}
