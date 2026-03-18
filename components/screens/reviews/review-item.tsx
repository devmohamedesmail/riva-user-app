import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function ReviewItem({ review }: any) {
    const { t, i18n } = useTranslation()
    const isRTL = i18n.language === 'ar';
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

    const formatDate = (dateString: string) => {
        if (!dateString) return '';

        // Fix for Hermes JS Engine strict date parsing (convert "YYYY-MM-DD HH:mm:ss" to ISO-like format if necessary)
        const normalizedDateStr = dateString.replace(' ', 'T');
        const date = new Date(normalizedDateStr);

        if (isNaN(date.getTime())) {
            return dateString; // Fallback to raw string if invalid Date to prevent Hermes crash
        }

        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return isRTL ? 'اليوم' : 'Today';
        if (diffDays === 1) return isRTL ? 'منذ يوم واحد' : '1 day ago';
        if (diffDays < 7) return `${diffDays} ${isRTL ? 'أيام' : 'days'} ${t('reviews.ago') || 'ago'}`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} ${isRTL ? 'أسابيع' : 'weeks'} ${t('reviews.ago') || 'ago'}`;
        return date.toLocaleDateString(isRTL ? 'ar-EG' : 'en-US');
    };
    return (
        <View key={review.id} className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
            <View className="flex-row">
                <View className="w-12 h-12 rounded-full bg-orange-100 items-center justify-center">
                    <Ionicons name="person" size={24} color="#fd4a12" />
                </View>
                <View className="flex-1 ml-3">
                    <View className="flex-row justify-between items-start">
                        <View>
                            <Text className="text-base font-bold text-gray-900">
                                User #{review.user_id}
                            </Text>
                            <View className="flex-row items-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Ionicons
                                        key={star}
                                        name={star <= review.rating ? 'star' : 'star-outline'}
                                        size={14}
                                        color="#FFA500"
                                        style={{ marginRight: 2 }}
                                    />
                                ))}
                                <Text className="text-xs text-gray-500 ml-2">
                                    {getRatingText(review.rating)}
                                </Text>
                            </View>
                        </View>
                        <Text className="text-xs text-gray-400">
                            {formatDate(review.createdAt)}
                        </Text>
                    </View>
                    <Text className="text-gray-700 mt-3 leading-5">
                        {review.comment}
                    </Text>
                </View>
            </View>
        </View>
    )
}
