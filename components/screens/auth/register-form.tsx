import React from 'react'
import { View } from 'react-native'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function RegisterForm({ formik, registerMethod, setRegisterMethod, isLoading }: any) {
    const { t } = useTranslation()
    return (
        <View>
            {/* Name Input */}
            <Input
                label={t('auth.name')}
                placeholder={t('auth.enterName')}
                type="text"
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
            />

            {/* Email/Phone Input */}
            {registerMethod === "email" ? (
                <Input
                    label={t('auth.email')}
                    placeholder={t('auth.enterEmail')}
                    type="email"
                    keyboardType="email-address"
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                    error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                />
            ) : (
                <Input
                    label={t('auth.phone')}
                    placeholder={t('auth.enterPhone')}
                    type="phone"
                    keyboardType="phone-pad"
                    value={formik.values.phone}
                    onChangeText={formik.handleChange('phone')}
                    error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined}
                />
            )}

            {/* Password Input */}
            <Input
                label={t('auth.password')}
                placeholder={t('auth.enterPassword')}
                type="password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
            />



            <Input
                label={t('auth.referralCode')}
                placeholder={t('auth.enterReferralCode')}
                type="text"
                value={formik.values.referred_by_code}
                onChangeText={formik.handleChange('referred_by_code')}
            />


            <Button
                size='lg'
                title={isLoading ? t('auth.signingUp') : t('auth.signUp')}
                onPress={() => formik.handleSubmit()}
                disabled={
                    isLoading ||
                    !formik.isValid ||
                    !formik.dirty ||
                    (registerMethod === "email" ? !formik.values.email : !formik.values.phone) ||
                    !formik.values.password
                }
            />
        </View>
    )
}
