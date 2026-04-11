import EmptyOffers from '@/components/screens/offers/empty-offers';
import OffersHeader from '@/components/screens/offers/offers-header';
import Loading from '@/components/ui/loading';
import React, { useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import ProductCard from '@/components/screens/products/product-card';
import useOffers from '@/hooks/stores/useOffers';





export default function Offers() {
    const {data:offers,isLoading,isError,error,refetch}=useOffers();
    const [refreshing, setRefreshing] = useState(false);
  
    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, []);
    return (
        <View className="flex-1 bg-gray-50 dark:bg-black">
            <OffersHeader />

            {isLoading && !refreshing ? (
                <Loading />
            ) : offers?.length === 0 ? (
                <EmptyOffers />
            ) : (
                <FlatList
                    data={offers}
                    // renderItem={renderItem}
                    renderItem={({ item }) => <ProductCard item={item} store={item.store} />}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between',gap:5 ,paddingHorizontal: 8 }}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#fd4a12']} />
                    }
                />
            )}
            
        </View>
    );
}
