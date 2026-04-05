import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
export default function ProfileAvatar({ userData }: { userData: any }) {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <View className="items-center mb-6">
            <View className="bg-primary/10 dark:bg-primary/20 rounded-full p-4 mb-3">
                <Ionicons
                    name="person"
                    size={48}
                    color="#fd4a12"
                />
            </View>
            <View className="flex-row items-center gap-2">
                <Text className="text-xl font-bold text-gray-900 dark:text-white">
                    {userData?.name}
                </Text>
                <Pressable onPress={() => router.push("/account/edit-profile")}>
                    <Text className="text-primary dark:text-primary font-medium">
                        <Entypo name="edit" size={24} color="#fd4a12" />
                        {/* {t("account.editProfile")} */}
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
