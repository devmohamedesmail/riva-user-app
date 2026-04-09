import Layout from '@/components/ui/layout'
import React, { useState } from 'react'
import { View, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import { useTranslation } from 'react-i18next'
import { useAddToCart } from '@/hooks/useAddToCart'
import Text from '@/components/ui/text'
import Toast from 'react-native-toast-message'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// ─── Types ────────────────────────────────────────────────────────────────────
interface AttributeValue {
    id?: number
    value: string
    price: number
}

interface Attribute {
    id: number
    name: string
    values: AttributeValue[]
}

interface Product {
    id: number
    name: string
    description: string | null
    image: string | null
    price: number | null
    sale_price: number | null
    on_sale: boolean
    product_type: 'simple' | 'variable'
    is_active: boolean
    is_available: boolean
    is_featured: boolean
    category: { id: number; name: string; description?: string }
    attributes?: Attribute[]
    store_id: number
    store?: any
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Floating back + share header overlay */
function FloatingHeader({ onBack }: { onBack: () => void }) {
    const { colorScheme } = useColorScheme()
    const isDark = colorScheme === 'dark'

    return (
        <View className="absolute top-4 left-0 right-0 z-10 flex-row justify-between items-center px-4">
            <Pressable
                onPress={onBack}
                className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Ionicons name="arrow-back" size={20} color="#fff" />
            </Pressable>
        </View>
    )
}

/** Hero image with availability badge */
function ProductHero({ image, name, isAvailable }: { image: string | null; name: string; isAvailable: boolean }) {
    const { t } = useTranslation()
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <View className="relative w-full h-64 bg-gray-100 dark:bg-zinc-800">
            {image ? (
                <>
                    {!imageLoaded && (
                        <View className="absolute inset-0 items-center justify-center">
                            <ActivityIndicator color="#fd4a12" />
                        </View>
                    )}
                    <Image
                        source={{ uri: image }}
                        className="w-full h-full"
                        resizeMode="cover"
                        onLoad={() => setImageLoaded(true)}
                    />
                </>
            ) : (
                <View className="flex-1 items-center justify-center">
                    <MaterialIcons name="fastfood" size={64} color="#fd4a12" />
                </View>
            )}

            {/* Gradient overlay */}
            <View className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Availability badge */}
            <View className="absolute bottom-3 right-3">
                <View
                    className={`flex-row items-center px-3 py-1 rounded-full gap-1 ${
                        isAvailable ? 'bg-green-500/90' : 'bg-red-500/90'
                    }`}
                >
                    <View className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-green-200' : 'bg-red-200'}`} />
                    <Text className="text-white text-xs font-cairoBold">
                        {isAvailable ? 'متاح الآن' : 'غير متاح'}
                    </Text>
                </View>
            </View>
        </View>
    )
}

/** Category + title section */
function ProductInfo({
    product,
    priceRange,
}: {
    product: Product
    priceRange: { min: number; max: number } | null
}) {
    const { t } = useTranslation()

    const displayPrice = () => {
        if (product.product_type === 'simple') {
            if (product.on_sale && product.sale_price) {
                return (
                    <View className="flex-row items-center gap-2">
                        <Text className="text-2xl font-cairoBold text-primary">
                            {product.sale_price} {t('common.currency')}
                        </Text>
                        <View className="bg-primary/10 px-2 py-0.5 rounded-md">
                            <Text className="text-primary text-xs font-cairo line-through">
                                {product.price} {t('common.currency')}
                            </Text>
                        </View>
                        <View className="bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-md">
                            <Text className="text-green-600 dark:text-green-400 text-xs font-cairoBold">
                                {t('common.sale')}
                            </Text>
                        </View>
                    </View>
                )
            }
            return (
                <Text className="text-2xl font-cairoBold text-primary">
                    {product.price} {t('common.currency')}
                </Text>
            )
        }

        // variable
        if (priceRange) {
            return (
                <View className="flex-row items-center gap-1">
                    <Text className="text-sm text-gray-500 dark:text-gray-400 font-cairo">
                        {t('common.starts_from')}
                    </Text>
                    <Text className="text-2xl font-cairoBold text-primary">
                        {priceRange.min}
                    </Text>
                    <Text className="text-base font-cairo text-primary">
                        {' - '}{priceRange.max} {t('common.currency')}
                    </Text>
                </View>
            )
        }
        return null
    }

    return (
        <View className="px-4 pt-5 pb-3">
            {/* Category chip */}
            <View className="flex-row mb-3">
                <View className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full flex-row items-center gap-1">
                    <MaterialIcons name="category" size={12} color="#fd4a12" />
                    <Text className="text-primary text-xs font-cairo">
                        {product.category?.name}
                    </Text>
                </View>
            </View>

            {/* Product name */}
            <Text className="text-2xl font-cairoBold text-text dark:text-text-dark mb-2 leading-8">
                {product.name}
            </Text>

            {/* Price */}
            <View className="mt-1">{displayPrice()}</View>

            {/* Description */}
            {product.description && (
                <View className="mt-4 bg-card dark:bg-card-dark/60 rounded-xl p-4 border border-border dark:border-border-dark">
                    <Text className="text-sm text-gray-600 dark:text-gray-400 font-cairo leading-6 text-right">
                        {product.description}
                    </Text>
                </View>
            )}
        </View>
    )
}

