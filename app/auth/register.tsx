import AuthLayout from '@/components/screens/auth/auth-layout'
import RegisterForm from '@/components/screens/auth/register-form'
import SocialSection from '@/components/screens/auth/social-section'
import Layout from '@/components/ui/layout'
import TabButton from '@/components/ui/tab-button'
import useRegister from '@/hooks/auth/useRegister'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface RegisterFormValues {
    name: string
    email: string
    phone: string
    password: string
    role_id: string
}

export default function Register() {
    const { formik, isLoading, registerMethod, setRegisterMethod, t, router } = useRegister()
    return (
        <Layout>
            <AuthLayout>
                <View className="flex-1 -mt-4 pt-8 rounded-t-3xl px-6 pb-20" >
                    {/* Registration Method Toggle */}
                    <View className="flex-row mb-4 rounded-xl p-1 bg-white" >

                        <TabButton
                            title={t("auth.email")}
                            value="email"
                            activeValue={registerMethod}
                            onPress={() => setRegisterMethod("email")}
                        />


                        <TabButton
                            title={t("auth.phone")}
                            value="phone"
                            activeValue={registerMethod}
                            onPress={() => setRegisterMethod("phone")}
                        />
                    </View>
                    <RegisterForm
                        formik={formik}
                        registerMethod={registerMethod}
                        setRegisterMethod={setRegisterMethod}
                        isLoading={isLoading}
                    />
                    <SocialSection />

                    {/* Terms and Sign In Link */}
                    <View className="mb-6 mt-2">
                        <View className="flex-row justify-center items-center">
                            <Text className='text-black dark:text-white mx-2'>{t('auth.alreadyHaveAccount')} </Text>
                            <TouchableOpacity onPress={() => router.push('/auth/login')}>
                                <Text className="font-bold text-primary">{t('auth.signIn')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </AuthLayout>
        </Layout>
    )
}
