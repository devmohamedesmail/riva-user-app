import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, View } from 'react-native'
import { Product } from '@/@types/stores'
import ProductImage from '@/components/ui/product/product-image'
import ProductTitle from '@/components/ui/product/product-title'
import ProductAction from '@/components/ui/product/product-action'
import ProductPrice from '@/components/ui/product/product-price'



export default function ResultCardItem({ item  }: { item: Product  }) {

    const router = useRouter()

    const handleProductPress = (product: Product) => {
        router.push({
            pathname: '/(tabs)/stores/product-details',
            params: { item: JSON.stringify(product) }
        })
    }


    return (
        <>
            <Pressable
                onPress={() => handleProductPress(item)}
                className="bg-card dark:bg-card-dark rounded-xl mb-2 overflow-hidden shadow-sm border border-border dark:border-border-dark flex-row"
                style={{ elevation: 2 }}
            >
               
                <ProductImage
                    item={item}
                    store={item.store}
                    containerClass="w-28 h-28"
                    imageClass="w-full h-full"
                />

                {/* Content */}
                <View className="flex-1 p-1 justify-between">
                    <View>
                        <ProductTitle item={item} />
                    </View>

                    {/* Price and Add Button */}
                    <View className="flex-row items-center justify-between mt-1">
                        <ProductPrice item={item} />
                        <ProductAction item={item} store={item.store} />
                    </View>
                </View>
            </Pressable>

          
        </>
    )
}
