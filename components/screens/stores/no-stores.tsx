import React from 'react'
import { View, Pressable, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next';
import Text from '@/components/ui/text'
import { useSetting } from '@/hooks/common/useSetting';


interface NoStoresProps {
    searchQuery?: string;
}

export default function NoStores({ searchQuery }: NoStoresProps) {
    const { t } = useTranslation();
    const { settings } = useSetting()


    const openWhatsApp = () => {
        Linking.openURL(`https://wa.me/${settings?.support_whatsapp}`);
    };
    return (
        <View className='flex-1 items-center justify-center px-5'>
            <Ionicons name="storefront-outline" size={64} color="#d1d5db" />
            <Text className='text-black text-lg cairoBold mt-4'>
                {searchQuery
                    ? t('stores.noResultsFound', { searchQuery })
                    : t('stores.noStoresAvailable')}
            </Text>
            <Text className='text-gray-500 text-center mt-2'>
                {searchQuery ? t('stores.tryDifferentKeywords') : t('stores.checkBackLater')}
            </Text>







            <Pressable
                onPress={openWhatsApp}
                className="flex-row items-center mt-6 bg-green-500 px-4 py-3 rounded-xl"
            >
                <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                <Text className="text-white ml-2 cairoBold">
                    {t('stores.orderViaWhatsapp')}
                </Text>
            </Pressable>

            <Text className='text-black text-center mt-5 text-sm'>
                {t('stores.whatsappOrderNote')}
            </Text>
        </View>
    )
}
