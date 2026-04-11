import React from 'react'
import { View } from 'react-native'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAddToCart } from '@/hooks/stores/useAddToCart';
import { useTranslation } from 'react-i18next';
import Text from '@/components/ui/text';

export default function ProductCartQuantity({ item }: { item: any }) {
    const { getCartQuantity } = useAddToCart();
    const { t } = useTranslation();
    const quantity = getCartQuantity(item.id);
    return (
        <View>
            {quantity > 0 && (
                <View className="flex-row items-center  bg-green-50 dark:bg-green-900/20 py-1 px-2 rounded self-start">
                    <MaterialIcons name="shopping-cart" size={12} color="#22c55e" />
                    <Text className="text-green-600 dark:text-green-400 text-xs ml-1 font-medium">
                        {quantity} {t("cart.inCart")}
                    </Text>
                </View>
            )}
        </View>
    )
}
