import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { View, Share, Pressable } from 'react-native'
import { useTranslation } from 'react-i18next'
import Text from '@/components/ui/text';
export default function ProfileReferralCode({ userData }: { userData: any }) {
    const { t } = useTranslation();
    return (
        <>
            {userData?.referral_code && (
                <Pressable
                    className="flex-row items-center bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
                    onPress={async () => {
                        try {
                            await Share.share({
                                message: userData?.referral_code,
                            });
                        } catch (error) {
                            console.error('Error sharing referral code:', error);
                        }
                    }}
                >
                    <View className="bg-primary/10 dark:bg-primary/20 rounded-full p-2 mr-3">
                        <Ionicons name="ticket" size={20} color="#fd4a12" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {t('account.referral_code')}
                        </Text>
                        <Text className="text-base text-gray-900 dark:text-white font-medium selectable">
                            {userData?.referral_code}
                        </Text>
                    </View>
                    <View className="bg-gray-200/50 dark:bg-gray-600/50 rounded-full p-2">
                        <Ionicons name="copy-outline" size={18} color="#6b7280" />
                    </View>
                </Pressable>
                
            )}
        </>
    )
}
