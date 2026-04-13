import { useRouter } from 'expo-router'
import React from 'react'
import { View, Pressable } from 'react-native'
import { Store } from '@/@types/stores'
import StoreImage from '@/components/ui/store-card/store-image'
import StoreTitle from '@/components/ui/store-card/store-title'
import StoreRating from '@/components/ui/store-card/store-rating'
import StoreReview from '@/components/ui/store-card/store-review'





export default function StoreCard({ store }: { store: Store }) {
  const router = useRouter();
  return (
    <Pressable

      onPress={() => {
        router.push({
          pathname: '/stores/products',
          params: { storeItem: JSON.stringify(store) }
        })

      }}
      className='m-2 flex-1 overflow-hidden'
    >
      <View
        className=' rounded-2xl overflow-hidden bg-white dark:bg-card-dark'
      >
        <StoreImage store={store} />

        <View className='px-4 pb-4'>
          <StoreTitle store={store} />
          <View className='flex-row items-center justify-between mt-2'>
            <StoreRating store={store} />
            <StoreReview store={store} />
          </View>
        </View>
      </View>
    </Pressable>
  )
}
