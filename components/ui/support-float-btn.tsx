import React, { useState, useRef, useCallback } from 'react'
import {
    View,
    TouchableOpacity,
    Animated,
    Text,
    Linking,
    Platform,
    Pressable,
    StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSetting } from '@/hooks/common/useSetting'
import MainFab from './main-fab'
import FloatContactButton from './float-contact-button'





// ─── Component ────────────────────────────────────────────────────────────────
export default function SupportFloatBtn() {
    const [open, setOpen] = useState(false)
    const { settings } = useSetting()
    const ACTIONS = [
        {
            id: 'whatsapp',
            icon: 'logo-whatsapp' as const,
            label: 'WhatsApp',
            color: '#fff',
            bg: '#25D366',
            onPress: () => Linking.openURL(`https://wa.me/${settings?.support_whatsapp}`),
        },
        {
            id: 'call',
            icon: 'call' as const,
            label: 'Call Us',
            color: '#fff',
            bg: '#4F46E5',
            onPress: () => Linking.openURL(`tel:${settings?.support_phone}`),
        },
    ]
    const rotation = useRef(new Animated.Value(0)).current
    const backdropAnim = useRef(new Animated.Value(0)).current
    const itemAnims = useRef(
        ACTIONS.map(() => ({
            translateY: new Animated.Value(0),
            opacity: new Animated.Value(0),
            scale: new Animated.Value(0.5),
        }))
    ).current

    const animateOpen = useCallback(() => {
        Animated.parallel([
            Animated.spring(rotation, { toValue: 1, useNativeDriver: true, tension: 120, friction: 8 }),
            Animated.timing(backdropAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
            ...itemAnims.flatMap(({ translateY, opacity, scale }, i) => [
                Animated.spring(translateY, {
                    toValue: -(i + 1) * 72,
                    delay: i * 60,
                    useNativeDriver: true,
                    tension: 140,
                    friction: 9,
                }),
                Animated.timing(opacity, { toValue: 1, duration: 180, delay: i * 60, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, delay: i * 60, useNativeDriver: true, tension: 140, friction: 9 }),
            ]),
        ]).start()
    }, [])

    const animateClose = useCallback(() => {
        Animated.parallel([
            Animated.spring(rotation, { toValue: 0, useNativeDriver: true, tension: 120, friction: 8 }),
            Animated.timing(backdropAnim, { toValue: 0, duration: 180, useNativeDriver: true }),
            ...itemAnims.flatMap(({ translateY, opacity, scale }) => [
                Animated.spring(translateY, { toValue: 0, useNativeDriver: true, tension: 140, friction: 9 }),
                Animated.timing(opacity, { toValue: 0, duration: 150, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 0.5, useNativeDriver: true, tension: 140, friction: 9 }),
            ]),
        ]).start()
    }, [])

    const toggle = () => {
        open ? animateClose() : animateOpen()
        setOpen(prev => !prev)
    }

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
    })






    return (
        <>
            {/* ── Backdrop ── */}
            {/* <Animated.View
                pointerEvents={open ? 'auto' : 'none'}
                className="absolute inset-0 bg-black/40"
                style={{ opacity: backdropAnim, zIndex: 98 }}
            >
                <Pressable style={StyleSheet.absoluteFill} onPress={toggle} />
            </Animated.View> */}

            {/* ── Container ── */}
            <View
                className="absolute bottom-7 right-5 items-center"
                style={{ zIndex: 99 }}
                pointerEvents="box-none"
            >
                {ACTIONS.map((action, i) => (
                    <FloatContactButton key={action.id} action={action} toggle={toggle} i={i} itemAnims={itemAnims} />
                ))}

                <MainFab toggle={toggle} open={open}  />
            </View>
        </>
    )
}


