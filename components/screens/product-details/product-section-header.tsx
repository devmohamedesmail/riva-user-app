import React from 'react'
import { View } from 'react-native'
import Text from '@/components/ui/text'
import { MaterialIcons } from '@expo/vector-icons'

export default function ProductSectionHeader({ title, icon }: { title: string; icon?: string }) {
  return (
    <View className="flex-row items-center gap-2 px-4 pt-5 pb-3">
            {icon && <MaterialIcons name={icon as any} size={18} color="#fd4a12" />}
            <Text className="text-base font-cairoBold text-text dark:text-text-dark">
                {title}
            </Text>
        </View>
  )
}
