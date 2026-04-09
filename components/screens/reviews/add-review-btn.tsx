import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import Text from '@/components/ui/text';

export default function AddReviewBtn({ bottomSheetRef }: any) {
    const { auth } = useAuth()
    const { t } = useTranslation()
    const router = useRouter()
    return (
        <Pressable
            onPress={() => {

                if (auth?.user) {
                    bottomSheetRef.current?.expand()
                } else {
                    router.push('/auth/login')
                }
            }}
            className="absolute bottom-16 right-6 shadow-lg"
            style={{ elevation: 5 }}
        >
            <LinearGradient
                colors={['#fd4a12', '#ff6b3d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-row items-center px-6 py-4 rounded-full"
            >
                <Ionicons name="add-circle-outline" size={24} color="white" />
                <Text className="text-white cairoBold text-base ml-2">
                    {t('reviews.addReview')}
                </Text>
            </LinearGradient>
        </Pressable>
    )
}
