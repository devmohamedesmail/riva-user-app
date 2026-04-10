import React from 'react'
import { View, Pressable } from 'react-native'
import Text from '@/components/ui/text'

export default function ProductQuantityControl({
    quantity,
    onIncrease,
    onDecrease,
}: {
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
}) {
    return (
        <View className="flex-row items-center gap-3">
            <Pressable
                onPress={onDecrease}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-full border-2 border-border dark:border-border-dark items-center justify-center"
            >
                <Text
                    className={`text-xl font-cairoBold leading-none ${quantity <= 1 ? 'text-gray-300 dark:text-gray-700' : 'text-primary'
                        }`}
                >
                    −
                </Text>
            </Pressable>

            <View className="w-10 items-center">
                <Text className="text-xl font-cairoBold text-text dark:text-text-dark">
                    {quantity}
                </Text>
            </View>

            <Pressable
                onPress={onIncrease}
                className="w-10 h-10 rounded-full bg-primary items-center justify-center"
            >
                <Text className="text-xl font-cairoBold text-white leading-none">+</Text>
            </Pressable>
        </View>
    )
}
