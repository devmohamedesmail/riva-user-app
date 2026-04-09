import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function BannerItem({ banner, isDark, t }: { banner: any, isDark: boolean, t: any }) {
    return (
        <View key={banner.id} className='px-1'>
            <View className='overflow-hidden relative rounded-xl'
                style={[
                    // styles.bannerContainer,
                    {
                        shadowColor: isDark ? '#000' : '#000',
                        shadowOpacity: isDark ? 0.5 : 0.15,
                    }
                ]}
            >
                <Image
                    source={{ uri: banner.image }}
                    className='w-full h-full rounded-xl'
                    resizeMode='cover'
                />

                {/* Gradient overlay for better text readability */}
                <LinearGradient
                    colors={[
                        'transparent',
                        'rgba(0,0,0,0.3)',
                        'rgba(0,0,0,0.7)',
                    ]}
                    // style={styles.gradientOverlay}
                    className='rounded-xl bg-linear-to-b from-transparent to-black absolute top-0 left-0 right-0 bottom-0 h-[100%]'
                />

                {/* Content container */}
                <View className='absolute bottom-0 left-0 right-0 p-5'>
                    <Text
                        className='text-white font-bold text-3xl mb-2'
                        // style={styles.title}
                        numberOfLines={2}
                    >
                        {banner.title}
                    </Text>
                    <Text
                        className='text-white text-base opacity-90'
                        // style={styles.content}
                        numberOfLines={2}
                    >
                        {banner.content}
                    </Text>
                    <Pressable className='bg-primary p-2 rounded-full w-44 mt-2'>
                        <Text className='text-white font-bold text-center'>{t('common.more')} </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
