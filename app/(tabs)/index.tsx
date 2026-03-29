import React, { useEffect, useRef } from 'react'

import Layout from '@/components/ui/layout'
import BottomSheet from '@gorhom/bottom-sheet';
import { usePlace } from '@/hooks/usePlace'
import SlideShow from '@/components/screens/home/side-show'
import StoreTypesSection from '@/components/screens/home/store-types-section';
import HomeHeader from '@/components/screens/home/home-header';
import { ScrollView } from 'react-native'
import HomeSearch from '@/components/screens/home/home-search';
import FeaturedStores from '@/components/screens/home/featured-stores';
import { RefreshControl } from 'react-native-gesture-handler';
import { queryClient } from '@/providers';
import PlacesBottomPaper from '@/components/screens/home/places-bottom-paper';
import SupportFloatBtn from '@/components/ui/support-float-btn';

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { selectedPlace } = usePlace()
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (!selectedPlace) {
      const timer = setTimeout(() => {
        bottomSheetRef.current?.expand()

      }, 100)

      return () => clearTimeout(timer)
    }
  }, [selectedPlace])


  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    await queryClient.invalidateQueries({
      queryKey: ['store-types', 'banners']
    })
    setRefreshing(false)
  }, []);
  return (
    <>
      <Layout>
        <HomeHeader onOpenPlace={() => bottomSheetRef.current?.expand()} />
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
          <HomeSearch />
          <SlideShow />
          <StoreTypesSection />
          <FeaturedStores />
        </ScrollView>
        <SupportFloatBtn />
      </Layout>


      <PlacesBottomPaper
        bottomSheetRef={bottomSheetRef}
      />
    </>
  )
}
