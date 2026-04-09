import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import NoAreaFound from './no-area-found';
import colors from '@/constants/colors';
import { TouchableOpacity, TextInput, View } from 'react-native';
import BottomPaper from '@/components/ui/bottom-paper';
import { useTranslation } from 'react-i18next';
import Text from '@/components/ui/text';
export default function CheckoutAreaPaper({ bottomSheetRef, formik, searchQuery, setSearchQuery, filteredAreas, setSelectedArea }: any) {
    const { t } = useTranslation();
    return (
        <BottomPaper ref={bottomSheetRef} snapPoints={['50%','80%']}>
            <View
                className=" rounded-t-3xl w-full"

            >

                <Text className="text-xl font-bold text-center text-black dark:text-white">
                    {t("order.selectyourArea")}
                </Text>
                {/* Modal Header */}


                {/* Search Input */}
                <View className="px-6 pt-4 mb-4">
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
               <View className='pb-56'>
                 <BottomSheetFlatList
                    data={filteredAreas}
                    keyExtractor={(item: any) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
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
               </View>

            </View>
        </BottomPaper>
    )
}
