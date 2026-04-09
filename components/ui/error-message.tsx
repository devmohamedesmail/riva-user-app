import React from 'react'
import { Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ErrorMessage({ message }: { message: string }) {
    return (
        <View className="flex-1 items-center justify-center">
            <MaterialIcons name="error" size={48} color="red" />
            <Text className="text-red-500 text-center">{message}</Text>
        </View>
    )
}
