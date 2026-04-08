import CartAction from '@/components/screens/cart/cart-action'
import CartHeader from '@/components/screens/cart/cart-header'
import CartItem from '@/components/screens/cart/cart-item'
import CartSummary from '@/components/screens/cart/cart-summery'
import EmptyCart from '@/components/screens/cart/empty-cart'
import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import { selectCart, selectCartItems, useAppSelector } from '@/redux/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, ScrollView } from 'react-native'

export default function Cart() {
  const { t } = useTranslation();
  const cartItems = useAppSelector(selectCartItems);
  const cart = useAppSelector(selectCart);
  return (
    <Layout>
      <CartHeader />


      {cartItems.length === 0 ? <EmptyCart /> : (<>
        <ScrollView
          className="flex-1 bg-gray-50 dark:bg-background-dark"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="px-4 pt-4 pb-8">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>

        <View className="bg-white dark:bg-card-dark rounded-t-3xl overflow-hidden border-t border-gray-200 dark:border-gray-800 shadow-[0_-10px_15px_rgba(0,0,0,0.05)] pt-2 pb-[1px]">
          <CartSummary />
          <CartAction />
        </View>
      </>)}
    </Layout>
  )
}
