import React from "react";
import {
  View,
  Pressable,
} from "react-native";

import AuthLayout from "@/components/screens/auth/auth-layout";
import colors from "@/constants/colors";
import Layout from "@/components/ui/layout";
import TabButton from "@/components/ui/tab-button";
import SocialSection from "@/components/screens/auth/social-section";
import useLogin from "@/hooks/auth/useLogin";
import Text from "@/components/ui/text";
import LoginForm from "@/components/screens/auth/login-form";
export default function Login() {

  const {
    formik,
    loginMethod,
    setLoginMethod,
    rememberMe,
    setRememberMe,
    isLoading,
    router,
    t,
  } = useLogin()
  return (
    <Layout>
      <AuthLayout>
        <View className="flex-1 px-6 -mt-4 pt-8 rounded-t-3xl" >
          <View className="space-y-4 pb-20">
            {/* Login Method Toggle */}
            <View className="flex-row mb-4 bg-gray-100 rounded-xl p-1" >

              <TabButton
                title={t("auth.email")}
                value="email"
                activeValue={loginMethod}
                onPress={() => setLoginMethod("email")}
              />



              <TabButton
                title={t("auth.phone")}
                value="phone"
                activeValue={loginMethod}
                onPress={() => setLoginMethod("phone")}
              />
            </View>
            <LoginForm formik={formik} loginMethod={loginMethod} setLoginMethod={setLoginMethod} rememberMe={rememberMe} setRememberMe={setRememberMe} isLoading={isLoading} />
            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center mt-8 mb-8">
              <Text className="text-black dark:text-white">{t("auth.dontHaveAccount")}</Text>
              <Pressable onPress={() => router.push("/auth/register")}>
                <Text className="font-semibold ml-1" style={{ color: colors.light.tint }}>
                  {t("auth.signUp")}
                </Text>
              </Pressable>
            </View>

            {/* <GoogleButton /> */}
            <SocialSection />
          </View>

        </View>
      </AuthLayout>
    </Layout>

  );
}
