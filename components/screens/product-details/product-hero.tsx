import React, { useState } from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import { useTranslation } from 'react-i18next'
import { MaterialIcons } from '@expo/vector-icons'
import Text from '@/components/ui/text'

export default function ProductHero({ image, name, isAvailable }: { image: string | null; name: string; isAvailable: boolean }) {
    const { t } = useTranslation()
    const [imageLoaded, setImageLoaded] = useState(false)
    return (
        <View className="relative w-full h-64 bg-gray-100 dark:bg-zinc-800">
            {image ? (
                <>
                    {!imageLoaded && (
                        <View className="absolute inset-0 items-center justify-center">
                            <ActivityIndicator color="#fd4a12" />
                        </View>
                    )}
                    <Image
                        source={{ uri: image }}
                        className="w-full h-full"
                        resizeMode="cover"
                        onLoad={() => setImageLoaded(true)}
                    />
                </>
            ) : (
                <View className="flex-1 items-center justify-center">
                    <MaterialIcons name="fastfood" size={64} color="#fd4a12" />
                </View>
            )}

            {/* Gradient overlay */}
            <View className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Availability badge */}
            <View className="absolute bottom-7 right-3">
                <View
                    className={`flex-row items-center px-3 py-1 rounded-full gap-1 ${isAvailable ? 'bg-green-500/90' : 'bg-red-500/90'
                        }`}
                >
                    <View className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-200' : 'bg-red-200'}`} />
                    <Text className="text-white text-xs font-cairoBold">
                        {isAvailable ? 'متاح الآن' : 'غير متاح'}
                    </Text>
                </View>
            </View>
        </View>
    )
}
