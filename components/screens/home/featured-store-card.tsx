import React from 'react'
import { Pressable, View, Image } from 'react-native'
import Text from '@/components/ui/text'
import { Store } from '@/@types/stores'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function FeaturedStoreCard({ store, className }: { store: Store, className?: string }) {
    const router = useRouter()
    const { t } = useTranslation()
    const isStoreOpen = (startTime: string, endTime: string) => {
        const now = new Date()
        const currentTime = now.getHours() * 60 + now.getMinutes()

        const [startHour, startMin] = startTime.split(':').map(Number)
        const [endHour, endMin] = endTime.split(':').map(Number)

        const start = startHour * 60 + startMin
        const end = endHour * 60 + endMin

        if (end < start) {
            return currentTime >= start || currentTime <= end
        }
        return currentTime >= start && currentTime <= end
    }
    const storeOpen = isStoreOpen(store.start_time, store.end_time)
    return (
        <Pressable
            key={store.id}
            onPress={() => {
                router.push({
                    pathname: '/stores/products',
                    params: { storeItem: JSON.stringify(store) }
                })
            }}
            className={`${className}`}
        // style={{ width: 280 }}
        >
            <View className="rounded-3xl overflow-hidden bg-white dark:bg-card-dark shadow-lg">
                {/* Store Image with Gradient Overlay */}
                <View className="relative h-40">
                    <Image
                        source={{ uri: store.logo }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        className="absolute bottom-0 left-0 right-0 h-20"
                    />

                    {/* Featured Badge */}
                    <View className="absolute top-3 left-3">
                        <View
                            className="px-3 py-1.5 bg-primary flex-row items-center rounded-xl"
                        >
                            <Ionicons name="star" size={12} color="white" />
                            <Text className="text-white text-xs font-bold ml-1">
                                {t("home.featured")}
                            </Text>
                        </View>
                    </View>

                    {/* Verified Badge */}
                    {store.is_verified && (
                        <View className="absolute top-3 right-3 bg-primary rounded-full p-1.5">
                            <Ionicons name="checkmark-circle" size={16} color="white" />
                        </View>
                    )}

                    {/* Store Status */}
                    <View className="absolute bottom-3 right-3">
                        <View className={`px-3 py-1 rounded-full ${storeOpen ? 'bg-green-500' : 'bg-red-500'}`}>
                            <Text className="text-white text-xs font-semibold">
                                {storeOpen ? t("home.open_now") : t("home.closed")}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Store Info */}
                <View className="p-4">
                    {/* Store Name */}
                    <Text
                        className="text-lg font-bold text-gray-900 dark:text-white mb-2"
                        numberOfLines={1}
                    >
                        {store.name}
                    </Text>

                   

                    {/* Rating and Delivery Time */}
                    <View className="flex-row items-center justify-between">
                        {/* Rating */}
                        <View className="flex-row items-center bg-orange-50 dark:bg-orange-900/20 px-2.5 py-1.5 rounded-lg">
                            <Ionicons name="star" size={14} color="#fd4a12" />
                            <Text className="text-sm font-bold text-[#fd4a12] ml-1">
                                {store.avg_rating > 0 ? store.avg_rating.toFixed(1) : 'N/A'}
                            </Text>
                            <Text className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                ({store.total_reviews})
                            </Text>
                        </View>

                        {/* Delivery Time */}
                        {store.devlivery_time ? (
                            <View className="flex-row items-center">
                                <Ionicons name="time-outline" size={14} color="#6B7280" />
                                <Text className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                                    {store.devlivery_time} {t("home.min_delivery")}
                                </Text>
                            </View>
                        ):(<View className="flex-row items-center">
                                <Ionicons name="time-outline" size={14} color="#6B7280" />
                                <Text className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                                    30 {t("home.min_delivery")}
                                </Text>
                            </View>)}

                    </View>

                    {/* Opening Hours */}
                    {!storeOpen && (
                        <View className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                            <Text className="text-xs text-gray-500 dark:text-gray-400">
                                {t("home.opens_at")} {store.start_time}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    )
}
