import AccountLoginSection from '@/components/screens/account/account-login-section'
import AccountSettingsOptions from '@/components/screens/account/account-settings-options'
import LogoutSection from '@/components/screens/account/logout-section'
import ProfileAvatar from '@/components/screens/account/profile-avatar'
import ProfileEmailPhoneBtn from '@/components/screens/account/profile-email-phone-btn'
import ProfilePoints from '@/components/screens/account/profile-points'
import ProfileReferralCode from '@/components/screens/account/profile-referral-code'
import ProfileWallet from '@/components/screens/account/profile-wallet'
import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import useProfile from '@/hooks/auth/useProfile'
import { useAuth } from '@/hooks/useAuth'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

export default function AccountScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data } = useProfile();
  const userData = data?.data || user;
  return (
    <Layout>
      <Header title={t("account.title")} />

      <ScrollView>
        {user ? (
          <View className="mx-4 my-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            {/* Profile Avatar */}
            <ProfileAvatar userData={userData} />

            {/* Wallet & Points */}
            <View className="flex-row gap-4 mb-6">
              <ProfileWallet userData={userData} />
              <ProfilePoints userData={userData} />
            </View>

            {/* User Information */}
            <View className="space-y-4">
              {/* Email */}
              {userData?.email && (
                <ProfileEmailPhoneBtn
                  icon={<Ionicons name="mail" size={20} color="#fd4a12" />}
                  title={t('auth.email', 'Email')}
                  value={userData?.email || t('common.not_provided', 'Not provided')}
                />
              )}

              {/* Phone */}
              {userData?.phone ? (
                <ProfileEmailPhoneBtn
                  icon={<Ionicons name="call" size={20} color="#fd4a12" />}
                  title={t('auth.phone')}
                  value={userData?.phone}
                />
              ) : null}

              <ProfileReferralCode userData={userData} />
            </View>
          </View>
        ) : (
          <AccountLoginSection />
        )}




      <AccountSettingsOptions />


        {user ? <LogoutSection /> : null}
      </ScrollView>

    </Layout>
  )
}
