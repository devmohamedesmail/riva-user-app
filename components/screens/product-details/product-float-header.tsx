import { View, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function ProductFloatHeader() {
    const router = useRouter()
    return (
        <View className="absolute top-4 left-0 right-0 z-10 flex-row justify-between items-center px-4 pt-4">
            <Pressable
                onPress={() => router.back()}
                className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Ionicons name="arrow-back" size={20} color="#fff" />
            </Pressable>
        </View>
    )
}