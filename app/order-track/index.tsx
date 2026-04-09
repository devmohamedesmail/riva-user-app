import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Layout from '@/components/ui/layout'
import Header from '@/components/ui/header'
import Button from '@/components/ui/button'
import { CheckCircle2, Truck, MapPin, Package, CalendarClock, Phone } from 'lucide-react-native'
import { useColorScheme } from 'nativewind'

// Dummy Data
const ORDER_ID = "ORD-7392183"
const ESTIMATED_TIME = "14:30 PM - 15:00 PM"
const STATUS_STEPS = [
  { id: 1, title: 'Order Placed', subtitle: 'We have received your order', date: 'Oct 12, 10:00 AM', status: 'completed', icon: CalendarClock },
  { id: 2, title: 'Processing', subtitle: 'Your order is being prepared', date: 'Oct 12, 10:30 AM', status: 'completed', icon: Package },
  { id: 3, title: 'Out for Delivery', subtitle: 'Order is on the way', date: 'Oct 12, 11:15 AM', status: 'active', icon: Truck },
  { id: 4, title: 'Delivered', subtitle: 'Order has been delivered', date: 'Pending', status: 'pending', icon: MapPin },
]

export default function OrderTrack() {
  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'
  const primaryColor = "#fd4a12"
  const mutedTextColor = isDark ? "#94A3B8" : "#64748B"

  const StepIndicator = ({ step, index }: { step: any, index: number }) => {
    const isCompleted = step.status === 'completed'
    const isActive = step.status === 'active'
    const isLast = index === STATUS_STEPS.length - 1

    const Icon = step.icon

    return (
      <View className="flex-row">
        {/* Left Side: Timeline Marker */}
        <View className="items-center mr-4 w-8">
          <View 
            className={`w-10 h-10 rounded-full items-center justify-center z-10 ${
              isCompleted || isActive ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 color="#fff" size={20} />
            ) : isActive ? (
              <Icon color="#fff" size={20} />
            ) : (
              <Icon color={mutedTextColor} size={18} />
            )}
          </View>
          
          {/* Vertical Line */}
          {!isLast && (
            <View 
              className={`w-0.5 h-16 -z-10 -my-1 ${
                isCompleted ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-800'
              }`}
            />
          )}
        </View>

        {/* Right Side: Step Content */}
        <View className="flex-1 pt-1 pb-8">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 pr-2">
              <Text className={`text-base font-poppinsBold ${
                isCompleted || isActive ? 'text-text dark:text-text-dark' : 'text-gray-400 dark:text-gray-500'
              }`}>
                {step.title}
              </Text>
              <Text className={`text-sm font-poppins mt-0.5 ${
                isCompleted || isActive ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'
              }`}>
                {step.subtitle}
              </Text>
            </View>
            <Text className="text-xs font-poppins text-gray-500 dark:text-gray-400">
              {step.date}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <Layout>
      <Header title="Track Order" />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        {/* Order Summary Card */}
        <View className="bg-card dark:bg-card-dark rounded-3xl p-5 mb-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <View className="flex-row justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <View>
              <Text className="text-gray-500 dark:text-gray-400 font-poppins text-sm mb-1">Order ID</Text>
              <Text className="text-text dark:text-text-dark font-poppinsBold text-lg">{ORDER_ID}</Text>
            </View>
            <View className="bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              <Text className="text-primary font-poppinsBold text-xs uppercase tracking-wider">On The Way</Text>
            </View>
          </View>
          
          <View>
            <Text className="text-gray-500 dark:text-gray-400 font-poppins text-sm mb-1">Estimated Delivery</Text>
            <Text className="text-primary font-poppinsBold text-2xl">{ESTIMATED_TIME}</Text>
          </View>
        </View>

        {/* Timeline Section */}
        <View className="bg-card dark:bg-card-dark rounded-3xl p-6 mb-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <Text className="text-text dark:text-text-dark font-poppinsBold text-lg mb-6">Order Status</Text>
          
          <View>
            {STATUS_STEPS.map((step, index) => (
              <StepIndicator key={step.id} step={step} index={index} />
            ))}
          </View>
        </View>

        {/* Delivery Info */}
        <View className="bg-card dark:bg-card-dark rounded-3xl p-5 mb-10 shadow-sm border border-gray-100 dark:border-gray-800">
            <Text className="text-text dark:text-text-dark font-poppinsBold text-lg mb-4">Delivery Details</Text>
            <View className="flex-row items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl">
                <View className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full items-center justify-center mr-4 shadow-sm">
                    <MapPin color={primaryColor} size={22} />
                </View>
                <View className="flex-1">
                    <Text className="text-text dark:text-text-dark font-poppinsBold text-base">Home Address</Text>
                    <Text className="text-gray-500 dark:text-gray-400 font-poppins text-sm mt-0.5 leading-snug">123 Main Street, Apt 104, New York, NY 10001</Text>
                </View>
            </View>
        </View>

      </ScrollView>

      {/* Bottom Action Area */}
      <View className="p-4 bg-card dark:bg-card-dark border-t border-gray-100 dark:border-gray-800 pb-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_-1px_rgba(255,255,255,0.05)]">
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Button 
              title="Cancel" 
              variant="outline" 
              onPress={() => {}}
            />
          </View>
          <View className="flex-1">
            <Button 
              title="Support" 
              variant="primary" 
              icon={<Phone color="#fff" size={18} />}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </Layout>
  )
}