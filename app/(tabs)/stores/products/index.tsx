import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import Layout from '@/components/ui/layout'
import ProductsHeader from '@/components/screens/products/products-header'
import CategoriesSection from '@/components/screens/stores/categories-section'
import Loading from '@/components/ui/loading'
import { FlatList, View , Pressable } from 'react-native'
import ProductCard from '@/components/screens/products/product-card'
import ProductListCard from '@/components/screens/products/product-list-card'
import NoProducts from '@/components/screens/products/no-products'
import { Ionicons } from "@expo/vector-icons"
import { useStoreProducts } from '@/hooks/useStoreProducts'
import Text from '@/components/ui/text'



export default function Products() {
  const { t } = useTranslation();
  const { storeItem } = useLocalSearchParams();
  const parsedStoreItem = JSON.parse(storeItem as string);
  const {filteredProducts,isLoading , searchQuery,setSearchQuery , selectedCategory,setSelectedCategory}=useStoreProducts(parsedStoreItem.id)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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


      <View className="flex-row justify-between items-center px-4 pt-1 pb-3">
        <Text className="text-gray-600 dark:text-gray-300 cairoBold">
           {t("stores.total")} : {filteredProducts?.length || 0}
        </Text>
        <View className="flex-row items-center space-x-2 gap-2">
          <Pressable 
            onPress={() => setViewMode("grid")}
            className={`p-2 rounded-md ${viewMode === "grid" ? "bg-primary" : "bg-gray-200 dark:bg-gray-800"}`}
          >
            <Ionicons name="grid-outline" size={20} color={viewMode === "grid" ? "white" : "gray"} />
          </Pressable>
          <Pressable 
            onPress={() => setViewMode("list")}
            className={`p-2 rounded-md ${viewMode === "list" ? "bg-primary" : "bg-gray-200 dark:bg-gray-800"}`}
          >
            <Ionicons name="list-outline" size={20} color={viewMode === "list" ? "white" : "gray"} />
          </Pressable>
        </View>
      </View>

      {isLoading ? (
        <Loading />
      ) : (
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <FlatList
            key={viewMode}
            data={filteredProducts || []}
            numColumns={viewMode === "grid" ? 2 : 1}
            columnWrapperStyle={viewMode === "grid" ? { justifyContent: "space-between", gap: 10 } : undefined}
            renderItem={({ item }) => (
              viewMode === "grid" ? (
                <ProductCard item={item} store={parsedStoreItem} />
              ) : (
                <ProductListCard item={item} store={parsedStoreItem} />
              )
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
