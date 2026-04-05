import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { config } from '@/constants/config'
import useProfile from './useProfile'

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            formData,
            avatarFile
        }: {
            formData: { name: string; email: string; phone: string };
            avatarFile?: any
        }) => {
            const token = await SecureStore.getItemAsync('token');
            const formDataToSend = new FormData();

            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);

            if (avatarFile) {
                const fileExtension = avatarFile.uri.split('.').pop();
                const fileName = `avatar_${Date.now()}.${fileExtension}`;

                formDataToSend.append('avatar', {
                    uri: avatarFile.uri,
                    type: `image/${fileExtension}`,
                    name: fileName,
                } as any);
            }

            const response = await axios.put(
                `${config.URL}/auth/update-profile`,
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return response.data;
        },
        onSuccess: () => {
            // Invalidate the 'profile' query to refetch fresh user data
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });
};

export function useEditProfileLogic() {
    const { t } = useTranslation();
    const { data, isLoading: isFetchingProfile } = useProfile();
    const updateProfileMutation = useUpdateProfile();
    
    const [avatar, setAvatar] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<any>(null);
    const profileData = data?.data;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(t('auth.name_required', 'Name is required'))
            .min(2, t('auth.name_min_length', 'Name must be at least 2 characters')),
        email: Yup.string()
            .required(t('auth.email_required', 'Email is required'))
            .email(t('auth.email_invalid', 'Invalid email format')),
        phone: Yup.string()
            .required(t('auth.phone_required', 'Phone is required'))
            .min(8, t('auth.phone_min_length', 'Phone is too short')),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                await updateProfileMutation.mutateAsync({
                    formData: values,
                    avatarFile
                });
                
                Toast.show({
                    type: 'success',
                    text1: t('common.success', 'Success'),
                    text2: t('profile.updateSuccess', 'Profile updated successfully'),
                });
            } catch (error: any) {
                console.error('Update error:', error);
                Toast.show({
                    type: 'error',
                    text1: t('common.error', 'Error'),
                    text2: error.response?.data?.message || t('profile.updateFailed', 'Update failed'),
                });
            }
        },
    });

    // Populate initial values when data is loaded
    useEffect(() => {
        if (profileData) {
            formik.setValues({
                name: profileData.name || '',
                email: profileData.email || '',
                phone: profileData.phone || '',
            });
            if (profileData.avatar) {
                setAvatar(profileData.avatar);
            }
        }
    }, [profileData]);

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Toast.show({
                    type: 'error',
                    text1: t('common.error', 'Error'),
                    text2: t('profile.permissionDenied', 'Permission to access gallery was denied'),
                });
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setAvatar(result.assets[0].uri);
                setAvatarFile(result.assets[0]);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    return {
        t,
        formik,
        pickImage,
        avatar,
        isFetchingProfile,
        updateProfileMutation
    };
}
