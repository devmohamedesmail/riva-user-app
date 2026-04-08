import React , {useRef} from 'react'
import { Animated } from 'react-native'

export default function PulseRing() {
     const scale = useRef(new Animated.Value(1)).current
        const opacity = useRef(new Animated.Value(0.6)).current
    
        React.useEffect(() => {
            const pulse = Animated.loop(
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(scale, { toValue: 1.65, duration: 900, useNativeDriver: true }),
                        Animated.timing(scale, { toValue: 1, duration: 900, useNativeDriver: true }),
                    ]),
                    Animated.sequence([
                        Animated.timing(opacity, { toValue: 0, duration: 900, useNativeDriver: true }),
                        Animated.timing(opacity, { toValue: 0.6, duration: 900, useNativeDriver: true }),
                    ]),
                ])
            )
            pulse.start()
            return () => pulse.stop()
        }, [])
    
  return (
   <Animated.View
               className="absolute rounded-full bg-primary"
               style={[
                   { width: 60, height: 60, zIndex: -1 },
                   { transform: [{ scale }], opacity },
               ]}
           />
  )
}
