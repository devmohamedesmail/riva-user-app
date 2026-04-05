import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Text, View, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'expo-router'
import colors from '@/constants/colors'
import { useColorScheme } from 'nativewind'

export default function AccountLoginSection() {
    const { t } = useTranslation();
    const router = useRouter();
     const { colorScheme } = useColorScheme()
  return (
      <View className="mx-4 my-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            {/* Icon */}
            <View className="items-center mb-4">
              <View className="bg-blue-100 dark:bg-blue-900 rounded-full p-4">
                <Ionicons
                  name="person-circle-outline"
                  size={64}
                  color={colorScheme === 'dark' ? colors.dark.tint : colors.dark.tint}
                />
              </View>
            </View>

            {/* Title */}
            <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
              {t("account.loginPromptTitle")}
            </Text>

            {/* Message */}
            <Text className="text-center text-gray-600 dark:text-gray-300 mb-6 leading-6">
              {t("account.loginPromptMessage")}
            </Text>

            {/* Buttons */}
            <View className="gap-3">
              <TouchableOpacity
                className="bg-primary dark:bg-primary py-4 rounded-xl flex-row items-center justify-center"
                onPress={() => router.push("/auth/login")}
              >
                <Text className="text-white font-semibold text-base mr-2">
                  {t("account.signInButton")}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                className="border-2 border-primary dark:border-primary py-4 rounded-xl"
                onPress={() => router.push("/auth/register")}
              >
                <Text className="text-primary dark:text-primary font-semibold text-base text-center">
                  {t("account.createAccountButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
  )
}
