import React, { useState } from "react";
import { View,Image, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import AddCartModal from "@/components/ui/add-cart-modal";
import { useAddToCart } from "@/hooks/stores/useAddToCart";
import Text from "@/components/ui/text";
import { Product } from "@/@types/stores";
import { useRouter } from "expo-router";





export default function ProductCard({ item, store }: { item: Product; store: any }) {
  const { t } = useTranslation();
  const { handleAddToCart, getCartQuantity } = useAddToCart();
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter()
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
  const basePrice = item.on_sale && item.sale_price ? item.sale_price : item.price;


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
    <View className="w-1/2 mb-5 bg-white dark:bg-card-dark rounded-lg overflow-hidden relative">
      {/* product Image */}
      <Pressable onPress={() => router.push({ 
        pathname: "/stores/product-details", 
        params: { item : JSON.stringify(item) } })} 
        className="relative">
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            className="w-full h-40 object-cover"
            resizeMode="cover"
          />
        ) : (
          <View className="bg-gray-200 h-44 items-center justify-center">
            <Text className="text-black dark:text-white text-xl text-center mt-1 font-cairo">
              {store.name}
            </Text>
          </View>
        )}
        {quantity > 0 && (
          <View className="flex-row mt-2 absolute top-2 right-2 bg-green-600   rounded-full w-8 h-8 flex items-center justify-center">
            <MaterialIcons name="shopping-cart" size={14} color="white" />
            <Text className="text-white font-semibold text-xs">
              {quantity}
              {/* {t("cart.inCart")} */}
            </Text>
          </View>
        )}
      </Pressable>




      <View className="my-2 px-2">
        <Text className="text-black dark:text-white text-center font-cairo mt-2">
          {item.name}
        </Text>
      </View>




      <View className="flex flex-row justify-between items-center px-4 pb-2">
        <View className="flex-row justify-center items-center mt-1">



          {item.product_type === "simple" ? (
            <>
              {item.on_sale && item.sale_price ? (
                <>
                  <Text className="text-primary font-cairo text-md">
                    {item.sale_price} {t("common.currency")}
                  </Text>
                  <Text className="text-gray-400 line-through font-cairo text-xs ml-2">
                    {item.price} {t("common.currency")}
                  </Text>
                </>
              ) : (
                <Text className="text-primary font-cairo text-sm">
                  {item.price} {t("common.currency")}
                </Text>
              )}


            </>) : (<Text>
              <Text className="text-primary font-cairo text-sm">
                {priceRange?.min} - {priceRange?.max} {t("common.currency")}
              </Text>
            </Text>)}







          {/* {item.on_sale && item.sale_price ? (
            <>
              <Text className="text-primary font-bold text-md">
                {item.sale_price} {t("common.currency")}
              </Text>
              <Text className="text-gray-400 line-through text-xs ml-2">
                {item.price} {t("common.currency")}
              </Text>
            </>
          ) : (
            <Text className="text-primary font-bold text-sm">
              {item.price} {t("common.currency")}
            </Text>
          )} */}
        </View>
        <Pressable
          onPress={handleAddButtonPress}
          className="bg-primary rounded-full w-10 h-10 flex items-center justify-center"
        >
          <View className="flex flex-row justify-center">
            <MaterialIcons name="add" size={18} color="white" />
            {/* <Text className="text-white text-sm font-bold ml-1">
              {t("cart.addToCart")}
            </Text> */}
          </View>
        </Pressable>
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
