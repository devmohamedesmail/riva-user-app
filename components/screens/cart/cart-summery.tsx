import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/redux/store";
import { selectCartTotalPrice } from "@/redux/hooks";
import { config } from "@/constants/config";


export default function CartSummary() {
  const { t, i18n } = useTranslation();
  const totalPrice = useAppSelector(selectCartTotalPrice);


  return (
    <View className="px-6 pt-2 pb-4">
      <View className="flex-row justify-between items-center mb-2">
      <Text
        className="text-lg font-extrabold text-black dark:text-white"
      >
        {t("cart.orderSummary")}
      </Text>
      </View>

      <View
        className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-2"
        
      >
        <View
          className={`flex-row justify-between items-center ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
        >
          <Text
            className="text-base text-black dark:text-white"
            
          >
            {t("cart.total")}
          </Text>
          <Text
            className="text-xl font-bold text-black dark:text-white"
            
          >
            {config.CurrencySymbol} {totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}


