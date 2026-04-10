import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { useRouter } from 'expo-router';
import Text from '@/components/ui/text';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

export default function Header({
  title,
  showBackButton = true,
  rightComponent,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { colorScheme, toggleColorScheme}=useColorScheme()
  const router = useRouter()



  return (
    <>
      
      {/* Header Container */}
      <View
        className="bg-primary dark:bg-gray-800 pt-10 pb-4 shadow-lg dark:shadow-gray-800" >
        <View className="flex-row items-center justify-between px-4">
          {/* Left Section - Back Button */}
          <View className="flex-row items-center flex-1">
            {showBackButton && (
              <Pressable
                onPress={()=>router.back()}
                className="mr-3 p-2"
                // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons 
                  name="arrow-back" 
                  size={24} 
                  color={colorScheme === "dark" ? "#fff" : "#fff"}
                />
              </Pressable>
            )}

            {/* Title Section */}
            <View className="flex-1">
              <Text
                className="text-lg  text-white dark:text-white"
                numberOfLines={1}
              >
                {title}
              </Text>
              
            
            </View>
          </View>

          {/* Right Section - Custom Component */}
          {rightComponent && (
            <View className="ml-3">
              {rightComponent}
            </View>
          )}
        </View>
      </View>

      {/* Bottom Border Line */}
      <View className="h-px bg-gray-100" />
    </>
  );
}
