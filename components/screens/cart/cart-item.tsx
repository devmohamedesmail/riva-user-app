import { config } from "@/constants/config";
import { deleteFromCart, updateQuantity } from "@/redux/slices/cartSlice";
import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { selectCartItems, useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useColorScheme } from "nativewind";
import ItemDeleteModal from "./item-delete-modal";


export default function CartItem({ item }: any) {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const { t } = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleIncreaseQuantity = (itemId: string) => {
        const item = cartItems.find((cartItem) => cartItem.id === itemId);
        if (item) {
            dispatch(updateQuantity({ id: itemId, quantity: item.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = (itemId: string) => {
        const item = cartItems.find((cartItem) => cartItem.id === itemId);
        if (item) {
            dispatch(updateQuantity({ id: itemId, quantity: item.quantity - 1 }));
        }
    };

    const delete_item = (id: any) => {
        dispatch(deleteFromCart(id));
        toggleModal();
    };

    return (
        <>
            <View className="w-full flex-row rounded-2xl overflow-hidden bg-white dark:bg-card-dark mb-4 shadow-sm border border-gray-100 dark:border-gray-800 p-2">
                <View className="relative">
                    {item.image ? (
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 100, height: 100 }}
                            className="rounded-xl"
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="w-[100px] h-[100px] flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                            <Text className="text-sm text-center px-1" numberOfLines={2}>{item.store_name}</Text>
                        </View>
                    )}
                </View>

                {/* Item Content */}
                <View className="flex-1 px-3 py-1 flex-col justify-between">
                    <View className="flex-row justify-between items-start">
                        <View className="flex-1 pr-2">
                            <Text
                                className="text-base font-bold text-black dark:text-white"
                                numberOfLines={2}
                            >
                                {item.name}
                            </Text>
                            <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>{item.store_name}</Text>
                        </View>
                        {/* Delete Button */}
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedItemId(item.id);
                                toggleModal();
                            }}
                            className="p-1"
                            activeOpacity={0.8}
                        >
                            <FontAwesome5 name="trash" size={16} color="#dc2626" />
                        </TouchableOpacity>
                    </View>

                    {item.selectedAttribute && (
                        <Text className="text-xs mt-1 text-primary dark:text-primary-dark font-medium">{item.selectedAttribute.value}</Text>
                    )}

                    <View className="flex-row items-end justify-between mt-2 flex-1">
                        <Text className="font-bold text-lg text-black dark:text-white">
                            {item.selectedAttribute ? item.selectedAttribute.price : item.price} {config.CurrencySymbol}
                        </Text>

                        {/* Quantity Controls */}
                        <View className="flex-row items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 p-1">
                            <TouchableOpacity
                                onPress={() => handleDecreaseQuantity(item.id)}
                                className="w-8 h-8 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-600"
                                activeOpacity={0.8}
                            >
                                <Ionicons name="remove" size={16} color="#4b5563" />
                            </TouchableOpacity>

                            <View className="min-w-[32px]">
                                <Text className="font-bold text-center px-1 text-black dark:text-white">
                                    {item.quantity}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => handleIncreaseQuantity(item.id)}
                                className="w-8 h-8 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center shadow-sm"
                                activeOpacity={0.8}
                            >
                                <Ionicons name="add" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <ItemDeleteModal
                toggleModal={toggleModal}
                isModalVisible={isModalVisible}
                selectedItemId={selectedItemId}
                delete_item={delete_item}
                item={item}
            />
        </>
    );
}


