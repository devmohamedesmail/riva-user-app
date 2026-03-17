import React from 'react'
import { View, Text, TouchableOpacity ,TextInput} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Search from '@/components/ui/search';
import {  useAppSelector } from '@/store/hooks';
import AntDesign from '@expo/vector-icons/AntDesign';

import ProductsHeaderIcon from './products-header-icon';
export default function ProductsHeader({ parsedStoreItem, searchQuery, setSearchQuery }: any) {
    const router = useRouter();
    const { i18n } = useTranslation();
    const cartItems = useAppSelector((state) => state.cart.items);
    return (
        <View
            className="px-4 pt-14 pb-6 bg-primary dark:bg-background-dark"
        >
            <View className="flex-row items-center justify-between mb-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                >
                    <Ionicons name="arrow-back" size={22} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xl font-bold flex-1 text-center">
                    {i18n.language === "ar" ? "المنتجات" : "Products"} -{" "}
                    {parsedStoreItem.name}
                </Text>

               
                <ProductsHeaderIcon
                    onPress={() => router.push({
                        pathname: '/stores/reviews',
                        params: { storeItem: JSON.stringify(parsedStoreItem) }
                    })}
                    icon={<AntDesign name="comment" size={22} color="white" />}
                    count={parsedStoreItem.total_reviews} 
                />

                <ProductsHeaderIcon
                    onPress={() => router.push("/cart")}
                    icon={<Ionicons name="cart-outline" size={22} color="white" />}
                    count={cartItems.length}
                />

               
            </View>

            {/* <Search
                placeholder={
                    i18n.language === "ar" ? "ابحث عن منتج..." : "Search products..."
                }
                value={searchQuery}
                onChangeText={setSearchQuery}
            
            /> */}

            <View className="bg-white rounded-full flex-row items-center px-4 py-1">
                            <Ionicons name="search" size={20} color="#9ca3af" />
                            <TextInput
                                placeholder={
                    i18n.language === "ar" ? "ابحث عن منتج..." : "Search products..."
                }
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                className="flex-1 ml-2 text-base text-gray-800"
                                cursorColor="#fd4a12"
                                placeholderTextColor="#9ca3af"
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery("")}>
                                    <Ionicons name="close-circle" size={20} color="#9ca3af" />
                                </TouchableOpacity>
                            )}
                        </View>
        </View>
    )
}
