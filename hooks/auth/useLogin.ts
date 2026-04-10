import React from 'react'
import { useTranslation } from 'react-i18next';
import Toast from "react-native-toast-message";
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { AuthContext } from '@/context/auth-provider';
import { useState } from 'react';
import { useAuth } from '../useAuth';

export default function useLogin() {
  const { t, i18n } = useTranslation();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
    const { handle_login } = useAuth()
  
  
    const formik = useFormik({
      initialValues: {
        email: "",
        phone: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: loginMethod === "email"
          ? Yup.string()
            .email(t("auth.email_invalid"))
            .required(t("auth.email_required"))
          : Yup.string(),
        phone: loginMethod === "phone"
          ? Yup.string()
            .matches(/^[0-9]{10,15}$/, t("auth.phone_invalid"))
            .required(t("auth.phone_required"))
          : Yup.string(),
        password: Yup.string()
          .required(t("password_required"))
          .min(6, t("password_min")),
      }),
  
      onSubmit: async (values) => {
        setIsLoading(true);
        try {
          const email = loginMethod === "email" ? values.email : null;
          const phone = loginMethod === "phone" ? values.phone : null;
  
          const result = await handle_login(email, phone, values.password);
  
          if (result.data.success) {
            Toast.show({
              text1: t("auth.login_success"),
              text2: t("auth.login_success_description"),
              position: "top",
              type: "success",
            });
  
            setIsLoading(false);
  
            setTimeout(() => {
              router.replace("/");
            }, 1000);
          } else {
            Toast.show({
              text1: t("auth.login_failed"),
              position: "top",
              type: "error",
            });
          }
  
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          Toast.show({
            text1: t("auth.login_failed"),
            text2: t("auth.login_failed_description"),
            position: "top",
            type: "error",
          });
        } finally {
          setIsLoading(false);
        }
      },
    });
  
  return {formik,
  loginMethod,
  setLoginMethod,
  rememberMe,
  setRememberMe,
  isLoading,
  router,
  t,}
}
