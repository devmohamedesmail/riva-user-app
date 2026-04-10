import React from 'react'
import { Text, View } from 'react-native'
import OptionButton from './option-button'
import { useTranslation } from 'react-i18next'
import { useColorScheme } from 'nativewind'
import colors from '@/constants/colors'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useSwitchLanguage } from '@/hooks/useSwitchLanguage'


export default function AccountSettingsOptions() {
    const { t } = useTranslation();
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const router = useRouter();
    const switchLanguage = useSwitchLanguage();
    return (
        <View>

            <View className='my-2'>
                <OptionButton
                    title={t("account.switchLanguage")}
                    icon={
                        <MaterialIcons name="language" size={24} color={colors.light.tint} />
                    }
                    type="navigation"
                    onPress={switchLanguage}

                />

                <OptionButton
                    title={colorScheme === "dark" ? t("common.darkMode") || "Dark Mode" : t("common.lightMode") || "Light Mode"}
                    icon={
                        <Ionicons name={colorScheme === "dark" ? "moon" : "sunny"} size={24} color={colors.light.tint} />
                    }
                    type="toggle"
                    value={colorScheme === "dark"}
                    onValueChange={toggleColorScheme}

                />
            </View>


            <View className='my-2'>
                <OptionButton
                    title={t("account.privacyPolicy")}
                    icon={
                        <MaterialIcons
                            name="privacy-tip"
                            size={24}
                            color={colors.light.tint}
                        />
                    }
                    type="navigation"
                    onPress={() => router.push("/privacy")}

                />

                <OptionButton
                    title={t("account.helpSupport")}
                    icon={<MaterialIcons name="support-agent" size={24} color={colors.light.tint} />}
                    type="navigation"
                    onPress={() => router.push("/support")}

                />
                <OptionButton
                    title={t("account.address")}
                    icon={<MaterialIcons name="location-on" size={24} color={colors.light.tint} />}
                    type="navigation"
                    onPress={() => router.push("/account/address")}

                />
            </View>
        </View>
    )
}
