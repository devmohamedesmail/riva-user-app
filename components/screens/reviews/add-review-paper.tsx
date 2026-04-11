import BottomPaper from '@/components/ui/bottom-paper'
import { useTranslation } from 'react-i18next'
import { Pressable, View } from 'react-native'
import { config } from '@/constants/config'
import { useAuth } from '@/hooks/auth/useAuth'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import Text from '@/components/ui/text'
import * as Yup from 'yup'
import Button from '@/components/ui/button'
import TextArea from '@/components/ui/textarea'
import Toast from 'react-native-toast-message'

export default function AddReviewPaper({ bottomSheetRef, id,refetch }: any) {
    const { t, i18n } = useTranslation();
    const [submitting, setSubmitting] = useState(false);
    const isRTL = i18n.language === 'ar';
    const { auth } = useAuth();





    const reviewSchema = Yup.object().shape({
        rating: Yup.number()
            .min(1, t('reviews.pleaseSelectRating'))
            .max(5, t('reviews.ratingMustBeBetween'))
            .required(t('reviews.ratingIsRequired')),
        comment: Yup.string()
            .min(5, t('reviews.reviewMustBeAtLeast'))
            .max(500, t('reviews.reviewMustBeLessThan'))
            .required(t('reviews.reviewIsRequired')),
    });

    const formik = useFormik({
        initialValues: {
            rating: 0,
            comment: '',
            store_id: Number(id),
            user_id: Number(auth?.user?.id),
        },
        validationSchema: reviewSchema,
        onSubmit: async (values, { resetForm }) => {

            setSubmitting(true);
            try {
                const response = await axios.post(`${config.URL}/reviews/create`, values);
                
              
                if (response.data.success) {
                    await refetch()
                    resetForm();
                    bottomSheetRef.current?.close();
                    Toast.show({
                        type: 'success',
                        text1: t('reviews.reviewAddedSuccessfully'),
                        text2: response.data.message,
                    });
                }
            } catch (error: any) {
                Toast.show({
                    type: 'error',
                    text1: t('common.error'),
                    text2: error.response.data.message,
                });
                console.log(error)
            } finally {
                setSubmitting(false);
            }
        },
    });


    const getRatingText = (rating: number) => {
        switch (rating) {
            case 5: return t('reviews.excellent');
            case 4: return t('reviews.veryGood');
            case 3: return t('reviews.good');
            case 2: return t('reviews.fair');
            case 1: return t('reviews.poor');
            default: return '';
        }
    };
    return (
        <BottomPaper ref={bottomSheetRef} snapPoints={['60%']}>
            <View className="flex-1 px-5 pb-8 ">
                <Text className="text-xl mb-4 text-center text-black dark:text-white cairoBold mt-2">
                    {t('reviews.writeReview')}
                </Text>
                <View>
                    <View className="mb-6">
                        <Text className="text-base text-gray-700 mb-3" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                            {t('reviews.yourRating')}
                        </Text>
                        <View className="flex-row justify-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Pressable
                                    key={star}
                                    onPress={() => formik.setFieldValue('rating', star)}
                                    className="mx-2"
                                >
                                    <Ionicons
                                        name={star <= formik.values.rating ? 'star' : 'star-outline'}
                                        size={40}
                                        color={star <= formik.values.rating ? '#FFA500' : '#D1D5DB'}
                                    />
                                </Pressable>
                            ))}
                        </View>
                        {formik.values.rating > 0 && (
                            <Text className="text-center text-orange-600 font-semibold mt-2">
                                {getRatingText(formik.values.rating)}
                            </Text>
                        )}
                        {formik.touched.rating && formik.errors.rating && (
                            <Text className="text-center text-red-500 text-sm mt-2">
                                {formik.errors.rating}
                            </Text>
                        )}
                    </View>


                    <TextArea
                        label={t('reviews.yourReview')}
                        value={formik.values.comment}
                        onChangeText={formik.handleChange('comment')}
                        placeholder={t('reviews.writeYourReview')}
                        numberOfLines={5}
                        error={formik.errors.comment}
                        touched={formik.touched.comment}
                    />

                    {/* Action Buttons */}
                    <View className="flex-row items-center space-x-3 gap-2">


                        <Button
                            title={submitting ? t('reviews.submitting') : t('reviews.submitReview')}
                            onPress={() => formik.handleSubmit()}
                            loading={submitting}
                            icon={<Ionicons name="send" size={20} color="white" />}
                            className='w-full'
                        />


                    </View>
                </View>
            </View>
        </BottomPaper>
    )
}
