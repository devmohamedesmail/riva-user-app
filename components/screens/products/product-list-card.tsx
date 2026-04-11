import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { useAddToCart } from "@/hooks/stores/useAddToCart";
import AddCartModal from "@/components/ui/add-cart-modal";

interface Attribute {
  name: string;
  values: { value: string; price: number }[];
}

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
  attributes?: Attribute[];
  product_type: string;
}

export default function ProductListCard({ item, store }: { item: Product; store: any }) {
  const { t } = useTranslation();
  const { handleAddToCart, getCartQuantity } = useAddToCart();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<{
    name: string;
    value: string;
    price: number;
  } | null>(null);

  const [modalQuantity, setModalQuantity] = useState(1);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (!isModalVisible) {
      setSelectedAttribute(null);
      setModalQuantity(1);
    }
  };

  const handleAddButtonPress = () => {
    setModalVisible(true);
  };

  const quantity = getCartQuantity(item.id);

  const getPriceRange = (item: Product) => {
    if (!item.attributes) return null;

    let prices: number[] = [];

    item.attributes.forEach(attr => {
      attr.values.forEach(v => {
        if (v.price) prices.push(v.price);
      });
    });

    if (!prices.length) return null;

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { min, max };
  };

  const priceRange = getPriceRange(item);

  return (
    <View className="w-full mb-3 bg-white dark:bg-card-dark rounded-lg overflow-hidden flex-row border border-gray-100 dark:border-gray-800">
      {/* Product Image */}
      <View className="relative w-1/3">
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            className="w-full h-32 object-cover"
            resizeMode="cover"
          />
        ) : (
          <View className="bg-gray-200 h-32 w-full items-center justify-center">
            <Text className="text-gray-600 text-sm text-center px-1">
              {store.name}
            </Text>
          </View>
        )}
        {quantity > 0 && (
          <View className="flex-row mt-2 absolute top-1 right-1 bg-green-600 rounded-full w-6 h-6 flex items-center justify-center">
            <MaterialIcons name="shopping-cart" size={12} color="white" />
            <Text className="text-white font-semibold text-[10px]">
              {quantity}
            </Text>
          </View>
        )}
      </View>

      {/* Product Details */}
      <View className="flex-1 px-3 py-2 justify-between flex-row">
        <View className="flex-1">
          <Text className="text-black dark:text-white font-semibold text-base mb-1" numberOfLines={2}>
            {item.name}
          </Text>

          <View className="flex-row items-center mt-1">
            {item.product_type === "simple" ? (
              <>
                {item.on_sale && item.sale_price ? (
                  <View className="flex-row items-center flex-wrap">
                    <Text className="text-primary font-bold text-md">
                      {item.sale_price} {t("common.currency")}
                    </Text>
                    <Text className="text-gray-400 line-through text-xs ml-2">
                      {item.price} {t("common.currency")}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-primary font-bold text-sm">
                    {item.price} {t("common.currency")}
                  </Text>
                )}
              </>
            ) : (
              <Text className="text-primary font-bold text-sm">
                {priceRange?.min} - {priceRange?.max} {t("common.currency")}
              </Text>
            )}
          </View>
        </View>

        <View className="justify-center items-end ml-2">
          <Pressable
            onPress={handleAddButtonPress}
            className="bg-primary rounded-full w-10 h-10 flex items-center justify-center"
          >
            <MaterialIcons name="add" size={20} color="white" />
          </Pressable>
        </View>
      </View>

      <AddCartModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        item={{ ...item, store }}
        setSelectedAttribute={setSelectedAttribute}
        selectedAttribute={selectedAttribute}
        setModalQuantity={setModalQuantity}
        modalQuantity={modalQuantity}
        handleAddToCart={handleAddToCart}
      />
    </View>
  );
}
