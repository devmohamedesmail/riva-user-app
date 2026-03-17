import React from 'react'
import Layout from '@/components/ui/layout'
import { useLocalSearchParams } from 'expo-router'
import Loading from '@/components/ui/loading'
import { View, FlatList } from 'react-native'
import NoStores from '@/components/screens/stores/no-stores'
import StoresHeader from '@/components/screens/stores/stores-header'
import StoreCard from '@/components/screens/stores/store-card'
import { useStores } from '@/hooks/useStores'

export default function Stores() {
    const { storeType } = useLocalSearchParams();
    const parsedStoreType = JSON.parse(storeType as string);
    const {data,isLoading,searchQuery,setSearchQuery,filteredStores}=useStores(parsedStoreType.id)
    return (
        <Layout>
            <StoresHeader
                parsedStoreType={parsedStoreType}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery} 
                
                />
            {isLoading ? <Loading /> :
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={filteredStores || []}
                        numColumns={2}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <StoreCard item={item} />}
                        columnWrapperStyle={{ gap: 2 }}
                        contentContainerStyle={{
                            paddingHorizontal: 5,
                            paddingTop: 20,
                            paddingBottom: 120,
                            flexGrow: 1,
                        }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() => (
                            <NoStores searchQuery={searchQuery} />
                        )}
                    />
                </View>
            }
        </Layout>
    )
}
