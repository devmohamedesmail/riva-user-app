import React from 'react'
import { Pressable , Animated , Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PulseRing from './pulse-ring'

export default function MainFab({toggle , open }: {toggle: () => void , open: boolean}) {
  return (
      <Pressable
                    
                    onPress={toggle}
                    className="w-15 h-15 rounded-full bg-primary items-center justify-center overflow-visible"
                    style={[
                        { width: 60, height: 60 },
                        Platform.OS === 'ios'
                            ? { shadowColor: '#4F46E5', shadowOpacity: 0.45, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } }
                            : { elevation: 10 },
                    ]}
                >
                   
                    {!open && <PulseRing />}

                    <Animated.View 
                    // style={{ transform: [{ rotate: rotateInterpolate }] }}
                    >
                        <Ionicons name="headset" size={26} color="#fff" />
                    </Animated.View>
                </Pressable>
  )
}
