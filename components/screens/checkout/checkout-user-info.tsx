import React from 'react'
import { View, Pressable } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Input from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import Text from '@/components/ui/text';
export default function CheckoutUserInfo({ formik, bottomSheetRef }: any) {
  const { t } = useTranslation();
  return (
    <View>
      <Pressable
        onPress={() => bottomSheetRef.current?.expand()}
        className="bg-primary rounded-xl p-4 my-4 flex-row items-center justify-between shadow-lg active:opacity-80"
      >
        <View className="flex-row items-center flex-1">
          <AntDesign name="environment" size={20} color="white" />
          <Text className="text-white font-semibold text-base ml-3">
            {formik.values.area_name || t("order.selectyourArea")}
          </Text>
        </View>
        <AntDesign name="down" size={16} color="white" />
      </Pressable>

      {formik.touched.area_id && formik.errors.area_id ? (
        <Text className="text-red-500 text-sm mt-1">
          {formik.errors.area_id}
        </Text>
      ) : null}




      <Input
        label={t("order.customer_name")}
        placeholder={t("order.enterCustomerName")}
        value={formik.values.customer_name}
        onChangeText={formik.handleChange("customer_name")}
        error={
          formik.touched.customer_name && formik.errors.customer_name
            ? formik.errors.customer_name
            : undefined
        }
      />


      <Input
        label={t("order.phoneNumber")}
        placeholder={t("order.enterPhoneNumber")}
        value={formik.values.phone}
        onChangeText={formik.handleChange("phone")}
        error={
          formik.touched.phone && formik.errors.phone
            ? formik.errors.phone
            : undefined
        }
      />

      <Input
        label={t("order.address")}
        placeholder={t("order.enterAddress")}
        value={formik.values.address}
        onChangeText={formik.handleChange("address")}
        error={
          formik.touched.address && formik.errors.address
            ? formik.errors.address
            : undefined
        }
      />

    </View>
  )
}
