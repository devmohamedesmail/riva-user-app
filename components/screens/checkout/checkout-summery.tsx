import React from 'react'
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { config } from '@/constants/config';
import { useAppSelector } from '@/redux/hooks';
import { useSetting } from '@/hooks/common/useSetting';
import Text from '@/components/ui/text';

export default function CheckoutSummery({ selectedArea, storeCount }: { selectedArea: any, storeCount: number }) {
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  const cart = useAppSelector((state) => state.cart);
  const { t, i18n } = useTranslation();
  const { settings } = useSetting()
  //  const extraCost = (storeCount - 1) * selectedArea.price * (Number(settings?.order_extra_ratio) / 100)

  const extraStores = Math.max(storeCount - 1, 0);

  const extraCost =
    extraStores *
    selectedArea?.price *
    (Number(settings?.order_extra_ratio) / 100);

  const deliveryTotal = Number(selectedArea?.price || 0) + extraCost;

  const finalTotal = Number(totalPrice.toFixed(2)) + deliveryTotal;
  return (
    <View className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
      <Text className={`text-xl  text-black mb-4 text-center cairoBold `}> {t("order.orderSummary")}</Text>


      <View className={`flex-row justify-between items-center mb-2 ${i18n.language === "ar" ? " flex-row-reverse" : ""}`}>
        <Text className="text-gray-600"> {t("checkout.subtotal")} ({totalItems} {t("checkout.items")})</Text>
        <Text className="font-semibold text-gray-900"> {config.CurrencySymbol} {totalPrice.toFixed(2)}</Text>
      </View>

      <View className={`flex-row justify-between items-center mb-2 ${i18n.language === "ar" ? " flex-row-reverse" : ""}`}>
        <Text className="text-gray-600">{t("order.deliveryFee")} </Text>
        {selectedArea ? (
          <Text className="text-gray-600">
            {config.CurrencySymbol} {" "}
            {deliveryTotal}
          </Text>
        ) : (
          <Text className="text-gray-600">
            -----
          </Text>
        )}
      </View>
      <View>
        <Text>{t("order.storesCount", { count: storeCount })}</Text>
      </View>

      <View className="border-t border-gray-200 pt-3">
        <View
          className={`flex-row justify-between items-center mb-2 ${i18n.language === "ar" ? " flex-row-reverse" : ""}`}
        >
          <Text className="text-lg cairo-bold text-gray-900">
            {t("order.total")}
          </Text>

          {selectedArea ? (
            <Text className="text-lg cairo-bold text-gray-900">
              {config.CurrencySymbol}{" "} {" "}
              {/* {Number(selectedArea?.price * storeCount -1 * Number(settings?.order_extra_ratio)) + Number(totalPrice.toFixed(2))} */}
              {finalTotal}
            </Text>) : (<></>)}
        </View>
      </View>
    </View>
  )
}
