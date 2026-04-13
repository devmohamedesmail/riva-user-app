import React from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Text from '@/components/ui/text'
import { Store } from '@/@types/stores'


export default function StoreRating({ store }: { store: Store }) {
  return (
     <View className='flex flex-row items-center'>
              <Ionicons name="star" size={14} color="#fd4a12" />
              <Text className='text-sm font-bold ml-1' style={{ color: '#fd4a12' }}>
                {/* {parseFloat(store.avg_rating).toFixed(1)} */}
               {store.avg_rating.toFixed(1)}
              </Text>
            </View>
  )
}