/** Divider */
function Divider() {
    return <View className="h-px bg-border dark:bg-border-dark mx-4" />
}

/** Section header */
function SectionHeader({ title, icon }: { title: string; icon?: string }) {
    return (
        <View className="flex-row items-center gap-2 px-4 pt-5 pb-3">
            {icon && <MaterialIcons name={icon as any} size={18} color="#fd4a12" />}
            <Text className="text-base font-cairoBold text-text dark:text-text-dark">
                {title}
            </Text>
        </View>
    )
}

/** Attribute option chip */
function AttributeChip({
    attrValue,
    attribute,
    isSelected,
    onSelect,
}: {
    attrValue: AttributeValue
    attribute: Attribute
    isSelected: boolean
    onSelect: (attr: { name: string; value: string; price: number }) => void
}) {
    const { t } = useTranslation()
    return (
        <Pressable
            onPress={() =>
                onSelect({ name: attribute.name, value: attrValue.value, price: attrValue.price })
            }
            className={`mr-2 mb-2 px-4 py-3 rounded-xl border-2 flex-row items-center gap-2 ${
                isSelected
                    ? 'bg-primary border-primary'
                    : 'bg-card dark:bg-card-dark border-border dark:border-border-dark'
            }`}
            style={isSelected ? { shadowColor: '#fd4a12', shadowOpacity: 0.3, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 4 } : {}}
        >
            {isSelected && (
                <AntDesign name="check" size={14} color="white" />
            )}
            <View>
                <Text
                    className={`font-cairoBold text-sm ${
                        isSelected ? 'text-white' : 'text-text dark:text-text-dark'
                    }`}
                >
                    {attrValue.value}
                </Text>
                <Text
                    className={`font-cairo text-xs mt-0.5 ${
                        isSelected ? 'text-white/80' : 'text-primary'
                    }`}
                >
                    {attrValue.price} {t('common.currency')}
                </Text>
            </View>
        </Pressable>
    )
}

/** Variable product attribute selection */
function AttributeSection({
    attributes,
    selectedAttribute,
    onSelectAttribute,
}: {
    attributes: Attribute[]
    selectedAttribute: { name: string; value: string; price: number } | null
    onSelectAttribute: (attr: { name: string; value: string; price: number }) => void
}) {
    return (
        <>
            {attributes.map((attribute) => (
                <View key={attribute.id} className="mb-2">
                    <SectionHeader title={attribute.name} icon="tune" />
                    <View className="flex-row flex-wrap px-4">
                        {attribute.values.map((val, idx) => (
                            <AttributeChip
                                key={idx}
                                attrValue={val}
                                attribute={attribute}
                                isSelected={selectedAttribute?.value === val.value}
                                onSelect={onSelectAttribute}
                            />
                        ))}
                    </View>
                </View>
            ))}
        </>
    )
}

/** Quantity controller */
function QuantityControl({
    quantity,
    onIncrease,
    onDecrease,
}: {
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
}) {
    return (
        <View className="flex-row items-center gap-3">
            <Pressable
                onPress={onDecrease}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-full border-2 border-border dark:border-border-dark items-center justify-center"
            >
                <Text
                    className={`text-xl font-cairoBold leading-none ${
                        quantity <= 1 ? 'text-gray-300 dark:text-gray-700' : 'text-primary'
                    }`}
                >
                    −
                </Text>
            </Pressable>

            <View className="w-10 items-center">
                <Text className="text-xl font-cairoBold text-text dark:text-text-dark">
                    {quantity}
                </Text>
            </View>

            <Pressable
                onPress={onIncrease}
                className="w-10 h-10 rounded-full bg-primary items-center justify-center"
            >
                <Text className="text-xl font-cairoBold text-white leading-none">+</Text>
            </Pressable>
        </View>
    )
}

