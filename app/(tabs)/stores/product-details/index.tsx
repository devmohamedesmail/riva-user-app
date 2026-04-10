import Layout from '@/components/ui/layout'
import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { useAddToCart } from '@/hooks/useAddToCart'
import Text from '@/components/ui/text'
import Toast from 'react-native-toast-message'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ProductFloatHeader from '@/components/screens/product-details/product-float-header'
import ProductHero from '@/components/screens/product-details/product-hero'
import ProductInfo from '@/components/screens/product-details/product-info'
import Divider from '@/components/ui/divider'
import ProductAttributeSection from '@/components/screens/product-details/product-attribute-section'
import ProductCartFooter from '@/components/screens/product-details/product-cart-footer'
import { Product } from '@/@types/stores'
import ProductTypeBadge from '@/components/screens/product-details/product-type-badge'
// ─── Types ────────────────────────────────────────────────────────────────────
// interface AttributeValue {
//     id?: number
//     value: string
//     price: number
// }

// interface Attribute {
//     id: number
//     name: string
//     values: AttributeValue[]
// }

// interface Product {
//     id: number
//     name: string
//     description: string | null
//     image: string | null
//     price: number | null
//     sale_price: number | null
//     on_sale: boolean
//     product_type: 'simple' | 'variable'
//     is_active: boolean
//     is_available: boolean
//     is_featured: boolean
//     category: { id: number; name: string; description?: string }
//     attributes?: Attribute[]
//     store_id: number
//     store?: any
// }


// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function ProductDetails() {
    const { item } = useLocalSearchParams()
    const product: Product = JSON.parse(item as string)
    const router = useRouter()
    const { t } = useTranslation()
    const { handleAddToCart, getCartQuantity } = useAddToCart()
    const insets = useSafeAreaInsets()

    const [selectedAttribute, setSelectedAttribute] = useState<{
        name: string
        value: string
        price: number
    } | null>(null)
    const [quantity, setQuantity] = useState(1)

    // Compute price range for variable products
    // const getPriceRange = () => {
    //     if (!product.attributes) return null
    //     const prices: number[] = []
    //     product.attributes.forEach((attr) =>
    //         attr.values.forEach((v) => {
    //             if (v.price) prices.push(v.price)
    //         })
    //     )
    //     if (!prices.length) return null
    //     return { min: Math.min(...prices), max: Math.max(...prices) }
    // }

    // const priceRange = getPriceRange()
    const cartQty = getCartQuantity(product.id)

    const handleAdd = () => {
        if (product.product_type === 'variable') {
            if (!selectedAttribute) {
                Toast.show({ type: 'error', text1: t('cart.selectAttributeError') })
                return
            }
            handleAddToCart(product, quantity, selectedAttribute)
        } else {
            handleAddToCart(product, quantity)
        }
    }

    return (
        <Layout>
            <View className="flex-1">
                {/* Scrollable content */}
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    {/* Hero */}
                    <View className="relative">
                       
                        <ProductHero
                            image={product.image}
                            name={product.name}
                            isAvailable={product.is_available}
                        />

                        <ProductFloatHeader />
                    </View>

                    {/* White card content */}
                    <View className="flex-1 bg-background dark:bg-background-dark rounded-t-3xl -mt-6 pt-2">
                        <ProductInfo product={product} />

                        <Divider />

                        {/* Variable: attributes */}
                        {product.product_type === 'variable' &&
                            product.attributes &&
                            product.attributes.length > 0 && (
                                <>
                                
                                    <ProductAttributeSection
                                        attributes={product.attributes}
                                        selectedAttribute={selectedAttribute}
                                        onSelectAttribute={setSelectedAttribute}
                                    />
                                    <Divider />
                                </>
                            )}

                        {/* Product type badge */}
                        <ProductTypeBadge product={product} cartQty={cartQty} />
                    </View>
                </ScrollView>

                {/* Sticky footer */}
             
                <ProductCartFooter
                    product={product}
                    selectedAttribute={selectedAttribute}
                    quantity={quantity}
                    onIncrease={() => setQuantity((q) => q + 1)}
                    onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                    onAddToCart={handleAdd}
                />
            </View>
        </Layout>
    )
}
