import React from 'react'
import Layout from '@/components/ui/layout'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useEffect } from 'react'
import ReviewsHeader from '@/components/screens/stores/reviews-header'
import OverallRating from '@/components/screens/stores/overall-rating'
import ReviewLoading from '@/components/screens/stores/reviews-loading'
import NoReviews from '@/components/screens/stores/no-reviews'

import { useStoreReviews } from '@/hooks/useStoreReviews'
import BottomSheet from '@gorhom/bottom-sheet'
import { useRef } from 'react'

import AddReviewPaper from '@/components/screens/reviews/add-review-paper'
import { useAuth } from '@/hooks/useAuth'
import AddReviewBtn from '@/components/screens/reviews/add-review-btn'
import ReviewItem from '@/components/screens/reviews/review-item'

export default function Reviews() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { id, name, logo, total_reviews } = useLocalSearchParams();
    const storeId = Array.isArray(id) ? id[0] : id;
    const { t, i18n } = useTranslation();

    const { data, isLoading, error, refetch } = useStoreReviews(storeId)

    const [reviews, setReviews] = useState<any[]>([]);
    const [filterRating, setFilterRating] = useState<number | null>(null);


    useEffect(() => {
        if (data) {
            setReviews(data);
        }
    }, [data]);

    const filteredReviews = filterRating
        ? reviews.filter(r => r.rating === filterRating)
        : reviews;

    return (
        <>
            <Layout>
                <ReviewsHeader />
                <ScrollView>
                    <OverallRating
                        id={storeId}
                        name={name}
                        logo={logo}
                        total_reviews={total_reviews} />



                    <View className="mx-5 mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-xl font-bold text-gray-900">
                                {filterRating ? `${filterRating} ${t('reviews.stars')}` : t('reviews.allReviews')}
                            </Text>
                            {filterRating && (
                                <TouchableOpacity onPress={() => setFilterRating(null)}>
                                    <Text className="text-orange-600 font-semibold">{t('common.clearAll')}</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {isLoading ? (
                            <ReviewLoading />
                        ) : filteredReviews.length === 0 ? (
                            <NoReviews />

                        ) : (
                            filteredReviews.map((review) => (
                                <ReviewItem key={review.id} review={review} />
                            ))
                        )}
                    </View>
                </ScrollView>


                <AddReviewBtn bottomSheetRef={bottomSheetRef}  />


            </Layout>
            <AddReviewPaper
                bottomSheetRef={bottomSheetRef}
                id={storeId} 
                refetch={refetch}
                />


        </>
    )
}
