import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
export default function ProfileWallet({userData}: {userData: any}) {
    const { t } = useTranslation();
  return (
      <View className="flex-1 bg-green-500/10 dark:bg-green-500/20 rounded-2xl p-4 flex-row items-center border border-green-500/20">
                <View className="bg-green-500/20 rounded-full p-2 mr-3">
                  <Ionicons name="wallet" size={24} color="#22c55e" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-green-700 dark:text-green-400 mb-1 font-medium">
                    {t('account.wallet_balance')}
                  </Text>
                  <Text className="text-lg text-green-800 dark:text-green-300 font-bold">
                    {userData?.wallet_balance ?? 0}
                  </Text>
                </View>
              </View>
  )
}
