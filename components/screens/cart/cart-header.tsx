import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCart } from '@/redux/slices/cartSlice';
import { useRouter } from 'expo-router';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '@/constants/colors';
export default function CartHeader() {
  const router = useRouter();
  const {t, i18n } = useTranslation();
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

//   const handleClearCart = () => {
//     if (cartItems.length === 0) return;
    
//     Alert.alert(
//       i18n.language === 'ar' ? 'تفريغ السلة' : 'Clear Cart',
//       i18n.language === 'ar' ? 'هل أنت متأكد أنك تريد تفريغ السلة؟' : 'Are you sure you want to clear your cart?',
//       [
//         {
//           text: i18n.language === 'ar' ? 'إلغاء' : 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: i18n.language === 'ar' ? 'تأكيد' : 'Confirm',
//           onPress: () => dispatch(clearCart()),
//           style: 'destructive',
//         },
//       ]
//     );
//   };

  return (
    <>
    <View className="px-4 pt-14 pb-4 bg-primary dark:bg-background-dark flex-row items-center justify-between shadow-sm">
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
      >
        <Ionicons name="arrow-back" size={22} color="white" />
      </TouchableOpacity>

      <Text className="text-white text-xl font-bold flex-1 text-center">
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
            className="text-center text-2xl font-extrabold mb-3"
            
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
            <TouchableOpacity
              className="flex-1 rounded-xl py-4 bg-red-600 dark:bg-red-600"
             
              onPress={toggleModal}
              activeOpacity={0.8}
            >
              <Text
                className="text-center font-bold text-base text-white"
                
              >
                {t("cart.cancel")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 rounded-xl py-4 bg-primary dark:bg-primary-dark"
              
              onPress={handleClearCart}
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-bold text-base">
                {t("cart.clear_all")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}