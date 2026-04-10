import React from 'react'
import { View, Image, Pressable, Linking } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Text from '@/components/ui/text'
import Button from '@/components/ui/button'
import { useRouter } from 'expo-router'

export default function BannerItem({ banner, isDark, t }: { banner: any, isDark: boolean, t: any }) {
   
   const router=useRouter();
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
                    
                    className='rounded-xl bg-linear-to-b from-transparent to-black absolute top-0 left-0 right-0 bottom-0 h-[100%]'
                />

                {/* Content container */}
                <View className='absolute bottom-0 left-0 right-0 p-5'>
                    <Text className='text-white text-2xl'> {banner.title}</Text>
                    <Text className='text-white text-md text-base opacity-90'> {banner.content}</Text>
                    <Button
                        // onPress={() => { router.push('/order-track') }}
                        onPress={() => { Linking.openURL(banner.link) }}
                        className='mt-2 w-44'
                        title={t('common.more')} size='sm'
                        // variant='outline'
                    />
                </View>
            </View>
        </View>
    )
}
