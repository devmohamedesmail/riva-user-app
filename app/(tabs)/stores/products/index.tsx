import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/hooks/useFetch'
import { useTranslation } from 'react-i18next'
import { useMemo, useState } from 'react'
import Layout from '@/components/ui/layout'
import ProductsHeader from '@/components/screens/products/products-header'
import CategoriesSection from '@/components/screens/stores/categories-section'
import Loading from '@/components/ui/loading'
import { FlatList, Text, View } from 'react-native'
import ProductCard from '@/components/screens/products/product-card'
import NoProducts from '@/components/screens/products/no-products'
import { useStoreProducts } from '@/hooks/useStoreProducts'

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  on_sale: boolean;
  sale_price: number | null;
  stock: number;
  business_id: number;
  category_id: number;
}

export default function Products() {
  const { t } = useTranslation();
  const { storeItem } = useLocalSearchParams();
  const parsedStoreItem = JSON.parse(storeItem as string);
  const {filteredProducts,isLoading , searchQuery,setSearchQuery , selectedCategory,setSelectedCategory}=useStoreProducts(parsedStoreItem.id)
  

  return (
    <Layout>
      <ProductsHeader
        parsedStoreItem={parsedStoreItem}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <CategoriesSection
        parsedStoreItem={parsedStoreItem}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        t={t}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <FlatList
            data={filteredProducts || []}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
            renderItem={({ item }) => (
              <ProductCard item={item} store={parsedStoreItem} />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 20, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <NoProducts searchQuery={searchQuery} />}
          />
        </View>
      )}


    </Layout>
  )
}
