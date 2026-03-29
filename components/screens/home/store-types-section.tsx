import React,{useState,useEffect} from 'react'
import { View,Text } from 'react-native'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { usePlace } from '@/hooks/usePlace';
import { config } from '@/constants/config';
import Skeleton from '@/components/ui/skeleton';
import StoreTypeItem from './store-type-item';
import { useStoreTypes } from '@/hooks/useStoreTypes';

interface StoreType {
  id: number;
  name_ar: string;
  name_en: string;
  description: string | null;
  image: string;
  place_id: number;
}
export default function StoreTypesSection() {

    const { t, i18n } = useTranslation();
    const { data, isLoading } = useStoreTypes();

    if (isLoading) {
        return (
            <View className='py-10'>
                <View className='flex flex-row justify-between gap-1 flex-wrap mb-4 px-5'>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Skeleton key={item} width="32%" height={130} className='mb-4' />
                    ))}
                    
                </View>
            </View>
        );
    }




    return (
        <View className='mb-1'>
            <Text
                className={`text-xl font-extrabold py-5 text-black dark:text-white my-1 px-5 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}    
            >
                {t('home.store_types_title')}
            </Text>
            <View className={`flex flex-row justify-between flex-wrap mb-4 mt-1 px-3 gap-1 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                {data && data.map((storeType:StoreType) => (
                    <StoreTypeItem key={storeType.id} storeType={storeType} />
                ))}
            </View>
        </View>
    )
}
