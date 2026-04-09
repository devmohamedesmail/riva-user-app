
import React from 'react'
import { View } from 'react-native'
import Swiper from 'react-native-swiper'
import { useTheme } from '@/hooks/useTheme'
import colors from '@/constants/colors'
import Skeleton from '@/components/ui/skeleton'
import { useBanners } from '@/hooks/banners/useBanners'
import { useTranslation } from 'react-i18next'
import BannerItem from './banner-item'
import { Banner } from '@/hooks/banners/useBanners'





export default function SlideShow() {
  const { data, isLoading } = useBanners();
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const { t } = useTranslation();

  return (
    <View className='px-3 '>
      {isLoading ? (
        <Skeleton width={"100%"} height={200} />
      ) : (
        <View style={{ height: 200 }}>
          <Swiper
            autoplay
            loop
            autoplayTimeout={5}
            showsPagination={true}
            dotStyle={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
            }}
            activeDotStyle={{
              backgroundColor: colors.light.tint,
              width: 40,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
            }}
            paginationStyle={{
              bottom: -22,
            }}
          >
            {data?.map((banner: Banner) => (
              <BannerItem banner={banner} isDark={isDark} t={t} />
            ))}
          </Swiper>
        </View>
      )}
    </View>
  )
}


