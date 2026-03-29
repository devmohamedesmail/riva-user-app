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

// ─── Config ───────────────────────────────────────────────────────────────────
const SUPPORT_PHONE = '+201000000000'   // ← replace with your number
const WHATSAPP_NUMBER = '201000000000'  // ← replace (no + sign for wa.me)

const ACTIONS = [
    {
        id: 'whatsapp',
        icon: 'logo-whatsapp' as const,
        label: 'WhatsApp',
        color: '#fff',
        bg: '#25D366',
        onPress: () => Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}`),
    },
    {
        id: 'call',
        icon: 'call' as const,
        label: 'Call Us',
        color: '#fff',
        bg: '#4F46E5',
        onPress: () => Linking.openURL(`tel:${SUPPORT_PHONE}`),
    },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function SupportFloatBtn() {
    const [open, setOpen] = useState(false)

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
            <Animated.View
                pointerEvents={open ? 'auto' : 'none'}
                className="absolute inset-0 bg-black/40"
                style={{ opacity: backdropAnim, zIndex: 98 }}
            >
                <Pressable style={StyleSheet.absoluteFill}  onPress={toggle} />
            </Animated.View>

            {/* ── Container ── */}
            <View
                className="absolute bottom-7 right-5 items-center"
                style={{ zIndex: 99 }}
                pointerEvents="box-none"
            >
                {/* ── Action Items ── */}
                {ACTIONS.map((action, i) => (
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
                        <View className="bg-indigo-950 px-3 py-1 rounded-full">
                            <Text className="text-white text-xs font-semibold tracking-wide">
                                {action.label}
                            </Text>
                        </View>

                        {/* Action button */}
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => { action.onPress(); toggle() }}
                            className="w-12 h-12 rounded-full items-center justify-center"
                            style={[
                                { backgroundColor: action.bg },
                                Platform.OS === 'ios'
                                    ? { shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }
                                    : { elevation: 8 },
                            ]}
                        >
                            <Ionicons name={action.icon} size={22} color={action.color} />
                        </TouchableOpacity>
                    </Animated.View>
                ))}

                {/* ── Main FAB ── */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={toggle}
                    className="w-15 h-15 rounded-full bg-primary items-center justify-center overflow-visible"
                    style={[
                        { width: 60, height: 60 },
                        Platform.OS === 'ios'
                            ? { shadowColor: '#4F46E5', shadowOpacity: 0.45, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } }
                            : { elevation: 10 },
                    ]}
                >
                    {/* Pulse ring */}
                    {!open && <PulseRing />}

                    <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                        <Ionicons name="headset" size={26} color="#fff" />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </>
    )
}

// ─── Pulse Ring ───────────────────────────────────────────────────────────────
function PulseRing() {
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
