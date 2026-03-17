import React from 'react'
import { Pressable, View, Text } from 'react-native'

export default function ProductsHeaderIcon({ onPress, icon, count }: { onPress: () => void, icon: React.ReactElement, count?: number }) {
    return (

        <Pressable onPress={onPress} className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mx-2">
            <View>
                {icon}
                {count ? (<View className="absolute -top-3 -right-3 w-5 h-5 bg-red-500 rounded-full items-center justify-center"><Text className="text-white text-xs font-bold">{count}</Text></View>):null}

            </View>
        </Pressable>
    )
}
