import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { config } from '@/constants/config'
import { usePlace } from '@/hooks/place/usePlace'


export default function useFeaturedStores() {
    const { selectedPlace } = usePlace()
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['featured-stores', selectedPlace?.id],
        enabled: !!selectedPlace?.id,
        queryFn: async () => {
            const response = await axios.post(`${config.URL}/stores/featured`, {
                place_id: selectedPlace?.id,
            })
            return response.data.data
        }
    })
    return {
        data,
        isLoading,
        error,
        refetch
    }
}
