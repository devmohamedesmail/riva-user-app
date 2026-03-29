import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native';
import BottomPaper from '@/components/ui/bottom-paper';
import colors from '@/constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import NoAreaFound from '@/components/screens/checkout/no-area-found';
import Input from '@/components/ui/input';
import CheckoutSummery from '@/components/screens/checkout/checkout-summery';
import CheckoutAction from '@/components/screens/checkout/checkout-action';
import CheckoutSuccessModal from '@/components/screens/checkout/checkout-success-modal';
import useCreateOrder from '@/hooks/checkout/useCreateOrder';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';


export default function Checkout() {
  const {
    t,
    bottomSheetRef,
    formik,
    selectedArea,
    loading,
    successModalVisible,
    setSuccessModalVisible,
    searchQuery,
    setSearchQuery,
    filteredAreas,
    setSelectedArea,
    setModalVisible

  } = useCreateOrder()
  return (
    <>
      <Layout>
        <Header title={t('checkout.title')} />
        <ScrollView>
          <View className='p-4 bg-white dark:bg-card-dark'>



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
                  ? formik.errors.phone
                  : undefined
              }
            />








          </View>
          <CheckoutSummery selectedArea={selectedArea} />
          <CheckoutAction loading={loading} formik={formik} />
        </ScrollView>
        <CheckoutSuccessModal
          successModalVisible={successModalVisible}
          setSuccessModalVisible={setSuccessModalVisible}
        />
      </Layout>



      <BottomPaper ref={bottomSheetRef} snapPoints={['50%']}>
        <View
          className=" rounded-t-3xl w-full"

        >

          <Text className="text-xl font-bold text-center text-black dark:text-white">
            {t("order.selectyourArea")}
          </Text>
          {/* Modal Header */}


          {/* Search Input */}
          <View className="px-6 pt-4">
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
              <AntDesign name="search" size={18} color={colors.light.tabIconSelected} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={t("order.searchArea")}
                placeholderTextColor="#9CA3AF"
                className="flex-1 ml-3 text-base text-gray-800"
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <AntDesign name="check-circle" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* Areas List */}
          <BottomSheetFlatList
            data={filteredAreas}
            keyExtractor={(item: any) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NoAreaFound />}
            renderItem={({ item, index }: any) => {
              const isSelected = formik.values.area_name === item.name;

              return (
                <TouchableOpacity
                  onPress={() => {
                    formik.setFieldValue("area_id", item.id);
                    formik.setFieldValue("area_name", item.name);
                    setSelectedArea(item);
                    bottomSheetRef.current?.close();
                  }}
                  className={`py-4 px-4 flex-row items-center justify-between rounded-xl ${index !== filteredAreas.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  style={{
                    backgroundColor: isSelected ? '#F3F4F6' : 'transparent',
                  }}
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                      <AntDesign name="environment" size={18} color="#6B7280" />
                    </View>

                    <View className="flex flex-row justify-between flex-1">
                      <Text
                        className={`text-base ${isSelected
                            ? 'font-semibold text-primary'
                            : 'font-medium text-gray-700'
                          }`}
                      >
                        {item.name}
                      </Text>

                      <Text className="mx-2">{item.price}</Text>
                    </View>
                  </View>

                  {isSelected && (
                    <AntDesign name="check-circle" size={20} color="#10B981" />
                  )}
                </TouchableOpacity>
              );
            }}
          />
          {/* <ScrollView
            className="px-6 py-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {filteredAreas && filteredAreas.length > 0 ? (
              filteredAreas.map((area: any, index: number) => (
                <TouchableOpacity
                  onPress={() => {
                    formik.setFieldValue("area_id", area.id);
                    formik.setFieldValue("area_name", area.name);
                    setSelectedArea(area);
                    bottomSheetRef.current?.close();
                    // setModalVisible(false);

                  }}
                  key={area.id}
                  className={`py-4 px-4 flex-row items-center justify-between rounded-xl active:bg-gray-50 ${index !== filteredAreas.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  style={{
                    backgroundColor: formik.values.address === area.name ? '#F3F4F6' : 'transparent',
                  }}
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                      <AntDesign name="environment" size={18} color="#6B7280" />
                    </View>
                    <View className='flex flex-row justify-between text-black dark:text-white flex-1'>
                      <Text className={`text-base ${formik.values.address === area.name
                        ? 'font-semibold text-primary'
                        : 'font-medium text-gray-700'
                        }`}>
                        {area.name}
                      </Text>
                      <Text className='mx-2'>{area.price}</Text>
                    </View>
                  </View>
                  {formik.values.address === area.name && (
                    <AntDesign name="check-circle" size={20} color="#10B981" />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <NoAreaFound />
            )}
          </ScrollView> */}
        </View>
      </BottomPaper>
    </>

  )
}
