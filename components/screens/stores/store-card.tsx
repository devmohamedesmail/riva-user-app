import { useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import Text from '@/components/ui/text'
import { Store } from '@/@types/stores'





export default function StoreCard({ item }: { item: Store }) {
  const { t } = useTranslation()
  const router = useRouter();


  return (
    <Pressable
    
      onPress={() => {
        router.push({
          pathname: '/stores/products',
          params: { storeItem: JSON.stringify(item) }
        })

      }}
      className='m-2 flex-1 overflow-hidden'
    >
      <View
        className=' rounded-2xl overflow-hidden bg-white dark:bg-card-dark'
      >
        <View className='w-full h-48  ' >
          <Image source={{ uri: item.logo }} className='w-full h-full rounded-2xl' resizeMode='cover' />
        </View>

        <View className='px-4 pb-4'>

          <Text className='text-xl mt-3 font-cairo-bold text-black text-center dark:text-white' numberOfLines={1}>
            {item.name}
          </Text>


          <View className='flex-row items-center justify-between mt-2'>
            <View className='flex flex-row items-center'>
              <Ionicons name="star" size={14} color="#fd4a12" />
              <Text className='text-sm font-bold ml-1' style={{ color: '#fd4a12' }}>
                {parseFloat(item.avg_rating).toFixed(1)}
              </Text>
            </View>



            <View className='flex flex-row items-center '>
              <Text className='text-xs text-black dark:text-white'>

                ( {item.total_reviews} )
              </Text>
              <Text className='ml-1 text-black dark:text-white text-xs'>
                {t('stores.reviews')}
              </Text>
            </View>


          </View>


         

        </View>
      </View>
    </Pressable>
  )
}
