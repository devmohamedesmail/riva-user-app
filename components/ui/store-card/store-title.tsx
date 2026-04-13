import React from 'react'
import { Store } from '@/@types/stores'
import Text from '@/components/ui/text'

export default function StoreTitle({ store }: { store: Store }) {
    return (
        <Text className='text-xl mt-3 font-cairo-bold text-black text-center dark:text-white' numberOfLines={1}>
            {store?.name}
        </Text>
    )
}
