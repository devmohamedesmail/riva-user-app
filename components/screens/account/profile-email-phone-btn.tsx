import React from 'react'
import { View } from 'react-native'
import Text from '@/components/ui/text';
export default function ProfileEmailPhoneBtn({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
    return (
        <View className="flex-row items-center bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <View className="bg-primary/10 dark:bg-primary/20 rounded-full p-2 mr-3">
                {icon}
            </View>
            <View className="flex-1">
                <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {title}
                </Text>
                <Text className="text-base text-gray-900 dark:text-white font-medium">
                    {value}
                </Text>
            </View>
        </View>
    )
}
