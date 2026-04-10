import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, TouchableOpacity } from 'react-native'
import Input from '@/components/ui/input'
import Text from '@/components/ui/text'
import colors from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import Button from '@/components/ui/button'

export default function LoginForm({formik,loginMethod,setLoginMethod,rememberMe,setRememberMe,isLoading}:any) {
    const { t, i18n } = useTranslation();
    
  return (
   <View>
            {/* Email/Phone Input */}
            {loginMethod === "email" ? (
              <Input
                label={t("auth.email")}
                placeholder={t("auth.enterEmail")}
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                type="email"
                keyboardType="email-address"
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : undefined
                }
              />
            ) : (
              <Input
                label={t("auth.phone")}
                placeholder={t("auth.enterPhone")}
                value={formik.values.phone}
                onChangeText={formik.handleChange("phone")}
                type="phone"
                keyboardType="phone-pad"
                error={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : undefined
                }
              />
            )}

            {/* Password Input */}
            <Input
              label={t("auth.password")}
              placeholder={t("auth.enterPassword")}
              value={formik.values.password}
              onChangeText={formik.handleChange("password")}
              type="password"
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
            />

            {/* Remember Me & Forgot Password */}
            <View
              className={`flex-row justify-between items-center mt-4 ${i18n.language === "ar" ? "flex-row-reverse" : ""}`}
            >
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center"
              >
                <View
                  className={`w-5 h-5 border-2 rounded mr-2 items-center justify-center ${rememberMe ? "border-secondary" : ""}`}
                
                >
                  {rememberMe && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
                <Text
                  style={{
                   
                    color: colors.light.text
                  }}
                >
                  {t("auth.rememberMe")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { }}>
                <Text className="font-medium" style={{ color: colors.light.tint }}>
                  {t("auth.forgotPassword")}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <View className="mt-8">
              <Button
                size='lg'
                title={isLoading ? t("auth.signingIn") : t("auth.signIn")}
                onPress={formik.handleSubmit}
                disabled={
                  isLoading ||
                  !formik.isValid ||
                  !formik.dirty ||
                  (loginMethod === "email" ? !formik.values.email : !formik.values.phone) ||
                  !formik.values.password
                }
              />
            </View>
</View>
  )
}
