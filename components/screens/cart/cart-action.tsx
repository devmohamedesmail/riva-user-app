import React from 'react'
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Text from '@/components/ui/text';



export default function CartAction() {
  const router = useRouter();
  const { t } = useTranslation();
 


 

  return (
    <>
      <View>
        <View className="flex-row">
      


          <Pressable
              onPress={() => router.push("/checkout")}
              className="flex-1 rounded-full mx-10 mb-2 flex-row items-center justify-center py-4  bg-primary dark:bg-primary-dark"
             
             
            >
              <MaterialIcons name="shopping-cart-checkout" size={22} color="white" />
              <Text
                className="text-base cairoBold ml-2 text-white"
                
              >
                {t("cart.proceedToCheckout")}
              </Text>
            </Pressable>

        </View>
      </View>

 
    
    </>
  )
}


