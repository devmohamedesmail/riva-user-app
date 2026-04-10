import { AuthContext } from '@/context/auth-provider'
import { useRouter } from 'expo-router'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

interface RegisterFormValues {
    name: string
    email: string
    phone: string
    password: string
    role_id: string
    referred_by_code: string
}

export default function useRegister() {
      const { t, i18n } = useTranslation()
      const [isLoading, setIsLoading] = useState(false)
      const [registerMethod, setRegisterMethod] = useState<"email" | "phone">("email")
      const { handle_register } = useContext(AuthContext)
      const router = useRouter()
  
  
  
      const validationSchema = Yup.object({
          name: Yup.string()
              .min(2, t('auth.name_min_required'))
              .required(t('auth.name_required')),
          email: registerMethod === "email"
              ? Yup.string()
                  .email(t('auth.email_invalid'))
                  .required(t('auth.email_required'))
              : Yup.string(),
          phone: registerMethod === "phone"
              ? Yup.string()
                  .matches(/^[0-9]{10,15}$/, t('auth.phone_invalid'))
                  .required(t('auth.phone_required'))
              : Yup.string(),
          password: Yup.string()
              .min(6, t('auth.password_min'))
              .required(t('auth.password_required')),
      })
  
      const formik = useFormik<RegisterFormValues>({
          initialValues: {
              name: '',
              email: '',
              phone: '',
              password: '',
              role_id: '1',
              referred_by_code: ''
          },
          validationSchema,
          onSubmit: async (values) => {
              setIsLoading(true)
  
              try {
                  const email = registerMethod === "email" ? values.email : null;
                  const phone = registerMethod === "phone" ? values.phone : null;
  
                  const result = await handle_register(
                    values.name, 
                    email, phone, 
                    values.password, 
                    values.role_id,
                    values.referred_by_code
                  );
                  if (result.success) {
                      Toast.show({
                          type: 'success',
                          text1: t('auth.registration_success'),
                          text2: t('auth.thankYou'),
                          position: 'top',
                          visibilityTime: 3000,
                      });
                      setTimeout(() => {
                          setIsLoading(false)
                          router.push('/')
                      }, 3000);
                  } else {
                      Toast.show({
                          type: 'error',
                          text1: t('auth.registration_failed'),
                          text2: t('auth.pleaseTryAgain'),
                          position: 'top',
                          visibilityTime: 3000,
                      });
                  }
              } catch (error) {
                  Toast.show({
                      type: 'error',
                      text1: t('auth.registration_failed'),
                      text2: t('auth.pleaseTryAgain'),
                      position: 'top',
                      visibilityTime: 3000,
                  });
              } finally {
                  setIsLoading(false)
              }
          }
      })
  
  return {formik,isLoading,registerMethod,setRegisterMethod,t, router}
}
