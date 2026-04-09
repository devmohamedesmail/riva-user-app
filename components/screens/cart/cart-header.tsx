import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCart } from '@/redux/slices/cartSlice';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '@/constants/colors';
import Text from '@/components/ui/text';
import Button from '@/components/ui/button';
export default function CartHeader() {

  const router = useRouter();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toggleModal();
  };


  return (
    <>
      <View className="px-4 pt-14 pb-4 bg-primary dark:bg-background-dark flex-row items-center justify-between shadow-sm">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-xl cairoBold flex-1 text-center">
          {i18n.language === 'ar' ? 'عربة التسوق' : 'My Cart'}
        </Text>

        <TouchableOpacity
          onPress={toggleModal}
          className={`w-10 h-10 rounded-full items-center justify-center ${cartItems.length > 0 ? 'bg-white/20' : 'opacity-50'}`}
          disabled={cartItems.length === 0}
        >
          <Ionicons name="trash-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>






      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.5}
      >
        <View
          className="p-6 rounded-2xl bg-white dark:bg-card-dark"

        >
          {/* Close Button */}
          <View className="flex flex-row justify-end mb-2">
            <TouchableOpacity
              onPress={toggleModal}
              className="w-10 h-10 rounded-full flex justify-center items-center"

              activeOpacity={0.8}
            >
              <AntDesign name="close" size={18} color={colors.light.tabIconSelected} />
            </TouchableOpacity>
          </View>

          {/* Icon */}
          <View className="items-center mb-4">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"

            >
              <Ionicons name="warning" size={32} color="#dc2626" />
            </View>
          </View>

          {/* Title */}
          <Text
            className="text-center text-2xl cairoBold mb-3"

          >
            {t("cart.clearCart")}
          </Text>

          {/* Description */}
          <Text
            className="text-center text-base mb-6"

          >
            {t("cart.areYouSureClearCart")}
          </Text>

          {/* Action Buttons */}
          <View className="flex flex-row gap-3">
            <Button
              onPress={toggleModal}
              title={t("cart.cancel")}
              // variant="outline"
              className="flex-1"
            />
            <Button
              onPress={handleClearCart}
              title={t("cart.clear_all")}
              variant="danger"
              className="flex-1"
            />
           
          </View>
        </View>
      </Modal>
    </>
  );
}