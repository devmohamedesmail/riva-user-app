import React from 'react'
import { Animated, TouchableOpacity, View, Text, Platform, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function FloatContactButton({ action, toggle, i, itemAnims }: { action: any, toggle: () => void, i: number, itemAnims: any }) {
    return (
        <Animated.View
            key={action.id}
            className="absolute bottom-0 right-0 flex-row items-center gap-2.5"
            style={{
                opacity: itemAnims[i].opacity,
                transform: [
                    { translateY: itemAnims[i].translateY },
                    { scale: itemAnims[i].scale },
                ],
            }}
        >
            {/* Label pill */}
            {/* <View className="bg-indigo-950 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-semibold tracking-wide">
                    {action.label}
                </Text>
            </View> */}

            {/* Action button */}
            <Pressable
                
                onPress={() => {
                    action.onPress();
                    //  toggle()
                }}
                className="w-16 h-16 rounded-full items-center justify-center"
                style={[
                    { backgroundColor: action.bg },
                    Platform.OS === 'ios'
                        ? { shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }
                        : { elevation: 8 },
                ]}
            >
                <Ionicons name={action.icon} size={22} color={action.color} />
            </Pressable>
        </Animated.View>
    )
}
