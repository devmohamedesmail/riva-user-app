import React from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function ReviewsHeader() {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    return (
        <View className="px-5 pt-14 pb-4 bg-primary dark:bg-background-dark mb-3">
            <View className="flex-row items-center mb-2">
                <Pressable
                    onPress={() => router.back()}
                    className="mr-3 p-2 -ml-2 bg-white rounded-full"
                >
                    <AntDesign name="arrow-left" size={20} color="black" />
                </Pressable>
                <Text className="text-xl font-bold text-white flex-1" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                    {t('reviews.title')}
                </Text>
            </View>
        </View>
    )
}