/** Add to cart sticky footer */
function CartFooter({
    product,
    selectedAttribute,
    quantity,
    onIncrease,
    onDecrease,
    onAddToCart,
}: {
    product: Product
    selectedAttribute: { name: string; value: string; price: number } | null
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
    onAddToCart: () => void
}) {
    const { t } = useTranslation()
    const isVariable = product.product_type === 'variable'
    const needsAttribute = isVariable && !selectedAttribute
    const isDisabled = needsAttribute || !product.is_available

    const totalPrice = (() => {
        if (isVariable && selectedAttribute) {
            return (selectedAttribute.price * quantity).toFixed(2)
        }
        if (!isVariable) {
            const base =
                product.on_sale && product.sale_price
                    ? product.sale_price
                    : product.price
            return base ? (base * quantity).toFixed(2) : null
        }
        return null
    })()

    return (
        <View className="px-4 py-4 bg-card dark:bg-card-dark border-t border-border dark:border-border-dark">
            <View className="flex-row items-center justify-between">
                {/* Quantity */}
                <QuantityControl
                    quantity={quantity}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />

                {/* Add to cart button */}
                <Pressable
                    onPress={onAddToCart}
                    disabled={isDisabled}
                    className={`flex-1 ml-4 flex-row items-center justify-center py-4 rounded-2xl gap-2 ${
                        isDisabled ? 'bg-gray-300 dark:bg-zinc-700' : 'bg-primary'
                    }`}
                    style={
                        !isDisabled
                            ? {
                                  shadowColor: '#fd4a12',
                                  shadowOpacity: 0.4,
                                  shadowRadius: 12,
                                  shadowOffset: { width: 0, height: 4 },
                                  elevation: 6,
                              }
                            : {}
                    }
                >
                    <MaterialIcons
                        name="shopping-cart"
                        size={20}
                        color={isDisabled ? '#999' : 'white'}
                    />
                    <View>
                        <Text
                            className={`font-cairoBold text-base ${
                                isDisabled ? 'text-gray-500 dark:text-gray-400' : 'text-white'
                            }`}
                        >
                            {needsAttribute ? t('cart.selectAttribute') : t('cart.addToCart')}
                        </Text>
                        {totalPrice && !isDisabled && (
                            <Text className="text-white/80 text-xs font-cairo text-center">
                                {totalPrice} {t('common.currency')}
                            </Text>
                        )}
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

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
    const getPriceRange = () => {
        if (!product.attributes) return null
        const prices: number[] = []
        product.attributes.forEach((attr) =>
            attr.values.forEach((v) => {
                if (v.price) prices.push(v.price)
            })
        )
        if (!prices.length) return null
        return { min: Math.min(...prices), max: Math.max(...prices) }
    }

    const priceRange = getPriceRange()
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
                        {/* Floating header on top of the image */}
                        <FloatingHeader onBack={() => router.back()} />
                    </View>

                    {/* White card content */}
                    <View className="flex-1 bg-background dark:bg-background-dark rounded-t-3xl -mt-6 pt-2">

                        {/* Product info: category, name, price, desc */}
                        <ProductInfo product={product} priceRange={priceRange} />

                        <Divider />

                        {/* Variable: attributes */}
                        {product.product_type === 'variable' &&
                            product.attributes &&
                            product.attributes.length > 0 && (
                                <>
                                    <AttributeSection
                                        attributes={product.attributes}
                                        selectedAttribute={selectedAttribute}
                                        onSelectAttribute={setSelectedAttribute}
                                    />
                                    <Divider />
                                </>
                            )}

                        {/* Product type badge */}
                        <View className="px-4 pt-4 pb-2">
                            <View className="flex-row gap-2 flex-wrap">
                                <View className="flex-row items-center gap-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/40 px-3 py-1.5 rounded-full">
                                    <MaterialIcons
                                        name={product.product_type === 'variable' ? 'tune' : 'label'}
                                        size={12}
                                        color="#3b82f6"
                                    />
                                    <Text className="text-blue-600 dark:text-blue-400 text-xs font-cairo">
                                        {product.product_type === 'variable' ? 'منتج متغير' : 'منتج ثابت'}
                                    </Text>
                                </View>

                                {product.is_featured && (
                                    <View className="flex-row items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-100 dark:border-yellow-800/40 px-3 py-1.5 rounded-full">
                                        <MaterialIcons name="star" size={12} color="#f59e0b" />
                                        <Text className="text-yellow-600 dark:text-yellow-400 text-xs font-cairo">
                                            مميز
                                        </Text>
                                    </View>
                                )}

                                {cartQty > 0 && (
                                    <View className="flex-row items-center gap-1 bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800/40 px-3 py-1.5 rounded-full">
                                        <MaterialIcons name="shopping-cart" size={12} color="#22c55e" />
                                        <Text className="text-green-600 dark:text-green-400 text-xs font-cairo">
                                            {cartQty} {t('cart.inCart')}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Sticky footer */}
                <CartFooter
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
